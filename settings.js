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
  var newElem = document.createElement('div')
    , volControl = (typeof zVol != 'undefined') ? zVol : ''
  ;
  newElem.id = 'settCont';

  newElem.innerHTML =
    '<div id="settInner" class="settInner">'
    //close button
    + '<div id="setsClose" class="buttonClose">X</div>'
    //fullscreen toggle button
    + '<div id="fs" class="uButtons uButtonGreen">'
      + '<span id="fsI" class="fsInner">&#9974;</span>&nbsp;Fullscreen'
    + '</div>'
    + '<br>'
    //volume slider:
    + volControl
    //+ '<div id="bAbout" class="uButtons uButtonGrey">About</div>'
    + '<div id="bChange" class="uButtons uButtonGrey">App ChangeLog</div>'
    + '<hr>' //Now for the Support buttons:
    + appTips
    + appAbout
    + appBugs
    + '</div>'
    ;
  document.body.appendChild(newElem);

  if (volControl) {
    //set the volume slider:
    mouseVars.start.target = document.getElementById('sli-vol-I');
    sliderUpdate([globVol], 0);
    //check whether muted or not.
    swapToggler('muteToggle');

  }

  closeButtonRight('setsClose');
  //check for other things to go into the Settings panel
  if (window['settingsExtra']) {
    settingsExtra();
  }

  upSetClass(newElem);

}

function settingsClose() {
  //move the settings element back offscreen to the left
  document.getElementById('settCont').style.transition = 'left .6s ease-in';
  document.getElementById('settCont').style.left = '-100%';
}
function settingsOpen() {
  document.getElementById('settCont').style.left = 0;
}
