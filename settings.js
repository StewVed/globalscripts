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
    + '<div id="bAbout" class="uButtons uButtonGrey">About</div>'
    + '<div id="bChange" class="uButtons uButtonGrey">ChangeLog</div>'
    + '<br>'
    + '<hr>' //Now for the Support buttons:
    + '<p class="B pZW">Tips & Support:</p>'//Patreon Button-link to my site
    + '<a class=\'ubLink\' href=\'https://www.patreon.com/stewved\' target=\'_blank\'><img class="imgSocs ubLink" ' + imgSocs + 'Patreon.png\');cursor:pointer;margin:auto;display:block;width:100%;height:44px;"' + imgDummy + '></a>' + '<hr style=width:80%;">'//PayPal Donate Button
    + '<form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">' + '<input type="hidden" name="cmd" value="_s-xclick">' + '<input type="hidden" name="hosted_button_id" value="RJMCJX2TE8E4Y">'//'<input type="image" style="height:47px;margin:4px auto;display:block;" src="https://www.paypalobjects.com/en_US/GB/i/btn/btn_donateCC_LG.gif" border="0" name="submit" alt="PayPal – The safer, easier way to pay online.">' +
      + '<input type="image" class="imgSocs ubLink" ' + imgSocs + 'PaypalDonate.png\');height:47px;width:100%;margin:4px auto;display:block;" ' + imgDummy + ' name="submit" alt="PayPal – The safer, easier way to pay online.">'//'<img alt="" border="0" src="https://www.paypalobjects.com/en_GB/i/scr/pixel.gif" width="1" height="1">' +
    + '</form>'
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
    document.getElementById('settns').style.left = '-90%';
    //after it has moved offscreen, remove the whole thing.
    window.setTimeout(function(){settingsClose2()},600);
  }
}
function settingsClose2() {
  if (document.getElementById('settns')) {
    document.body.removeChild(document.getElementById('settns'));
  }
}
