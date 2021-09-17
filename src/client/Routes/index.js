import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import TeachersPortal from '../Pages/TeachersPortal';
import CodeManagement from '../Pages/CodeManagement';
import User from '../models/user';

export default class Routes extends Component {
    constructor(props, context) {
        super(props, context);

        this.user = User.getAposUser() || {};
    }

    render() {
        const { user } = this;

        return (
            <BrowserRouter>
                <div>
                    {user._permissions && user._permissions.teacher ? (<Route path="/teachers-portal" component={TeachersPortal}/>): null }
                    {user._permissions && user._permissions.admin ? (<Route path="/codes" component={CodeManagement}/>):null}
                </div>
            </BrowserRouter>
        );
    }
}
