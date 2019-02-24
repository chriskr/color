'use strict';

var setupColorPicker = function() {
  var DELTA = 0.01;
  var color = new Color('#521a96');
  var rgb = color.rgb;
  var hsl = color.hsl;
  var hsv = color.hsv;
  var hex = color.hex;
  var hueInput = document.querySelector('#hue');
  var satValueContainer = document.querySelector('#s-v-container');
  var sampleText = document.querySelector('pre');
  var satValueStyle = document.querySelector('#s-v').style;
  var sheets = document.styleSheets;
  var hueThumbStyle = sheets.getDeclaration(
    '#hue::-moz-range-thumb',
    '#hue::-webkit-slider-thumb',
    '#hue::-ms-thumb'
  );
  var satValueThumbStyle = document.querySelector('#s-v-thumb').style;
  var sampleColorStyle = document.querySelector('#color-sample').style;
  var box = null;

  var updateHue = function() {
    var color = 'hsl(' + hsv.h + ', 100%, 50%)';
    var backgroundImage = 'linear-gradient(90deg, white, ' + color + ')';
    satValueStyle.backgroundImage = backgroundImage;
    updateThumbs();
  };

  var updateSaturationAndValue = function() {
    satValueThumbStyle.left = Color.toPercent(hsv.s);
    satValueThumbStyle.top = Color.toPercent(1 - hsv.v);
    updateThumbs();
  };

  var updateThumbs = function() {
    if (hueThumbStyle) {
      hueThumbStyle.backgroundColor = 'hsl(' + hsl.h + ', 100%, 50%)';
    }
    satValueThumbStyle.backgroundColor = hex.toCss();
    updateSampleColor();
  };

  var updateSampleColor = function() {
    sampleColorStyle.backgroundColor = hex.toCss();
    sampleText.textContent = [
      'Hue: ' + hsv.h,
      'Satuartion: ' + Color.toPercent(hsv.s),
      'Value: ' + Color.toPercent(hsv.v),
      '',
      'CSS values:',
      hex.toCss(),
      rgb.toCss(),
      hsl.toCss()
    ].join('\n');
  };

  var moveInput = function(event) {
    var eventBox = event;
    if (event.touches !== undefined) {
      eventBox = event.touches[0];
    }
    hsv.s = (eventBox.clientX - box.left) / box.width;
    hsv.v = 1 - (eventBox.clientY - box.top) / box.height;
    updateSaturationAndValue();
  };

  var endInput = function(event) {
    document.removeEventListener('touchmove', moveInput);
    document.removeEventListener('touchend', endInput);
    document.removeEventListener('mousemove', moveInput);
    document.removeEventListener('mouseup', endInput);
  };

  hueInput.addEventListener('input', function() {
    hsv.h = this.value;
    updateHue();
  });

  hueInput.addEventListener('change', function() {
    hsv.h = this.value;
    updateHue();
  });

  var inputStart = function(event) {
    var moveType = 'mousemove';
    var endType = 'mouseup';
    if (event.type === 'touchstart') {
      if (event.touches.length > 1) {
        return;
      }
      moveType = 'touchmove';
      endType = 'touchend';
    }
    box = satValueContainer.getBoundingClientRect();
    moveInput(event);
    document.addEventListener(moveType, moveInput);
    document.addEventListener(endType, endInput);
    event.preventDefault();
    satValueContainer.focus();
  };

  satValueContainer.addEventListener('mousedown', inputStart);
  satValueContainer.addEventListener('touchstart', inputStart);

  document.addEventListener('keydown', function(event) {
    if (document.activeElement === satValueContainer) {
      switch (event.key) {
        case 'ArrowRight':
        case 'Right':
          hsv.s += DELTA;
          break;
        case 'ArrowLeft':
        case 'Left':
          hsv.s -= DELTA;
          break;
        case 'ArrowUp':
        case 'Up':
          hsv.v += DELTA;
          break;
        case 'ArrowDown':
        case 'Down':
          hsv.v -= DELTA;
          break;
      }
      updateSaturationAndValue();
    }
  });

  document.addEventListener('dragstart', function(event) {
    event.preventDefault();
  });

  hueInput.value = hsv.h;
  updateHue();
  updateSaturationAndValue();
};

window.onload = function() {
  try {
    setupColorPicker();
  } catch (e) {
    if (location.pathname.indexOf('es2015') === -1) {
      location.href = '/color/es2015/examples/color-picker.html';
    }
  }
};
