'use strict';

window.onload = function() {
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
  var hueThumbStyle = sheets.getDeclaration('#hue::-webkit-slider-thumb') ||
      sheets.getDeclaration('#hue::-moz-range-thumb');
  var satValueThumbStyle = document.querySelector('#s-v-thumb').style;
  var sampleColorStyle = document.querySelector('#color-sample').style;
  var box = null;

  var updateHue = function() {
    var color = 'hsl(' + hsv.h + ', 100%, 50%)';
    var backgroundImage = 'linear-gradient(90deg, white, ' + color + ')';
    satValueStyle.backgroundImage = backgroundImage;
    updateThumbs();
  }

  var updateSaturationAndValue = function() {
    satValueThumbStyle.left = Color.toPercent(hsv.s);
    satValueThumbStyle.top = Color.toPercent(1 - hsv.v);
    updateThumbs();
  }

  var updateThumbs = function() {
    if (hueThumbStyle) {
      hueThumbStyle.backgroundColor = 'hsl(' + hsl.h + ', 100%, 50%)';
    }
    satValueThumbStyle.backgroundColor = hex.toCss();
    updateSampleColor();
  }

  var updateSampleColor = function() {
    sampleColorStyle.backgroundColor = hex.toCss();
    sampleText.textContent = [
      'Hue: ' + hsv.h,
      'Satuartion: '+ Color.toPercent(hsv.s),
      'Value: '+ Color.toPercent(hsv.v),
      '',
      'CSS values:',
      hex.toCss(),
      rgb.toCss(),
      hsl.toCss(),
    ].join('\n');
  }

  var onmousemove = function(event) {
    hsv.s = (event.clientX - box.left) / box.width;
    hsv.v = 1 - ((event.clientY - box.top) / box.height);
    updateSaturationAndValue();
  }

  var onmouseup = function(event) {
    document.removeEventListener('mousemove', onmousemove);
    document.removeEventListener('mouseup', onmouseup);
  }

  hueInput.addEventListener('input', function() {
    hsv.h = this.value;
    updateHue();
  });

  satValueContainer.addEventListener('mousedown', function(event) {
    box = satValueContainer.getBoundingClientRect();
    onmousemove(event);
    document.addEventListener('mousemove', onmousemove);
    document.addEventListener('mouseup', onmouseup);
    event.preventDefault();
    satValueContainer.focus();
  });

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
