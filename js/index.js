const footer = document.createElement('footer');
const body = document.querySelector('body');
body.appendChild(footer);

const today = new Date();
const year = today.getFullYear();
const copyright = document.createElement('p');
copyright.innerHTML = `<span>Jared</span><span>&#169</span><span>${year}</span>`;
footer.appendChild(copyright);

const skillsList = ['c++', 'JavaScript', 'Java', 'c', 'Visual Studio', 'HTML']
const skillsSection = document.getElementById('Skills')
const skillsUL = skillsSection.querySelector('ul')

for (let skill of skillsList)
{
    let skillItem = document.createElement('li');
    skillItem.innerHTML = skill;
    skillsUL.appendChild(skillItem);
}

let messageForm = document.querySelector("[name='leave_message']");
let messageSection = document.getElementById('message-section');
let messageList = messageSection.querySelector('ul');
messageSection.hidden = true;

let idCounter = 0;
//create unique id's for entries
//closure on idCounter
function makeId() {
    let id = 'entry' + idCounter++;
    return id;
}

let entryById={};

messageForm.addEventListener('submit', (event) => {
    event.preventDefault();
    let name = event.target.usersName.value;
    let email = event.target.usersEmail.value;
    let message = event.target.usersMessage.value;

    console.log('Name: ' , name);
    console.log('Email: ', email);
    console.log('Message:', message);
    let uid = makeId();
    let newMessage = document.createElement('li');
    newMessage.classList.add('message-item');

    newMessage.innerHTML = `<a href="mailto:${email} ">${name} </a><span>wrote: ${message} </span>`;
    newMessage.setAttribute('id', uid);

    newMessage.appendChild(makeRemoveButton());
    messageList.appendChild(newMessage);
    messageForm.reset();
    messageSection.hidden = false;
});

function makeRemoveButton()
{
    let removeButton = document.createElement('button');
    removeButton.innerText = 'remove';
    removeButton.type = 'button';
    removeButton.className = 'remove-button';
    removeButton.addEventListener('click', () => {
        let entry = removeButton.parentNode;
        let uid1 = entry.getAttribute('id');
        delete entryById[uid1];
        entry.remove();
        if (messageList.childElementCount === 0) {
            messageSection.hidden = true;
        };
    });
    return removeButton;
};

//Create a fetch for my github repos
const userName = 'JaredMel';
fetch(`https://api.github.com/users/${userName}/repos`)
    .then((response) => {
        if (response.ok) {
            return response.text();
        } else {
            throw new Error("Failed to fetch repositories")
        }
    })
.then((data) => {
    const repositories = JSON.parse(data);
    console.log(repositories);

    //DOM Selection to select the projects section by id
    const projectSection = document.getElementById("Projects");

    //Create a ul in the projects section
    let projectList = document.createElement("ul");
    projectSection.appendChild(projectList);
    for (let repository of repositories) {
        //Create a new list item element
        let newProject = document.createElement("li");
        //Set the inner text of the newProject variable to the current repository's name project variable
        newProject.innerText = repository.name;
        //Append the newProject element to the projectList element
        projectList.appendChild(newProject);
    }
})
.catch((error) => {
    if (error instanceof SyntaxError) {
        console.error("Unparsable response from server")
    } else {
        console.error("Error fetching data: ", error.message);
    }
})