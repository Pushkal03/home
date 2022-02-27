status = "";
img = "";
objects = [];
objectDetector = "";

function preload() {
    img = loadImage('drawingroom.jpg');
}

function setup(){
    canvas = createCanvas(640,420);
    canvas.center();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting objects";
}



function modelLoaded(){
    console.log("modelLoaded!");
    status = true;
    objectDetector.detect(img, gotResults);
}

function gotResults(error,results){
    if(error){
        console.log(error);
    }

    console.log(results);
    objects = results;
}

function draw(){
    image(img, 0, 0, 540,640);

    if(status!=""){
        for(i=0;i>objects.length;i++){
            percent = floor(objects[i].confidence);
            text(objects[i].label+""+percent+"%",objects[i].x+15,objects[i].y+15);
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
        }
    }
}