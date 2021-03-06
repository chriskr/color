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

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var HexInterface = function () {
  function HexInterface(color) {
    _classCallCheck(this, HexInterface);

    this.color_ = color;
  }

  _createClass(HexInterface, [{
    key: 'set',
    value: function set(hex) {
      if (!(Color.RE_HEX_3.test(hex) || Color.RE_HEX_6.test(hex))) {
        throw Error("Not valid hex color");
      }
      if (Color.RE_HEX_3.test(hex)) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
      }
      var temp = parseInt(hex, 16);
      this.color_.rgb.set([temp >> 16, temp >> 8 & 0xff, temp & 0xff]);
    }
  }, {
    key: 'get',
    value: function get() {
      var rgb = this.color_.rgb;
      var hex = (rgb.r << 16 | rgb.g << 8 | rgb.b).toString(16);
      return '0'.repeat(6 - hex.length) + hex;
    }
  }, {
    key: 'toCss',
    value: function toCss() {
      var hex = this.get();
      var isShort = true;
      for (var i = 0; i < 6 && isShort; i += 2) {
        isShort = hex[i] === hex[i + 1];
      }
      if (isShort) {
        hex = hex[0] + hex[2] + hex[4];
      }
      return '#' + hex;
    }
  }]);

  return HexInterface;
}();