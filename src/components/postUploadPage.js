import React from 'react'
import { db } from './firebase'

function postUploadPage() {
    
    const allInputs = {imgUrl: ''}
    const [imageAsFile, setImageAsFile] = useState('')
    const [imageAsUrl, setImageAsUrl] = useState(allInputs)
    const [caption, setCaption] = useState('')

    console.log(imageAsFile)
    const handleImageAsFile = (e) => {
        const image = e.target.files[0]
        setImageAsFile(imageFile => (image))
    }
    const handleFireBaseUpload = e => {
        e.preventDefault()
        console.log('start of upload')
        if(imageAsFile === '') {
        console.error(`not an image, the image file is a ${typeof(imageAsFile)}`)
        }
        const uploadTask = storage.ref(`/images/${imageAsFile.name}`).put(imageAsFile)
        uploadTask.on('state_changed', 
        (snapShot) => {
        console.log(snapShot)
        }, (err) => {
        console.log(err)
        }, () => {
        // gets the functions from storage refences the image storage in firebase by the children
        // gets the download url then sets the image from firebase as the value for the imgUrl key:
        // storage.ref('images').child(imageAsFile.name).getDownloadURL()
        // .then(fireBaseUrl => {
        //     setImageAsUrl(prevObject => ({...prevObject, imgUrl: fireBaseUrl}))
        // })
        storage.ref('images').child(image.name).getDownloadURL()
        .then(fireBaseUrl => {
            setImageAsFile()
            firebase.firestore.collection('user').doc().add({
                timeStamp: firebase.firestore.FieldValue.serverTimesStamp({
                }),   
                caption:caption,
                imageUrl:fireBaseUrl,
                userName:username,
            }).then(()=>{
                setCaption('');
                setImage(null);
            }) 
        }).catch((e) => alert('error on image deletion => ', e));
        })
        }


    return (
        <div>   
        {/* <div>
            <input type="file" onChange={handleImageAsFile}/>
            <button>upload to firebase</button>
        </div>
        <img src={imageAsUrl.imgUrl} alt="image tag" />
        <h5>{}</h5> */}
        </div>
    )
}

export default postUploadPage
