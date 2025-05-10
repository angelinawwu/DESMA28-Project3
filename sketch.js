var radius, numPoints, angle;
var blobObj = [];
var nextBlobObj = [];
var yellow, green, orange;
var updateTargets = true;
var lerpAmount = 0.1;
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

    if (updateTargets || blobObj.length === 0) {
        nextBlobObj = [];
        for (let i=0; i<numPoints; i++) {
            let randRadius = min(radius, radius+random(-50, 50));
            nextBlobObj.push({
                "radius": randRadius,
                "x": randRadius * cos(angle * i),
                "y": randRadius * sin(angle * i)
            });
        }
        updateTargets = false;

        if (blobObj.length === 0) {
            blobObj = nextBlobObj;
        }
    }

    for (let i = 0; i < numPoints; i++) {
        // Create positions if needed
    if (!blobObj[i]) {
        blobObj[i] = nextBlobObj[i];
    }
    
    // Interpolate toward targets
    blobObj[i].x = lerp(blobObj[i].x, nextBlobObj[i].x, lerpAmount);
    blobObj[i].y = lerp(blobObj[i].y, nextBlobObj[i].y, lerpAmount);
    
    // Draw vertices
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
    
    if (frameCount % 20 === 0) {
        updateTargets = true;
    }

    blob.clear();
    blurCircle.clear();

    // Draw blob
    drawBlob(yellow);

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