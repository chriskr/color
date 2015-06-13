StyleSheetList.prototype.getDeclaration = function(selector) {
  var reSelector = new RegExp('(?:^|,\\s*)' +
      selector.replace(/[\[\]\-]/g, function(m) {
        return '\\' + m;
      }) + '(?:$|\\s*,)');
  for (var i = 0, sheet; sheet = this[i]; i++) {
    // does not take into account import rules
    if (sheet.cssRules && sheet.cssRules.length) {
      for (var j = 0, rules = sheet.cssRules, rule; rule = rules[j]; j++) {
        if (rule.type == 1 && reSelector.test(rule.selectorText)) {
          return rule.style;
        }
      }
    }
  }
  return null;
};
