import React, { Component } from 'react';
import Typography from "@material-ui/core/Typography/Typography";

class Header extends Component {

    render() {
        return(
            <Typography variant="h6" noWrap color="textPrimary" gutterBottom>{this.props.header}</Typography>
        );
    }
}

export default Header;