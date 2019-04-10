import React, { Component } from 'react';
import { Grid, Table, TableBody, TableCell, TableHead, TableRow, Paper, Fab } from '@material-ui/core';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Header from '../utils/Header';
import Loading from '../utils/Loading';
import Signup from './Signup';
import AddIcon from '@material-ui/icons/Add';


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
    },
    paper: {
        width: '70%',
    },
    hover: {
        backgroundColor: 'white',
        cursor: 'pointer',
    },
    fab: {
        position: 'absolute',
        bottom: theme.spacing.unit * 4,
        right: theme.spacing.unit * 4,
    },
});

class UserList extends Component {

    constructor(props) {
        super(props);
        this.state = {users: [], isLoading: true};
        this.handleClick = this.handleClick.bind(this);

    }

    componentDidMount() {
        this.setState({isLoading: true});

        fetch('api/users')
            .then(response => response.json())
            .then(data => this.setState({users: data, isLoading: false}));
    }

    handleClick(id) {
        this.props.history.push(`/users/${id}`);
    }

    newUser = () => {
        this.props.history.push(`/newUser`);
    }


    render() {
        const { classes } = this.props;
        const {users, isLoading} = this.state;

        if (isLoading) {
            return <Loading />
        }

        const userList = users.map(user => {
            const { id } = user;
            return <TableRow hover key={user.id} className={classes.hover} onClick={() => this.handleClick(id)}>
                <TableCell align="center" component="th" scope="row">{user.firstName}</TableCell>
                <TableCell align="center" component="th" scope="row">{user.lastName}</TableCell>
                <TableCell align="center" component="th" scope="row">{user.email}</TableCell>
            </TableRow>
        });

        const userExist = users.length > 0;

        return (
            <div>
                {userExist ? (
                    <Grid className={classes.container}>
                        <Header header="Users" />
                        <Paper className={classes.paper}>
                            <Table className={classes.table}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center">First Name</TableCell>
                                        <TableCell align="center">Last Name</TableCell>
                                        <TableCell align="center">Email</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {userList}
                                </TableBody>
                            </Table>
                        </Paper>
                        <Fab className={classes.fab} color="secondary" onClick={this.newUser}>
                            <AddIcon />
                        </Fab>
                    </Grid>
                ) : (
                    <Signup />
                )}
            </div>
        );
    }
}

UserList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UserList);