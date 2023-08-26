
scoreLeftWrist = 0;

leftWristX = 0;
leftWristY = 0;

rightWristX = 0;
rightWristY = 0;

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function gotPoses(results) {
    if (results.length>0) {
        console.log(results);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWrist X, Y =",leftWristX, leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWrist X, Y =",rightWristX, rightWristY);

        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("scoreLeftWrist ="+ scoreLeftWrist);
    }
}

function modelLoaded() {
    console.log("poseNet is loaded");
}

function draw() {
    image(video, 0, 0, 600, 500);

    fill("lightblue");
    stroke("black");

    if (scoreLeftWrist > 0.2) {
        circle(leftWristX, leftWristY, 20);

    innNumberleftwristY = Number(leftWristY);
    remove_decimal = floor(innNumberleftwristY);
    volume = remove_decimal/500;
    document.getElementById("volume").innerHTML = "Volume:"+ volume;
    song.setVolume(volume);
    }


}



song = "";
function preload() {
    song = loadSound("music.mp3");
}

function play() {
    song.play();

    song.setVolume(1);
    song.rate(2.5);
}