import React, { Component } from 'react';
import { Button, Grid, Table, TableBody, TableCell, TableHead, TableRow, Paper } from '@material-ui/core';
import Appbar from '../Appbar';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import queryString from 'query-string';
import Header from "./Header";


const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    table: {
        minWidth: 700,
    },
    container: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
    },
    paper: {
        width: '70%',
    }
});

class FlightList extends Component {

    constructor(props) {
        super(props);
        this.state = {flights: [], isLoading: true};

    }

    componentDidMount() {
        this.setState({isLoading: true});

        const values = queryString.parse(this.props.location.search);
        console.log(this.props)
        const location = this.props.location;

        const url = `api${location.pathname}${location.search}`;
        console.log(url);

        fetch(url)
            .then(response => response.json())
            .then(data => this.setState({flights: data, isLoading: false}));
    }


    render() {
        const { classes } = this.props;
        const {flights, isLoading} = this.state;

        if (isLoading) {
            return <p>Loading...</p>;
        }

        const flightList = flights.map(flight => {
            return <TableRow key={flight.id}>
                <TableCell component="th" scope="row">{flight.departure}</TableCell>
                <TableCell component="th" scope="row">{flight.arrival}</TableCell>
                <TableCell component="th" scope="row">{flight.scheduledTime}</TableCell>
            </TableRow>
        });

        return (
            <div>
                <Appbar/>
                <Grid className={classes.container}>
                    <Header header="Flights" />
                    <Paper className={classes.paper}>
                        <Table className={classes.table}>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Source</TableCell>
                                    <TableCell>Destination</TableCell>
                                    <TableCell>Date</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {flightList}
                            </TableBody>
                        </Table>
                    </Paper>
                </Grid>
            </div>
        );
    }
}

FlightList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FlightList);