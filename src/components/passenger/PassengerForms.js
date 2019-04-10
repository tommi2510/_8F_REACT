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
        console.log(this.props);

        const queryRes = queryString.parse(search);

        const { passenger } = queryRes;

        const passengers = [];
        for (let i = 0; i < passenger; i++) {
            passengers.push({
                firstName: '',
                lastName: '',
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

        const booking = {
            user: {
                id,
            },
            flight: {
                id: flightId,
            }
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

        const body = await result.json();
        console.log(body);
        const bookingId = body.id;
        console.log(bookingId)

        const bookingIdOb = {
            booking:{
                id: bookingId,
            }
        };


        const promises = [];

        passengers.forEach((passenger) => {
            const passengerOb = { ...bookingIdOb, ...passenger };
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
        console.log(finalRes);

        // decrement seatsAvailable




        // // create passengers
        // const passengerResult = await fetch('/api/passenger', {
        //     method: 'POST',
        //     headers: {
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(passengerOb),
        // });
        //
        // const body1 = await passengerResult.json();
        // console.log(body1);
        // const passengerId = body1.id;
        // console.log(passengerId)



        // this.props.history.push(`/users/${id}`);
    }

    handleChange(index, event) {
        const target = event.target;
        const value = target.value;
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