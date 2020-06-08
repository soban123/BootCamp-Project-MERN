import React, { Component } from 'react';
// import { Image, Video, Transformation, CloudinaryContext } from 'cloudinary-react';

class CloudinaryImagePage extends Component {
    constructor() {
        super();
        this.state = {
            imagesFiles: '',
            cloudinaryUrl: '',
        }
    }

    handleFile = (event) => {
        const file = event.target.files[0];
        console.log(file);
        this.setState({
            imagesFiles: file,
        })
    }

    uploadImage = () => {
        const image = this.state.imagesFiles;
        console.log(image)
        const data = new FormData()
        data.append('file', image);
        data.append('upload_preset', "gq1yajbf")
        data.append('cloud_name', 'dutexiflb');

        fetch("	https://api.cloudinary.com/v1_1/dutexiflb/image/upload", {
            method: "post",
            body: data
        }).then(res => res.json())
            .then(data => {
                console.log(data)
                console.log(data.url)
                this.setState({ cloudinaryUrl: data.url })
            })
    }

    render() {
        return (
            <div className="main">
                <h1>Upload Image</h1>
                <div className="upload">
                    <input type='file' onChange={this.handleFile} width='20px' height='20px' />
                    <button onClick={this.uploadImage} className="upload-button">
                        Upload
                    </button>
                </div>
            </div >
        );
    }
}

export { CloudinaryImagePage }
