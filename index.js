'use strict';

var fs = require('fs');
var path = require('path');

module.exports = function(options) {
  var options = options || {};
  var lang = 'ru';
  var nbsp = '&nbsp;';

  var prepositions = {
    ru: /(^|\s)(я|к|с|вы?|(д|т|к|з)?ак?|(д|п)о|и(з|х)?|о(б|т|н)?|уж?|н(а|о|е))\s/gi
  };

  var replaceNbsp = function(text) {
    return text.replace(prepositions[lang], function(match) {
      return match.trimRight() + nbsp;
    });
  }

  if (options.i == null && options.s == null) {
    return new TypeError("Error#options: the `input` parameter isn't specified");
  }

  if (options.l != null) {
    var lang = options.l;
  }

  if (options.i) {
    var inputPath = path.resolve(__dirname, options.i);
    var file = fs.readFileSync(inputPath, 'utf8');
    return replaceNbsp(file);
  }

  if (options.s) {
    return replaceNbsp(options.s);
  }
}
