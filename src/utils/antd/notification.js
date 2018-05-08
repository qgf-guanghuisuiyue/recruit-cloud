import {notification} from 'antd';

module.exports = (function(){
    let ntfication = function() {}

    ntfication.prototype.error = function(message,description=''){
        description = arguments.length === 1 ? message : description;
        message = arguments.length === 1 ? '错误信息' : message;
        notification.error({
            message: message,
            description: description
        });
    }
    ntfication.prototype.success = function(message,description='') {
        description = arguments.length === 1 ? message : description;
        message = arguments.length === 1 ? '提示' : message;
        notification.success({
            message: message,
            description: description
        });
    }
    return new ntfication();
})();