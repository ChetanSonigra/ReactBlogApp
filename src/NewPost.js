import React, { useState } from "react";
import "./NewPost.css";

const BASE_URL = process.env.REACT_APP_API_URL;

function NewPost() {
  const [image, setImage] = useState(null)
  const [creator,setCreator] = useState("")
  const [title, setTitle] = useState("")
  const [text, setText] = useState("")

  const HandleImageUpload = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0])
    }
  } 

  const HandleCreatePost = (e) => {
    e?.preventDefault()
    
    const formData = new FormData()
    formData.append('image',image)

    const requestOptions = {
      method: 'POST',
      body: formData
    }

    fetch(BASE_URL + "post/image", requestOptions)
      .then(response => {
        if (response.ok) {
          return response.json()
        }
        throw response
      })
      .then(data => {
        createPost(data.filename)
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() =>{
        setImage(null)
        document.getElementById('fileInput').value = null
      })
 
    const createPost = (imageUrl) => {
      const json_string = JSON.stringify({
        "image_url": imageUrl,
        "title": title,
        "content": text,
        "creator": creator
      })
     
      const requestOptions = {
        method: 'POST',
        body: json_string,
        headers: new Headers({
          "Content-Type": "application/json"
        })
      }

      fetch(BASE_URL + "post", requestOptions)
        .then(data => {
          window.location.reload()
          window.scrollTo(0,0)
        })
        .catch(error => {
          console.log(error);
        })
    }
  }

  return (
    <div className="newpost_content">
      <div className="newpost_image">
        <input type="file" id="fileInput" onChange={HandleImageUpload}/>        
      </div>
      <div className="newpost_creator">
        <input className="newpost_creator" type="text" id="creator_input"
               placeholder="Creator" onChange={(event) => setCreator(event.target.value)}
               value={creator} />
      </div>
      <div className="newpost_title">
        <input className="newpost_title" type="text" id="title_input"
               placeholder="Title" onChange={(event) => setTitle(event.target.value)}
               value={title} />
      </div>
      <div className="newpost_text">
        <textarea className="newpost_text" type="text" id="text_input" rows='10'
               placeholder="Content" onChange={(event) => setText(event.target.value)}
               value={text} />
      </div>
      <div>
        <button className="create_button" onClick={HandleCreatePost}>Create</button>
      </div>
    </div>
      
  )

}

export default NewPost
