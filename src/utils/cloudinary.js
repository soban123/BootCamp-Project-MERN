import React from "react";


const getCloudinaryUrl = async (imageFile) => {
    const data = new FormData()
    data.append('file', imageFile);
    data.append('upload_preset', "gq1yajbf")
    data.append('cloud_name', 'dutexiflb');
    try {
        const res = await fetch("https://api.cloudinary.com/v1_1/dutexiflb/image/upload", {
            method: "post",
            body: data
        })

        const dataFile = await res.json();
        return dataFile.url;
    } catch (err) {
        console.log(err)
    }
}


export { getCloudinaryUrl }