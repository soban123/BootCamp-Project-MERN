import React, { Component } from 'react'
import { Table } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'

import { ReceiptAction } from "../store/Actions"
import Img from "./images/images.png"
import "../index.css"

function mapDispatchToProps(dispatch) {
    return {
        SET_DATA: (obj) => {
            dispatch(ReceiptAction.getReceiptByUserId(obj));
        }
    };
}

function mapStateToProps(state) {
    return {
        Data: state.receiptReducer.userReceipts
    }
}

class ReceiptDetails extends Component {
    state = {
        isLoading: false,
        data: [],
        UserId: "",
        status: ""

    }

    async componentDidMount() {
        const user = await this.props.match.params.userId
        await this.setState({ UserId: user })
        await this.props.SET_DATA(this.state.UserId)
        await this.setState({ data: this.props.Data, isLoading: true })
    }

    ApproveData = () => {
        fetch("https://uitedemo.herokuapp.com/api/receipt/status/approved", {
            method: "PUT",
            body: JSON.stringify({
                "_id": `${this.state.UserId}`
            }),
            headers: {
                "Content-type": "application/json",
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZTZjYzMxMmVjYWFhODAwMDQ2NzRjN2UiLCJyb2xlIjoiQSIsImV4cCI6MTU4NDE4OTc1MSwiaWF0IjoxNTg0MTg2MTUxfQ.WKnY76tD-b4rtj_aQ7wUWAqT1t_f_i2RYbYql0j0xyk"
            }
        })
            .then(response => response.json())
            .then(res2 => {
                if (res2.data.status === "approved") {
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }

    disApproveData = () => {
        fetch("https://uitedemo.herokuapp.com/api/receipt/status/declined", {
            method: "PUT",
            body: JSON.stringify({
                "_id": `${this.state.UserId}`
            }),
            headers: {
                "Content-type": "application/json",
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZTZjZDkxMTI4YmI4ZTAwMDRmMWQxMGYiLCJyb2xlIjoiQSIsImV4cCI6MTU4NDE5OTAyMCwiaWF0IjoxNTg0MTk1NDIwfQ.Gk6QPDkzNSRlj-tOxJ2F7YF-nqcVLhZjnf3oze7aAzU"
            }
        })
            .then(response => response.json())
            .then(res2 => {
                console.log(res2);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    render() {
        return (
            <div className="container">

                {this.state.isLoading ? this.props.Data.map((user, i) => {
                    return (
                        <Table key={i} striped bordered hover>
                            <tbody> <tr>
                                <th>#</th>
                                <td style={{ "width": "550px" }}>{i}</td>
                            </tr>
                                <tr>
                                    <th>ID</th><td>{user._id}</td>
                                </tr>
                                <tr>
                                    <th>Sent At</th>
                                    <td>{user.sentAt}</td>
                                </tr>
                                <tr>
                                    <th>Name</th>
                                    <td>{user.sentBy.name}</td>
                                </tr>
                                <tr>
                                    <th>Email</th>
                                    <td>{user.sentBy.email}</td>
                                </tr>
                                <tr>
                                    <th>Created At</th>
                                    <td>{user.createdAt}</td>
                                </tr>
                                <tr>
                                    <th>updated At</th>
                                    <td>{user.updatedAt}</td>
                                </tr>
                                <tr>
                                    <th>Year</th>
                                    <td>{user.year}</td>
                                </tr>
                                <tr>
                                    <th>Month</th>
                                    <td>{user.month}</td>
                                </tr>
                                <tr>
                                    <th>Status</th>
                                    <td>{user.status}</td>
                                </tr>
                                <tr>
                                    <th>Image</th>
                                    <td>
                                        {
                                            this.state.isLoading ?
                                                user.url !== "" ?
                                                    <img src={Img} alt="Image" /> : <img src={user.url} alt="Image" />
                                                : ""
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <th>Status</th>
                                    <td>
                                        <button onClick={() => this.ApproveData()}>Approval</button>&nbsp;&nbsp;
                        <button onClick={() => this.disApproveData()}>disApproval</button>&nbsp;&nbsp;
                        <button>History</button>
                                    </td>
                                </tr>
                                <tr>
                                    <th>Back</th><td><Link to="/receipt">Go Back</Link></td>
                                </tr>
                            </tbody>
                        </Table>
                    )
                })
                    : "Loading"
                }
            </div>
        )
    }

}
export default connect(mapStateToProps, mapDispatchToProps)(ReceiptDetails) 