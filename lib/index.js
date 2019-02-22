"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _search = _interopRequireDefault(require("./search"));

/**
 * Geocoder component: connects to Mapbox.com Geocoding API
 * and provides an autocompleting interface for finding locations.
 */
var Geocoder =
/*#__PURE__*/
function (_PureComponent) {
  (0, _inherits2.default)(Geocoder, _PureComponent);

  function Geocoder() {
    var _ref;

    var _this;

    (0, _classCallCheck2.default)(this, Geocoder);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_ref = Geocoder.__proto__ || Object.getPrototypeOf(Geocoder)).call.apply(_ref, [this].concat(args)));
    (0, _defineProperty2.default)(_this, "state", {
      results: [],
      focus: null,
      loading: false,
      value: '',
      isActive: false
    });
    (0, _defineProperty2.default)(_this, "clickOption", function (place, listLocation) {
      _this.props.onSelect(place);

      _this.setState({
        focus: listLocation,
        value: place.place_name
      }); // focus on the input after click to maintain key traversal


      _reactDom.default.findDOMNode(_this.inputRef).focus();

      return false;
    });
    (0, _defineProperty2.default)(_this, "onInput", function () {
      var _ref2 = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee(e) {
        var value, result;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                value = e.target.value;

                _this.setState({
                  loading: true,
                  value: value
                });

                if (!(value === '')) {
                  _context.next = 6;
                  break;
                }

                _this.setState({
                  results: [],
                  focus: null,
                  loading: false
                });

                _context.next = 10;
                break;

              case 6:
                _context.next = 8;
                return (0, _search.default)(_this.props.endpoint, _this.props.source, _this.props.accessToken, _this.props.proximity, _this.props.bbox, _this.props.types, _this.props.language, _this.props.countries, _this.props.fuzzyMatch, _this.props.limit, _this.props.routing, value);

              case 8:
                result = _context.sent;

                _this.onResult(result);

              case 10:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      return function (_x) {
        return _ref2.apply(this, arguments);
      };
    }());
    (0, _defineProperty2.default)(_this, "onResult", function (result) {
      if (result) {
        _this.setState({
          loading: false,
          results: result.features,
          focus: null
        });

        _this.props.onSuggest(_this.state.results);
      }
    });
    (0, _defineProperty2.default)(_this, "onKeyDown", function (e) {
      switch (e.which) {
        // up
        case 38:
          e.preventDefault();

          _this.moveFocus(-1);

          break;
        // down

        case 40:
          _this.moveFocus(1);

          break;
        // accept

        case 13:
          if (_this.state.results.length > 0 && _this.state.focus == null) {
            _this.clickOption(_this.state.results[0], 0);
          }

          _this.acceptFocus();

          break;

        default:
      }
    });
    (0, _defineProperty2.default)(_this, "moveFocus", function (dir) {
      if (_this.state.loading) return;

      _this.setState({
        focus: _this.state.focus === null ? 0 : Math.max(0, Math.min(_this.state.results.length - 1, _this.state.focus + dir))
      });
    });
    (0, _defineProperty2.default)(_this, "hideDropdown", function () {
      _this.setState({
        isActive: false
      });
    });
    (0, _defineProperty2.default)(_this, "showDropdown", function () {
      _this.setState({
        isActive: true
      });
    });
    return _this;
  }

  (0, _createClass2.default)(Geocoder, [{
    key: "acceptFocus",
    value: function acceptFocus() {
      if (this.state.focus !== null) {
        this.setState({
          value: this.state.results[this.state.focus].place_name
        });
        this.props.onSelect(this.state.results[this.state.focus].place_name);
      }
    }
  }, {
    key: "clickOption",
    value: function clickOption(place, listLocation) {
      this.props.onSelect(place);
      this.setState({
        focus: listLocation
      }); // focus on the input after click to maintain key traversal

      _reactDom.default.findDOMNode(this.inputRef).focus();

      return false;
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      if (this.props.defaultValue && this.props.defaultValue != "") {
        this.setState({
          value: this.props.defaultValue
        });
      }

      if (this.props.focusOnMount) {
        _reactDom.default.findDOMNode(this.inputRef).focus();
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var input = _react.default.createElement("input", {
        ref: function ref(input) {
          return _this2.inputRef = input;
        },
        className: this.props.inputClass,
        onChange: this.onInput,
        onKeyDown: this.onKeyDown,
        placeholder: this.props.inputPlaceholder,
        type: "text",
        value: this.state.value,
        autoComplete: "off",
        id: this.props.id,
        name: this.props.name
      });

      return _react.default.createElement("div", {
        onBlur: this.hideDropdown,
        onFocus: this.showDropdown,
        className: this.props.containerClass
      }, this.props.inputPosition === 'top' && input, !!this.state.results.length && this.state.isActive && _react.default.createElement("ul", {
        className: "".concat(this.props.showLoader && this.state.loading ? 'loading' : '', " ").concat(this.props.resultsClass)
      }, this.state.results.map(function (result, i) {
        return _react.default.createElement("li", {
          key: result.id
        }, _react.default.createElement("a", {
          // onMouseDown fires before onBlur
          onMouseDown: function onMouseDown() {
            return _this2.clickOption(result, i);
          },
          onMouseOver: function onMouseOver() {
            return _this2.setState({
              focus: i
            });
          },
          className: "".concat(_this2.props.resultClass, " ").concat(i === _this2.state.focus ? _this2.props.resultFocusClass : ''),
          key: result.id
        }, result.place_name));
      })), this.props.inputPosition === 'bottom' && input);
    }
  }]);
  return Geocoder;
}(_react.PureComponent);

(0, _defineProperty2.default)(Geocoder, "propTypes", {
  endpoint: _propTypes.default.string,
  source: _propTypes.default.string,
  containerClass: _propTypes.default.string,
  inputClass: _propTypes.default.string,
  resultClass: _propTypes.default.string,
  resultsClass: _propTypes.default.string,
  inputPosition: _propTypes.default.string,
  inputPlaceholder: _propTypes.default.string,
  resultFocusClass: _propTypes.default.string,
  onSelect: _propTypes.default.func.isRequired,
  onSuggest: _propTypes.default.func,
  accessToken: _propTypes.default.string.isRequired,
  proximity: _propTypes.default.string,
  bbox: _propTypes.default.string,
  showLoader: _propTypes.default.bool,
  focusOnMount: _propTypes.default.bool,
  types: _propTypes.default.string,
  language: _propTypes.default.string,
  countries: _propTypes.default.string,
  fuzzyMatch: _propTypes.default.bool,
  limit: _propTypes.default.string,
  routing: _propTypes.default.bool,
  id: _propTypes.default.string,
  name: _propTypes.default.string,
  defaultValue: _propTypes.default.string
});
(0, _defineProperty2.default)(Geocoder, "defaultProps", {
  endpoint: 'https://api.tiles.mapbox.com',
  inputClass: '',
  resultClass: '',
  resultsClass: '',
  resultFocusClass: 'strong',
  inputPosition: 'top',
  inputPlaceholder: 'Search',
  showLoader: false,
  source: 'mapbox.places',
  proximity: '',
  bbox: '',
  types: '',
  countries: '',
  language: '',
  fuzzyMatch: true,
  limit: '5',
  routing: false,
  onSuggest: function onSuggest() {},
  focusOnMount: true,
  defaultValue: ''
});
var _default = Geocoder;
exports.default = _default;