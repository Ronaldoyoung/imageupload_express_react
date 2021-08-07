import React, { useContext } from "react";
import {ImageContext} from '../context/ImageContext'

const ImageList = () => {  
  const [images] = useContext(ImageContext);

  const imgList = images.map(image => (
    <img
      alt="" 
      key={image.key}
      style={{width: "100%"}} src={`http://localhost:5000/uploads/${image.key}`} 
    />
  ));
  console.log({ images });

  return (
    <div>
      <h3>ImageList</h3>
      { imgList }
    </div>
  )
}

export default ImageList;