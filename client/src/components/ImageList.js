import React, { useContext } from "react";
import { ImageContext } from '../context/ImageContext'
import { AuthContext } from '../context/AuthContext';

const ImageList = () => {  
  const { images, myImages, isPublic, setIsPublic } = useContext(ImageContext);  
  const [me] = useContext(AuthContext);

  const imgList = (isPublic ? images : myImages).map((image) => (
    <img
      alt="" 
      key={image.key}
      style={{width: "100%"}} src={`http://localhost:5000/uploads/${image.key}`} 
    />
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
      { imgList }
    </div>
  )
}

export default ImageList;