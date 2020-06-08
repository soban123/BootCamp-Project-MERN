import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import { Link } from 'react-router-dom';

function UserDetail(props) {

    const [userDetail, setUserDetail] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    useEffect(() => {
        setIsLoading(true)
        const data = props.history.location.state.user
        setUserDetail(data)
    }, [])
    return (
        <div className="container">
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Gender</th>
                        <th>Email</th>
                        <th>Updated at</th>
                        <th>Created At</th>
                        <th>Action</th>
                    </tr>

                </thead>
                <tbody>
                    <tr key={userDetail._id}>
                        <td>{userDetail._id}</td>
                        <td>{userDetail.gender}</td>
                        <td>{userDetail.email}</td>
                        <td>{userDetail.updatedAt}</td>
                        <td>{userDetail.createdAt}</td>
                        <td><Link to="/dashboard">Go Back</Link></td>
                    </tr>
                </tbody>
            </Table>
        </div>
    )
}
export default UserDetail;
