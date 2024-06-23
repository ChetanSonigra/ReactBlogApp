import React, { useEffect, useState } from "react";
import "./Post.css";

const BASE_URL = process.env.REACT_APP_API_URL;

function Post({post}) {
  const [imageUrl, setImageUrl] = useState("")
  
  useEffect(() => {
    setImageUrl(BASE_URL + post.image_url)
  },[])
 
  const HandleDelete = (event) => {
    event?.preventDefault()

    const requestOptions = {
      method: "DELETE"
    }

    fetch(BASE_URL + "post/delete/" + post.id, requestOptions)
      .then(response => {
        if (response.ok) {
          window.location.reload()
        }
        throw response
      })
      .catch(error =>{
        console.log(error);
      })
  }
  
  return (
    <div className="post">
      <img className="post_image" src={imageUrl}/>
      <div className="post_content">
        <div className="post_title">{post.title}</div>
        <div className="post_creator">By {post.creator}</div>
        <div className="post_text">{post.content}</div>
        <div className="post_delete">
          <button onClick={HandleDelete}>Delete Post</button>
        </div>
      </div>
    </div>
  )
}
export default Post
