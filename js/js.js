const container = document.getElementById("buttons");
const viewer = document.getElementById("imageViewer");
const prevBtn = document.getElementById("prevBtn");
const randomBtn = document.getElementById("randomBtn");

let history = [];
let currentIndex = -1;

function showImage(path) {
    viewer.src = path;
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