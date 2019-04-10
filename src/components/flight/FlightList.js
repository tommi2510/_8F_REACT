import React, { Component } from 'react';
import { Grid, Table, TableBody, TableCell, TableHead, TableRow, Paper, Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import queryString from 'query-string';
import Header from "../utils/Header";
import moment from 'moment';
import FlightTakeOff from '@material-ui/icons/FlightTakeoff';
import Loading from '../utils/Loading';
import AppContainer from "../utils/AppContainer";


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
        marginTop: 50,
        marginBottom: 100,
    },
    paper: {
        minWidth: '70%',
    },
    important: {
        fontWeight: 'bold',
        color: '#524848',
        border: 0,
    },
    textColor: {
        color: '#524848',
        border: 0,
    },
    rowSpacing: {
        height: 60,
        cursor: 'pointer',
    },
    noBorder: {
        border: 0,
    },
    hover: {
        backgroundColor: 'white',
    },
    button: {
        textTransform: 'lowercase',
        '&:hover': {
            background: "#28b8ab",
        },
    },
    moreButtonContainer: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: theme.spacing.unit * 3,
    },
    moreButton: {

    }
});

class FlightList extends Component {

    constructor(props) {
        super(props);
        this.state = {flights: {content: []}, isLoading: true};

    }

    componentDidMount() {
        this.setState({isLoading: true});

        const location = this.props.location;
        const url = `http://localhost:3000/api/flights${location.search}`;

        fetch(url)
            .then(response => response.json())
            .then(data => this.setState({flights: data, isLoading: false}));
    }

    formatDate = (date) => {
        const month = moment.utc(date).format('D MMM');
        return month;
    }

    formatTime = (date) => {
        const time = moment.utc(date).format('H:mm')
        return time;
    }

    handleClick(id) {
        const location = this.props.location;

        this.props.history.push(`${location.pathname}/${id}${location.search}`);
    }


    render() {
        const { classes } = this.props;
        const {flights, isLoading} = this.state;
        const { content } = flights;
        const found = content.length > 0;
        console.log(flights)
        const showMore = flights.first && flights.last;

        if (isLoading) {
            return <Loading />
        }

        const flightList = content.map(flight => {
            return <TableRow hover key={flight.id} className={classes.rowSpacing} onClick={() => this.handleClick(flight.id)}>
                <TableCell className={classes.important} component="th" scope="row">{this.formatDate(flight.scheduledTime)}</TableCell>
                <TableCell className={classes.important} component="th" scope="row">{this.formatTime(flight.scheduledTime)}</TableCell>
                <TableCell className={classes.textColor} component="th" scope="row">{flight.departure}</TableCell>
                <TableCell className={classes.textColor} component="th" scope="row"><FlightTakeOff color="primary" fontSize="large"/></TableCell>
                <TableCell className={classes.textColor} component="th" scope="row">{flight.arrival}</TableCell>
                <TableCell className={classes.textColor} component="th" scope="row">{flight.price}kr.</TableCell>
                <TableCell className={classes.textColor} component="th" scope="row">{flight.seatsAvailable} seats</TableCell>
                <TableCell className={classes.textColor} component="th" scope="row"><Button variant="contained" color="secondary" className={classes.button}>
                    Book
                </Button></TableCell>
            </TableRow>
        });


        return (
            <AppContainer >
                <Grid className={classes.container}>
                    <Header header="Flights" />
                    {found ? (
                        <div>
                            <Paper className={classes.paper}>
                                <Table className={classes.table}>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell className={classes.noBorder}>Date</TableCell>
                                            <TableCell className={classes.noBorder}>Time</TableCell>
                                            <TableCell className={classes.noBorder}>Source</TableCell>
                                            <TableCell className={classes.noBorder}></TableCell>
                                            <TableCell className={classes.noBorder}>Destination</TableCell>
                                            {/*<TableCell>Price</TableCell>*/}
                                            {/*<TableCell>Availability</TableCell>*/}
                                            <TableCell className={classes.noBorder} ></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {flightList}
                                    </TableBody>
                                </Table>
                                <Grid>

                                </Grid>


                            </Paper>
                            { !showMore ? (
                                <div className={classes.moreButtonContainer}>
                                    <Button color="secondary" variant="contained">
                                        View more
                                    </Button>
                                </div>
                            ) : (
                                <div></div>
                            )}


                        </div>


                    ) : (
                        <div>No flights found.</div>
                    )}
                </Grid>
            </AppContainer>
        );
    }
}

FlightList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FlightList);