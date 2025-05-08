var rad;
var res;
var angle;
var blobObj = []; // array of objects that holds blob attributes

function setup() {
    createCanvas(windowWidth, windowHeight);
    textFont("Oranienbaum");
    rad = 100; // radius of the circular path
    res = 10; // the number of points 
    angle = 360 / res; // angular distance between each point
    angleMode(DEGREES); // enable the Degree mode not to make calculations easier.
    background(255); // background color of the window
    noLoop(); // Since we don't create and animation, we can disable the loop function
}

function draw() {
    background(6, 198, 1);
    noStroke();
    fill(243, 255, 144);
    push();
    translate(width * 0.5, height * 0.5);
    beginShape();
    for (var i = 0; i < res; i++) {
        var randRad = min(rad, rad+random(-20, 20));
        blobObj.push({
         "rad": randRad,
         "x": randRad * cos(angle * i),
         "y": randRad * sin(angle * i)
        });
        circle(blobObj[i].x, blobObj[i].y, 0);
        curveVertex(blobObj[i].x, blobObj[i].y); // add points to the custom shape
       }
    curveVertex(blobObj[0].x, blobObj[0].y);
    curveVertex(blobObj[1].x, blobObj[1].y);
    curveVertex(blobObj[2].x, blobObj[2].y);
    endShape();
    pop();
    
    textSize(50);
    textFont("Oranienbaum");
    text("The mitochondria is the powerhouse of the cell", 210, 100);

    filter(BLUR, 1);
}