import * as types from 'constants/file';
import axios from 'axios';

import {message} from 'antd';

const REMOVE_UPLOAD_FILE = {type: types.REMOVE_UPLOAD_FILE};

export const removeUploadFIle = fileName => (dispatch,getState) => {
    let fd = new FormData();
    fd.append('fileName',fileName);
    axios.post(`${prefixUri}/uploadremove`,fd)
    .then(response=>{
        const {data} = response;
        if(data.success) {
            message.success('删除附件成功！');
        }else{
            message.error('删除附件失败！');
        }
    });
}