var radius;
var numPoints;
var angle;
var blobObj = []; // array of objects that holds blob attributes
var yellow;
var green;
var orange;
function setup() {
    createCanvas(windowWidth, windowHeight);

    // Initialize colors
    yellow = color(214, 195, 39);
    green = color(0, 148, 40);
    orange = color(224, 123, 39);

    textFont("Oranienbaum");
    radius = 200;
    numPoints = 12;
    angle = 360 / numPoints;
    angleMode(DEGREES);
    frameRate(10);

    blurCircle = createGraphics(width, height);
    blob = createGraphics(width, height);
}

function drawBlob(blobColor) {
    blob.noStroke();
    blob.fill(blobColor);
    blob.push();
    blob.translate(width * 0.5, height * 0.5);
    blob.beginShape();
    blobObj = [];
    for (let i = 0; i < numPoints; i++) {
        let randRadius = min(radius, radius+random(-50, 50));
        blobObj.push({
         "radius": randRadius,
         "x": randRadius * cos(angle * i),
         "y": randRadius * sin(angle * i)
        });
        blob.curveVertex(blobObj[i].x, blobObj[i].y);
       }
    blob.curveVertex(blobObj[0].x, blobObj[0].y);
    blob.curveVertex(blobObj[1].x, blobObj[1].y);
    blob.curveVertex(blobObj[2].x, blobObj[2].y);
    blob.endShape();
    blob.pop();
    blob.filter(BLUR, 5);
}

function drawCircle() {
    blurCircle.push();
    blurCircle.translate(width * 0.5 - 100, height * 0.5 - 100);
    blurCircle.noStroke();
    blurCircle.fill(orange);
    blurCircle.circle(0, 0, radius);
    blurCircle.pop();
    blurCircle.filter(BLUR, 20);
}

function draw() {
    background(green);    

    // Draw blob
    drawBlob(yellow);
    drawBlob(green);

    // Draw orange circle
    drawCircle();

    image(blob, 0, 0);
    image(blurCircle, 0, 0);

    
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

}