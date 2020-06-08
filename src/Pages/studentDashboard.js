import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table } from 'react-bootstrap';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { UsersAction } from '../store/Actions';
import '../styles/studentDashboard.css';
import Headbar from './Headerbar';


class StudentDashboard extends Component {
    state = {
        rowData: []
    }
    componentDidMount = () => {
        const id = this.props.user.user._id;
        const token = this.props.user.token;
        this.props.getUser(id, token);
    }
    componentWillReceiveProps(nextProp) {
        if (nextProp.userData)
            this.renderRow(nextProp.userData);
    }
    renderRow = (array) => {
        const rowRender = array.map(user => {
            return (
                <tr key={user._id}>
                    <td>{user._id}</td>
                    <td>{user.month}</td>
                    <td>{user.year}</td>
                    <td>{user.createdAt.split('-')[0]}</td>
                    <td>{user.status}</td>
                </tr>
            )
        })
        this.setState({ rowData: rowRender })
    }
    render() {
        return (
            <div>
                <Headbar />
                <div className="container studentTable">
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <td>ID</td>
                                <td>Month</td>
                                <td>Year</td>
                                <td>Sent At</td>
                                <td>Status</td>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.rowData ? (
                                this.state.rowData
                            ) : (
                                    <h1>Loading...</h1>
                                )}
                        </tbody>

                    </Table>
                    <div className="floatingButton">
                        <Fab color="primary" onClick={() => this.props.history.push('/addReceipt')} aria-label="add">
                            <AddIcon />
                        </Fab>
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        user: state.authReducer.user,
        userData: state.studentReducer.user
    };
}
const mapDispatchToProps = (dispatch) => {
    return {
        getUser: (id, token) => {
            dispatch(UsersAction.getUser(id, token));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(StudentDashboard);
