function rotateFace(dir, col) {
    const faceCirle = {
        "xp": [0, 2, 5, 4],
        "xn": [0, 4, 5, 2],
        "yp": [0, 1, 5, 3],
        "yn": [0, 3, 5, 1],
        "zp": [1, 4, 3, 2],
        "zn": [1, 2, 3, 4]
    };
    const posCirle = {
        "xp": Array.from({length : gridSize}, (x, index) => Array.from({length : 4}, x => [index, col])),
        "xn": Array.from({length : gridSize}, (x, index) => Array.from({length : 4}, x => [index, col])),
        "yp": Array.from({length : gridSize}, (x, index) => Array.from({length : 4}, (x, order) => {
            if (order == 2) 
                return [gridSize - 1 - col, gridSize - 1 - index];
            else
                return [col, index];
        })),
        "yn": Array.from({length : gridSize}, (x, index) => Array.from({length : 4}, (x, order) => {
            if (order == 2) 
                return [gridSize - 1 - col, gridSize - 1 - index];
            else
                return [col, index];
        })),
        "zp": Array.from({length : gridSize}, (x, index) => Array.from({length : 4}, (x, order) => {
            if (order == 0) 
                return [index, col];
            else if (order == 1)
                return [gridSize - 1 - col, index];
            else if (order == 2)
                return [gridSize - 1 - index, gridSize - 1 - col];
            else
                return [col, gridSize - 1 - index];
        })),
        "zn": Array.from({length : gridSize}, (x, index) => Array.from({length : 4}, (x, order) => {
            if (order == 0) 
                return [index, col];
            else if (order == 1)
                return [col, gridSize - 1 - index];
            else if (order == 2)
                return [gridSize - 1 - index, gridSize - 1 - col];
            else
                return [gridSize - 1 - col, index];
        }))
    };
    
    let tmpFace = [];
    for (let i = 0; i < gridSize; i++) 
        tmpFace.push(cubeColor[faceCirle[dir][0]][posCirle[dir][i][0][0]][posCirle[dir][i][0][1]]);

    for (let i = 0; i < 3; i++) 
        for (let j = 0; j < gridSize; j++)
            cubeColor[faceCirle[dir][i]][posCirle[dir][j][i][0]][posCirle[dir][j][i][1]] = cubeColor[faceCirle[dir][i + 1]][posCirle[dir][j][i + 1][0]][posCirle[dir][j][i + 1][1]];

    for (let i = 0; i < gridSize; i++) 
        cubeColor[faceCirle[dir][3]][posCirle[dir][i][3][0]][posCirle[dir][i][3][1]] = tmpFace[i];

    if (col == 0 || col == gridSize - 1) {
        const face = {};
        face[`xp0`] = [1, "left"];
        face[`xn0`] = [1, "right"];
        face[`xp${gridSize - 1}`] = [3, "right"];
        face[`xn${gridSize - 1}`] = [3, "left"];
        face[`yp0`] = [2, "right"];
        face[`yn0`] = [2, "left"];
        face[`yp${gridSize - 1}`] = [4, "left"];
        face[`yn${gridSize - 1}`] = [4, "right"];
        face[`zp0`] = [5, "right"];
        face[`zn0`] = [5, "left"];
        face[`zp${gridSize - 1}`] = [0, "left"];
        face[`zn${gridSize - 1}`] = [0, "right"];

        let turnFace = face[dir + col];
        let tmpFace = cubeColor[turnFace[0]].map(x => x);
        
        const rotateRight = () => tmpFace.map((val, index) => tmpFace.map(row => row[index])).reverse()
        const rotateLeft = () => tmpFace.map((val, index) => tmpFace.map(row => row[index]).reverse())

        if (turnFace[1] == "right") 
            cubeColor[turnFace[0]] = rotateRight();
        else 
            cubeColor[turnFace[0]] = rotateLeft();
    }

    drawCube();
}

const rotateButton = document.getElementById("rotatebutton");

rotateButton.onclick = function(event) {
    const selectDir = event.target;
    
    let dir = selectDir.getAttribute("dir"); 
    const dirIndex = selectDir.getAttribute("data-index"); 

    if (!dir || !dirIndex) 
        return;

    if (dir == "x-right") dir = "xp";
    else if (dir == "x-left") dir = "xn";
    else if (dir == "y-front") dir = "yp";
    else if (dir == "y-back") dir = "yn";
    else if (dir == "z-right") dir = "zp";
    else if (dir == "z-left") dir = "zn";

    rotateFace(dir, parseInt(dirIndex));
    showArrow(event);
};

rotateButton.addEventListener("mouseover", showArrow, false);
rotateButton.addEventListener("mouseout", drawCube, false);

function showArrow(event) {
    const selectDir = event.target;

    let dir = selectDir.getAttribute("dir"); 
    let dirIndex = selectDir.getAttribute("data-index"); 

    if (!dir || !dirIndex) 
        return;

    dirIndex = parseInt(dirIndex);

    drawCube();
    
    const faceList = {
        "x-right": [0, 2, 5, 4],
        "x-left": [0, 4, 5, 2],
        "y-front": [0, 1, 5, 3],
        "y-back": [0, 3, 5, 1],
        "z-right": [1, 4, 3, 2],
        "z-left": [1, 2, 3, 4]
    };
    const faceArrow = {
        "x-right": ["right", "right", "right", "right"],
        "x-left": ["left", "left", "left", "left"],
        "y-front": ["down", "down", "up", "down"],
        "y-back": ["up", "up", "down", "up"],
        "z-right": ["left", "up", "right", "down"],
        "z-left": ["right", "up", "left", "down"]
    };
    const arrowCirle = {
        "x-right": Array.from({length : gridSize}, (x, index) => Array.from({length : 4}, x => [index, dirIndex])),
        "x-left": Array.from({length : gridSize}, (x, index) => Array.from({length : 4}, x => [index, dirIndex])),
        "y-front": Array.from({length : gridSize}, (x, index) => Array.from({length : 4}, (x, order) => {
            if (order == 2) 
                return [gridSize - 1 - dirIndex, gridSize - 1 - index];
            else
                return [dirIndex, index];
        })),
        "y-back": Array.from({length : gridSize}, (x, index) => Array.from({length : 4}, (x, order) => {
            if (order == 2) 
                return [gridSize - 1 - dirIndex, gridSize - 1 - index];
            else
                return [dirIndex, index];
        })),
        "z-right": Array.from({length : gridSize}, (x, index) => Array.from({length : 4}, (x, order) => {
            if (order == 0) 
                return [index, dirIndex];
            else if (order == 1)
                return [gridSize - 1 - dirIndex, index];
            else if (order == 2)
                return [gridSize - 1 - index, gridSize - 1 - dirIndex];
            else
                return [dirIndex, gridSize - 1 - index];
        })),
        "z-left": Array.from({length : gridSize}, (x, index) => Array.from({length : 4}, (x, order) => {
            if (order == 0) 
                return [index, dirIndex];
            else if (order == 1)
                return [dirIndex, gridSize - 1 - index];
            else if (order == 2)
                return [gridSize - 1 - index, gridSize - 1 - dirIndex];
            else
                return [gridSize - 1 - dirIndex, index];
        }))
    };

    for (let i = 0; i < 4; i++) 
        for (let j = 0; j < gridSize; j++) 
            drawArrow(faceArrow[dir][i], faceList[dir][i], [arrowCirle[dir][j][i][0], arrowCirle[dir][j][i][1]]);
    
    if (dirIndex == 0 || dirIndex == gridSize - 1) {
        const face = {};
        face[`x-right0`] = [1, "left"];
        face[`x-left0`] = [1, "right"];
        face[`x-right${gridSize - 1}`] = [3, "right"];
        face[`x-left${gridSize - 1}`] = [3, "left"];
        face[`y-front0`] = [2, "right"];
        face[`y-back0`] = [2, "left"];
        face[`y-front${gridSize - 1}`] = [4, "left"];
        face[`y-back${gridSize - 1}`] = [4, "right"];
        face[`z-right0`] = [5, "right"];
        face[`z-left0`] = [5, "left"];
        face[`z-right${gridSize - 1}`] = [0, "left"];
        face[`z-left${gridSize - 1}`] = [0, "right"];

        let turnFace = face[dir + dirIndex];
        drawRotateArrow(turnFace[1], turnFace[0]);
    }
}