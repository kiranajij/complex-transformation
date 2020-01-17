class Complex {
  /*
  A class to act like complex number.
  */
  constructor(re, im) {
    /*
    the constructor takes two argument,
    re: real part of the complex number,
    im: imaginary part of the compelx number
    */

    this.re = re;
    this.im = im;
  }

  abs() {
    // return the absolute value
    return sqrt(this.re * this.re +
      this.im * this.im);
  }

  mag() {
    // same as "abs"
    return this.abs()
  }

  arg() {

    // return the argument of the complex number

    let re = this.re;
    let im = this.im;

    // handle 1/0 case, return PI/2 or -PI/2 accordingly
    if (this.re == 0) {
      if (this.im >= 0) return PI / 2;
      else return -PI / 2;
    }

    // otherwise, the absolutevalue of the angle
    let ang = abs(atan(this.im / float(this.re)));

    if (re >= 0 && im >= 0) {
      // quadrent 1
      return ang;
    } else if (re < 0 && im >= 0) {
      // quadrent 2
      return PI - ang;
    } else if (re >= 0 && im < 0) {
      // quadrent 4
      return -ang;
    } else if (re < 0 && im < 0) {
      // quadrent 3
      return -PI + ang;
    }
  }

  add(other) {
    // add this and other number and return the result
    return new Complex(this.re + other.re, this.im + other.im);
  }
  sub(other) {
    // substract this and the other number and return the result
    return new Complex(this.re - other.re, this.im - other.im);
  }
  mul(other) {
    // multiply this and other number and return
    let r = this.re * other.re - this.im * other.im;
    let i = this.re * other.im + this.im * other.re;
    return new Complex(r, i);
  }

  inv() {
    // return the inverse of this number

    // if z = 0, return null because no inverse exist
    if (this.re == 0 && this.im == 0) {
      return null;
    }

    // 1/z = z'/zz' = z'/|z|^2

    let mag = this.abs() ** 2;

    let r = this.re / mag;
    let i = -this.im / mag;

    return new Complex(r, i);
  }

  div(other) {
    // divide this with the other and return result
    return this.mul(other.inv());
  }

  lerp(other, frac) {
    // lerp the real and complex part separately
    // and return the number.
    let re = lerp(this.re, other.re, frac);
    let im = lerp(this.im, other.im, frac);
    return new Complex(re, im);
  }

  lerpPolar(other, frac) {
    // instead of lerping real and imaginary, this function lurps
    // between the magnitude and the argument of the numbers
    let m1 = this.mag(),
      m2 = other.mag();
    let a1 = this.arg(),
      a2 = other.arg();

    // if they are close, then instead of doing a full circle, take the anti-clockwise part
    if (a1 > a2) a2 += 2 * PI;

    let r = lerp(m1, m2, frac);
    let theta = lerp(a1, a2, frac);
    // print(theta);

    return Complex.fromPolar(r, theta);
  }

  toString(){
    let re = this.re.toFixed(2);
    let im = this.im.toFixed(2);

    return re + "+ " + im + "i";
  }

  exp(){
    let c1 = exp(this.re);
    let c2 = this.im;
    return Complex.fromPolar(c1, c2);
  }

  static fromPolar(r, theta) {
    // this function takes r and theta as input and
    // returns the complex number of the form
    // r.e^(i*theta)
    return new Complex(r * cos(theta), r * sin(theta));
  }
}

function f(z) {
  // the  function we are visualizing
  // f(z) = z**2 + 1
  return new Complex(z.mag(), 0);
}

function renderPoints(points, col, label) {
  strokeWeight(config.points.initialWidth);
  for (let p of points) {

    stroke(col);
    limits = config.limits
    let x, y
    x = map(p.re, -limits, limits, -width/2, width/2);
    y = map(p.im, -limits, limits, -width/2, width/2);

    point(x, -y);
    if (label) {

      // display the cartesian coordinates
      let a = p.re.toFixed(2);
      let b = p.im.toFixed(2);

      // polar form
      // let a = p.mag().toFixed(2);
      // let b = p.arg().toFixed(2);
      noStroke();
      text(a + "+i" + b,
        x + 5, -y);
    }
  }
}

function mousePressed() {
  // per mouse press, add the current point to the points array
  if (mouseInCanvas(mouseX, mouseY)){;
    let c = mapMouseToComplex();
    fillPoint(c);
  }
}

function fillPoint(z) {

  // function responsible for adding the point to the array
  // and also computed value of the point and reseting the
  // temp points array

  points.push(z);
  let nz = f(z);
  mappedPoints.push(nz);

  tempPoints = points.slice();
}

function autoFillPoints() {
  // auto fill the grid with points
  let n = width / 2 / config.spacing;
  print(n)
  let sp = config.limits / n;
  for (let i = 0; i < n+1; i++) {
    for (let j = 0; j < n+1; j++) {
      let x = i*sp;
      let y = j*sp;
      fillPoint(new Complex(x, y));
      fillPoint(new Complex(-x, y));
      fillPoint(new Complex(x, -y));
      fillPoint(new Complex(-x, -y));
    }
  }
}

function clearPoints(){

  // Clear all the points

  points = [];
  tempPoints = [];
  mappedPoints = [];

  config.autoFill = false;
  doms.autofill.checked = false;

}

function keyPressed(){

  if (key == 'c'){
    clearPoints();
    config.autoFill = false;
  } else if( key == 's') {
      saveCanvas(canv, 'frame', 'png');
  } else {
    let elem = document.getElementById("canvasSize");
    print(elem.value);
  }
}

function mapMouseToComplex(){
  let limits = config.limits;
  let cpx = map(mouseX, 0, width, -limits, limits);
  let cpy = map(mouseY, 0, height, limits, -limits);
  return new Complex(cpx, cpy);
}
