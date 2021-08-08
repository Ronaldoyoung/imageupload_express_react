import React, { useContext, useEffect, useState } from "react";
import { useParams } from 'react-router'
import { ImageContext } from '../context/ImageContext';
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';

const ImagePage = () => {
  const history = useHistory();
  const { imageId } = useParams();
  const { images, setImages, setMyImages } = useContext(ImageContext);
  const image = images.find(image => image._id === imageId);    
  const [hasLiked, setHasLiked] = useState(false);
  const [me] = useContext(AuthContext);

  useEffect(() => {
    if(me && image && image.likes.includes(me.userId)) {
      setHasLiked(true);
    }
  },[me, image]);

  const updateImage = (images, image) => [
    ...images.filter(image => image._id !== imageId), 
    image
  ].sort((a,b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
  

  const onSubmit = async () => {
    const result = await axios.patch(`/images/${imageId}/${hasLiked? "unlike" : "like"}`)
    if(result.data.public) 
      setImages((prevData) => updateImage(prevData, result.data));        
    setMyImages((prevData) => updateImage(prevData, result.data));
    setHasLiked(!hasLiked);    
  }

  const deleteImage = (images) => images.filter(image => image._id !== imageId)

  const deleteHandler = async () => {
    try{
      if(!window.confirm("정말 해당 이미지를 삭제 하시겠습니까?")) return;
      const result = await axios.delete(`/images/${imageId}`)
      toast.success(result.data.message);
      setImages((prevData) => prevData.filter(image => image._id !== imageId));
      setMyImages((prevData) => prevData.filter(image => image._id !== imageId));
      history.push("/");
    }catch(err) {
      toast.error(err.message);
    }    
  }

  if(!image) return <h2>Loading...</h2>

  return (
    <div>
      <h3>Image Page - {imageId} </h3>
      <img
        style={{ width: "100%"}} 
        alt={imageId} src={`http://localhost:5000/uploads/${image.key}`}
      />
      <span>좋아요 {image.likes.length}</span>
      {me && image.user._id === me.userId && ( 
        <button 
          style={{ float: "right", marginLeft: 10}} 
          onClick={deleteHandler}>
            삭제
        </button> 
      )}
      <button 
        style={{float:"right"}} 
        onClick={onSubmit}
      >
        {hasLiked ? "좋아요 취소" : "좋아요"}
      </button>      
    </div>
  );
}

export default ImagePage;