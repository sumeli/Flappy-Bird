var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

//load the images
var bird = new Image();
var bg = new Image();
var fg = new Image();
var pipeNorth = new Image();
var pipeSouth = new Image();

//loading the images
bird.src = "images/bird.png";
bg.src = "images/bg.png";
fg.src = "images/fg.png";
pipeNorth.src = "images/pipeNorth.png";
pipeSouth.src = "images/pipeSouth.png";

//some important variables 
var gap = 350;
var constant = pipeNorth.height+gap;
var bx = 10; //bird in x position
var by = 150; //bird in y position
var gravity = 1.5;
var score = 0;

//audio files
var fly = new Audio();
var scor = new Audio();

//adding the sounds
fly.src = "sounds/sounds_fly.mp3";
scor.src = "sounds/sounds_score.mp3";

//on key down
document.addEventListener("keydown", moveUp);
function moveUp(){
    by -= 25;
    fly.play();
}

//pipe coordinates
var pipe = [];
pipe[0] = {
    x : cvs.width,
    y : 0
};

//draw images
function draw(){
    ctx.drawImage(bg,0,0);

    for(var i=0; i<pipe.length; i++){
    ctx.drawImage(pipeNorth, pipe[i].x, pipe[i].y);
    ctx.drawImage(pipeSouth, pipe[i].x, pipe[i].y+constant);

    pipe[i].x--;

    if(pipe[i].x == 140){ //130 is the distance between the pipes
        pipe.push({
            x : cvs.width,
            y : Math.floor(Math.random()*pipeNorth.height) - pipeNorth.height
        });
    }

    //detect collision
    if(bx + bird.width >= pipe[i].x && bx <= pipe[i].x + pipeNorth.width 
        && (by <= pipe[i].y + pipeNorth.height || by + bird.height >= pipe[i].y + constant)
        || by + bird.height >= cvs.height - fg.height){
            location.reload(); //reload the page on collision
        }

        if(pipe[i].x == 5){
            score++;
            scor.play();
        }
    
    
    }
    ctx.drawImage(fg, 0, cvs.height - fg.height);
    ctx.drawImage(bird, bx, by);
    by += gravity;

    requestAnimationFrame(draw);

    ctx.fillStyle = "#000";
    ctx.font = "20px Verdana";
    ctx.fillText("Score : "+score, 10,cvs.height - 20);

}
draw();