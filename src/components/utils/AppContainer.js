import React, { Component } from 'react';
import {withStyles} from "@material-ui/core";
import PropTypes from "prop-types";
import AppBar from './AppBar';

const styles = theme => ({
    root: {

    },
});

class AppContainer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.log(this.props)
        const { children } = this.props;
        return (
            <div>
                <AppBar />
                {children}
            </div>
        );
    }

}

AppContainer.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AppContainer);