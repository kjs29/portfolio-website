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

// add round button 
window.onload = function() {
    const title = document.querySelector('title').innerText;
    let myComputer = document.querySelector('.terminal-command p:last-child');
    myComputer.appendChild(document.createTextNode(title+' % '));
}

// hide code editor on clicking red-dot
document.querySelector('div.red-dot').addEventListener('click', function() {
    vsCodeWindow.style.display = 'none';
});

// hide code editor on clicking yellow-dot
document.querySelector('div.yellow-dot').addEventListener('click', function() {
    vsCodeWindow.style.display = 'none';
});

// maximizing window on clicking green-dot
vsCodeWindow.querySelector('div.green-dot').addEventListener('click', function() {
    vsCodeWindow.classList.toggle ('maxSize');
    vsCodeWindow.style.left = '0px';
    vsCodeWindow.style.top = '0px';
});

// when folder is chrome, change icon
window.addEventListener("DOMContentLoaded", (e) => {
    let chromeFolders = document.querySelectorAll(".folder.chrome img");
    
    chromeFolders.forEach((img) => {
        img.src = "../resources/img/chrome.png";
        img.style.width = "6rem";
        img.style.height = "6rem";
    });
});

const folders = document.querySelectorAll('.folder');

function resetFolderStyles() {
    folders.forEach(folder=> {
        folder.firstElementChild.style.backgroundColor = "unset";
        folder.firstElementChild.style.border = "1.5px solid transparent";
        folder.lastElementChild.style.color = 'white';
        folder.lastElementChild.style.border = "1px solid transparent";
        folder.lastElementChild.style.backgroundColor = "unset";
    });
}

// when folder is clicked, reset folder style
document.addEventListener('click', resetFolderStyles);

folders.forEach(folder => {
    folder.addEventListener('click', e => {
        e.stopPropagation();
        let folderStyle = window.getComputedStyle(folder);
        if (folderStyle.filter === "none") {
            resetFolderStyles();
            folder.firstElementChild.style.border = "1.5px solid rgba(255,255,255,0.2)";
            folder.firstElementChild.style.borderRadius = "0.4rem";
            folder.firstElementChild.style.backgroundColor = "rgba(0,0,0,0.3)";
            folder.lastElementChild.style.backgroundColor = "blue";
            folder.lastElementChild.style.color = 'white';
            folder.lastElementChild.style.border = "1px dotted blue";
            folder.lastElementChild.style.borderRadius = "0.2rem";
        } else {
            resetFolderStyles();
        }
    });
});

document.querySelector('#my-portfolio').addEventListener('dblclick', function() {
    vsCodeWindow.style.display = 'unset';
})

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
