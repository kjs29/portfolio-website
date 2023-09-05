
// drag and drop functionality
let vsCodeWindow = document.querySelector('.wrapper');
let topWindow = vsCodeWindow.querySelector('.top');
let mainWindow = vsCodeWindow.querySelector('main')

topWindow.addEventListener('mousedown', function (e) {
    const offsetX = e.clientX - vsCodeWindow.offsetLeft;
    const offsetY= e.clientY - vsCodeWindow.offsetTop;
    
    const move = e => {
        vsCodeWindow.style.position = 'absolute';
        vsCodeWindow.style.left = `${e.clientX - offsetX}px`;
        vsCodeWindow.style.top = `${e.clientY - offsetY}px`;
    }
    document.addEventListener('mousemove', move);
    document.addEventListener('mouseup', () => {
        document.removeEventListener('mousemove', move), { once: true }
    });
});

// add title's text to terminal name
window.onload = function() {
    const title = document.querySelector('title').innerText;
    let myComputer = document.querySelector('.terminal-command p:last-child');
    myComputer.appendChild(document.createTextNode(title+' % '));
}

// hide vsCodeWindow on clicking red-dot
topWindow.querySelector('div.red-dot').addEventListener('click', function() {
    vsCodeWindow.style.display = 'none';
});

// hide vsCodeWindow on clicking yellow-dot
topWindow.querySelector('div.yellow-dot').addEventListener('click', function() {
    vsCodeWindow.style.display = 'none';
});

// maximizing window on clicking green-dot
topWindow.querySelector('div.green-dot').addEventListener('click', function() {
    vsCodeWindow.classList.toggle('maxSize');
});

// maximizing window on doubleclicking top bar
topWindow.addEventListener('dblclick', function() {
    vsCodeWindow.classList.toggle('maxSize');
});

// right click controls
// to see the menu clicking events, go to navigation links
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

// when portfolio folder is double clicked, its display is reset
document.querySelector('#portfolio').addEventListener('dblclick', function() {
    vsCodeWindow.style.display = 'unset';
});

// when Resume.pdf is double clicked, it displays resume in a new tab
document.querySelector('#resume').addEventListener('dblclick', () => {
    window.open('https://kjs29.github.io/portfolio-website/resources/JinsungKim_resume.pdf', '_blank');
});

/**********************************************************/

// typewriter effect
async function typeAll() {
    let texts = mainWindow.querySelectorAll('.terminal-middle p');
    
    for (let textNode of texts) {
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

let navLinkFirst = mainWindow.querySelector('nav li:nth-child(1)');
let navLinkSecond = mainWindow.querySelector('nav li:nth-child(2)');
let navLinkThird = mainWindow.querySelector('nav li:nth-child(3)');
let navLinkFourth = mainWindow.querySelector('nav li:nth-child(4)');

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
    vsCodeWindow.style.display = 'block';
    const targetElement = mainWindow.querySelector('#about-me');
    targetElement.scrollIntoView({behavior: 'smooth'});
}

function scrollToSkills() {
    vsCodeWindow.style.display = 'block';
    const targetElement = mainWindow.querySelector('#skills');
    targetElement.scrollIntoView({behavior: 'smooth'});
}

function scrollToProjects() {
    vsCodeWindow.style.display = 'block';
    const targetElement = mainWindow.querySelector('#projects');
    targetElement.scrollIntoView({behavior: 'smooth'});
}

function scrollToContact() {
    vsCodeWindow.style.display = 'block';
    const targetElement = mainWindow.querySelector('#contact');
    targetElement.scrollIntoView({behavior: 'smooth'});
}

// change active class as page scrolls
let navigationMenu = mainWindow.querySelectorAll('nav ul li');
let output = mainWindow.querySelector('.output');

output.addEventListener('scroll', () => {
    
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
