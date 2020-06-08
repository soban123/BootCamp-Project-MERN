import React, { Component } from 'react'
import { Table } from "react-bootstrap"
import { Link } from 'react-router-dom';
import Fab from '@material-ui/core/Fab';
import VisibilityIcon from '@material-ui/icons/Visibility';
import AddIcon from '@material-ui/icons/Add';
import {connect} from 'react-redux'; 
let status = 'all';
let month = 'all';
let year = 'all';
function mapDispatchToProps(dispatch) {
	return {
		Add: (data) => dispatch({ type: 'ADD', payload: data }),
		
	};
}

class Receipt extends Component {
  state = {
    userDetail: [],
    rows: [],
  }

  componentDidMount() {
    fetch('https://uitedemo.herokuapp.com/api/receipt', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZTZjZDkxMTI4YmI4ZTAwMDRmMWQxMGYiLCJyb2xlIjoiQSIsImV4cCI6MTU4NDE5OTAyMCwiaWF0IjoxNTg0MTk1NDIwfQ.Gk6QPDkzNSRlj-tOxJ2F7YF-nqcVLhZjnf3oze7aAzU"
      }
    })
      .then((data) => data.json())
      .then(res2 => {
        this.setState({ userDetail: res2.data.receipt })
        this.renderRows(res2.data.receipt);
        this.props.Add(this.state.userDetail);
      })
      .catch((error) => {
        console.log({ error })
      })
  }
  renderRows = (data) => {
    const row = data.map((user, i) => (
      <tr key={user._id}>
        <td>{i}</td>
        <td>{user._id}</td>
        <td>{user.sentAt}</td>
        <td>{user.createdAt}</td>
        <td>{user.updatedAt}</td>
        <td>{user.year}</td>
        <td>{user.month}</td>
        <td>{user.status}</td>
        <td>{user.approvedAt}</td>
        <Link 
        to={`/receipt/${user._id}`}
        // to={{
        //   pathname: `/receipt/${user.id}`,
        //   state: {
        //    id : user._id
        //   }}
        // }
        >

<Fab color="primary" aria-label="add" style={{width: "30px" , height : "30px" ,"margin-top" : "10px" }}>
            <VisibilityIcon />
          </Fab>
          </Link>
      </tr>
    ));

    this.setState({ rows:row })
  }
  filterData = () => {

    if (status === "all" && month === "all" && year === "all") {
      this.renderRows(this.state.userDetail)
      return;
    }
    const filteredData = this.state.userDetail.filter(item =>
      ((item.status === status && item.month.toLowerCase() === month && item.year === year)
        || (status === "all" && item.month.toLowerCase() === month && item.year === year)
        || (item.status === status && month === "all" && item.year === year)
        || (item.status === status && item.month.toLowerCase() === month && year === "all")
        || (status === "all" && item.month.toLowerCase() === month && year === "all")
        || (status === "all" && month === "all" && item.year === year)
        || (item.status === status && month === "all" && year === "all")
        || (status === status && item.month.toLowerCase() === month && year === "all")

      ))

    this.renderRows(filteredData);
  }
  handleStatusChange = (e) => {
    status = e.target.value
    this.filterData()
  }
  handleMonthChange = (e) => {
    month = e.target.value
    this.filterData()
  }
  handleYearChange = (e) => {
    year = e.target.value
    this.filterData()
  }

  render() {

    return (
      <>
          <div className="filter">
          <span className="SelectContainexr" >
            Status
				 <select
              id="status"
              name="status"
              onChange={this.handleStatusChange}
              className="selectionButton"
            >
              <option value="all">All</option>
              <option value="approved">Approved</option>
              <option value="disapproved">Disapproved</option>
              <option value="decline" >Decline</option>
              <option value="not generated" >Not generated</option>

            </select>
          </span>
          <span className="SelectContainexr" >
            Month
				 <select
              id="month"
              name="month"
              onChange={this.handleMonthChange}
              className="selectionButton"
            >
              <option value="all">All</option>
              <option value="jan" >Jan</option>
              <option value="feb" >Feb</option>
              <option value="march" >March</option>
              <option value="april" >April</option>
              <option value="may">May</option>
              <option value="june">June</option>
              <option value="july">July</option>
              <option value="aug">August</option>
              <option value="sep">September</option>
              <option value="oct">October</option>
              <option value="nov">November</option>
              <option value="dec">December</option>
            </select>
          </span>
          <span className="SelectContainexr" >
            Year
				 <select
              id="year"
              name="year"
              onChange={this.handleYearChange}
              className="selectionButton"
            >
              <option value="all">All</option>
              <option value="2020">2020</option>
              <option value="2019">2019</option>
              <option value="2018">2018</option>
              <option value="2017">2017</option>
              <option value="2016">2016</option>
            </select>
          </span>
        </div>
        <div style={{width:"700px"}}>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>ID</th>
                <th>Sent At</th>
                <th>Create At</th>
                <th>Update At</th>
                <th>Year</th>
                <th>Month</th>
                <th>Status</th>
                <th>Approved At</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {this.state.rows}
            </tbody>
          </Table>
          l<Link to={`/receipt/add`}> <Fab color="primary" aria-label="add" style={{ "float": "right" }}>
            <AddIcon />
          </Fab></Link>
        </div>
      </>
    )
  }
}

export default connect(null, mapDispatchToProps)(Receipt) 