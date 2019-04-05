import React, { Component } from 'react';
import { Grid, Table, TableBody, TableCell, TableHead, TableRow, Paper } from '@material-ui/core';
import Appbar from '../Appbar';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Header from './Header';

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
    }
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


    render() {
        const { classes } = this.props;
        const {users, isLoading} = this.state;

        if (isLoading) {
            return <p>Loading...</p>;
        }

        const userList = users.map(user => {
            const { id } = user;
            return <TableRow hover key={user.id} className={classes.hover} onClick={() => this.handleClick(id)}>
                <TableCell align="center" component="th" scope="row">{user.firstName}</TableCell>
                <TableCell align="center" component="th" scope="row">{user.lastName}</TableCell>
                <TableCell align="center" component="th" scope="row">{user.email}</TableCell>
            </TableRow>
        });

        return (
            <div>
                <Appbar/>
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
                </Grid>
            </div>
        );
    }
}

UserList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UserList);