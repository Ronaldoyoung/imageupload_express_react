import React, { useContext } from "react";
import { ImageContext } from '../context/ImageContext'
import { AuthContext } from '../context/AuthContext';
import "./ImageList.css";
import { Link } from 'react-router-dom';

const ImageList = () => {  
  const { 
    images, 
    myImages, 
    isPublic, 
    setIsPublic, 
    loaderMoreImages, 
    imageLoading,
    imageError
  } = useContext(ImageContext);  
  const [me] = useContext(AuthContext);

  const imgList = (isPublic ? images : myImages).map((image) => (
    <Link key={image.key} to={`/images/${image._id}`}>
      <img
        alt=""         
        src={`http://localhost:5000/uploads/${image.key}`}
      />
    </Link>    
  ));  

  const isPublicHandler = () => {    
    setIsPublic(!isPublic);
  }

  return (
    <div>
      <h3 style={{ display:"inline-block", marginRight: 10 }}>
        ImageList({isPublic ? "공개" : "개인" } 사진)
      </h3>
      {me && <button onClick={isPublicHandler}>{(isPublic ? "개인" : "공개") + "사진 보기"}</button>}
      <div className="image-list-container">
        { imgList }
      </div>  
      {imageError && <div>Error....</div>}       
      {imageLoading ? ( 
        <div>Loading....</div> 
      ) : (
        <button onClick={loaderMoreImages}>Load More Images</button>
      )};
    </div>
  )
}

export default ImageList;