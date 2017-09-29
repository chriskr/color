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

var RGBInterface = function () {
  function RGBInterface(color) {
    _classCallCheck(this, RGBInterface);

    this.color_ = color;
  }

  _createClass(RGBInterface, [{
    key: "get",
    value: function get() {
      return [this.r, this.g, this.b];
    }
  }, {
    key: "set",
    value: function set(rgb) {
      this.r = rgb[0];
      this.g = rgb[1];
      this.b = rgb[2];
    }
  }, {
    key: "toCss",
    value: function toCss() {
      return "rgb(" + this.r + ", " + this.g + ", " + this.b + ")";
    }
  }, {
    key: "r",
    set: function set(r) {
      this.color_.setRed(r);
    },
    get: function get() {
      return this.color_.getRed();
    }
  }, {
    key: "g",
    set: function set(g) {
      this.color_.setGreen(g);
    },
    get: function get() {
      return this.color_.getGreen();
    }
  }, {
    key: "b",
    set: function set(b) {
      this.color_.setBlue(b);
    },
    get: function get() {
      return this.color_.getBlue();
    }
  }]);

  return RGBInterface;
}();