const container = document.getElementById("buttons");
const viewer = document.getElementById("imageViewer");
const prevBtn = document.getElementById("prevBtn");
const randomBtn = document.getElementById("randomBtn");

let history = [];
let currentIndex = -1;

// Add transition styles to viewer
viewer.style.transition = 'opacity 0.5s ease-in-out';
viewer.style.opacity = '1'; // ensure it starts visible

function showImage(path) {
    // Fade out
    viewer.style.opacity = '0';
    
    // Wait for fade-out, then change src and fade in
    setTimeout(() => {
        viewer.src = path;
        viewer.style.opacity = '1';
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
    const randomIndex = Math.floor(Math.random() * images.length);
    const image = images[randomIndex];

    const path = `imgs/${folder}/${image}`;
    pushHistory(path);
}

function showRandomAll() {
    const folders = Object.keys(imageData);
    const folder = folders[Math.floor(Math.random() * folders.length)];

    const images = imageData[folder];
    const image = images[Math.floor(Math.random() * images.length)];

    const path = `imgs/${folder}/${image}`;
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
    btn.style.fontSize = '1.2rem';
    btn.style.minWidth = '120px';
});
