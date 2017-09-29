'use strict';

StyleSheetList.prototype.getDeclaration = function ()
/* selector1, selector2, ... */{
  for (var i = 0; i < arguments.length; i++) {
    var selector = arguments[i];
    var reSelector = new RegExp('(?:^|,\\s*)' + selector.replace(/[\[\]\-]/g, function (m) {
      return '\\' + m;
    }) + '(?:$|\\s*,)');
    for (var j = 0, sheet; sheet = this[j]; j++) {
      // does not take into account import rules
      if (sheet.cssRules && sheet.cssRules.length) {
        for (var k = 0, rules = sheet.cssRules, rule; rule = rules[k]; k++) {
          if (rule.type == 1 && reSelector.test(rule.selectorText)) {
            return rule.style;
          }
        }
      }
    }
  }
  return null;
};