'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _css = require('antd/lib/affix/style/css');

var _affix = require('antd/lib/affix');

var _affix2 = _interopRequireDefault(_affix);

var _css2 = require('antd/lib/modal/style/css');

var _modal = require('antd/lib/modal');

var _modal2 = _interopRequireDefault(_modal);

var _css3 = require('antd/lib/input/style/css');

var _input = require('antd/lib/input');

var _input2 = _interopRequireDefault(_input);

var _css4 = require('antd/lib/message/style/css');

var _message = require('antd/lib/message');

var _message2 = _interopRequireDefault(_message);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

require('./components.css');

require('../global/supports/resources/system.css');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactCustomScrollbars = require('react-custom-scrollbars');

var _draftJs = require('draft-js');

var _utils = require('./utils');

var _getSelectedBlocks = require('./utils/stateUtils/getSelectedBlocks');

var _getSelectedBlocks2 = _interopRequireDefault(_getSelectedBlocks);

var _publicDatas = require('../global/supports/publicDatas');

var _LinkDecorator = require('./decorators/LinkDecorator');

var _LinkDecorator2 = _interopRequireDefault(_LinkDecorator);

var _ImageDecorator = require('./decorators/ImageDecorator');

var _ImageDecorator2 = _interopRequireDefault(_ImageDecorator);

var _mediaImageUploader = require('./toolBar/mediaImageUploader');

var _mediaImageUploader2 = _interopRequireDefault(_mediaImageUploader);

var _autoSaveList = require('./toolBar/autoSaveList');

var _autoSaveList2 = _interopRequireDefault(_autoSaveList);

var _styleButton = require('./toolBar/styleButton');

var _styleButton2 = _interopRequireDefault(_styleButton);

var _blockStyleControls = require('./toolBar/blockStyleControls');

var _blockStyleControls2 = _interopRequireDefault(_blockStyleControls);

var _alignmentControls = require('./toolBar/alignmentControls');

var _alignmentControls2 = _interopRequireDefault(_alignmentControls);

var _inlineStyleControls = require('./toolBar/inlineStyleControls');

var _inlineStyleControls2 = _interopRequireDefault(_inlineStyleControls);

var _urlControls = require('./toolBar/urlControls');

var _cookieControls = require('./toolBar/cookieControls');

var _undoredoControls = require('./toolBar/undoredoControls');

var _undoredoControls2 = _interopRequireDefault(_undoredoControls);

var _colorConfig = require('./utils/colorConfig');

var _ExtendedRichUtils = require('./utils/ExtendedRichUtils');

var _ExtendedRichUtils2 = _interopRequireDefault(_ExtendedRichUtils);

var _isEmpty = require('lodash/isEmpty');

var _isEmpty2 = _interopRequireDefault(_isEmpty);

var _trim = require('lodash/trim');

var _trim2 = _interopRequireDefault(_trim);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var decorator = new _draftJs.CompositeDecorator([_LinkDecorator2.default, _ImageDecorator2.default]);

var EditorConcist = function (_React$Component) {
  _inherits(EditorConcist, _React$Component);

  function EditorConcist(props) {
    _classCallCheck(this, EditorConcist);

    var _this = _possibleConstructorReturn(this, (EditorConcist.__proto__ || Object.getPrototypeOf(EditorConcist)).call(this, props));

    _this.state = {
      openFullTest: "全屏",
      showSourceEditor: "源码",
      showURLInput: false,
      urlValue: '',
      hasPasted: false,
      autoSaveFun: null,
      visible: false,
      showMarkdownSource: false,
      tempSouceContent: "",

      editorState: function () {
        var originalString = _this.props.importContent;
        originalString = !originalString ? " " : originalString;
        if (!originalString) {
          return _draftJs.EditorState.createEmpty(decorator);
        } else {
          var ConvertFormatProps = _this.props.convertFormat;
          var contentState = void 0;
          if (ConvertFormatProps === 'html') {
            contentState = (0, _utils.stateFromHTML)(originalString);
          } else if (ConvertFormatProps === 'markdown') {
            contentState = (0, _utils.stateFromMD)(originalString);
          } else if (ConvertFormatProps === 'raw') {
            originalString = originalString.replace(/\s/g, "") ? originalString : "{}";
            var rawContent = JSON.parse(originalString);
            if ((0, _isEmpty2.default)(rawContent)) {
              return _draftJs.EditorState.createWithContent("", decorator);
            }
            contentState = (0, _draftJs.convertFromRaw)(rawContent);
          }
          return _draftJs.EditorState.createWithContent(contentState, decorator);
        }
      }()
    };

    _this.onChange = function (editorState) {
      _this.setState({ editorState: editorState });
      var that = _this;
      if (that.timer) {
        clearTimeout(that.timer);
      }
      that.timer = setTimeout(function () {
        var rawContentState = that.state.editorState.getCurrentContent();

        var content = void 0;
        content = (0, _utils.stateToHTML)(rawContentState);
        that.props.cbReceiver(content);
      }, 300);
    };

    _this.handleKeyCommand = function (command) {
      return _this._handleKeyCommand(command);
    };
    _this.toggleBlockType = function (type) {
      return _this._toggleBlockType(type);
    };
    _this.toggleAlignment = function (type) {
      return _this._toggleAlignment(type);
    };
    _this.toggleInlineStyle = function (style) {
      return _this._toggleInlineStyle(style);
    };
    _this.customKeyBinding = _this._customKeyBinding.bind(_this);
    _this.handlePastedText = _this._handlePastedText.bind(_this);

    _this.logState = function () {
      var content = _this.state.editorState.getCurrentContent();
    };

    _this.resetEditorState = _this._resetEditorState.bind(_this);

    _this.addMedia = _this._addMedia.bind(_this);
    _this.addImage = _this._addImage.bind(_this);
    _this.undoRedo = _this._undoRedo.bind(_this);
    _this.choiceAutoSave = _this._choiceAutoSave.bind(_this);

    _this.promptForLink = _this._promptForLink.bind(_this);
    _this.onURLChange = function (e) {
      return _this.setState({ urlValue: e.target.value });
    };
    _this.confirmLink = _this._confirmLink.bind(_this);
    _this.onLinkInputKeyDown = _this._onLinkInputKeyDown.bind(_this);
    _this.removeLink = _this._removeLink.bind(_this);
    _this.openFull = _this._openFull.bind(_this);
    _this.toggleSource = _this._toggleSource.bind(_this);
    _this.handleOk = _this.handleOk.bind(_this);
    _this.handleCancel = _this.handleCancel.bind(_this);
    _this.solidHtml = _this._solidHtml.bind(_this);
    _this.changeMrakdownContent = _this._changeMrakdownContent.bind(_this);
    return _this;
  }

  _createClass(EditorConcist, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      var content = this.props.importContent;

      var contentState = (0, _utils.stateFromHTML)(content);

      this.state.autoSaveFun = setInterval(function () {
        _this2.handleKeyCommand("editor-save");
      }, 60000);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(newProps) {
      if (!newProps.active) {
        return false;
      }
      if (newProps.importContent == this.props.importContent) {
        return false;
      }
      var ConvertFormatProps = this.props.convertFormat;
      var newContent = "";

      if (ConvertFormatProps === "html") {
        newContent = newProps.importContent.replace(/[\s\xA0\u1680\u180E\u2000-\u200A\u2028\u2029\u202F\u205F\u3000]\>/g, ">");
        if (newContent == "undefined" || !newContent) {
          newContent = "<p>&nbsp;</p>";
        }
      } else if (ConvertFormatProps === "markdown") {
        newContent = newProps.importContent || "";
        this.state.tempSouceContent = newContent;
      } else if (ConvertFormatProps === "raw") {
        newContent = newProps.importContent || "{}";
      }

      var contentState = void 0;
      if (ConvertFormatProps === 'html') {
        contentState = (0, _utils.stateFromHTML)(newContent);
      } else if (ConvertFormatProps === 'markdown') {
        contentState = (0, _utils.stateFromMD)(newContent);
      } else if (ConvertFormatProps === 'raw') {
        var rawContent = JSON.parse(newContent);
        contentState = (0, _draftJs.convertFromRaw)(rawContent);
      }

      var values = _draftJs.EditorState.createWithContent(contentState, decorator);
      this.state.editorState = values;
    }
  }, {
    key: '_resetEditorState',
    value: function _resetEditorState() {
      this.setState({ editorState: _draftJs.EditorState.createEmpty() });
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      clearInterval(this.state.autoSaveFun);
    }
  }, {
    key: 'handleOk',
    value: function handleOk() {
      this.setState({ visible: false });
    }
  }, {
    key: 'handleCancel',
    value: function handleCancel(e) {
      this.setState({ visible: false });
    }
  }, {
    key: '_promptForLink',
    value: function _promptForLink(e) {
      e.preventDefault();
      var editorState = this.state.editorState;

      var selection = editorState.getSelection();

      if (!selection.isCollapsed()) {

        var that = this;
        this.setState({
          showURLInput: true,
          urlValue: '',
          visible: true
        }, function () {});
      } else {
        _message2.default.error("创建链接前请先选中链接文字！", 5);
      }
    }
  }, {
    key: '_confirmLink',
    value: function _confirmLink(e) {
      var _state = this.state,
          editorState = _state.editorState,
          urlValue = _state.urlValue;

      var entityKey = _draftJs.Entity.create('LINK', 'MUTABLE', { url: urlValue });
      this.setState({
        editorState: _draftJs.RichUtils.toggleLink(editorState, editorState.getSelection(), entityKey),
        showURLInput: false,
        urlValue: ''
      }, function () {
        setTimeout(function () {}, 0);
      });
    }
  }, {
    key: '_onLinkInputKeyDown',
    value: function _onLinkInputKeyDown(e) {
      if (e.which === 13) {
        this._confirmLink(e);
        return false;
      }
    }
  }, {
    key: '_removeLink',
    value: function _removeLink(e) {
      e.preventDefault();
      var editorState = this.state.editorState;

      var selection = editorState.getSelection();
      if (!selection.isCollapsed()) {
        this.setState({
          editorState: _draftJs.RichUtils.toggleLink(editorState, selection, null)
        });
      } else {
        _message2.default.error("移除链接前请先选中链接！", 5);
      }
    }
  }, {
    key: '_openFull',
    value: function _openFull(e) {
      e.preventDefault();
      var ele = document.querySelector(".RichEditor-root"),
          affix = document.querySelector("#text-editor-affix"),
          affixToolBar = document.querySelector("#text-editor-affix>div");
      if (ele.classList.contains("openFullAll")) {
        ele.className = ele.className.replace("openFullAll", "");
        affix.style = "";
        affixToolBar.className = "";
        affixToolBar.style = "";
        this.setState({
          openFullTest: "全屏"
        });
      } else {
        ele.className += ' openFullAll';
        setTimeout(function () {
          affix.style = "width: " + affix.offsetWidth + "px; height: 0; margin-bottom: 70px;";
          affixToolBar.className = "ant-affix";
          affixToolBar.style = "position: fixed; top: 0; left: 0; width: " + affix.offsetWidth + "px;margin: 0 15px 15px;";
        }, 500);
        this.setState({
          openFullTest: "退出全屏"
        });
      }
    }
  }, {
    key: '_toggleSource',
    value: function _toggleSource(e) {
      e.preventDefault();
      var ele = document.querySelector(".RichEditor-root");
      if (ele.classList.contains("showSource")) {
        ele.className = ele.className.replace("showSource", "");
        this.setState({
          showSourceEditor: "源码",
          showMarkdownSource: false
        });
      } else {
        ele.className += ' showSource';
        this.setState({
          showSourceEditor: "预览",
          showMarkdownSource: true
        });
      }
    }
  }, {
    key: '_changeMrakdownContent',
    value: function _changeMrakdownContent(e) {
      var markdownContent = e.target.value;

      var contentState = (0, _utils.stateFromMD)(markdownContent);
      var values = _draftJs.EditorState.createWithContent(contentState, decorator);
      this.state.tempSouceContent = markdownContent;
      this.state.editorState = values;
      this.forceUpdate();
    }
  }, {
    key: '_handleKeyCommand',
    value: function _handleKeyCommand(command) {
      var editorState = this.state.editorState;

      var newState = _draftJs.RichUtils.handleKeyCommand(editorState, command);
      if (command === 'editor-save' && this.props.autoSave == true) {

        var rawContentState = editorState.getCurrentContent();
        var content = "",
            newText = "";

        var ConvertFormatProps = this.props.convertFormat;
        if (ConvertFormatProps === 'html') {
          content = (0, _utils.stateToHTML)(rawContentState);
          newText = content.replace(/<[^>]*>|&[^;]*;/g, "");
        } else if (ConvertFormatProps === 'markdown') {
          content = (0, _utils.stateToMD)(rawContentState);
        } else if (ConvertFormatProps === 'raw') {
          var rawContent = (0, _draftJs.convertToRaw)(rawContentState);
          content = JSON.stringify(rawContent);
        }

        if (newText.length < 30) {
          return false;
        }
        var start30Text = newText.substr(0, 30);
        _publicDatas.PRO_COMMON.localDB.setter("$d" + start30Text, content);
        _message2.default.success("编辑器内容已更新到保险库中", 5);
        return true;
      } else if (command === "editor-paste") {
        return true;
      }
      if (newState) {
        this.onChange(newState);
        return true;
      }
      return false;
    }
  }, {
    key: '_customKeyBinding',
    value: function _customKeyBinding(e) {
      var hasCommandModifier = _draftJs.KeyBindingUtil.hasCommandModifier;

      if (e.keyCode === 83 && hasCommandModifier(e)) {
        return 'editor-save';
      } else if (e.keyCode === 86 && hasCommandModifier(e)) {}
      return (0, _draftJs.getDefaultKeyBinding)(e);
    }
  }, {
    key: '_solidHtml',
    value: function _solidHtml(html) {
      var walk_the_DOM = function walk(node, func) {
        func(node);
        node = node.firstChild;
        while (node) {
          walk(node, func);
          node = node.nextSibling;
        }
      };
      var wrapper = document.createElement('div');
      wrapper.innerHTML = html;
      walk_the_DOM(wrapper.firstChild, function (element) {
        if (element.removeAttribute) {
          element.removeAttribute('id');
          element.removeAttribute('style');
          element.removeAttribute('class');
        }
      });
      return wrapper.innerHTML;
    }
  }, {
    key: '_handlePastedText',
    value: function _handlePastedText(text, sourceString) {
      sourceString = this.solidHtml(sourceString);

      if (text == "undefined" && sourceString == "undefined") {
        return false;
      }
      if (sourceString == "undefined" || !sourceString) {
        return false;
      }
      var editorState = this.state.editorState;

      var rawContentState = editorState.getCurrentContent();
      var content = "",
          newText = "";
      content = (0, _utils.stateToHTML)(rawContentState);
      newText = content.replace(/<[^>]*>|&[^;]*;/g, "");

      if (this.state.hasPasted === true || (0, _trim2.default)(newText).length > 0) {
        var blockMap = _draftJs.ContentState.createFromText(text.trim()).blockMap;
        var newState = _draftJs.Modifier.replaceWithFragment(editorState.getCurrentContent(), editorState.getSelection(), blockMap);
        this.onChange(_draftJs.EditorState.push(editorState, newState, 'insert-fragment'));
        return true;
      }
      this.state.hasPasted = true;
      var decorator = new _draftJs.CompositeDecorator([_LinkDecorator2.default, _ImageDecorator2.default]);
      var contentState = "";

      contentState = (0, _utils.stateFromHTML)(sourceString);

      var values = _draftJs.EditorState.createWithContent(contentState, decorator);
      this.state.editorState = values;
      _message2.default.success("已经清空样式并成功粘贴，可能部分图片因原网站防盗链功能暂未显示。", 5);
      this.forceUpdate();
      return true;
    }
  }, {
    key: '_toggleBlockType',
    value: function _toggleBlockType(blockType) {
      this.onChange(_draftJs.RichUtils.toggleBlockType(this.state.editorState, blockType));
    }
  }, {
    key: '_toggleAlignment',
    value: function _toggleAlignment(alignment) {
      this.onChange(_ExtendedRichUtils2.default.toggleAlignment(this.state.editorState, alignment));
    }
  }, {
    key: '_toggleInlineStyle',
    value: function _toggleInlineStyle(inlineStyle) {
      this.onChange(_draftJs.RichUtils.toggleInlineStyle(this.state.editorState, inlineStyle));
    }
  }, {
    key: '_addMedia',
    value: function _addMedia(type, Object) {
      var src = Object.url;
      var entityKey = _draftJs.Entity.create(type, 'IMMUTABLE', { src: src });
      return _draftJs.AtomicBlockUtils.insertAtomicBlock(this.state.editorState, entityKey, ' ');
    }
  }, {
    key: '_addImage',
    value: function _addImage(Objects) {
      var that = this;

      Objects.map(function (item, i) {
        setTimeout(function () {
          var imageObj = that.addMedia('image', item);

          return that.onChange(imageObj);
        }, i * 100);
      });
    }
  }, {
    key: '_undoRedo',
    value: function _undoRedo(type) {
      if (this.state.editorState) {
        var newEditorState = null;
        if (type == "undo") {
          newEditorState = _draftJs.EditorState.undo(this.state.editorState);
        } else {
          newEditorState = _draftJs.EditorState.redo(this.state.editorState);
        }
        this.setState({ editorState: newEditorState });
      }
    }
  }, {
    key: '_choiceAutoSave',
    value: function _choiceAutoSave(savedImportContent) {
      var decorator = new _draftJs.CompositeDecorator([_LinkDecorator2.default, _ImageDecorator2.default]);
      var ConvertFormatProps = this.props.convertFormat;
      var contentState = "";
      if (ConvertFormatProps === 'html') {
        contentState = (0, _utils.stateFromHTML)(savedImportContent);
      } else if (ConvertFormatProps === 'markdown') {
        contentState = (0, _utils.stateFromMD)(savedImportContent);
      } else if (ConvertFormatProps === 'raw') {
        var rawContent = JSON.parse(savedImportContent);
        contentState = (0, _draftJs.convertFromRaw)(rawContent);
      }

      var values = _draftJs.EditorState.createWithContent(contentState, decorator);
      this.state.editorState = values;
      this.forceUpdate();
    }
  }, {
    key: 'render',
    value: function render() {
      var _React$createElement;

      var urlInput = void 0;

      if (this.state.showURLInput) {
        urlInput = _react2.default.createElement(
          _modal2.default,
          {
            title: '\u8BF7\u8F93\u51FA\u4F60\u8981\u8DF3\u8F6C\u7684\u94FE\u63A5',
            visible: this.state.visible,
            onOk: this.confirmLink,
            onCancel: this.handleCancel,
            closable: false },
          _react2.default.createElement(_input2.default, {
            type: 'text',
            onChange: this.onURLChange,
            value: this.state.urlValue,
            placeholder: 'http:// or https://',
            onKeyDown: this.onLinkInputKeyDown }),
          _react2.default.createElement(
            'span',
            { style: { color: "red" } },
            '\u8BF7\u8F93\u5165\u7B26\u5408\u89C4\u8303\u7684\u7F51\u5740\u94FE\u63A5\uFF08\u4EE5\u201Chttp://\u201D \u6216 \u201Chttps://\u201D\u4E3A\u524D\u5BFC\uFF09'
          )
        );
      }

      var editorState = this.state.editorState;

      var className = 'RichEditor-editor';
      var contentState = editorState.getCurrentContent();
      if (!contentState.hasText()) {
        if (contentState.getBlockMap().first().getType() !== 'unstyled') {
          className += ' RichEditor-hidePlaceholder';
        }
      }

      return _react2.default.createElement(
        'div',
        { className: 'RichEditor-root editorHidden', content: this.state.HTML, id: 'text-editor-container' },
        _react2.default.createElement(
          _affix2.default,
          { offsetTop: 0, id: 'text-editor-affix' },
          this.state.showMarkdownSource == false && this.props.undoRedo && _react2.default.createElement(_undoredoControls2.default, { onToggle: this.undoRedo }),
          this.state.showMarkdownSource == false && this.props.blockStyle && _react2.default.createElement(_blockStyleControls2.default, { editorState: editorState, onToggle: this.toggleBlockType }),
          this.props.alignment && this.props.convertFormat !== "markdown" && _react2.default.createElement(_alignmentControls2.default, { editorState: editorState, onToggle: this.toggleAlignment }),
          this.state.showMarkdownSource == false && this.props.inlineStyle && _react2.default.createElement(_inlineStyleControls2.default, { editorState: editorState, onToggle: this.toggleInlineStyle }),
          this.state.showMarkdownSource == false && this.props.image && _react2.default.createElement(_mediaImageUploader2.default, { receiveImage: this.addImage }),
          this.state.showMarkdownSource == false && this.props.urls && _react2.default.createElement(_urlControls.AddUrl, { editorState: editorState, onToggle: this.promptForLink }),
          this.state.showMarkdownSource == false && this.props.urls && _react2.default.createElement(_urlControls.CloseUrl, { editorState: editorState, onToggle: this.removeLink }),
          this.state.showMarkdownSource == false && this.props.autoSave && _react2.default.createElement(_autoSaveList2.default, { receiveSavedItem: this.choiceAutoSave }),
          this.props.fullScreen && _react2.default.createElement(_cookieControls.OpenFull, { editorState: editorState, onToggle: this.openFull, coverTitle: this.state.openFullTest }),
          this.props.convertFormat == "markdown" && _react2.default.createElement(_cookieControls.SourceEditor, { editorState: editorState, onToggle: this.toggleSource, coverTitle: this.state.showSourceEditor })
        ),
        _react2.default.createElement(
          _reactCustomScrollbars.Scrollbars,
          { style: { height: this.props.scrollHeight }, autoHide: this.props.autoHide },
          _react2.default.createElement(
            'div',
            { className: className, onClick: this.focus, style: { display: this.state.showMarkdownSource == true ? "none" : "block" } },
            _react2.default.createElement(_draftJs.Editor, (_React$createElement = {
              blockRendererFn: mediaBlockRenderer,
              blockStyleFn: getBlockStyle,
              customStyleMap: styleMap
            }, _defineProperty(_React$createElement, 'customStyleMap', _colorConfig.colorStyleMap), _defineProperty(_React$createElement, 'editorState', editorState), _defineProperty(_React$createElement, 'handleKeyCommand', this.handleKeyCommand), _defineProperty(_React$createElement, 'keyBindingFn', this.customKeyBinding), _defineProperty(_React$createElement, 'onChange', this.onChange), _defineProperty(_React$createElement, 'handlePastedText', this.handlePastedText), _defineProperty(_React$createElement, 'spellCheck', true), _React$createElement))
          )
        ),
        _react2.default.createElement(
          'div',
          { style: { display: this.state.showMarkdownSource == true ? "block" : "none", height: "500px", width: "100%" } },
          _react2.default.createElement('textarea', {
            style: { height: "100%", width: "100%", overflowY: "visible" },
            onChange: this.changeMrakdownContent,
            value: this.state.tempSouceContent || this.props.importContent,
            placeholder: '\u8BF7\u5728\u8FD9\u91CC\u7F16\u8F91\u60A8\u7684markdown\u5185\u5BB9' })
        ),
        urlInput
      );
    }
  }]);

  return EditorConcist;
}(_react2.default.Component);

exports.default = EditorConcist;

var styleMap = {
  CODE: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2
  }
};

function getBlockStyle(block) {
  var type = block.getType();
  var data = block.getData();
  var text = block.getText();

  var mergedStyle = "";
  switch (type) {
    case 'blockquote':
      mergedStyle = 'RichEditor-blockquote';
      break;
  }

  if (!data.has("textAlignment")) {
    return mergedStyle;
  }
  switch (data.get("textAlignment")) {
    case 'left':
      mergedStyle += ' RichEditor-alignment-left';
      break;
    case 'center':
      mergedStyle += ' RichEditor-alignment-center';
      break;
    case 'right':
      mergedStyle += ' RichEditor-alignment-right';
      break;
    case 'justify':
      mergedStyle += ' RichEditor-alignment-justify';
      break;
  }

  return mergedStyle;
}

function mediaBlockRenderer(block) {
  if (block.getType() === 'atomic') {
    return { component: Media, editable: false };
  }

  return null;
}

var Image = function Image(props) {
  return _react2.default.createElement('img', { src: props.src, className: 'media' });
};

var Media = function Media(props) {
  var entity = _draftJs.Entity.get(props.block.getEntityAt(0));

  var _entity$getData = entity.getData(),
      src = _entity$getData.src;

  var type = entity.getType();

  var media = void 0;
  if (type === 'audio') {
    media = _react2.default.createElement(Audio, { src: src });
  } else if (type === 'image') {
    media = _react2.default.createElement(Image, { src: src });
  } else if (type === 'video') {
    media = _react2.default.createElement(Video, { src: src });
  }
  return media;
};

EditorConcist.defaultProps = {
  undoRedo: true,
  blockStyle: true,
  alignment: true,
  inlineStyle: true,
  color: true,
  image: true,
  video: true,
  audio: true,
  urls: true,
  autoSave: true,
  fullScreen: true,
  convertFormat: 'html'
};