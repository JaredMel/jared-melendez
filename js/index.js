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