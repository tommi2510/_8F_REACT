import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Face from '@material-ui/icons/Face';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import queryString from "query-string";
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from "@material-ui/core/TextField";


const styles = theme => ({
    main: {
        width: 'auto',
        display: 'block', // Fix IE 11 issue.
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
            width: 400,
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
        marginTop: theme.spacing.unit * 3,
    },
    submit: {
        marginTop: theme.spacing.unit * 3,
        '&:hover': {
            background: "#ff6269",
        },
    },
    group: {
        marginBottom: theme.spacing.unit * 6,
        marginTop: theme.spacing.unit,
    },
    label: {
        color: 'black',
    },
    numberfield: {
        width: '15%',
    }
});

class PassengerForms extends Component {

    constructor(props) {
        super(props);
        this.state = {
            passengers: [
            ],
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        const { match, location } = this.props;
        const { params } = match;
        const { search } = location;
        const { id, flightId } = params;

        const queryRes = queryString.parse(search);

        const { passenger } = queryRes;

        const passengers = [];
        for (let i = 0; i < passenger; i++) {
            passengers.push({
                firstName: '',
                lastName: '',
                priorityB: false,
                luggage: 0,
                firstClass: false,
            })
        }

        this.setState({
            passengers,
        })

    }


    async handleSubmit(event) {
        event.preventDefault();
        const { passengers } = this.state;
        const { match } = this.props;
        const { params } = match;
        const { id, flightId } = params;


        const promises = [];

        passengers.forEach((passenger) => {
            const passengerOb = { ...passenger };
            promises.push(
                fetch('/api/passenger', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(passengerOb),
                })
            );
        });

        const finalRes = await Promise.all(promises);

        const newArr = [];

        for (let i = 0; i < finalRes.length; i++) {
            newArr.push(finalRes[i].json());
        }


        const passengerRes = await Promise.all(newArr);

        const booking = {
            user: {
                id,
            },
            flight: {
                id: flightId,
            },
            passengers: passengerRes,

        };

        // create booking
        const result = await fetch('/api/booking', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(booking),
        });


        this.props.history.push(`/users/${id}/bookings`);
    }

    handleChange(index, event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        const {passengers} = this.state;
        passengers[index][name] = value;

        this.setState({passengers});
    }

        handleChangeCheckbox(index, event) {
            const target = event.target;
            const value = target.checked;
            const name = target.name;

            const { passengers } = this.state;
            passengers[index][name] = value;

            this.setState({passengers});
        }


    render() {
        const { classes } = this.props;
        const { passengers } = this.state;

        const passengerForms = passengers.map((passenger, index) => {
            return <FormGroup key={index} className={classes.group}>
                <FormLabel component="legend"  className={classes.label}>Passenger {index + 1}</FormLabel>
                <FormControl fullWidth>
                    <InputLabel htmlFor="firstName">First Name</InputLabel>
                    <Input
                        name="firstName"
                        type="text"
                        id="firstName"
                        onChange={(e) => this.handleChange(index, e)}
                    />
                </FormControl>
                <FormControl fullWidth>
                    <InputLabel htmlFor="lastName">Last Name</InputLabel>
                    <Input
                        name="lastName"
                        type="text"
                        id="lastName"
                        onChange={(e) => this.handleChange(index, e)}
                    />
                </FormControl>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={this.state.passengers[index].priorityB}
                            onChange={(e) => this.handleChangeCheckbox(index, e)}
                            name="priorityB"
                            id="priorityB"
                        />
                    }
                    label="Priority Boarding"
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={this.state.passengers[index].firstClass}
                            onChange={(e) => this.handleChangeCheckbox(index, e)}
                            name="firstClass"
                            id="firstClass"
                        />
                    }
                    label="First Class"
                />
                <TextField
                    id="luggage"
                    label="Luggage"
                    value={this.state.passengers[index].luggage}
                    onChange={(e) => this.handleChange(index, e)}
                    type="number"
                    name="luggage"
                    className={classes.numberfield}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    InputProps={{ inputProps: { min: 0, max: 10 } }}
                />
            </FormGroup>
        });

        return (
            <main className={classes.main}>
                <CssBaseline />
                <Paper className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <Face />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Passenger info
                    </Typography>
                    <form className={classes.form} onSubmit={this.handleSubmit}>
                        {passengerForms}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Book
                        </Button>
                    </form>
                </Paper>
            </main>
        );
    }
}

PassengerForms.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PassengerForms);