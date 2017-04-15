function soundPlay(a) {
  if (a) {
    var newSound = audioCtx.createBufferSource();
    var newGain = audioCtx.createGain();
    //specify the sound buffer to use
    newSound.buffer = audioSprite;
    //connect the volume to the audiobuffer
    newSound.connect(newGain);
    //connect the gain to the destination
    newGain.connect(audioCtx.destination);
    //set the (gain) volume of the sound
    newGain.gain.value = soundVol(1);
    //play the sound, specifying when to start and how long to play for
    newSound.start(0, a.aStart, a.aDuration);//  - audioCtx.currentTime
  }
}

// example: soundBeep('sine', 500, 1, 100);setTimeout(function(){soundBeep('sine', 750, 1, 100)}, 100);
function soundBeep(type, frequency, volume, duration) {
  //make the entire game queiter.
  //create a HTML5 audio occilator thingy
  var zOscillator = audioCtx.createOscillator();
  //create a HTML5 audio volume thingy
  var zGain = audioCtx.createGain();
  //link the volume to the occilator
  zOscillator.connect(zGain);
  zGain.connect(audioCtx.destination);
  //set up the audio beep to what is needed:
  zOscillator.type = type;
  //default = 'sine' — other values are 'square', 'sawtooth', 'triangle' and 'custom'
  zOscillator.frequency.value = frequency;
  zGain.gain.value = soundVol(volume) * .8;
  //start the audio beep, and set a timeout to stop it:
  zOscillator.start();
  window.setTimeout(function() {
    window.setTimeout(function() {
      zOscillator.stop()
    }, 25);
    //stop once the volume is riiiight down.
    zGain.gain.value = 0.001;
    //hopefully stop that cilck at the end that can happen.
  }, duration);
  //default to qurter of a second for the beep if no time is specified
}
function soundVol(num) {
  if (globVol == 0) {
    return 0;
  }
  else {
    num *= (globVol / 100); //make the volume comform to the globally set volume
    return (num * .5); //make it half loud again.
  }
}







//http://stackoverflow.com/questions/879152/how-do-i-make-javascript-beep
//answered by Houshalter bout half way down, then editd for me :D
//did this version cos it appears to be exact to the http://www.w3.org/TR/webaudio/ spec
//and also what is found on MDN : https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Using_Web_Audio_API
var musicNotes = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'];
var pitchNotes = [];

function tg_changeFreq(perCent) {
  //var noteSteps = 0;
  //var t2 = ((Math.log(fMax / fMin) / Math.log(2)) * (perCent / 100));
  //var t3 = (Math.log(fMin) / Math.log(2));
  //t10 = Math.pow(2, (t2 + t3));
  var nowFreq = Math.pow(2, (((Math.log(fMax / fMin) / Math.log(2)) * (perCent / 100)) + (Math.log(fMin) / Math.log(2)))).toFixed(3);
  /*
    don't bother stepping with this little app!
  if (document.getElementById('tg_stn').checked) {
    var zNum;
    //find the corresponding note to the frequency
    //wiki says n = 12 log2 (f/440) + 49
    //fn = f0 * (a)n  =
    var freqSteps = 69 * (noteSteps / 12);
    var t1 = Math.log(noteSteps) / Math.log(2);
    //should be 1.059463094359... getting additional hints from http://www.phy.mtu.edu/~suits/NoteFreqCalcs.html
    var t2 = Math.log((nowFreq / 440) / Math.log(2));
    var t3 = Math.round(t1 * t2);
    // + 69;
    var t4 = (t1 * t2);
    // + 69;
    //Math.pow(2, (x - 69) / 12) * 440; - reversing this should give me the number

    t1 = nowFreq / 440;
    t2 = Math.log(t1) / Math.log(2);
    t3 = t2 * noteSteps;
    t4 = Math.round(t3 + freqSteps);
    var allInOne = Math.round((Math.log(nowFreq / 440) / Math.log(2)) * noteSteps) + Math.round(freqSteps);
    //ok more is needed about this 69.
    //what is 0?
    //57 = a3, 45 = A2, 33 = A1, 21 = A0, 9 = A-1?
    //'A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'];
    //so 0 is C-1?
    //nowFreq = pitchNotes[allInOne].toFixed(3);
    //nowFreq = tg_pitchNotes(allInOne, freqSteps);
    nowFreq = tg_pitchNotes(allInOne, noteSteps, freqSteps);
    //nowFreq = Math.pow(2, (x - freqSteps) / noteSteps) * 440; //A4 (A440) is MIDI no. 69
  }
  */

  //debugger;

  gameVars.tone.frequency.value = nowFreq;
  //t10.toFixed(3);
/*
  var sliderPercent = perCent;
  //recalculate to offset width of the slider iteself
  var zDiff = (document.getElementById('freq-C').offsetWidth - document.getElementById('freq-I').offsetWidth) / document.getElementById('freq-C').offsetWidth;
  sliderPercent *= zDiff;
  document.getElementById('freq-I').style.left = sliderPercent + '%';
  //now change the color of the slider
  var zNum = Math.round((240 / 100) * (100 - perCent));
  var zBack = 'radial-gradient(farthest-side at 33% 33% , hsl(' + zNum + 
  ',100%,90%), hsl(' + zNum + ',100%,55%), hsl(' + zNum + ', 100%, 33%))';

  document.getElementById('freq-I').style.background = zBack;
*/
}

function tg_changeSlider(nowFrequency) {
  /*
  //reverse the frequency and get a percentage
  var t1 = (perCent / 100); //.5
  var t2 = (Math.log(fMax / fMin) / Math.log(2)); // 10.749964517249126
  var t3 = (Math.log(fMin) / Math.log(2));        // 4.031395196275534
  var t4 = t1 * t2;                        // 5.374982258624563
  var t5 = t4 + t3;                         // 9.40637722549776
  var t10 = Math.pow(2, t5).toFixed(3);              // 678.581

  var nowFreq  = Math.pow(2, (((Math.log(fMax / fMin) / Math.log(2)) * (perCent / 100)) + (Math.log(fMin) / Math.log(2)))).toFixed(3);

*/
  //so to reverse that...
  var r6 = Math.log(nowFrequency) / Math.log(2);
  // 9.40637722549776
  var r5 = Math.log(fMin) / Math.log(2);
  // 4.031395196275534
  var r4 = r6 - r5;
  // 5.374982029222226
  var r3 = Math.log(fMax / fMin) / Math.log(2);
  // 10.749964517249126
  var r2 = r4 / r3;
  var r1 = Math.round(r2 * 100);
  var zSlider = document.getElementById('freq-I');
  var zWidth = zSlider.parentNode.offsetWidth;
  var sliderPercent = r1;
  if (sliderPercent < 0) {
    sliderPercent = 0;
  } else if (sliderPercent > 100) {
    sliderPercent = 100;
  }
  //recalculate to offset width of the slider iteself
  var zDiff = (zWidth - zSlider.offsetWidth) / zWidth;
  sliderPercent *= zDiff;
  zSlider.style.left = sliderPercent + '%';

  //recalculate to offset width of the slider iteself
  var zDiff = (document.getElementById('freq-C').offsetWidth - document.getElementById('freq-I').offsetWidth) / document.getElementById('freq-C').offsetWidth;
  sliderPercent *= zDiff;
  document.getElementById('freq-I').style.left = sliderPercent + '%';
  //now change the color of the slider
  var zVol = (globVol*100).toFixed(0);  
  var zNum = Math.round((240/100) * (100 - (globVol*100)));
  var zBack = 'radial-gradient(farthest-side at 33% 33% , hsl(' + zNum + 
  ',100%,90%), hsl(' + zNum + ',100%,55%), hsl(' + zNum + ', 100%, 33%))';

  document.getElementById('freq-I').style.background = zBack;

}
function tg_defaults() {
  gameVars.tone.frequency.value = 1000;
  globVol = 50;
  gameVars.vol.gain.value = 0.5;
}

function tg_pitchNotes(x, noteSteps, freqSteps) {
  //pitchNotes[x] = Math.pow(2, (x - 69) / 12) * 440; //A4 (A440) is MIDI no. 69
  return (Math.pow(2, (x - freqSteps) / noteSteps) * 440).toFixed(3);
  //A4 (A440) is MIDI no. 69
}

function pannerInit() {
  //place the sound in 3D based on where the start/stop ('pp') button is.
  /*
    https://developer.mozilla.org/en-US/docs/Web/API/AudioListener
    https://developer.mozilla.org/en-US/docs/Web/API/PannerNode

    This is how I understand it all:

    The 'Listener', which is where in 3D space, and in which 3D
    direction that listener is pointing.

    The 'Panner', which is at a specific point in 3D space, and is
    pointing in a specific direction.
    The panner also has a cone coming out of it, which is where the
    audio can be heard. This cone can be as many degrees as you like
    so you could make it 10 degrees, so the panner would have to be
    pointed almost directly at the listener for the listener to hear it,
    or the full 360 degrees, meaning the listener would be able to hear
    it regardless of the direction the panner is pointed in.

    You can also specify whether (and by how much), or not the audio
    reduces in volume the further away the listener and panner are from
    each other.
  */
  gameVars.pan.coneInnerAngle = 360; //360 is default
  gameVars.pan.coneOuterAngle = 0; //0 is default, 360 should mean no fading?
  gameVars.pan.coneOuterGain = 1; //0 is default but what is the max? 1? 100?
  //gameVars.pan.distanceModel = 'inverse'; //inverse is the default value
  gameVars.pan.maxDistance = 100; //10000 is default
  /*
  gameVars.pan.orientation[X|Y|Z].value turns/points the audio source in 3D space.
    Since the audio source should be omnomnomdirectional (:D)
    then all three orientations (x, y, z) should make no difference.
  */
  gameVars.pan.panningModel = 'equalpower'; //HRTF is the default value.
  //HRTF Renders a stereo output of higher quality than equalpower
  //I'm trying the equalpower one as the output may not only be stereo -
  //what about surround for example?
  /*
  gameVars.pan.position[X|Y|Z].value moves the audio source around in 3D space.
  */
  gameVars.pan.refDistance = 1; //1 is default
  gameVars.pan.rolloffFactor = 0; //1 is default
  //debugger;
/*
  //if(gameVars.lisn.forwardX) {
    gameVars.lisn.forwardX.value = 0; //assume left/right
    gameVars.lisn.forwardY.value = 0; //is this up/down or forward/back?!?
    gameVars.lisn.forwardZ.value = 0; //is this forward/back or up/down?!?
    gameVars.lisn.upX.value = 0;
    gameVars.lisn.upY.value = 0;
    gameVars.lisn.upZ.value = 0;
  //} else {
  //  gameVars.lisn.setOrientation(0, 0, 0, 0, 0, 0);
  //}
*/
  // listener will always be in the same place for this demo
  //if(listener.positionX) {
    gameVars.lisn.positionX.value = 50; //left/right
    gameVars.lisn.positionY.value = 10; //up/down
    gameVars.lisn.positionZ.value = 50; //forward/back
  //} else {
  //  gameVars.lisn.setPosition(-100, 0, 0);
  //}

  //listenerData.innerHTML = 'Listener data: X ' + xPos + ' Y ' + yPos + ' Z ' + 300;
}
function pannerPlace(sliderPercent) {
  /*
    Take the percentages, and convert them into a meaningfull
    position for the audioCtx.
    I think the min and max is something like -3 and 3,
    so perhaps just ((percent / 100) * 3)?
  */
  //record the percentages here so that the button can be reposition if needed.
  gameVars.panPos.x = sliderPercent[0];
  gameVars.panPos.z = sliderPercent[1];

  gameVars.pan.positionX.value = gameVars.panPos.x * 1;
  //just on the offchance that Y is forward/backward...
  //gameVars.pan.positionY.value = gameVars.panPos.z * 1;
  gameVars.pan.positionZ.value = gameVars.panPos.z * 1;
}
function percentToPosition(num) {
  return (num / 100) * 3;
}
