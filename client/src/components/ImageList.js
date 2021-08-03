import React, { useEffect, useState } from "react";
import axios from "axios";

const ImageList = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {



    axios
    .get("/images")
    .then(result => setImages(result.data))
    .catch((err) => console.log(err))    
  }, [])

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