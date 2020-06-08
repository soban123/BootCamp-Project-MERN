import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button } from 'react-bootstrap';
import { getCloudinaryUrl } from '../utils/cloudinary';
import { ReceiptAction } from '../store/Actions';


class AddReceipt extends Component {
    state = {
        dateNow: '',
        currentDate: "",
        Month: "",
        Year: "",
        imageFile: '',
        imageUrl: '',
        message: '',
        amount: '',
        isLoding: false,
    }

    componentWillReceiveProps(nextProps) {
        const { addReceiptState } = nextProps

        if (addReceiptState.lodding) {
            this.setState({ isLoding: true })
        }
        if (addReceiptState.status) {
            alert("Successfully add Receipt")
        }
        if (addReceiptState.error) {
            alert("Something was Wrong")
        }
    }

    onChangeFile = (event) => {
        const file = event.target.files[0];
        this.setState({
            imageFile: file,
        })
    }

    onChange = (event) => {
        this.setState({ amount: event.target.value })
    }

    handleChange = (e) => {
        const date = new Date(e.target.value)
        this.setState({
            dateNow: date,
            currentDate: date && date.getDate(date),
            Month: date && date.getMonth(),
            Year: date && date.getFullYear()
        });
    }

    submitButton = async () => {
        const { imageFile, dateNow, amount, Month, Year, } = this.state;

        if (!imageFile) {
            return alert("Please select any file")
        }

        if (!dateNow) {
            return alert("Please select any date")
        }

        if (!amount) {
            return alert("Please enter any amount")
        }

        if (imageFile && dateNow && amount) {
            const data = new FormData()
            data.append('file', imageFile);
            data.append('upload_preset', "gq1yajbf")
            data.append('cloud_name', 'dutexiflb');

            const url = await getCloudinaryUrl(imageFile);
            const obj = {
                "month": `${Month + 1}`,
                "year": `${Year}`,
                "picture": `${url}`,
                "amount": `${amount}`,
            }
            this.props.addReceipt(obj)
        }
    }

    gotoBack = () => {
        this.props.history.push('/receipt')
    }

    render() {
        return (
            <div>
                <h1 style={{ color: 'black' }}>Add Receipt</h1>
                <div className="container" style={{ marginTop: '10%', }}>
                    <div style={{ width: "30%", marginBottom: 10 }}>
                        <h4>Select Date</h4>
                        <input type="date" onChange={this.handleChange} />
                    </div>

                    <div style={{ width: "30%", marginBottom: 10 }}>
                        <h4>Enter Amount</h4>
                        <input type='number' onChange={this.onChange} width='20px' height='20px' />
                    </div>

                    <div style={{ width: "30%", marginBottom: 10, marginLeft: 20 }}>
                        <input type='file' onChange={this.onChangeFile} width='20px' height='20px' />
                    </div>

                    <div style={{ marginBottom: 10, display: 'flex', marginLeft: 20 }}>
                        <Button onClick={this.submitButton} style={{ marginRight: '4%', width: 100, height: 40 }}>Upload</Button>
                        <Button onClick={this.gotoBack} style={{ width: 100, height: 40 }}>Go Back</Button>
                    </div>

                </div >
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        addReceiptState: state.AddReceiptReducer,

    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        addReceipt: (obj) => dispatch(ReceiptAction.addReceipt(obj))
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(AddReceipt)

