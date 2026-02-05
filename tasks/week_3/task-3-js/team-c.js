setup_C();
/** THEME: SERENITY  */
function setup_C() {
  console.log("in c");
  /**************************************************** */
  //get the buttons
  activateButtons(`#TEAM_C`, "ani_canvC",aniA,aniB,aniC,aniD);

  /**************** ANI A ************************************ */
  /** PUT ALL YOUR CODE FOR INTERACTIVE PATTERN A INSIDE HERE */
  /**************** ANI A ************************************ */
  /**************** TASK *******************************************
   * YOU CAN USE ALL NOTES --- and see my examples in team-h.js for inspiration and possibly help:)
   * 1: create a creative, visual pattern using text, divs as shapes, images ...
   * 2: add in mouseclick event listener(s) somewhere to make the sketch interactive
   *
   * NOTE::: PLEASE::: if you add any custom css PLEASE use the style.css and prefix any class names with your team label
   * i.e. you want to create a custom div class and you are in "Team_A" then call your class TEAM_A_ANI_A_Div -
   * this is so that your styles are not overriden by other teams.
   * NOTE::: All your code is to be added here inside this function  -
   * remember you can define other functions inside....
   * Do not change any code above or the HTML markup.
   * **/

  function aniA(parentCanvas) {
    console.log("in ani-A -teamC");
  }
  
  


  /****************ANI B ************************************ */
  /** PUT ALL YOUR CODE FOR INTERACTIVE PATTERN B INSIDE HERE */
  /****************ANI B ************************************ */
  /**************** TASK *******************************************
   * YOU CAN USE ALL NOTES --- and see my examples in team-h.js for inspiration and possibly help:).
   * 1: create a creatve, visual pattern using text, divs as shapes, images ... 
   * 2: add in mouseover event listener(s) somewhere to make the sketch interactive
   *
   * NOTE::: PLEASE::: if you add any custom css PLEASE use the style.css and prefix any class names with your team label
   * i.e. you want to create a custom div class and you are in "Team_A" then call your class TEAM_A_ANI_A_Div -
   * this is so that your styles are not overriden by other teams.
   * NOTE::: All your code is to be added here inside this function -
   * remember you can define other functions inside....
   * Do not change any code above or the HTML markup.
   * **/

  function aniB(parentCanvas) {
      console.log("in ani-B -teamC");
    
  }
  /****************ANI C ************************************ */
  /** PUT ALL YOUR CODE FOR INTERACTIVE PATTERN C INSIDE HERE */
  /****************ANI C************************************ */
  /**************** TASK *******************************************
   * YOU CAN USE ALL NOTES --- and see my examples in team-h.js for inspiration and possibly help:)
   * 1: use the PROVIDED keyup/down callbacks `windowKeyDownRef` and/or `windowKeyUpnRef` to handle keyboard events
   * 2: create an interactive pattern/sketch based on keyboard input. Anything goes.
   * 
   * NOTE::: PLEASE::: if you add any custom css PLEASE use the style.css and prefix any class names with your team label
   * i.e. you want to create a custom div class and you are in "Team_A" then call your class TEAM_A_ANI_A_Div -
   * this is so that your styles are not overriden by other teams.
   * NOTE::: All your code is to be added here inside this function -
   * remember you can define other functions inside....
   * Do not change any code above or the HTML markup.
   * **/

  /* TASK: make an interactive pattern .. colors, shapes, sizes, text, images....
   * using  ONLY key down and/or keyup -- any keys::
   */

  function aniC(parentCanvas) {
      console.log("in ani-C -teamC");

    /*** THIS IS THE CALLBACK FOR KEY DOWN (* DO NOT CHANGE THE NAME *..) */
    windowKeyDownRef = function (e) {
      //code for key down in here
      console.log(e);
      console.log("c-down");
      if (e.code === "Space") holdingSpace = true;
    };

    /*** THIS IS THE CALLBACK FOR KEY UP (*DO NOT CHANGE THE NAME..) */
    windowKeyUpRef = function (e) {
      console.log(e);
      console.log("c-up");
      if (e.code === "Space") holdingSpace = false;
    };
    //DO NOT REMOVE
    window.addEventListener("keydown", windowKeyDownRef);
    window.addEventListener("keyup", windowKeyUpRef);

    drawScene();
    animate();
  }


  let waves;

  function drawScene(){
    var c = document.getElementById("ani_canvC_C");
    c.classList.add("TEAM_C_SKY");
    c.style.display = "block";
    
    var sand = document.createElement('div');
    sand.classList.add("TEAM_C_SAND");
    c.appendChild(sand);

    var sun = document.createElement('div');
    sun.classList.add("TEAM_C_SUN");
    c.appendChild(sun);

    var dark = document.createElement('div');
    dark.classList.add("TEAM_C_DARK");
    c.appendChild(dark);

    var med = document.createElement('div');
    med.classList.add("TEAM_C_MED");
    c.appendChild(med);

    var light = document.createElement('div');
    light.classList.add("TEAM_C_LIGHT");
    c.appendChild(light);

    var white = document.createElement('div');
    white.classList.add("TEAM_C_WHITE");
    c.appendChild(white);

    // store the divs in global var
    waves = [
      { level: med, offset: 0, delay: 0 },
      { level: light, offset: 0, delay: 120 },
      { level: white, offset: 0, delay: 240 }
    ];
  }


  const MAX_MOVE = 40;   // how far waves move
  const SPEED = 0.12;   // easing speed
  let holdingSpace = false;
  let wasHoldingSpace = false; 
  let startTime = null; // the time since the animation began

function animate(time) {
  // time = milliseconds since the page started rendering
  // provided by browser when requestAnimationFrame is called

  // Initialize startTime the first frame
  if (startTime === null) {
    startTime = time;
  }

  // check if the user has changed holding/not holding space and if so, restart the animation
  if (wasHoldingSpace !== holdingSpace) {
    startTime = time; 
  }

  // move the waves 
  for (var i = 0; i < waves.length; i++) {

    var wave = waves[i];

    // calculate the time that has passed since the animation started 
    var elapsedTime = time - startTime;

    // subtracts the wave’s individual delay, waves move staggered
    var timeAfterDelay = elapsedTime - wave.delay;

    // only move if it is this wave's turn to move (delay is over) 
    if (timeAfterDelay > 0) {
      // move in different directions depending on space bar 
      if (holdingSpace) {
        // pull toward ocean (up)
        var distanceToTarget = MAX_MOVE - wave.offset;
        var moveAmount = distanceToTarget * SPEED; // move SPEED% of distance remaining, creates smooth transition bcs distance is smaller and smaller every frame 
        wave.offset = wave.offset + moveAmount;
      } else {
        // push toward sand (down)
        var distanceBack = 0 - wave.offset;
        var moveBackAmount = distanceBack * SPEED;
        wave.offset = wave.offset + moveBackAmount;
      }
    }

    // move the wave 
    wave.level.style.transform = "translateY(" + (-wave.offset) + "px)";
  }

  // Remember previous state for next frame
  wasHoldingSpace = holdingSpace;

  requestAnimationFrame(animate);
}


   /****************ANI D************************************ */
  /** PUT ALL YOUR CODE FOR INTERACTIVE PATTERN D INSIDE HERE */
  /****************ANI D************************************ */
  /**************** TASK *******************************************
   * YOU CAN USE ALL NOTES --- and see my examples in team-h.js for inspiration and possibly help:).
   * 1: create a creative, visual pattern using text, divs as shapes, images ...
   * 2: add in animation using requestAnimationFrame somewhere to make the sketch animate :)
   *
   * NOTE::: PLEASE::: if you add any custom css PLEASE use the style.css and prefix any class names with your team label
   * i.e. you want to create a custom div class and you are in "Team_A" then call your class TEAM_A_ANI_A_Div -
   * this is so that your styles are not overriden by other teams.
   * NOTE::: All your code is to be added here inside this function -
   * remember you can define other functions inside....
   * Do not change any code above or the HTML markup.
   * **/
   function aniD(parentCanvas) {
    console.log("in ani-D -teamC");
    }
}
   