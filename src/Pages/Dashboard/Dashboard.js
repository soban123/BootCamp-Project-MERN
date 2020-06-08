import React, { Component } from 'react';
import { connect } from 'react-redux';
import UserData from './store/Actions/Dash';

function mapDispatchToProps(dispatch) {
	return {
		AddData: (data) => dispatch({ type: 'ADD', payload: data }),
		
	};
}

class Dashboard extends Component {
    state = {
        data : [] ,
        dis : false
    }
    componentDidMount(){
      let url  = process.env.DashBoardApi
         fetch(url)
         .then((res)=>res.json())
         .then((res2)=>{
             console.log(res2)
             this.setState({data : res2,dis : true})
         })
    }
   
  render() {
      
    return (
      <>
        <div>
            {this.state.dis ? 
            <div>
                    <h1>uohihiuh</h1>
           </div>
              
        :""
            }
              <button onClick={() => this.props.AddData(this.state.data)}>Increment Me</button>
        </div>
      </>
    )
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)