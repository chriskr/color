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

class HSLInterface {
  constructor(color) {
    this.color_ = color;
  }

  set h(h) {
    this.color_.setHue(h);
  }

  get h() {
    return this.color_.getHue();
  }

  set s(s) {
    this.color_.setSaturation(s);
  }

  get s() {
    return this.color_.getSaturation();
  }

  set l(l) {
    this.color_.setLightness(l);
  }

  get l() {
    return this.color_.getLightness();
  }

  get() {
    return [this.h, this.s, this.l];
  }

  set(hsl) {
    this.h = hsl[0];
    this.s = hsl[1];
    this.l = hsl[2];
  }

  toCss() {
    let s = Color.toPercent(this.s);
    let l = Color.toPercent(this.l);
    return 'hsl(' + this.h + ', ' + s + ', ' + l + ')';
  }
}
