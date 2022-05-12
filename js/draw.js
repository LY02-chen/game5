function drawFaceInfo() {
    const faceInfo = ["Front", "Top", "Left", "Bottom", "Right", "Back"];

    let width = (faceWidth - smallPadding * 4) / 3;

    for (let i in facePos) {        
        let thisX = (width + smallPadding) * facePos[i][0] + smallPadding + bigPadding;
        let thisY = (width + smallPadding) * facePos[i][1] + smallPadding + bigPadding;

        ctx.fillStyle = color["padding"];   
        ctx.fillRect(thisX - smallPadding, thisY - smallPadding, width + smallPadding * 2, width + smallPadding * 2);

        ctx.fillStyle = color["BG"];
        ctx.fillRect(thisX, thisY, width, width);

        ctx.font = `${width / 4}px Comic Sans MS`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = color["padding"];    
        ctx.fillText(faceInfo[i], thisX + width / 2, thisY + width / 2);
    }
}

function drawFace(faceIndex) {    
    let thisX = (faceWidth + bigPadding) * facePos[faceIndex][0] + bigPadding;
    let thisY = (faceWidth + bigPadding) * facePos[faceIndex][1] + bigPadding;

    ctx.fillStyle = color["padding"];
    ctx.fillRect(thisX, thisY, faceWidth, faceWidth);

    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            ctx.fillStyle = cubeColor[faceIndex][i][j];
            let x = (gridWidth + smallPadding) * i + smallPadding;
            let y = (gridWidth + smallPadding) * j + smallPadding;
            ctx.fillRect(thisX + x, thisY + y, gridWidth, gridWidth);
        }
    }
}

function drawCube() {
    for (let i in facePos) 
        drawFace(i);
}

function drawArrow(dir, face, pos) {
    const weightList = {
        "up": [[1 / 2, 1 / 7], [1 / 5, 3 / 7], 
               [3 / 5, 3 / 7], [3 / 5, 6 / 7],
               [2 / 5, 6 / 7], [2 / 5, 3 / 7], [4 / 5, 3 / 7]],
        "down": [[1 / 2, 6 / 7], [1 / 5, 4 / 7], 
                 [3 / 5, 4 / 7], [3 / 5, 1 / 7],
                 [2 / 5, 1 / 7], [2 / 5, 4 / 7], [4 / 5, 4 / 7]],
        "left": [[1 / 7, 1 / 2], [3 / 7, 1 / 5],
                 [3 / 7, 3 / 5], [6 / 7, 3 / 5],
                 [6 / 7, 2 / 5], [3 / 7, 2 / 5], [3 / 7, 4 / 5]],
        "right": [[6 / 7, 1 / 2], [4 / 7, 1 / 5],
                  [4 / 7, 3 / 5], [1 / 7, 3 / 5],
                  [1 / 7, 2 / 5], [4 / 7, 2 / 5], [4 / 7, 4 / 5]]
    };

    let weight = weightList[dir];

    let thisX = (faceWidth + bigPadding) * facePos[face][0] + bigPadding;
    let thisY = (faceWidth + bigPadding) * facePos[face][1] + bigPadding;

    let x = thisX + (gridWidth + smallPadding) * pos[0] + smallPadding;
    let y = thisY + (gridWidth + smallPadding) * pos[1] + smallPadding;

    ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
    ctx.beginPath();
    ctx.moveTo(x + gridWidth * weight[0][0], y + gridWidth * weight[0][1]);
    for (let i = 1; i < 7; i++) 
        ctx.lineTo(x + gridWidth * weight[i][0], y + gridWidth * weight[i][1]);
    ctx.closePath();
    ctx.fill();
}

function drawRotateArrow(dir, face) {
    let thisX = (faceWidth + bigPadding) * facePos[face][0] + bigPadding + faceWidth / 2;
    let thisY = (faceWidth + bigPadding) * facePos[face][1] + bigPadding + faceWidth / 2;

    ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
    ctx.beginPath();
    ctx.arc(thisX, thisY, faceWidth * 0.3, dir == "right" ? Math.PI : 0, Math.PI / 2, dir == "left");
    ctx.lineTo(thisX, thisY + faceWidth * 0.2);
    ctx.arc(thisX, thisY, faceWidth * 0.2, Math.PI / 2, dir == "right" ? Math.PI : 0, dir == "right");
    ctx.lineTo(thisX - faceWidth * 0.2, thisY);
    ctx.moveTo(thisX, thisY + faceWidth * 0.1);
    ctx.lineTo(thisX, thisY + faceWidth * 0.4);
    ctx.lineTo(thisX + faceWidth * 0.2 * (dir == "right" ? -1 : 1), thisY + faceWidth * 0.25);
    ctx.closePath();
    ctx.fill();
}