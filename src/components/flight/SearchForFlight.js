import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import Flight from '@material-ui/icons/Flight';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import { MuiPickersUtilsProvider, DatePicker } from 'material-ui-pickers';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import DateFnsUtils from '@date-io/date-fns';
import queryString from 'query-string';
import AppContainer from "../utils/AppContainer";


const styles = theme => ({
    main: {
        width: 'auto',
        display: 'block', // Fix IE 11 issue.
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
            width: 600,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing.unit * 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 6}px ${theme.spacing.unit * 8}px`,
    },
    avatar: {
        margin: theme.spacing.unit,
        backgroundColor: theme.palette.primary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing.unit * 4,
    },
    submit: {
        marginTop: theme.spacing.unit * 3,
        '&:hover': {
            background: "#ff6269",
        },
    },
    container: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    wrapper: {
        display: 'flex',
        flexDirection: 'column',
    },
    spacing: {
      marginBottom: 15,
    },
});

class SearchForFlight extends Component {

    emptyItem = {
        departure: 'Keflavík',
        arrival: 'Vestmannaeyjar',
        scheduledTime: new Date('2019-04-12T00:00:00'),
        passenger: 1,
        allFlights: false,
    }

    constructor(props) {
        super(props);
        this.state = this.emptyItem;
    }

    async componentDidMount() {
        console.log(this.props.location.search)
    }


    handleSubmit = async (event) => {
        event.preventDefault();
        const currentState = this.state;
        console.log(this.props)
        const { pathname } = this.props.location;

        const { scheduledTime, allFlights, departure, arrival, ...rest } = this.state;

        let finalOb;

        if (!allFlights) {
            finalOb = { ...rest, scheduledTime, departure, arrival };
        } else {
            finalOb = rest;
        }

        console.log(finalOb)

        const stringified = queryString.stringify(finalOb);
        console.log(stringified);

        // TODO: Validation


        const searchString = `${pathname}/flights?${stringified}`;
        console.log(searchString)
        this.props.history.push(searchString);

    }

    handleChange = event => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        const prevState = {...this.state};
        prevState[name] = value;
        this.setState(prevState);
        console.log(this.state)
    }

    handleDateChange = date => {
        console.log(date);
        this.setState({ scheduledTime: date });
    };

    handleCheckBoxChange= event => {
        const target = event.target;
        const value = target.checked;
        console.log(value)
        const name = target.name;
        console.log(name)

        this.setState({
            [name]: value,
        });
    };


    render() {
        const { classes } = this.props;
        const { scheduledTime } = this.state;
        return (
            <AppContainer>
                <main className={classes.main}>
                    <CssBaseline />
                    <Paper className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <Flight />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Search for a flight
                        </Typography>
                        <form className={classes.form} onSubmit={this.handleSubmit}>
                            <Grid className={classes.container}>
                                <Grid className={classes.wrapper}>
                                    <InputLabel htmlFor="departure">Departure</InputLabel>
                                    <Select
                                        disabled={this.state.allFlights}
                                        className={classes.spacing}
                                        value={this.state.departure}
                                        onChange={this.handleChange}
                                        inputProps={{
                                            name: 'departure',
                                            id: 'departure',
                                        }}
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        <MenuItem value="Keflavík">Keflavík</MenuItem>
                                        <MenuItem value="Reykjavík">Reykjavík</MenuItem>
                                        <MenuItem value="Akureyri">Akureyri</MenuItem>
                                        <MenuItem value="Egilsstaðir">Egilsstaðir</MenuItem>
                                        <MenuItem value="Ísafjörður">Ísafjörður</MenuItem>
                                        <MenuItem value="Vestmannaeyjar">Vestmannaeyjar</MenuItem>
                                        <MenuItem value="Hornafjörður">Hornafjörður</MenuItem>
                                        <MenuItem value="Kulusuk">Kulusuk</MenuItem>
                                        <MenuItem value="Nuuk">Nuuk</MenuItem>
                                    </Select>
                                    <InputLabel htmlFor="arrival">Arrival</InputLabel>
                                    <Select
                                        disabled={this.state.allFlights}
                                        className={classes.spacing}
                                        value={this.state.arrival}
                                        onChange={this.handleChange}
                                        inputProps={{
                                            name: 'arrival',
                                            id: 'arrival',
                                        }}
                                    >

                                        <MenuItem value="Keflavík">Keflavík</MenuItem>
                                        <MenuItem value="Reykjavík">Reykjavík</MenuItem>
                                        <MenuItem value="Akureyri">Akureyri</MenuItem>
                                        <MenuItem value="Egilsstaðir">Egilsstaðir</MenuItem>
                                        <MenuItem value="Ísafjörður">Ísafjörður</MenuItem>
                                        <MenuItem value="Vestmannaeyjar">Vestmannaeyjar</MenuItem>
                                        <MenuItem value="Hornafjörður">Hornafjörður</MenuItem>
                                        <MenuItem value="Kulusuk">Kulusuk</MenuItem>
                                        <MenuItem value="Nuuk">Nuuk</MenuItem>
                                    </Select>

                                    <MuiPickersUtilsProvider
                                        utils={DateFnsUtils}
                                        className={classes.spacing}
                                    >
                                        <Grid container className={classes.grid} justify="space-around">
                                            <DatePicker
                                                disabled={this.state.allFlights}
                                                label="Date picker"
                                                value={scheduledTime}
                                                onChange={this.handleDateChange}
                                            />
                                        </Grid>
                                    </MuiPickersUtilsProvider>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={this.state.allFlights}
                                                onChange={this.handleCheckBoxChange}
                                                name="allFlights"
                                                id="allFlights"
                                            />
                                        }
                                        label="All flights"
                                    />
                                </Grid>
                                <Grid className={classes.wrapper}>
                                    <TextField
                                        id="passenger"
                                        label="Passenger"
                                        value={this.state.passenger}
                                        onChange={this.handleChange}
                                        type="number"
                                        name="passenger"
                                        className={classes.textField}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        InputProps={{ inputProps: { min: 1 } }}
                                    />
                                </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                Search
                            </Button>
                        </form>
                    </Paper>
                </main>
            </AppContainer>

        );
    }
}

SearchForFlight.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SearchForFlight);