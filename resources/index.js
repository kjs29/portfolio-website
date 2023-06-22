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

    let xxx = document.getElementById('xxx');
    xxx.innerText = `${left} / ${right}`;
    xxx.style.position = 'absolute';
    xxx.style.top = 0;
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

// // right click controls
// let rightClickMenu = document.getElementById('rightClickMenu');

// document.addEventListener('contextmenu', function(e) {
//     e.preventDefault();

//     // Position the context menu at the right-click position
//     rightClickMenu.style.left = e.clientX + 'px';
//     rightClickMenu.style.top = e.clientY + 'px';
//     rightClickMenu.style.border = '5px solid red';
    
//     // Display the right-click coordinates
//     let xxx = document.getElementById('xxx');
//     xxx.innerText = `${e.clientX} / ${e.clientY}`;
//     xxx.style.position = 'absolute';
//     xxx.style.top = 0;
    
//     return false;
// });


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
    const targetElement = document.querySelector('#contact');
    targetElement.scrollIntoView({behavior: 'smooth'});

    navLinkFirst.classList.remove('active');
    navLinkSecond.classList.remove('active');
    navLinkThird.classList.remove('active');
    navLinkFourth.classList.add('active');
});

function scrollToAboutMe() {
    const targetElement = document.querySelector('#about-me');
    targetElement.scrollIntoView({behavior: 'smooth'});
    
    navLinkFirst.classList.add('active');
    navLinkSecond.classList.remove('active');
    navLinkThird.classList.remove('active');
    navLinkFourth.classList.remove('active');
}

function scrollToSkills() {
    const targetElement = document.querySelector('#skills');
    targetElement.scrollIntoView({behavior: 'smooth'});
    
    navLinkFirst.classList.remove('active');
    navLinkSecond.classList.add('active');
    navLinkThird.classList.remove('active');
    navLinkFourth.classList.remove('active');
}

function scrollToProjects() {
    const targetElement = document.querySelector('#projects');
    targetElement.scrollIntoView({behavior: 'smooth'});
    
    navLinkFirst.classList.remove('active');
    navLinkSecond.classList.remove('active');
    navLinkThird.classList.add('active');
    navLinkFourth.classList.remove('active');
}

// change active class as page scrolls
let output = document.querySelector('.output');
output.addEventListener('scroll', function(e) {
    let fromTop = output.scrollY;
    // xxx.innerText = fromTop;
});
