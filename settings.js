/*
Generally, there is a hanburger on the top-left, though some people
put it on the right. I think Google do the top left, and because
they are so ubiquitus, I will choose to place my settings thing there.
*/

function settingsButton() {
  var newElem = document.createElement('div');
  newElem.id = 'sets';
  newElem.classList = 'settB';
  newElem.innerHTML = '&#9776;';
  document.body.appendChild(newElem);
}

function settingsCreate() {
  //create a semi-opaque rounded rectangle on the top-right, and put the message into it.
  var newElem = document.createElement('div');
  newElem.id = 'settns';
  newElem.classList = 'settW';
var zVol = '';
  if (gameVars.vol) {
    zVol =
    '<div id="sli-vol-C" class="volCont">'
      + '<div id="sli-vol-g" class="volGrad"></div>'
      + '<div id="sli-vol-I" class="volInner">'
        + '<div id="sli-vol-T" class="vImg">◢</div>' //◢ &#9698;
      + '</div>'
    + '</div>';
  }
  newElem.innerHTML =
    //close button
    '<div id="setsClose" class="buttonClose">X</div>'
    //fullscreen toggle button
    + '<div id="fs" class="uButtons uButtonGreen">'
      + '<span id="fsI" class="fsInner">&#9974;</span>&nbsp;Fullscreen'
    + '</div>'
    + '<br>'
    //volume slider:
    + zVol
    //+ '<div id="bAbout" class="uButtons uButtonGrey">About</div>'
    + '<div id="bChange" class="uButtons uButtonGrey">App ChangeLog</div>'
    + '<hr>' //Now for the Support buttons:
    + appTips
    + appAbout
    + appBugs
    ;
  document.body.appendChild(newElem);
  
  if (gameVars.vol) {
    //set the volume slider:
    mouseVars.start.target = document.getElementById('sli-vol-I');
    sliderUpdate([globVol], 0);
  }

  closeButtonRight('setsClose');
  //check for other things to go into the Settings panel
  if (window['settingsExtra']) {
    settingsExtra();
  }
  //in the CSS, the left is set to -90% and width 90%
  //so now we move it onto the screen from the left.
  window.setTimeout(function(){
    document.getElementById('settns').style.left = 0;
  }, 25);
}

function settingsClose1() {
  if (document.getElementById('settns')) {
    //move the settings element back offscreen to the left
    document.getElementById('settns').style.transition = 'left .6s ease-in';
    document.getElementById('settns').style.left = '-100%';
    //after it has moved offscreen, remove the whole thing.
    window.setTimeout(function(){settingsClose2()},650);
  }
}
function settingsClose2() {
  if (document.getElementById('settns')) {
    document.body.removeChild(document.getElementById('settns'));
    if (window['settinsCloseEvent']) {
      settinsCloseEvent();
    }
  }
}
