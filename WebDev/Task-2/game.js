function jav(){

  var e,ev,space = 0,score = 0,pause = 1;
  var reqid,al = 0,frames = 1;   // pause is 1 if it's pause
  //reqid is the requestID used and al tells if game over alert message has been
  // given or not, frames is to control the increase of score
  var cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame ||
  window.webkitCancelAnimationFrame;
  window.addEventListener('keydown', keycheck);
  function keycheck(e){
    ev = e.keyCode;                                //ev is a global variable that can
    //be used anywhere, e is local and and has the property keyCode ev stores e's
    //keyCode
  }
  window.addEventListener('keyup', keycheck2);
  function keycheck2(e){
    ev = 0;                                //ev is a global variable that can
    //be used anywhere, e is local and and has the property keyCode ev stores e's
    //keyCode
  }
  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");

  function createElements(x,y,w,h,color,type){   //this is the main object
    //it will draw the images and clear them using it's functions it stores
    // the co-ordinates of all images, images are the instances of this object

    var i=0;
    this.x=x;
    this.y=y;
    this.width=w;
    this.height=h;
    this.dx=0;
    this.dy=0;
    var  base_image1 = new Image();
    this.draw = function() {
      ctx.drawImage(base_image1,this.x,this.y,this.width,this.height );
    }
    this.update = function() {

        //var that = this;    //to ensure this belongs to createElements and not drawImage1
        this.x += this.dx;
        this.y += this.dy;

        if(type != "environment") {
          base_image1 = new Image();
          base_image1.src = "obstacle.jpg";
          base_image1.addEventListener('load', clearImage1);
          // the clearing should take place before the load
          // because there should be no gap between clear and draw, otherwise it's blank page
          function clearImage1(){
            ctx.clearRect(0, 0, canvas.width, canvas.height);
          }
       }
      else {

        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    this.crashWith = function(otherobj) {
      var myleft = this.x;
      var myright = this.x + (this.width);
      var mytop = this.y;
      var mybottom = this.y + (this.height);
      var otherleft = otherobj.x;
      var otherright = otherobj.x + (otherobj.width);
      var othertop = otherobj.y;
      var otherbottom = otherobj.y + (otherobj.height);
      var crash = true;
      if ((mybottom -2< othertop) || (mytop > otherbottom) ||
      (myright-4 < otherleft) || (myleft > otherright)) {
          crash = false;
      }
      return crash;
    }
  }

//  var environment = new createElements(0,0,100,100,"#000000","environment");
  var flash = new createElements(100,50,10,10,"green","flash");
  var obstacle = new createElements(400,50,10,10,"green","obstacle");

  //myVar = setInterval(upd, 8);
  //the main thing to remember is that we should clear before we draw

  flash.update();
  obstacle.update();
  flash.draw();
  obstacle.draw();
  obstacle.dx = -0.5;
  ctx.fillText("Score: "+String(score/10),100,70);

  function stopAnimation() {
    // use the requestID to cancel the requestAnimationFrame call
    cancelAnimationFrame(reqAnimFrame);
  }
  function upd(){
    if( ev == 13 && pause == 0){
      ev = 0;
      pause = 1;
    }
    else if(ev == 13 && pause == 1){
      ev = 0;
      pause = 0;
    }
    if(!pause){
      frames++;
      if(frames % 10 == 0){
       score += 1;
       frames = 1;   //frames becomes 0 again to prevent large values
    }
    if(obstacle.x <= -20)          //any obstacle that goes to the left of screen is refreshed
      obstacle.x =400;
    //space will tell how much of the jump is over, space =0 means jump not started
    // otherwise it's on the way, now space < 40 means upward jump and space > 40 means
    // it's downward jump
    if(ev == 32 && space == 0) {
      space = 1;
      ev = 0;
    }
    if(space > 0 && space < 40) {
      space++;
      flash.dy = -0.7;
    }
    else if (space >= 40 && space < 79) {
      space++;
      flash.dy = 0.7;
    }
    else {
      ev = 0;
      space = 0;
      flash.dy = 0;   //speed is 0 when jump is completed
    }

      flash.update();
      obstacle.update();
    }
    flash.draw();
    obstacle.draw();
    ctx.fillText("Score: "+String(score/10),100,70);


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
    if(flash.crashWith(obstacle))
      stopAnimation(); }
      , 10);

  function stopAnimation(){

    cancelAnimationFrame(reqid);
    reqid = undefined;

    flash.draw();
    obstacle.draw();
    ctx.fillText("Score: "+String(score/10),100,70);
    if (!al){
      al=1;
      alert("Game Over! Your score is: " + score/10);
    }
  }

}
