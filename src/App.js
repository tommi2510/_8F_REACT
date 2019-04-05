import React, { Component } from 'react';
import './App.css';
import Home from './Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import GroupList from './GroupList';
import UserList from './components/UserList';
import FlightList from './components/FlightList';
import Signup from './components/Signup';
import SearchForFlight from './components/SearchForFlight';
import NotFound from './components/NotFound';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';



const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#ff7379',
            contrastText: '#ffffff',
        },
        secondary: {
            main: '#6eff93',
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
        useNextVariants: true,
    },
});

class App extends Component {
    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <Router>
                    <Switch>
                        <Route path='/' exact={true} component={Signup}/>
                        <Route path='/groups' exact={true} component={GroupList}/>
                        <Route path='/users' exact={true} component={UserList}/>
                        <Route path='/users/:id' exact={true} component={SearchForFlight}/>
                        <Route path='/flights' exact={true} component={FlightList}/>
                        <Route path='/search' exact={true} component={SearchForFlight}/>
                        <Route component={NotFound}/>
                    </Switch>
                </Router>
            </MuiThemeProvider>
        )
    }
}

export default App;