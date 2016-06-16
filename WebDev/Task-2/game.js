function jav(){

  var e,score = 0,pause = 1,speed = 1,yspeed = 1;
  //yspeed is speed along y axis
  var reqid,al = 0,frames = 1,speedcapsule = 3,toggleinvisible = 0;
  background_sound = new sound("backmusic.mp3");
  explosion = new sound("explosion.mp3");

  var arr = [],t = 1;   //t is used to cycle the images for running of flash
  document.getElementById('message').innerHTML = 'Press I for instructions';



  for (var i = 1; i <= 300; i++) {
    arr.push(0);
  }  // pause is 1 if it's pause
  //reqid is the requestID used and al tells if game over alert message has been
  // given or not, frames is to control the increase of score
  //speedcapsule plays the role of lives
  //arr is array of key checker
  var cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame ||
  window.webkitCancelAnimationFrame;
  window.addEventListener('keydown', keycheck);
  function keycheck(e){
    arr[e.keyCode] = 1;
                                 //arr is a global variable that can
    //be used anywhere, e is local and and has the property keyCode arr stores e's
    //keyCode
  }
  window.addEventListener('keyup', keycheck2);
  function keycheck2(e){
    if(arr[80]){
        arr[80] = 0;
        location.reload();
        }
    if(arr[73]){
      arr[73] = 0;
      window.location.href = "Instructions.html";
    }
    if(e != 13 )
      arr[e.keyCode] = 0;
    }
  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");

  function createElements(x,y,w,h,color,type){   //this is the main object
    //it will draw the images and clear them using it's functions it stores
    // the co-ordinates of all images, images are the instances of this object
    var i=0;
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
    this.dx = 0;
    this.dy = 0;
    this.srcX = 0;
    this.srcY = 0;
    this.srcW = 58;
    this.srcH = 40;
    var  base_image1 = new Image();
    this.draw = function() {
      ctx.drawImage(base_image1,this.x,this.y,this.width,this.height );
    }
    this.drawflash = function() {
      if(toggleinvisible !=0 && Math.floor((toggleinvisible/10))%2){
        toggleinvisible++;
        this.srcX = 0;
        this.srcY =0;
        //alert(23);
        if(toggleinvisible >= 250){
          toggleinvisible = 0;
          this.srcY = 0;
        }
      }
      else if(toggleinvisible !=0 && Math.floor((toggleinvisible/10))%2 == 0){
        toggleinvisible++;
        this.srcX = 0;
        this.srcY = 80;//alert(toggleinvisible);
        if(toggleinvisible >= 250){
          toggleinvisible = 0;
          this.srcY = 0;
          }
      }
      if(pause != 1 && toggleinvisible == 0){
        this.srcX += 58;
        this.srcY = 0;
      }
      if(this.srcX == 696 && toggleinvisible == 0){
        this.srcX = 0;
        this.srcY = 0;
      }
      ctx.drawImage(base_image1,this.srcX,this.srcY,this.srcW,this.srcH,
        this.x,this.y,this.width,this.height );
    }
    this.update = function() {

        this.x += this.dx;
        this.y += this.dy;

        if(type == "flash") {
          t++;
          //toggleinvisible = 0;
          base_image1 = new Image();

          base_image1.src = "ufo.gif";

          base_image1.addEventListener('load', clearImage1);
          // the clearing should take place before the load
          // because there should be no gap between clear and draw, otherwise it's blank page
          function clearImage1(){
            ctx.clearRect(0, 0, canvas.width, canvas.height);
          }
       }
       else if(type != "environment") {
         base_image1 = new Image();
         base_image1.src = "obstacle.png";
         base_image1.addEventListener('load', clearImage1);
         function clearImage1(){
           ctx.clearRect(0, 0, canvas.width, canvas.height);
         }
      }
      else {

        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    this.crashWith = function(obj2) {
      var myleft = this.x;
      var myright = this.x + (this.width);
      var mytop = this.y;
      var mybottom = this.y + (this.height);
      var otherleft = obj2.x;
      var otherright = obj2.x + (obj2.width);
      var othertop = obj2.y;
      var otherbottom = obj2.y + (obj2.height);
      var crash = true;
      if ((mybottom -2< othertop) || (mytop > otherbottom) ||
      (myright-4 < otherleft) || (myleft > otherright)) {
          crash = false;
      }
      return crash;
    }
  }

//  var environment = new createElements(0,0,100,100,"#000000","environment");

  var flash = new createElements(20,85,20,20,"green","flash");
  var obstacle1 = new createElements(300,randomIntFromInterval(0,130),10,randomIntFromInterval(80,100)
  ,"green","obstacle");
  var obstacle2 = new createElements(600,randomIntFromInterval(0,130),10,randomIntFromInterval(80,100)
  ,"green","obstacle");
  var obstacle3 = new createElements(800,randomIntFromInterval(0,130),10,randomIntFromInterval(80,100)
  ,"green","obstacle");

  //the main thing to remember is that we should clear before we draw

  flash.update();
  obstacle1.update();
  obstacle2.update();
  obstacle3.update();

  flash.drawflash();
  obstacle1.draw();
  obstacle2.draw();
  obstacle3.draw();
  obstacle1.dx = -0.5;
  obstacle2.dx = -0.5;
  obstacle3.dx = -0.5;

  document.getElementById('message2').innerHTML = "Score: "+ String(score/10) +
  " Speed Capsule: "+String(speedcapsule);
  function stopAnimation() {
    // use the requestID to cancel the requestAnimationFrame call
    cancelAnimationFrame(reqAnimFrame);
  }
  function upd(){
    if( arr[13] == 1 && pause == 0){
      pause = 1;
      document.getElementById('message').innerHTML = 'Press I for instructions';
      arr[13] =0;
      background_sound.stop();
    }
    else if(arr[13] == 1 && pause == 1){
      document.getElementById('message').innerHTML = 'Press I for instructions';
      pause = 0;
      arr[13] = 0;
      background_sound.play();
    }
    if(!pause){
      if(Math.floor(score) == score && score >= 499.9)
      if(Math.floor(score) % 500 == 0 && frames ==9 )
        speedcapsule++;
      frames++;
      if(frames % 10 == 0) {
       score += 1;
    }
      if(frames == 500) {
        frames = 1;       //frames becomes 1 again to prevent large values
        obstacle1.dx -= 0.1;
        obstacle2.dx -= 0.1;
        obstacle3.dx -= 0.1;
      }

    if(obstacle1.x + 80 <= -20){
      obstacle1.x = 320;
      obstacle1.y = randomIntFromInterval(0,130);
      obstacle1.width = randomIntFromInterval(20,80);
    }
    if(obstacle1.x + obstacle3.width - obstacle3.x <= 50 && obstacle1.x - obstacle3.x >= 0){
        obstacle1.x += 50;

    }          //any obstacle that goes to the left of screen is refreshed

    if(obstacle2.x + 80 <= -20){
      obstacle2.x = 320;
      obstacle2.y = randomIntFromInterval(0,130);
      obstacle2.width = randomIntFromInterval(20,80);
    }
    if(obstacle2.x + obstacle3.width - obstacle1.x <= 50 && obstacle2.x - obstacle1.x >= 0){
        obstacle2.x += 50;

    }

    if(obstacle2.x + 80 <= -20){
      obstacle2.x = 320;
      obstacle2.y = randomIntFromInterval(0,130);
      obstacle2.width = randomIntFromInterval(20,80);
    }
    if(obstacle3.x + obstacle3.width - obstacle2.x <= 50 && obstacle3.x - obstacle2.x >= 0){
        obstacle3.x += 50;

    }



    if(arr[38] == 1 && flash.y > 5){
      yspeed -= 0.1;
    }
    if(arr[40] == 1 && flash.y < 125){
      yspeed += 0.1;
    }
    if(flash.y > 0 && yspeed < 0 )
      flash.y += yspeed;      // here up and down provide acceleratin not Speed
    if(flash.y < 130 && yspeed > 0 )
      flash.y += yspeed;
    if( flash.y <= 0 || flash.y >= 130)
      yspeed = -yspeed/2  ;
      // object is almost never at rest

      flash.update();
      obstacle1.update();
      obstacle2.update();
      obstacle3.update();
    }
    flash.drawflash();
    obstacle1.draw();
    obstacle2.draw();
    obstacle3.draw();


    document.getElementById('message2').innerHTML = "Score: "+ String(score/10) +
    " Speed Capsule: "+String(speedcapsule);

  }
//requeset animation frame is better than setInterval
  function animate() {

    reqAnimFrame = window.RequestAnimationFrame    ||
                window.webkitRequestAnimationFrame ||
                window.RequestAnimationFrame     ||
                window.RequestAnimationFrame
                ;


    reqid = reqAnimFrame(animate);

  upd();
  }
  animate();
  setInterval(function(){
       //speed upon collision is made a smaller negative value

    if(toggleinvisible == 0){
      if((flash.crashWith(obstacle1) ||flash.crashWith(obstacle2) ||
      flash.crashWith(obstacle3)) && speedcapsule == 0)
        stopAnimation();
      else if((flash.crashWith(obstacle1) ||flash.crashWith(obstacle2) ||
      flash.crashWith(obstacle3)) && speedcapsule > 0){
        //capsule_used_music.play();
        //pause = 1;
        toggleinvisible = 1;
        //background_sound.stop();

        speedcapsule--;
        if(flash.crashWith(obstacle1.x))
        obstacle1.x -= flash.width + obstacle1.width;
        if(flash.crashWith(obstacle2.x))
        obstacle2.x -= flash.width + obstacle2.width;
        if(flash.crashWith(obstacle3.x))
        obstacle3.x -= flash.width + obstacle3.width;
        arr[37] = arr[39] =0;

        flash.drawflash();
        obstacle1.draw();
        obstacle2.draw();
        obstacle3.draw();

      }
    }
  }
  , 8);


  function stopAnimation(){

    cancelAnimationFrame(reqid);
    explode = new Image();
    explode.src = "blast.png";
    explode.addEventListener('load', drawexplosion);
    function drawexplosion(){
    ctx.drawImage(explode,flash.x,flash.y,flash.width,flash.height );
    }

    //flash.drawflash();
    obstacle1.draw();
    obstacle2.draw();
    obstacle3.draw();
    document.getElementById('message2').innerHTML = "Score: "+ String(score/10) +
    " Speed Capsule: "+String(speedcapsule);


    if (!al){
      al=1;
      background_sound.stop();
      explosion.play();
      settimeout(explosion.stop(),5000);
      document.getElementById('message').innerHTML = 'Game Over! Press P to play again';
    }
  }

}
