import React from 'react'
import { Table } from 'react-bootstrap'
import { useSelector } from 'react-redux';

import UserTable from '../components/Dashboard/UserTable';
import UserTableDetail from '../components/Dashboard/UserTableDetail';

function Users(props) {
    const users = useSelector(state => state.dashboardReducer.user)
    return (
        <div className="container">
            <Table striped bordered hover>
                <UserTable />
                <UserTableDetail userData={users} />
            </Table>
        </div>
    )
}
export { Users };
