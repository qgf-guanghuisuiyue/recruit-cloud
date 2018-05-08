'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _index = require('./editor/index.jsx');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Test = function (_React$Component) {
  _inherits(Test, _React$Component);

  function Test(props) {
    _classCallCheck(this, Test);

    var _this = _possibleConstructorReturn(this, (Test.__proto__ || Object.getPrototypeOf(Test)).call(this, props));

    _this.state = {
      htmlContent: ''
    };
    _this.receiveHtml = _this.receiveHtml.bind(_this);
    _this.receiveMarkdown = _this.receiveMarkdown.bind(_this);
    _this.receiveRaw = _this.receiveRaw.bind(_this);
    _this.resetEditorState = _this._resetEditorState.bind(_this);
    return _this;
  }

  _createClass(Test, [{
    key: 'receiveHtml',
    value: function receiveHtml(content) {}
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      console.log(this.refs.LzEditor);
    }
  }, {
    key: '_resetEditorState',
    value: function _resetEditorState() {
      this.refs.LzEditor.resetEditorState();
    }
  }, {
    key: 'receiveMarkdown',
    value: function receiveMarkdown(content) {}
  }, {
    key: 'receiveRaw',
    value: function receiveRaw(content) {}
  }, {
    key: 'render',
    value: function render() {
      var uploadConfig = {
        QINIU_URL: "http://up.qiniu.com",
        QINIU_IMG_TOKEN_URL: "http://www.yourServerAddress.mobi/getUptokenOfQiniu.do",
        QINIU_PFOP: {
          url: "http://www.yourServerAddress.mobi/doQiniuPicPersist.do" },
        QINIU_VIDEO_TOKEN_URL: "http://www.yourServerAddress.mobi/getUptokenOfQiniu.do",
        QINIU_FILE_TOKEN_URL: "http://www.yourServerAddress.mobi/getUptokenOfQiniu.do?name=patch",
        QINIU_IMG_DOMAIN_URL: "https://image.yourServerAddress.mobi",
        QINIU_DOMAIN_VIDEO_URL: "https://video.yourServerAddress.mobi",
        QINIU_DOMAIN_FILE_URL: "https://static.yourServerAddress.com/" };
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'div',
          null,
          'Editor demo 1 (use default html format ):'
        ),
        _react2.default.createElement(_index2.default, {
          ref: 'LzEditor',
          active: true,
          importContent: this.state.htmlContent,
          cbReceiver: this.receiveHtml,
          uploadConfig: uploadConfig,
          scrollHeight: 500
        }),
        _react2.default.createElement(
          'a',
          { href: 'javascript:;', style: {
              fontSize: '33px',
              color: 'black',
              fontWeight: 'bold',
              display: 'block',
              margin: 50
            }, onClick: this.resetEditorState },
          '\u91CD\u7F6E\u7F16\u8F91\u5668'
        )
      );
    }
  }]);

  return Test;
}(_react2.default.Component);

_reactDom2.default.render(_react2.default.createElement(Test, null), document.getElementById('test'));