import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import {ImageContext} from '../context/ImageContext'

const ImageList = () => {  
  const [images] = useContext(ImageContext);

  const imgList = images.map(image => (
    <img 
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