import React, { useContext, useRef, useEffect, useCallback } from "react";
import { ImageContext } from '../context/ImageContext'
import { AuthContext } from '../context/AuthContext';
import "./ImageList.css";
import { Link } from 'react-router-dom';
import Image from './image';

const ImageList = () => {  
  const { 
    images,     
    isPublic, 
    setIsPublic,      
    imageLoading,
    imageError,
    setImageUrl
  } = useContext(ImageContext);  
  const [me] = useContext(AuthContext);
  const elementRef = useRef(null);

  const lastImageId = images.length > 0 ? images[images.length - 1]._id : null;  

  const loaderMoreImages = useCallback(() => {    
    if(imageLoading || !lastImageId) return;    
    setImageUrl(`${isPublic ? "" : "/users/me"}/images?lastid=${lastImageId}`);
  }, [lastImageId, imageLoading, isPublic, setImageUrl]);

  useEffect(() => {
    if(!elementRef.current) return;
    const observer = new IntersectionObserver(([entry]) => {
      console.log("intersection", entry.isIntersecting)
      if(entry.isIntersecting) loaderMoreImages();
    });
    observer.observe(elementRef.current);
    return () => observer.disconnect();
  }, [loaderMoreImages]);

  const imgList = images.map((image, index) => (
    <Link 
      key={image.key} 
      to={`/images/${image._id}`} 
      ref={index+3 === images.length ? elementRef : undefined}
    >
      <Image imageUrl={`http://daocsgp4z8b0o.cloudfront.net/w140/${image.key}`} />      
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
      {imageLoading && <div>Loading..</div>}      
    </div>
  )
}

export default ImageList;