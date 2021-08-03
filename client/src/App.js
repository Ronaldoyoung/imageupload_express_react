import React , {useState, useEffect }from 'react';
import axios from "axios";
import UploadForm from './components/UploadForm'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ImageList from './components/ImageList';

const App = () => {

  const [images, setImages] = useState([]);

  useEffect(() => {
    axios
    .get("/images")
    .then(result => setImages(result.data))
    .catch((err) => console.log(err))    
  }, [])

  return (
    <div style={{ maxWidth: 600, margin: "auto" }}>
      <ToastContainer />
      <h2>사진첩</h2>      
      <UploadForm images={images} setImages={setImages} />
      <ImageList images={images}/>
    </div>
  );
}

export default App;
