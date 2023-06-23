// drag and drop functionality

let vsCodeWindow = document.querySelector('.wrapper');
let topWindow = document.querySelector('.top');

topWindow.addEventListener('mousedown', function (e) {
    const offsetX = e.clientX - vsCodeWindow.offsetLeft;
    const offsetY= e.clientY - vsCodeWindow.offsetTop;
    
    const move = e => {
        vsCodeWindow.style.left = `${e.clientX - offsetX}px`;
        vsCodeWindow.style.top = `${e.clientY - offsetY}px`;
    }
    document.addEventListener('mousemove', move);
    document.addEventListener('mouseup', () => document.removeEventListener('mousemove', move), { once: true });
});

// add title's text to terminal name
window.onload = function() {
    const title = document.querySelector('title').innerText;
    let myComputer = document.querySelector('.terminal-command p:last-child');
    myComputer.appendChild(document.createTextNode(title+' % '));
}

// hide code editor on clicking red-dot
document.querySelector('div.red-dot').addEventListener('click', function() {
    // vsCodeWindow.classList.add('minimize');
    vsCodeWindow.style.display = 'none';
});

// hide code editor on clicking yellow-dot
document.querySelector('div.yellow-dot').addEventListener('click', function() {
    // vsCodeWindow.classList.add('minimize');
    vsCodeWindow.style.display = 'none';
});

// maximizing window on clicking green-dot
vsCodeWindow.querySelector('div.green-dot').addEventListener('click', function() {
    vsCodeWindow.classList.toggle('maxSize');
});

// maximizing window on doubleclicking top bar
topWindow.addEventListener('dblclick', function() {
    vsCodeWindow.classList.toggle('maxSize');
});

// right click controls
let rightClickMenu = document.getElementById('rightClickMenu');

let disableContextMenu = e => {
    e.preventDefault();
    
    let left = e.clientX;
    let right = e.clientY;

    // let xxx = document.getElementById('xxx');
    // xxx.innerText = `${left} / ${right}`;
    // xxx.style.position = 'absolute';
    // xxx.style.top = 0;
    rightClickMenu.style.display= 'block';
    rightClickMenu.style.left = left + 'px';
    rightClickMenu.style.top = right + 'px';
    rightClickMenu.style.border = '5px solid red;'
    rightClickMenu.style.visibility = 'visible';
    
    return false;
}

document.addEventListener('contextmenu', disableContextMenu);

document.addEventListener('click', function(e) {
    rightClickMenu.style.display = 'none';
});

/************** Folder clicking functionality **************/

const folders = document.querySelectorAll('.folder');

// Reset folder's style
function resetFolderStyles() {
    folders.forEach(folder => {
        folder.firstElementChild.classList.remove('folderClicked');
        folder.lastElementChild.classList.remove('folderClickedFont');
    });
}

// Toggle the folder style on click
folders.forEach(folder => {
    folder.addEventListener('click', e => {
        e.stopPropagation();
        resetFolderStyles();
        folder.firstElementChild.classList.add('folderClicked');
        folder.lastElementChild.classList.add('folderClickedFont');
    });
});

document.addEventListener('click', resetFolderStyles);

// when My-portfolio folder is double clicked, its display is reset
document.querySelector('#my-portfolio').addEventListener('dblclick', function() {
    vsCodeWindow.style.display = 'unset';
});

/**********************************************************/

// typewriter effect
async function typeAll() {
    let texts = document.querySelectorAll('.terminal-middle p');
    
    for(let textNode of texts) {
        let text = textNode.innerText;
        textNode.style.opacity = 1;
        textNode.innerHTML = '';
        await type(textNode, text);
    }
}

function type(textNode, text) {
    return new Promise((resolve, reject) => {
        let i = 0;

        let typing = setInterval(() => {
            if (i < text.length) {
                textNode.innerHTML += text.charAt(i);
                i++;
            } else {
                clearInterval(typing);
                resolve();
            }
        }, 50);
    });
}

typeAll();


// Select all navigation links
let rightClickMenuAboutMe = document.querySelector('.menu-container p:nth-child(1)');
let rightClickMenuSkills = document.querySelector('.menu-container p:nth-child(2)');
let rightClickMenuProjects = document.querySelector('.menu-container p:nth-child(3)');
let rightClickMenuContact = document.querySelector('.menu-container p:nth-child(4)');
let rightClickMenuDisableMenu = document.querySelector('.menu-container p:last-child');

let navLinkFirst = document.querySelector('nav li:nth-child(1)');
let navLinkSecond = document.querySelector('nav li:nth-child(2)');
let navLinkThird = document.querySelector('nav li:nth-child(3)');
let navLinkFourth = document.querySelector('nav li:nth-child(4)');

rightClickMenuDisableMenu.addEventListener('click', () => {
    document.removeEventListener('contextmenu', disableContextMenu);
});

rightClickMenuAboutMe.addEventListener('click', () => {
    scrollToAboutMe();
});

rightClickMenuSkills.addEventListener('click', () => {
    scrollToSkills();
});

rightClickMenuProjects.addEventListener('click', () => {
    scrollToProjects();
});

rightClickMenuContact.addEventListener('click', () => {
    scrollToContact();
})

navLinkFirst.addEventListener('click', () => {
    scrollToAboutMe();
});

navLinkSecond.addEventListener('click', () => {
    scrollToSkills();
});

navLinkThird.addEventListener('click', ()=> {
    scrollToProjects();
});

navLinkFourth.addEventListener('click', ()=> {
    scrollToContact();
});

function scrollToAboutMe() {
    const targetElement = document.querySelector('#about-me');
    targetElement.scrollIntoView({behavior: 'smooth'});
}

function scrollToSkills() {
    const targetElement = document.querySelector('#skills');
    targetElement.scrollIntoView({behavior: 'smooth'});
}

function scrollToProjects() {
    const targetElement = document.querySelector('#projects');
    targetElement.scrollIntoView({behavior: 'smooth'});
}

function scrollToContact() {
    const targetElement = document.querySelector('#contact');
    targetElement.scrollIntoView({behavior: 'smooth'});
}

// change active class as page scrolls
let navigationMenu = document.querySelectorAll('nav ul li');
let output = document.querySelector('.output');

output.addEventListener('scroll', () => {
    
    if (window.innerWidth <= 576) {
        return false;
    }

    // the very top default scrollPosition is 10
    let scrollPositionY = output.scrollTop + 10;
    
    // select first child, and select from 2nd to 5th children of .output
    let sections = output.querySelectorAll('.output > div');
    introSection = Array.from(sections).shift();
    sections = Array.from(sections).slice(1);
    
    // console.log(`scroll position : ${scrollPositionY}`);

    // add class active to about me section
    if (scrollPositionY < sections[1].offsetTop) {
        navigationMenu[0].classList.add('active');
    } else {
        navigationMenu[0].classList.remove('active')
    }

    // add class active to skills section
    if (scrollPositionY > sections[1].offsetTop && 
        scrollPositionY < sections[2].offsetTop) {
        navigationMenu[1].classList.add('active');
    } else {
        navigationMenu[1].classList.remove('active');
    }

    // add class active to portfolio section
    if (scrollPositionY > sections[2].offsetTop &&
        scrollPositionY < sections[3].offsetTop - output.offsetHeight) {
        navigationMenu[2].classList.add('active');
    } else {
        navigationMenu[2].classList.remove('active');
    }
    
    // add class active to contact section
    if (scrollPositionY > sections[3].offsetTop - output.offsetHeight) {
        navigationMenu[3].classList.add('active');
    } else {
        navigationMenu[3].classList.remove('active');
    }
});
