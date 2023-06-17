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

// add round button 
window.onload = function() {
    const title = document.querySelector('title').innerText;
    let myComputer = document.querySelector('.terminal-command p:last-child');
    myComputer.appendChild(document.createTextNode(title+' % '));
}

// hide code editor on clicking yellow-dot
document.querySelector('div.yellow-dot').addEventListener('click', function() {
    document.querySelector('.wrapper').style.display = 'none';
});

// maximizing window on clicking green-dot
document.querySelector('div.green-dot').addEventListener('click', function() {
    document.querySelector('body').style.maxWidth = '100%';
    document.querySelector('body').style.margin = '0';
    document.querySelector('body').style.width = '100%';
});

// right click event
// document.addEventListener('contextmenu', function(ev) {
//     let wrapper = document.getElementById('editor');
//     if (!wrapper.contains(ev.target)) {
//         ev.preventDefault();
//         alert('success!');
//         return false;
//     }
// }, false);

// when folder is chrome, change icon
window.addEventListener("DOMContentLoaded", (event) => {
    let chromeFolders = document.querySelectorAll(".folder.chrome img");
    
    chromeFolders.forEach((img) => {
        img.src = "../resources/img/chrome.png";
        img.style.width = '5rem';
        img.style.height = '5rem';
    });
});


const folders = document.querySelectorAll('.folder');

function resetFolderStyles() {
    folders.forEach(folder=> {
        folder.style.filter = "none" ;
        folder.lastElementChild.style.color = 'white';
        folder.lastElementChild.style.border = "1px solid transparent";
        folder.lastElementChild.style.backgroundColor = "unset";
    });
}

document.addEventListener('click', resetFolderStyles);

folders.forEach(folder => {
    folder.addEventListener('click', event => {
        event.stopPropagation();
        let folderStyle = window.getComputedStyle(folder);
        if (folderStyle.filter === "none") {
            resetFolderStyles();
            folder.style.filter = "brightness(0.5)"
            folder.lastElementChild.style.border = "1px dotted blue";
            folder.lastElementChild.style.backgroundColor = "blue";
            folder.lastElementChild.style.color = 'white';
        } else {
            resetFolderStyles();
        }
    });
});
