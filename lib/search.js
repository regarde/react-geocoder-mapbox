"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var search = function () {
  var _ref = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(endpoint, source, accessToken, proximity, bbox, types, language, countries, fuzzyMatch, limit, routing, query) {
    var uri, response, result;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            uri = endpoint + '/geocoding/v5/' + source + '/' + encodeURIComponent(query) + '.json' + '?access_token=' + accessToken + (proximity ? '&proximity=' + proximity : '') + (bbox ? '&bbox=' + bbox : '') + (types ? '&types=' + encodeURIComponent(types) : '') + (language ? '&language=' + language : '') + (countries ? '&country=' + encodeURIComponent(countries) : '') + '&fuzzyMatch=' + fuzzyMatch + (limit ? '&limit=' + limit : '') + (routing ? '&routing=' + routing : '');
            _context.next = 3;
            return fetch(uri);

          case 3:
            response = _context.sent;

            if (!(response.status === 200)) {
              _context.next = 11;
              break;
            }

            _context.next = 7;
            return response.json();

          case 7:
            result = _context.sent;
            return _context.abrupt("return", result);

          case 11:
            return _context.abrupt("return", null);

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function search(_x, _x2, _x3, _x4, _x5, _x6, _x7, _x8, _x9, _x10, _x11, _x12) {
    return _ref.apply(this, arguments);
  };
}();

var _default = search;
exports.default = _default;