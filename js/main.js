const canvas = document.getElementById("cubecanvas"),
      ctx = canvas.getContext("2d");

let gridSize = 3,
    gridWidth = 50,
    faceWidth = (gridWidth + smallPadding) * gridSize + smallPadding,
    cubeColor = [];

function setRotateButton() {
    const dir = ["x-right", "x-left", "y-front", "y-back", "z-right", "z-left"]
    for (let i = 0; i < 6; i++) {
        const rotateList = document.getElementById(dir[i]);
        rotateList.innerHTML = "";
        for (let j = 0; j < gridSize; j++) {
            const button = document.createElement("li");
            button.setAttribute("data-index", j)
            button.setAttribute("dir", dir[i])
            button.textContent = `${dir[i]} ${j}`;
            rotateList.appendChild(button);
        }
    }
}

function newGame() {
    gridWidth = gridSize < 6 ? 80 - gridSize * 10 : 20;
    faceWidth = (gridWidth + smallPadding) * gridSize + smallPadding,
    canvas.width = canvas.height = faceWidth * 3 + bigPadding * 4;
    cubeColor = Array.from({length : 6}, (x, index) => Array.from({length : gridSize}, x => Array(gridSize).fill(color[index])));
    
    ctx.fillStyle = color["BG"];
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    drawFaceInfo();
    drawCube();
    setRotateButton();
}

newGame();