import React, { Component } from 'react';
import Typography from "@material-ui/core/Typography/Typography";
import {withStyles} from "@material-ui/core";

const styles = theme => ({
    root: {
        marginBottom: theme.spacing.unit * 3,
        color: '#524848',
        position: 'relative',
        "&::after": {
        content: "''",
            height: 2,
            width: 20,
            backgroundColor: theme.palette.primary.main,
            position: 'absolute',
            bottom: 0,
            left: 0,
        }
    },
});

class Header extends Component {


    render() {
        const { classes } = this.props;
        return(
            <Typography
                variant="h6"
                noWrap
                className={classes.root}
            >{this.props.header}</Typography>
        );
    }
}

export default withStyles(styles)(Header);