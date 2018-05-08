'use strict';

var _css = require('antd/lib/input/style/css');

var _input = require('antd/lib/input');

var _input2 = _interopRequireDefault(_input);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _publicDatas = require('../../supports/publicDatas');

var _findIndex = require('lodash/findIndex');

var _findIndex2 = _interopRequireDefault(_findIndex);

var _isEqual = require('lodash/isEqual');

var _isEqual2 = _interopRequireDefault(_isEqual);

var _cloneDeep = require('lodash/cloneDeep');

var _cloneDeep2 = _interopRequireDefault(_cloneDeep);

var _uniqBy = require('lodash/uniqBy');

var _uniqBy2 = _interopRequireDefault(_uniqBy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UploadImage = function (_Component) {
  _inherits(UploadImage, _Component);

  function UploadImage(props) {
    _classCallCheck(this, UploadImage);

    var _this = _possibleConstructorReturn(this, (UploadImage.__proto__ || Object.getPrototypeOf(UploadImage)).call(this, props));

    _this.state = {
      isLoad: false,
      files: [],
      upReceiverFun: null,
      inputVideoUrl: "",
      inputVideoHelp: ""
    };

    _this.getInputVideo = _this.getInputVideo.bind(_this);
    _this.changeInputVideo = _this.changeInputVideo.bind(_this);
    return _this;
  }

  _createClass(UploadImage, [{
    key: 'changeInputVideo',
    value: function changeInputVideo(e) {
      var value = e.target.value;
      console.log("changeInputVideo", value);
      this.setState({ inputVideoUrl: value });
    }
  }, {
    key: 'getInputVideo',
    value: function getInputVideo(e) {
      var _this2 = this;

      var value = e.target.value;

      this.state.inputVideoUrl = "";
      this.state.inputVideoHelp = "";
      this.forceUpdate();
      setTimeout(function () {
        _this2.state.files.push({ url: value, name: value, status: "done", uid: "uid_" + _publicDatas.PRO_COMMON.String.RndNum(20) });

        setTimeout(function () {
          _this2.props.cbReceiver(_this2.state.files);
        }, 100);
      }, 100);
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var list = [];
      if (!!this.props.fileList) {
        this.props.fileList.copyWithin(list);
      }

      if (!!list) {
        this.setState({ files: list });
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.isOpenModel) {
        this.state.files = [];
        this.forceUpdate();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'div',
          { style: { margin: "10px 0 0" } },
          _react2.default.createElement(_input2.default, {
            placeholder: '\u60A8\u8FD8\u53EF\u4EE5\u624B\u52A8\u8F93\u5165\u56FE\u7247\u8D44\u6E90\u5730\u5740\uFF0C\u8F93\u5165\u5B8C\u6BD5\u6309\u56DE\u8F66\u952E\u786E\u8BA4',
            value: this.state.inputVideoUrl,
            onChange: this.changeInputVideo,
            onPressEnter: this.getInputVideo }),
          _react2.default.createElement(
            'span',
            { style: { color: 'red' } },
            this.state.inputVideoHelp,
            '\xA0'
          )
        )
      );
    }
  }]);

  return UploadImage;
}(_react.Component);

UploadImage.defaultProps = {
  limit: 1,
  isMultiple: false,
  isShowUploadList: true,
  fileType: "image",
  description: "请根据要求上传。"
};

module.exports = UploadImage;