function uploadImg(ev) {
    console.log('here for the third time!');
    console.log(ev);


    const CLOUD_NAME = "tamir"
    const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`

    const formData = new FormData();
    formData.append('file', ev.target.files[0])
    formData.append('upload_preset', 'u1inrfbp'); // second parameter is the upload preset

    return fetch(UPLOAD_URL, {
            method: 'POST',
            body: formData
        })
        .then(res => res.json())
        .then(res => {
            console.log(res)
            return res
        })
        .catch(err => console.error(error))
}

export default {
    uploadImg
}