import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import UserList from './components/user/UserList';
import FlightList from './components/flight/FlightList';
import BookingList from './components/booking/BookingList';
import Signup from './components/user/Signup';
import SearchForFlight from './components/flight/SearchForFlight';
import PassengerForms from './components/passenger/PassengerForms';
import NotFound from './components/utils/NotFound';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from "@material-ui/core/CssBaseline/CssBaseline";



const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#ee6e73',
            contrastText: '#ffffff',
        },
        secondary: {
            main: '#26a69a',
        },
    },
    status: {
        danger: 'orange',
    },
    typography: {
        // Use the system font instead of the default Roboto font.
        fontFamily: [
            'Futura',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
        ].join(','),
        htmlFontSize: 15,
        useNextVariants: true,
    },
});

class App extends Component {
    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <CssBaseline />
                <Router>
                    <Switch>
                        <Route path='/' exact={true} component={UserList}/>
                        <Route path='/newUser' exact={true} component={Signup}/>
                        <Route path='/users/:id' exact={true} component={SearchForFlight}/>
                        <Route path='/users/:id/flights' exact={true} component={FlightList}/>
                        <Route path='/users/:id/bookings' exact={true} component={BookingList}/>
                        <Route path='/search' exact={true} component={SearchForFlight}/>
                        <Route path='/users/:id/flights/:flightId' exact={true} component={PassengerForms}/>
                        <Route component={NotFound}/>
                    </Switch>
                </Router>
            </MuiThemeProvider>
        )
    }
}

export default App;