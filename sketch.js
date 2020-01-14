/* variables to store points */
let points = [];
let mappedPoints = [];
let tempPoints = [];

// other required variables
// let canvSize = 800;
// let spacing = 20;
// let limits = 2;

/*
if autofill set true, all the inersections will be a new point,
otherwise, user can enter new points
*/
// let autoFill = true;

let config =
{
  lerp: "linear",
  autoFill: true,
  canvasSize: 500,
  spacing: 10,
  limits: 1,
  animationSpeed: 0.1
}

let canv;

function setup() {
  canv = createCanvas(config.canvasSize, config.canvasSize);

  // if set autofill, call autoFillPoints()
  if (config.autoFill){
    autoFillPoints();
  }

  let cb_autofill = document.getElementById("autofill");
  cb_autofill.checked = config.autoFill;

}

function draw() {

  // setting up canvas
  background(220);
  translate(width/2, height/2);

  // adding the grid
  createGrid();

  // render the points if autofill is not set
  if (!config.autoFill){
    renderPoints(points, color(0, 150), true);
  }

  // lerp the points
  let sp = config.animationSpeed;
  if (config.lerp === "polar"){
    for (let i=0; i<points.length; i++){
      let np = tempPoints[i].lerpPolar(mappedPoints[i], sp);
      tempPoints[i] = np;
    }
  } else if (config.lerp ==="linear"){
    for (let i=0; i<points.length; i++){
      let np = tempPoints[i].lerp(mappedPoints[i], sp);
      tempPoints[i] = np;
    }
  }

  // render the lerped points
  renderPoints(tempPoints, color(200, 10, 10, 150), false);

}
