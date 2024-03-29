import React, { Component } from 'react';
import { Grid, Table, TableBody, TableCell, TableHead, TableRow, Paper, Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import queryString from 'query-string';
import Header from "../utils/Header";
import Loading from '../utils/Loading';
import AppContainer from "../utils/AppContainer";
import moment from "moment";


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

class BookingList extends Component {

    constructor(props) {
        super(props);
        this.state = {bookings: {content: []}, isLoading: true};

    }

    componentDidMount() {
        this.setState({isLoading: true});


        const {id} = this.props.match.params;
        const {pathname} = this.props.location;

        const url = `http://localhost:3000/api/users/${id}/bookings`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                this.setState({bookings: data, isLoading: false})
            });

    }

    handleClick(id) {
        const location = this.props.location;

        // this.props.history.push(`${location.pathname}/${id}${location.search}`);
    }

    formatDate = (date) => {
        const month = moment.utc(date).format('D MMM');
        return month;
    }

    formatTime = (date) => {
        const time = moment.utc(date).format('H:mm')
        return time;
    }


    render() {
        const { classes } = this.props;
        const {bookings, isLoading} = this.state;
        const { content } = bookings;
        const found = content.length > 0;

        if (isLoading) {
            return <Loading />
        }

        const bookingList = content.map(booking => {
            return <TableRow hover key={booking.id} className={classes.rowSpacing} onClick={() => this.handleClick(booking.id)}>
                <TableCell className={classes.textColor} component="th" scope="row">{booking.passengers[0].firstName}</TableCell>
                <TableCell className={classes.textColor} component="th" scope="row">{booking.passengers[0].lastName}</TableCell>
                <TableCell className={classes.important} component="th" scope="row">{this.formatDate(booking.flight.scheduledTime)}</TableCell>
                <TableCell className={classes.important} component="th" scope="row">{this.formatTime(booking.flight.scheduledTime)}</TableCell>
                <TableCell className={classes.important} component="th" scope="row">{booking.flight.departure}</TableCell>
                {/*<TableCell className={classes.textColor} component="th" scope="row"><BookingTakeOff color="primary" fontSize="large"/></TableCell>*/}
                <TableCell className={classes.important} component="th" scope="row">{booking.flight.arrival}</TableCell>
                <TableCell className={classes.textColor} component="th" scope="row">{booking.flight.flightNo}</TableCell>
                <TableCell className={classes.textColor} component="th" scope="row">{booking.flight.price}</TableCell>
            </TableRow>
        });


        return (
            <AppContainer >
                <Grid className={classes.container}>
                    <Header header="Bookings" />
                    {found ? (
                        <div>
                            <Paper className={classes.paper}>
                                <Table className={classes.table}>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell className={classes.noBorder}>First Name</TableCell>
                                            <TableCell className={classes.noBorder}>Last Name</TableCell>
                                            <TableCell className={classes.noBorder}>Date</TableCell>
                                            <TableCell className={classes.noBorder}>Time</TableCell>
                                            <TableCell className={classes.noBorder}>Departure</TableCell>
                                            <TableCell className={classes.noBorder}>Destination</TableCell>
                                            <TableCell className={classes.noBorder}>Flight no.</TableCell>
                                            <TableCell className={classes.noBorder}>Price (ISK)</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {bookingList}
                                    </TableBody>
                                </Table>
                                <Grid>

                                </Grid>


                            </Paper>

                        </div>


                    ) : (
                        <div>No bookings found.</div>
                    )}
                </Grid>
            </AppContainer>
        );
    }
}

BookingList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BookingList);