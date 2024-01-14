const fs = require("fs");

const FILENAME = "sample.txt";
const data = fs.readFileSync(FILENAME, "utf8");

const grid = assembleGrid(data);

const TOTALROWS = grid.length;
const TOTALCOLUMNS = grid[0].length;
const TOTALCYCLES = 1;

let totalMass = 0;

for (let cycle = 0; cycle < TOTALCYCLES; cycle++) {
  tiltNorth;
}

function tiltNorth(grid) {
  for (let row = 0; row < TOTALROWS; row++) {
    let roundCount = 0;
    for (let row = 0; row < TOTALROWS; row++) {
      if (currentSpace == "O") {
        roundCount++;
      } else if (currentSpace == ".") {
        continue;
      } else if (currentSpace == "#") {
        for (let space = 0; space < roundCount; rock++){
          grid[rock][col] = 
        }
      } else {
        // edge of grid hit
      }
    }
  }
}


function printGrid(grid) {
  for (let i = 0; i < grid.length; i++) {
    console.log(grid[i].join().replaceAll(",", ""));
  }
  console.log(`----------------------------`);
  console.log("\n\n");
}
