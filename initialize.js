//cancel fullscreen:
var killFS = (document.exitFullscreen || document.mozCancelFullScreen || document.webkitExitFullscreen || document.msExitFullscreen)
//kick up fullscreen:
, getFS = (document.documentElement.requestFullscreen || document.documentElement.mozRequestFullScreen || document.documentElement.webkitRequestFullscreen || document.documentElement.msRequestFullscreen)
//mousewheel event, based on the all-encompassing mozDev version
, mouseWheelType = 'onwheel' in document.createElement('div') ? 'wheel' : document.onmousewheel ? 'mousewheel' : 'DOMMouseScroll'
/*
 * Keys to ignore... alt-tab is annoying, so don't bother with alt for example
 * 16 = shift
 * 17 = Ctrl
 * 18 = Alt (and 17 if altGr)
 * 91 = windows key
 * 116 = F5 - browser refresh
 * 122 = F11 - Full Screen Toggle
 * 123 = F12 - Dev tools.
*/
, keysIgnore = [0, 16, 17, 18, 91, 116, 122, 123]
/*
  left,up,right,down,A,B,X,Y you can add more should your game require it.
*/
, keysDefault = {100:0, 101:1, 97:2, 98:3}
/*
  the currently used keys are loaded on init
*/
, keysCurrent = null
//Input events vars to hold the event info:
, inputType = null
//touch|gamePad|mouse|keyboard - depending on game type you could add GPS or whatever else HTML supports...
//Mouse:
, mouseVars = []
//Gamepad:
, gamePadVars = []
, gamepadReMap = [2, 3, 0, 1]
//keyboard:
, keyVars = []
//For touch-enabled devices
, touchVars = []
//vars to hold variables for the window
, gameWindow = null
, audioSprite = null
//I hate vendor prefixes! Why not just keep to the W3 specs?!?!?!
window.AudioContext = window.AudioContext || window.webkitAudioContext
, audioCtx = new window.AudioContext()

//tooltip system adapted from Webtop project
, vPup = null
, vPupc = null
, vPupD = null
, vPupDc = null
, vPupB = null

, tooltipVars = {opac:0, over:false, was:null, is:null, text:'', timer:null}
, toolTips = {
  'ztest': 'tooltip text here.'
}
, LS1 = '@#~'
, LS2 = '~#@'
, globVol = .54 //the volume of the audio in the game.
, saveY = 0 //whether the user allows saving to HTML5 local storage
;

function Init() {
  //Add event listeners to the game element
  addEventListeners();
  //initialize the mouse event
  mouseClear();
  //initialize the scroll vars
  scrollClear();
  //window management vars - is this even needed any more?!?!
  gameWindow = {
    initWidth: 640
  , initHeight: 360
  , width: 0
  , height: 0
  , scale: 1
  };

  //check for saved data. If set, the user has chosen to either save or not save data.
  storageCheck();

  //for the moment, just use the default keyset:
  keysCurrent = parseFloat(storageLoad('keymap')) || keysDefault;

  //check if the user has modified the volume level:
  globVol = parseFloat(storageLoad(zAppPrefix + 'volume') || .54);

  //add the initContent function to the main project, and return
  //the html content of the app :)
  document.body.innerHTML = initContent();

  //add the tooltip elements:
  tooltipsAdd();
  //add my settings system to the project.
  settingsButton();
  //now that everything is set up, make a recurring checker for button presses:
  gamePadsButtonEventCheck();
  resize();

  versionCheck();
  //once everything has been sorted, let the app know (if needed)
  runApp();
}
function tooltipsAdd() {
  document.body.innerHTML +=
    '<div id="pupB" class="ttElem"></div>'
  + '<div id="pup" class="ttElem"></div>'
  + '<div id="pupc" class="ttElem"></div>'
  + '<div id="pupD" class="ttElem"></div>'
  + '<div id="pupDc" class="ttElem"></div>'
  ;
  //make links to the tooltip elements:
  vPup = document.getElementById('pup');
  vPupc = document.getElementById('pupc');
  vPupD = document.getElementById('pupD');
  vPupDc = document.getElementById('pupDc');
  vPupB = document.getElementById('pupB');
}
function addEventListeners() {
  window.addEventListener('resize', resize, false);
  window.addEventListener('contextmenu', bubbleStop, false);
  window.addEventListener('dblclick', bubbleStop, false);
  window.addEventListener(mouseWheelType, mouseWheel, false);
  window.addEventListener('touchstart', touchDown, false);
  window.addEventListener('touchmove', touchMove, false);
  window.addEventListener('touchcancel', touchUp, false);
  window.addEventListener('touchend', touchUp, false);
  window.addEventListener('touchleave', touchUp, false);
  window.addEventListener('mousedown', mouseDown, false);
  window.addEventListener('mousemove', mouseMove, false);
  window.addEventListener('mouseup', mouseUp, false);
  window.addEventListener('keydown', keyDown, false);
  window.addEventListener('keyup', keyUp, false);
}
function versionCheck() {
  /*
    since every single event listener for updated sw fails to fire,
    I assume that the actual updating (when dev tools is not active)
    happens when the page is closed.
    Whatever.
    I will just do a storage-based version check.

    Obviously this will only work for users who allow storage, and I
    will have to remember to update the zAppVersion on every release!
  */
  var dataToLoad = storageLoad('appVersion');
  if (dataToLoad) {
    if (zAppVersion != dataToLoad) {
      //webbapp has been updated!
      upNotCheck('u');
      storageSave('appVersion', zAppVersion);
    }
  }
  else if (saveY) {
    //only bother saving if saving is allowed!
    storageSave('appVersion', zAppVersion);
  }
}
