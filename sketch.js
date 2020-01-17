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
  lerp: "polar",
  autoFill: true,
  canvasSize: 500,
  spacing: 10,
  limits: 1,
  animationSpeed: 0.1,
  points: null
}

let doms = {
  autofill: null,
  currentNumber: null
}

let canv;

function setup() {
  canv = createCanvas(config.canvasSize, config.canvasSize);

  // if set autofill, call autoFillPoints()
  if (config.autoFill){
    autoFillPoints();
  }

  config.points = {
    initialColor: color(0, 150),
    finalColor: color(200, 10, 10, 150),
    initialLabel: true,
    finalLabel: false,
    initialWidth: 6,
    finalWidth: 6
  }

  doms.autofill = document.getElementById("autofill");
  doms.autofill.checked = config.autoFill;
  doms.currentNumber = document.getElementById("currentNumber");
  print(doms.currentNumber);

  let z = new Complex(0, PI);
  print(z.exp());

}

function draw() {

  // setting up canvas
  background(220);
  translate(width/2, height/2);

  // adding the grid
  createGrid();

  // changing the current number paragraph
  doms.currentNumber.innerHTML = mapMouseToComplex().toString();
  // print(mapMouseToComplex().toString());

  // render the points if autofill is not set
  if (!config.autoFill){

    let col = config.points.initialColor;
    let isLabel = config.points.initialLabel;

    renderPoints(points, col, isLabel);
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
  let col = config.points.finalColor;
  let isLabel = config.points.finalLabel;
  renderPoints(tempPoints, col, isLabel);

}
