function createGrid() {
  strokeWeight(0.7);
  stroke(0, 255);
  
  // creating main grids
  line(-width / 2, 0, width / 2, 0);
  line(0, height / 2, 0, -height / 2);

  strokeWeight(0.1);
  stroke(0, 150);
  
  let req = width / spacing / 2;
  
  for (let i = 1; i < req; i++) {
    
    // temporary variable
    let f = spacing*i;
    
    // horizontal lines
    line(-width / 2, -f, width / 2, -f);
    line(-width / 2, f, width / 2, f);
    
    // vertical lines
    line(f, height / 2, f, -height / 2);
    line(-f, height / 2, -f, -height / 2);

  }
}