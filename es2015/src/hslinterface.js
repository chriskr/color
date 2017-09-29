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

var HSLInterface = function () {
  function HSLInterface(color) {
    _classCallCheck(this, HSLInterface);

    this.color_ = color;
  }

  _createClass(HSLInterface, [{
    key: 'get',
    value: function get() {
      return [this.h, this.s, this.l];
    }
  }, {
    key: 'set',
    value: function set(hsl) {
      this.h = hsl[0];
      this.s = hsl[1];
      this.l = hsl[2];
    }
  }, {
    key: 'toCss',
    value: function toCss() {
      var s = Color.toPercent(this.s);
      var l = Color.toPercent(this.l);
      return 'hsl(' + this.h + ', ' + s + ', ' + l + ')';
    }
  }, {
    key: 'h',
    set: function set(h) {
      this.color_.setHue(h);
    },
    get: function get() {
      return this.color_.getHue();
    }
  }, {
    key: 's',
    set: function set(s) {
      this.color_.setSaturation(s);
    },
    get: function get() {
      return this.color_.getSaturation();
    }
  }, {
    key: 'l',
    set: function set(l) {
      this.color_.setLightness(l);
    },
    get: function get() {
      return this.color_.getLightness();
    }
  }]);

  return HSLInterface;
}();