import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Header from "./Header";
import {Grid} from "@material-ui/core";
import AppContainer from "./AppContainer";



const styles = theme => ({
    root: {

    },
    container: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 50,
    },
});

class Loading extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }



    render() {
        const { classes } =this.props;
        return (
            <AppContainer>
                <Grid className={classes.container}>
                    <Header header="Loading..." />
                </Grid>
            </AppContainer>
        );
    }
}

Loading.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Loading);