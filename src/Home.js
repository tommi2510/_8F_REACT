import React, { Component } from 'react';
import './App.css';
import Appbar from './Appbar';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import Signup from './components/Signup.js';

class Home extends Component {
    render() {
        return (
            <div>
                <Signup />
            </div>
        );
    }
}

export default Home;