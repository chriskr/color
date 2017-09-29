// -*- Mode: js; tab-width: 2; indent-tabs-mode: nil; c-basic-offset: 2 -*-

/**
 *    Copyright 2006 - 2015 Opera Software ASA
 *
 *    Licensed under the Apache License, Version 2.0 (the "License");
 *    you may not use this file except in compliance with the License.
 *    You may obtain a copy of the License at
 *
 *        http://www.apache.org/licenses/LICENSE-2.0
 *
 *    Unless required by applicable law or agreed to in writing, software
 *    distributed under the License is distributed on an "AS IS" BASIS,
 *    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *    See the License for the specific language governing permissions and
 *    limitations under the License.
 *
 **/

'use strict';

/**
 * @fileoverview
 * Color class
 */

/**
* @constructor
*
*
* @class
* Represent a color. Allows for setting and getting color components based
* on RGB, HSV and HSL color spaces.
* See also http://en.wikipedia.org/Color_space
*/
class Color {
  constructor(value, type) {
    this.red = 0;
    this.green = 0;
    this.blue = 0;
    this.hue = 0;
    this.saturation = 0;
    this.lightness = 0;
    this.saturationV = 0;
    this.value = 0;
    this.alpha = 1;
    this.rgb_ = null;
    this.hsl_ = null;
    this.hsv_ = null;
    this.hex_ = null;
    if (typeof value === 'string') {
      this.parseCSSColor(value);
    }
    if (Array.isArray(value)) {
      switch (type) {
        case undefined:
        case Color.RGB:
          this.rgb.set(value);
          break;
        case Color.HSL:
          this.hsl.set(value);
          break;
        case Color.HSV:
          this.hsv.set(value);
          break;
      }
    }
  }

  parseCSSColor(input) {
    let span = Color.getTestSpan();
    span.style.setProperty('color', input, 'important');
    let raw = window.getComputedStyle(span).color;
    let rawArray = raw.split(/rgba?\(|,s*|\)$/).filter(Boolean);
    if (rawArray.length === 4) {
      this.alpha = parseFloat(rawArray.pop());
    }
    this.rgb.set(rawArray.map(Color.parseInt10));
  }

  get rgb() {
    if (!this.rgb_) {
      this.rgb_ = new RGBInterface(this);
    }
    return this.rgb_;
  }

  get hsl() {
    if (!this.hsl_) {
      this.hsl_ = new HSLInterface(this);
    }
    return this.hsl_;
  }

  get hsv() {
    if (!this.hsv_) {
      this.hsv_ = new HSVInterface(this);
    }
    return this.hsv_;
  }

  get hex() {
    if (!this.hex_) {
      this.hex_ = new HexInterface(this);
    }
    return this.hex_;
  }

  setRed(red) {
    this.red = Color.clamp(red, 0, 255);
    this.updateHslFromRgb();
    this.updateHsvFromHsl();
  }

  getRed() {
    return Math.round(Color.clamp(this.red, 0, 255));
  }

  setGreen(green) {
    this.green = Color.clamp(green, 0, 255);
    this.updateHslFromRgb();
    this.updateHsvFromHsl();
  }

  getGreen() {
    return Math.round(Color.clamp(this.green, 0, 255));
  }

  setBlue(blue) {
    this.blue = Color.clamp(blue, 0, 255);
    this.updateHslFromRgb();
    this.updateHsvFromHsl();
  }

  getBlue() {
    return Math.round(Color.clamp(this.blue, 0, 255));
  }

  setHue(hue) {
    this.hue = Color.clamp(hue, 0, 360);
    this.updateRgbFromHsl();
  }

  getHue() {
    return Math.round(Color.clamp(this.hue, 0, 360));
  }

  setSaturation(saturation) {
    this.saturation = Color.clamp(saturation, 0, 1);
    this.updateRgbFromHsl();
    this.updateHsvFromHsl();
  }

  getSaturation() {
    return Color.clamp(this.saturation, 0, 1);
  }

  setSaturationV(saturationV) {
    this.saturationV = Color.clamp(saturationV, 0, 1);
    this.updateHslFromHsv();
    this.updateRgbFromHsl();
  }

  getSaturationV() {
    return Color.clamp(this.saturationV, 0, 1);
  }

  setLightness(lightness) {
    this.lightness = Color.clamp(lightness, 0, 1);
    this.updateRgbFromHsl();
    this.updateHsvFromHsl();
  }

  getLightness() {
    return Color.clamp(this.lightness, 0, 1);
  }

  setValue(value) {
    this.value = Color.clamp(value, 0, 1);
    this.updateHslFromHsv();
    this.updateRgbFromHsl();
  }

  getValue() {
    return Color.clamp(this.value, 0, 1);
  }

  getGreyValue() {
    return 0.2126 * this.red + 0.7152 * this.green + 0.0722 * this.blue;
  }

  invert() {
    this.setHue((this.hue + 180) % 360);
    return this;
  }

  // http://www.w3.org/TR/2008/REC-WCAG20-20081211/#relativeluminancedef
  getLuminance() {
    let RGB = this.rgb.get().map(function(c) {
      let cs =  c / 255;
      return cs <= 0.03928
           ? cs / 12.92
           : Math.pow(((cs + 0.055) / 1.055), 2.4);
    });
    return 0.2126 * RGB[0] + 0.7152 * RGB[1] + 0.0722 * RGB[2];
  }

  // http://www.w3.org/TR/2008/REC-WCAG20-20081211/#contrast-ratiodef
  getContrastRatio(color2) {
    let l1 = this.getLuminance();
    let l2 = color2.getLuminance();
    return l1 > l2 ? (l1 + 0.05) / (l2 + 0.05) : (l2 + 0.05) / (l1 + 0.05);
  }

  updateHslFromRgb() {
    let red = this.red / 255;
    let green = this.green / 255;
    let blue = this.blue / 255;
    let maxColor = Math.max(red, green, blue);
    let minColor = Math.min(red, green, blue);
    let sum = maxColor + minColor;
    let delta = maxColor - minColor;
    this.hue = 0;
    this.saturation = 0;
    this.lightness = sum / 2;
    if (delta !== 0) {
      this.saturation = delta / (1 - Math.abs(sum - 1));
      delta = 60 / delta;
      switch (maxColor) {
        case red:
          this.hue = (360 + (green - blue) * delta) % 360;
          break;
        case green:
          this.hue = 120 + (blue - red) * delta;
          break;
        case blue:
          this.hue = 240 + (red - green) * delta;
          break;
      }
    }
  }

  updateRgbFromHsl() {
    let rgb1 = Color.hueToRgb(this.hue);
    let rgb2 = Color.mixRgbColors(rgb1, Color.GREY, 1 - this.saturation);
    let rgb3 = this.lightness <= 0.5 ? Color.BLACK : Color.WHITE;
    let mix = 1 - Math.abs(2 * this.lightness - 1);
    let rgb4 = Color.mixRgbColors(rgb3, rgb2, mix);
    this.red = rgb4[0];
    this.green = rgb4[1];
    this.blue = rgb4[2];
  }

  // http://codeitdown.com/hsl-hsb-hsv-color/
  updateHsvFromHsl() {
    let l = this.lightness;
    let v = (2 * l + this.saturation * (1 - Math.abs(2 * l - 1))) / 2;
    this.saturationV = 2 * (v - l) / v || 0;
    this.value = v;
  }

  updateHslFromHsv() {
    let v = this.value;
    let sv = this.saturationV;
    let l = 0.5 * v * (2 - sv);
    this.saturation = sv * v / (1 - Math.abs(2 * l - 1)) || 0;
    this.lightness = l;
  }

  static clamp(val, min, max) {
    return Math.min(Math.max(val, min), max);
  }

  static mixRgbColors(c1Rgb, c2Rgb, m) {
    let rgb = [];
    for(let i = 0; i < 3; i++) {
      rgb[i] = c1Rgb[i] + m * (c2Rgb[i] - c1Rgb[i]);
    }
    return rgb;
  }

  static toPercent(value) {
    return Math.round(value * 100) + '%';
  }

  static hueToRgb(hue) {
    hue %= 360;
    let delta = hue % 60;
    hue -= delta;
    delta = Math.round(255 / 60 * delta);
    switch (hue) {
      case 0:
        return [255, delta, 0];
      case 60:
        return  [255 - delta, 255, 0];
      case 120:
        return  [0, 255, delta];
      case 180:
        return  [0, 255 - delta, 255];
      case 240:
        return  [delta, 0, 255];
      case 300:
        return  [255, 0, 255 - delta];
    }
  }

  static parseInt10(i) {
    return parseInt(i, 10);
  };

  static getTestSpan() {
    let span = Color.testSpan;
    if (!span || !span.parentNode) {
      span = Color.testSpan = document.createElement('span');
      span.style.display = 'none';
      document.body.appendChild(span);
    }
    span.style.setProperty('color', Color.DEFAULT_COLOR, 'important');
    return span;
  }
}

Color.DEFAULT_COLOR = 'black';
Color.KEYWORD = 1;
Color.HEX = 2;
Color.RGB = 3;
Color.RGBA = 4;
Color.HSL = 5;
Color.HSLA = 6;
Color.BLACK = [0, 0, 0];
Color.WHITE = [255, 255, 255];
Color.GREY = [127.5, 127.5, 127.5];
Color.RE_HEX_6 = new RegExp('^[0-9a-fA-F]{6}$');
Color.RE_HEX_3 = new RegExp('^[0-9a-fA-F]{3}$');
