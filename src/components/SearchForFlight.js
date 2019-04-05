import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Flight from '@material-ui/icons/Flight';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import { MuiPickersUtilsProvider, DatePicker } from 'material-ui-pickers';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import DateFnsUtils from '@date-io/date-fns';

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
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
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
        justifyContent: 'space-around',
    },
    wrapper: {
        display: 'flex',
        flexDirection: 'column',
    }
});

class SearchForFlight extends Component {

    emptyItem = {
        departure: '',
        arrival: '',
        selectedDate: new Date(),
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
        // const currentState = this.state;
        // const newState = { ...currentState, selectedDate: currentState.selectedDate.toUTCString() }
        //
        // // TODO: Validation
        // const queryString = Object.keys(newState).map(key => key + '=' + newState[key]).join('&');
        // console.log(queryString)
        const searchString = `/flights?departure=${this.state.departure}&arrival=${this.state.arrival}`;
        this.props.history.push(searchString);

    }

    handleChange = event => {
        const target = event.target;
        console.log(target)
        const value = target.value;
        const name = target.name;
        const prevState = {...this.state};
        prevState[name] = value;
        this.setState(prevState);
    }

    handleDateChange = date => {
        this.setState({ selectedDate: date });
    };

    handleTextField = name => {

    }

    render() {
        const { classes } = this.props;
        const { selectedDate } = this.state;
        return (
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
                                        <MenuItem value="Reykjavík">Reykjavík</MenuItem>
                                        <MenuItem value="Akureyri">Akureyri</MenuItem>
                                        <MenuItem value="Egilsstaðir">Egilsstaðir</MenuItem>
                                        <MenuItem value="Ísafjörður">Ísafjörður</MenuItem>
                                    </Select>
                                    <InputLabel htmlFor="arrival">Arrival</InputLabel>
                                    <Select
                                        value={this.state.arrival}
                                        onChange={this.handleChange}
                                        inputProps={{
                                            name: 'arrival',
                                            id: 'arrival',
                                        }}
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        <MenuItem value="Reykjavík">Reykjavík</MenuItem>
                                        <MenuItem value="Akureyri">Akureyri</MenuItem>
                                        <MenuItem value="Egilsstaðir">Egilsstaðir</MenuItem>
                                        <MenuItem value="Ísafjörður">Ísafjörður</MenuItem>
                                    </Select>
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <Grid container className={classes.grid} justify="space-around">
                                            <DatePicker
                                                label="Date picker"
                                                value={selectedDate}
                                                onChange={this.handleDateChange}
                                            />
                                        </Grid>
                                    </MuiPickersUtilsProvider>
                            </Grid>
                            <Grid className={classes.wrapper}>
                                <TextField
                                    id="standard-number"
                                    label="Adult"
                                    value={this.state.age}
                                    onChange={this.handleTextField('age')}
                                    type="number"
                                    className={classes.textField}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                                <TextField
                                    id="standard-number"
                                    label="Child"
                                    value={this.state.child}
                                    onChange={this.handleTextField('child')}
                                    type="number"
                                    className={classes.textField}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                                <TextField
                                    id="standard-number"
                                    label="Infant"
                                    value={this.state.infant}
                                    onChange={this.handleTextField('infant')}
                                    type="number"
                                    className={classes.textField}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
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
        );
    }
}

SearchForFlight.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SearchForFlight);