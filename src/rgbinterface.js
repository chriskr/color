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

class RGBInterface {
  constructor(color) {
    this.color_ = color;
  }

  set r(r) {
    this.color_.setRed(r);
  }

  get r() {
    return this.color_.getRed();
  }

  set g(g) {
    this.color_.setGreen(g);
  }

  get g() {
    return this.color_.getGreen();
  }

  set b(b) {
    this.color_.setBlue(b);
  }

  get b() {
    return this.color_.getBlue();
  }

  get() {
    return [this.r, this.g, this.b];
  }

  set(rgb) {
    this.r = rgb[0];
    this.g = rgb[1];
    this.b = rgb[2];
  }

  toCss() {
    return "rgb(" + this.r + ", " + this.g + ", " + this.b + ")";
  }
}
