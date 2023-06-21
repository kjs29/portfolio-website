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



/************** Folder clicking functionality **************/

const folders = document.querySelectorAll('.folder');

console.log(folders);

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
let navLinkFirst = document.querySelector('nav li:nth-child(1)');
let navLinkSecond = document.querySelector('nav li:nth-child(2)');
let navLinkThird = document.querySelector('nav li:nth-child(3)');
let navLinkFourth = document.querySelector('nav li:nth-child(4)');

navLinkFirst.addEventListener('click', ()=> {

    const targetElement = document.querySelector('#about-me');

    targetElement.scrollIntoView({behavior: 'smooth'});

    navLinkFirst.classList.add('active');
    navLinkSecond.classList.remove('active');
    navLinkThird.classList.remove('active');
    navLinkFourth.classList.remove('active');
});

navLinkSecond.addEventListener('click', ()=> {

    const targetElement = document.querySelector('#skills');

    targetElement.scrollIntoView({behavior: 'smooth'});

    navLinkFirst.classList.remove('active');
    navLinkSecond.classList.add('active');
    navLinkThird.classList.remove('active');
    navLinkFourth.classList.remove('active');
});

navLinkThird.addEventListener('click', ()=> {

    const targetElement = document.querySelector('#projects');

    targetElement.scrollIntoView({behavior: 'smooth'});
    
    navLinkFirst.classList.remove('active');
    navLinkSecond.classList.remove('active');
    navLinkThird.classList.add('active');
    navLinkFourth.classList.remove('active');
});

navLinkFourth.addEventListener('click', ()=> {

    const targetElement = document.querySelector('#contact');

    targetElement.scrollIntoView({behavior: 'smooth'});

    navLinkFirst.classList.remove('active');
    navLinkSecond.classList.remove('active');
    navLinkThird.classList.remove('active');
    navLinkFourth.classList.add('active');
});
