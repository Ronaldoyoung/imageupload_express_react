import React, { useState, useContext } from 'react';
import axios from 'axios';
import "./UploadForm.css";
import { toast } from 'react-toastify';
import ProgressBar from './ProgressBar';
import { ImageContext } from '../context/ImageContext';

const UploadForm = () => {
  const [images, setImages] = useContext(ImageContext);
  const defaultFileName = "이미지 파일을 업로드 해주세요."
  const [file, setFile] = useState(null);
  const [imgSrc, setImgSrc] = useState(null);
  const [fileName, setFileName] = useState(defaultFileName);
  const [percent, setPercent] = useState(0);
  const [isPublic, setIsPublic] = useState(true);

  const imageSelectHandler = (e) => {
    const imageFile = e.target.files[0];
    setFile(imageFile);
    setFileName(imageFile.name);
    const fileReader = new FileReader();
    fileReader.readAsDataURL(imageFile);
    fileReader.onload = e => setImgSrc(e.target.result);
  }  

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("image", file);
    formData.append("public", isPublic);
    try {
      const res = await axios.post("/images", formData, {
        headers: { "Content-Type": "multipart/form-data"},
        onUploadProgress: (e) => {
          setPercent(Math.round(100 *  e.loaded/e.total));
        }
      });      
      setImages([...images, res.data]);
      toast.success("이미지 업로드 성공!!!")
      setTimeout(() => {
        setPercent(0);
        setFileName(defaultFileName);
        setImgSrc(null);
      }, 3000);      
    } catch (error) {
      toast.error(error.response.data.message);
      setPercent(0);
      setFileName(defaultFileName);
      setImgSrc(null);
      console.log(error)
    }
  }

  console.log({ isPublic })

  return (
    <form onSubmit={onSubmit}>      
      <img alt="" src={imgSrc} className={`image-preview ${imgSrc && "image-preview-show"}`} />
      <ProgressBar percent={percent}/>
      <div className="file-dropper">
        {fileName}
        <input id="image" type="file" accept="image/jpg" onChange={imageSelectHandler}/>              
      </div>      
      <input 
        type="checkbox" 
        id="public-check" 
        value={!isPublic} 
        onChange={() => setIsPublic(!isPublic)}
      />
      <label htmlFor="public-check">비공개</label>
      <button type="submit" style={{ width: "100%", height: 40, borderRadius: "3px", cursor: "pointer" }}>제출</button>
    </form>
  )
}

export default UploadForm;