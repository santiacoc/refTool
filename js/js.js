const container = document.getElementById("buttons");
const viewer = document.getElementById("imageViewer");
const prevBtn = document.getElementById("prevBtn");
const randomBtn = document.getElementById("randomBtn");

let history = [];
let currentIndex = -1;
let lastShownPath = null; // Track last shown image

// Add transition styles to viewer
function showImage(path) {
    viewer.classList.add('fade-out');
    
    setTimeout(() => {
        viewer.src = path;
        lastShownPath = path; // Update last shown
        
        // Wait for image to load before fading in
        viewer.onload = () => {
            viewer.classList.remove('fade-out');
            viewer.onload = null;
        };
        
        viewer.onerror = () => {
            viewer.classList.remove('fade-out');
            viewer.onerror = null;
        };
    }, 500);
}

function pushHistory(path) {
    history = history.slice(0, currentIndex + 1);
    history.push(path);
    currentIndex++;
    showImage(path);
}

function showRandom(folder) {
    const images = imageData[folder];
    let randomIndex;
    let image;
    let path;
    
    // Pick a random image, but not the same as last shown
    do {
        randomIndex = Math.floor(Math.random() * images.length);
        image = images[randomIndex];
        path = `imgs/${folder}/${image}`;
    } while (path === lastShownPath && images.length > 1);
    
    pushHistory(path);
}

function showRandomAll() {
    const folders = Object.keys(imageData);
    let folder;
    let images;
    let image;
    let path;
    
    // Pick random folder
    do {
        folder = folders[Math.floor(Math.random() * folders.length)];
        images = imageData[folder];
        
        // Pick random image from that folder
        do {
            image = images[Math.floor(Math.random() * images.length)];
            path = `imgs/${folder}/${image}`;
        } while (path === lastShownPath && images.length > 1);
    } while (path === lastShownPath && folders.length > 1);
    
    pushHistory(path);
}

prevBtn.onclick = () => {
    if (currentIndex > 0) {
        currentIndex--;
        showImage(history[currentIndex]);
    }
};

randomBtn.onclick = () => {
    showRandomAll();
};

Object.keys(imageData).forEach(folder => {
    const btn = document.createElement("button");
    btn.textContent = folder;

    btn.onclick = () => {
        showRandom(folder);
    };

    container.appendChild(btn);
});

window.addEventListener("load", showRandomAll);

document.querySelectorAll('button').forEach(btn => {
    btn.classList.add('btn');
    btn.classList.add('btn-light');
    btn.classList.add('btn-lg');
    btn.classList.add('m-1');
    btn.classList.add('px-4');
    btn.classList.add('py-3');
    btn.style.fontSize = '1.8rem';
    btn.style.minWidth = '120px';
});
