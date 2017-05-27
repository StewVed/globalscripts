function bubbleStop(e) {
  if (e.cancelable) {
    e.preventDefault();//stop browser doing it's default action.
    e.stopPropagation(); //stop the event bubbling
  }
}
function findTarget(e) {
  if (!e) {
    var e = window.event;
  }
  targ = e.target || e.srcElement;
  if (targ.nodeType != 1) {
    //element nodes are 1, attribute, text, comment, etc. nodes are other numbers... I want the element.
    targ = targ.parentNode;
  }
  return targ;
}

function keyRedefine(theKey) {
  // left,up,right,down,A,B,X,Y   you can add more should your game require it.
  var theKey = keyNum(e);
  if (keysIgnore.indexOf(theKey) === -1) {
    bubbleStop(e);
    //simply add the newly pressed key into the WinKeys array.
    keyVars.push(theKey);
  }
}

function mouseClear() {
  if (mouseVars.clickTimer) {
    window.clearTimeout(mouseVars.clickTimer);
  }
  mouseVars = {
      button: null
    , type: null
    , cursorStyle: null
    , clickTimer: null
    , current:{target:null, time:null, x:null, y:null}
    , start:{target:null, time:null, x:null, y:null}
    , moved: 0
  }
  document.body.style.cursor = 'default';
}
function scrollClear() {
  scrollVars = {
    targ: null,
    leftDiff: null,
    TopDiff: null,
  }
}


function resizeCenter(a, b) {
  return Math.round((a / 2) - (b / 2));
}

function resize() {
  //little fix for on-screen keyboards resizing screen space:
  if (document.activeElement.classList.contains('editEnable')) {
    //also could double-check by checking that the width hasn't changed:
    //if (document.body.offsetWidth === window.innerWidth) - if needed...

    /*
      attempt to keep the entire webapp visible...
      I will assume that document.body.offsetHeight will be correctly reported.
    */
    var zTop = resizeCenter(document.body.offsetHeight, document.getElementById('cont').offsetHeight);

    if (zTop < 0) {
      //make sure that the activeElement is visible.
      var zParentElem = document.activeElement.parentNode;
      var xTop = document.activeElement.offsetHeight + document.activeElement.offsetTop;
      while (zParentElem.id != 'cont') {
        xTop += zParentElem.offsetTop;
        zParentElem = document.activeElement.parentNode;
      }
    }

    document.getElementById('cont').style.top = zTop + 'px';
    return;
  }

  //maybe I should make the game bit a squre, then have the scores bit
  //however amount of space is left? what if the available area is square?
  //regardless, let's begin by finding the smallest size out of length and width:

  document.body.style.width = window.innerWidth + 'px';
  document.body.style.height = window.innerHeight + 'px';

  if (document.getElementById('cont')) {
    resizeSetSize(window.innerWidth)
  }

}

function resizeSetSize(num) {
  document.body.style.fontSize = (num * .002) + 'em';
  window.requestAnimationFrame(function() {
    resizeEvents();
    resizeCheckSize();
  });

}

function resizeCheckSize() {
    var zTop = resizeCenter(document.body.offsetHeight, document.getElementById('cont').offsetHeight);

    if (zTop < 0) {
      //Assume the overall aspect ratio of the container remains
      //the same, reduce the width of the container by the % that
      //it is over the window width.
      var cHeight = document.getElementById('cont').offsetHeight;
      var newWidth = document.getElementById('cont').offsetWidth  / (cHeight / window.innerHeight);
      document.getElementById('cont').style.width = newWidth + 'px';
      resizeSetSize(newWidth);
    } else if (
        (document.getElementById('cont').offsetWidth < (window.innerWidth * .95))
      && (document.getElementById('cont').offsetHeight < (window.innerHeight * .95))
      ) {
      var cWidth = document.getElementById('cont').offsetWidth;
      var newwidth = cWidth  / (cWidth / window.innerWidth);
      document.getElementById('cont').style.width = newwidth + 'px';
      resizeSetSize(newWidth);
    } else {
      resizeEnd();
    }
}

function resizeRatio(a, b) {
  //for fixed ratio apps - widescreen would be resizeRatio(16, 9) for example.
  var gWidth = document.body.offsetWidth;
  var gHeight = (gWidth / (a / b));
  if (gHeight > document.body.offsetHeight) {
  gHeight = document.body.offsetHeight;
  gWidth = gHeight * (a / b);
  }
  document.getElementById('cont').style.width = gWidth + 'px';
  document.getElementById('cont').style.height = gHeight + 'px';
}

function resizeEnd() {
  document.getElementById('cont').style.top = resizeCenter(document.body.offsetHeight, document.getElementById('cont').offsetHeight) + 'px';
  document.getElementById('cont').style.left = resizeCenter(document.body.offsetWidth, document.getElementById('cont').offsetWidth) + 'px';

  if (document.getElementById('toastClose')) {
    closeButtonRight('toastClose');
  }
  if (document.getElementById('setsClose')) {
    closeButtonRight('setsClose');
  }
}

function resizeCheckOrientation() {
    var a
  , b
  , portraitLayout;

  if (window.innerWidth > window.innerHeight) {
    a = window.innerHeight;
    b = window.innerWidth;
    portraitLayout = 0;
  }
  else {
    a = window.innerWidth;
    b = window.innerHeight;
    portraitLayout = 1;
  }

  return [a,b,portraitLayout];
}

function scroller(targ, toScrollBy) {
  //console.log(toScrollBy);
  var zTop = (targ.offsetTop + toScrollBy);
  var tcTop = document.getElementById('toastContainer').offsetTop;
  var longest = document.body.offsetHeight - (targ.clientHeight + tcTop);//don't include border on targ.

  if (longest > zTop) {
    zTop = longest;
  }
  else if (zTop > 0) {
    zTop = 0;
  }
  targ.style.top = zTop + 'px';
  //if there is a close button, make sure it stays on-screen.
  if (document.getElementById('toastClose')) {
    //might be the scroll value perhaps... dunno yet.
    if (zTop < -tcTop) {
      document.getElementById('toastClose').style.top = (-zTop - tcTop) + 'px';
    }
  }
}
function divScroller(targ, zSpeed, zTime) {
  if (!targ || mouseVars.button) {
    //if the element no longer exists, there is nothing to do.
    return;
  }
  var tNow = new Date().getTime();
  var tDiff = (tNow - zTime) / 1000;
  var newSpeed = zSpeed;
  var toScrollBy = (zSpeed * tDiff);
  if ((tDiff > 0) && (zSpeed != 0) && (toScrollBy < 0.25 && toScrollBy > -0.25)) {
    //scroll speed is too slow. Just stop the scrolling animation.
    return;
  }

  //scroller(targ, (e.clientY - mouseVars.current.y));
  scroller(targ, toScrollBy);
  //now to calculate the next frame's scroll amount:
  if (tDiff) {
    /*
      NOTE:
      I've tried lots of different varients, but the scrolling up always takes longer than scrolling down
      I've given up tring to understand that, and just reversing the speed to compensate
      I am now just taking off a little more for scrolling up.
      Hopefully, that will prove about right no matter what browser is used!
    */
    if (newSpeed < 0) {
      newSpeed *= .925;
    } else {
      newSpeed *= .95;
    }
    //check for whether the newSpeed is going in the opposite direction
    if ((zSpeed > 0 && newSpeed < 0) || (zSpeed < 0 && newSpeed > 0)) {
      newSpeed = 0;
    }
  }
  if (newSpeed) {
    window.requestAnimationFrame(function() {
      divScroller(targ, newSpeed, tNow)
    });
  }
}

// fullscreen handling from webtop then simplified for this project...
function fullScreenToggle() {
  var isFS = document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement;
  if (isFS) {
    killFS.call(document, function() {});
    if (document.getElementById('fs')) {
      document.getElementById('fs').classList.remove('fsd')
      document.getElementById('fs').classList.add('fsu');
    }
  } else {
    getFS.call(document.documentElement, function() {});
    if (document.getElementById('fs')) {
      document.getElementById('fs').classList.remove('fsu')
      document.getElementById('fs').classList.add('fsd');
    }
  }
}


//Global slider stuff - should really be in their own file I think

function sliderMoveH() {
  //find the percentage of the the slider's left
  var zWidth = mouseVars.start.target.parentNode.offsetWidth;
  var zLeft = mouseVars.start.target.parentNode.offsetLeft + document.getElementById('cont').offsetLeft;
  var sliderLeft = mouseVars.current.x - zLeft + 2;
  sliderLeft -= (mouseVars.start.target.offsetWidth / 2);
  //debugger;
  var sliderPercent = [(sliderLeft / (zWidth - mouseVars.start.target.offsetWidth)) * 100];
  if (sliderPercent[0] < 0) {
    sliderPercent[0] = 0;
  } else if (sliderPercent[0] > 100) {
    sliderPercent[0] = 100;
  }
  //if this is a 2D slider, then add the perCent of that now:
  if (mouseVars.start.target.id.split('-')[1] === 'pan') {
    sliderPercent.push(sliderMoveV());
  }
  sliderUpdate(sliderPercent, 1);
}

function sliderMoveV() {
  //find the percentage of the the slider's left
  var zHeight = mouseVars.start.target.parentNode.offsetHeight;
  var zTop = mouseVars.start.target.parentNode.offsetTop + document.getElementById('cont').offsetTop;
  var sliderTop = mouseVars.current.y - zTop + 2;
  sliderTop -= (mouseVars.start.target.offsetHeight / 2);
  var sliderPercent = (sliderTop / (zHeight - mouseVars.start.target.offsetHeight)) * 100;
  if (sliderPercent < 0) {
    sliderPercent = 0;
  } else if (sliderPercent > 100) {
    sliderPercent = 100;
  }
  return sliderPercent;
}
function sliderUpdate(sliderPercent, sve) {
  //recalculate to offset width of the slider iteself
  var zDiff = (mouseVars.start.target.parentNode.offsetWidth - mouseVars.start.target.offsetWidth) / mouseVars.start.target.parentNode.offsetWidth;
  mouseVars.start.target.style.left = Math.round(sliderPercent[0] * zDiff) + '%';

  if (sliderPercent.length === 2) {
    zDiff = (mouseVars.start.target.parentNode.offsetHeight - mouseVars.start.target.offsetHeight) / mouseVars.start.target.parentNode.offsetHeight;
    mouseVars.start.target.style.top = Math.round(sliderPercent[1] * zDiff) + '%';
  } else { //only color the slider button for 1D sliders.
    sliderColors(sliderPercent);
  }

  //hard-code for volume control in settings:
  if (mouseVars.start.target.id.split('-')[1] === 'vol') {
    //update the app's volume
    globVol = sliderPercent[0];
    gameVars.vol.gain.value = (globVol / 100);
    if (mouseVars.start.target.style.background.length && sve) {
      storageSave('volume', globVol.toFixed(2));
    }
  } else {
    //do specific things for different sliders:
    sliderEvents(sliderPercent, sve);
  }
}
function sliderColors(sliderPercent) {
  //change the color of the slider
  //var zNum = Math.round((240/100) * (100 - (sliderPercent[0]*100)));
  var zNum = Math.round(2.4 * (100 - sliderPercent[0]));
  var zBack = 'radial-gradient(farthest-side at 33% 33% , hsl(' + zNum +
  ',100%,90%), hsl(' + zNum + ',100%,55%), hsl(' + zNum + ',100%,33%))';

  mouseVars.start.target.style.background = zBack;
}

