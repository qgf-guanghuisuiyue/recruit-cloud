import React, {Component} from 'react';

export default class BasicPage extends Component {
    showNProgress() {
        NProgress.start();
    }
    hideNProgress() {
        NProgress.done();
    }
}