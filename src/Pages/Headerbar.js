import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import { connect } from 'react-redux'
import logo from './download.png'

import {Nav , Button ,Form ,FormControl ,Dropdown , DropdownButton ,Image } from  'react-bootstrap'
import './Headerbar.css' ;

class Headerbar extends React.Component {

    render(){

      const user = localStorage.getItem('user');

    
        return(
            <>

  <Navbar  className="header" variant="light">
    <Navbar.Brand > <b> Receipt Web App </b> </Navbar.Brand>
    <Nav className="mr-auto">
      <Nav.Link href="/dashboard"><b> Dashboard </b></Nav.Link>
        <pre  >       </pre>
      <img src={logo}  width="50px" alt="img" /> 
      <pre>  </pre>
      <div>
      <DropdownButton id='dropdown' title={`${user}`}  >
  <Dropdown.Item href="#/action-1">Signout</Dropdown.Item>
 
</DropdownButton>
</div>
    </Nav>
    <Form inline>
      <FormControl type="text" placeholder="Search" className="mr-sm-2" />
      <Button variant="outline-dark">Search</Button>
    </Form>
  </Navbar>

  <br />
  
</>
        )
    }
}

function mapStateToProps(state) {
    
  return {
      editingItem: state
  }
}

export default connect(mapStateToProps,null)(Headerbar)