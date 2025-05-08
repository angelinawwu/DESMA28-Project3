var radius;
var res;
var angle;
var blobObj = []; // array of objects that holds blob attributes
var yellow;
var green;

function setup() {
    createCanvas(windowWidth, windowHeight);
    // Initialize colors inside setup
    yellow = color(243, 255, 124);
    green = color(6, 198, 1);
    textFont("Oranienbaum");
    radius = 200; // radius of the circular path
    res = 12; // the number of points 
    angle = 360 / res; // angular distance between each point
    angleMode(DEGREES); // enable the Degree mode not to make calculations easier.
    background(255); // background color of the window
}

function draw() {
    background(green);

    console.log("yes");
    // Draw circle
    push();
    translate(width * 0.5 - 200, height * 0.5 - 200);
    noStroke();
    fill(230, 120, 60);
    circle(0, 0, radius);
    filter(BLUR, 40);
    pop();

    // Draw blob
    noStroke();
    fill(yellow);
    push();
    translate(width * 0.5, height * 0.5);
    beginShape();
    blobObj = [];
    for (var i = 0; i < res; i++) {
        var randRadius = min(radius, radius+random(-50, 50));
        blobObj.push({
         "radius": randRadius,
         "x": randRadius * cos(angle * i),
         "y": randRadius * sin(angle * i)
        });
        circle(blobObj[i].x, blobObj[i].y, 0);
        curveVertex(blobObj[i].x, blobObj[i].y); // add points to the custom shape
       }
    curveVertex(blobObj[0].x, blobObj[0].y);
    curveVertex(blobObj[1].x, blobObj[1].y);
    curveVertex(blobObj[2].x, blobObj[2].y);
    endShape();
    filter(BLUR, 5);
    pop();
    
    // Text
    push();
    fill(yellow);
    stroke(0);
    strokeWeight(2);
    textSize(50);
    textFont("Oranienbaum");
    textAlign(CENTER);
    text("The mitochondria is the \npowerhouse of the cell", width/2, 100);
    pop();

    noLoop();
}