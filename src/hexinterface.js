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

class HexInterface {
  constructor(color) {
    this.color_ = color;
  }

  set(hex) {
    if (!(Color.RE_HEX_3.test(hex) || Color.RE_HEX_6.test(hex))) {
      throw Error("Not valid hex color");
    }
    if (Color.RE_HEX_3.test(hex)) {
      hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    let temp = parseInt(hex, 16);
    this.color_.rgb.set([temp >> 16, (temp >> 8) & 0xff, temp & 0xff]);
  }

  get() {
    let rgb = this.color_.rgb;
    let hex = (rgb.r << 16 | rgb.g << 8 | rgb.b).toString(16);
    return '0'.repeat(6 - hex.length) + hex;
  }

  toCss() {
    let hex = this.get();
    let isShort = true;
    for (var i = 0; (i < 6) && isShort; i += 2) {
      isShort = hex[i] === hex[i + 1];
    }
    if (isShort) {
      hex = hex[0] + hex[2] + hex[4];
    }
    return '#' + hex;
  }
}
