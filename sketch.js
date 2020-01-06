/* variables to store points */
let points = [];
let mappedPoints = [];
let tempPoints = [];

// other required variables
let canvSize = 800;
let spacing = 20;

/*
if autofill set true, all the inersections will be a new point,
otherwise, user can enter new points
*/
let autoFill = false;


function setup() {
  createCanvas(canvSize, canvSize);
  
  // if set autofill, call autoFillPoints()
  if (autoFill){
    autoFillPoints();
  }
}

function draw() {
  
  // setting up canvas
  background(220);
  translate(width/2, height/2);
  
  // adding the grid
  createGrid();
  
  // render the points if autofill is not set
  if (!autoFill){
    renderPoints(points, color(0, 150), true);
  }
  
  // lerp the points
  for (let i=0; i<points.length; i++){
    let np = tempPoints[i].lerpPolar(mappedPoints[i], 0.1);
    tempPoints[i] = np;
  }
  
  // render the lerped points
  renderPoints(tempPoints, color(200, 10, 10, 150), false);
  
}
