document.getElementById("newgame").onclick = newGame;

document.getElementById("random").onclick = function(event) {
    const dir = ["xp", "xn", "yp", "yn", "zp", "zn"];
    const rand = (n) => Math.floor(Math.random() * n)

    for (let i = 0; i < gridSize * 15; i++) 
        rotateFace(dir[rand(6)], rand(gridSize));
};

document.getElementById("higher").onclick = function(event) {
    gridSize++;
    newGame();
};

document.getElementById("lower").onclick = function(event) {
    if (gridSize == 2) {
        alert("The size must be greater than one.");
        return;
    }
    gridSize--;
    newGame();
};