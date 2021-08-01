import React, { useState } from 'react';
import axios from 'axios';
import "./UploadForm.css";
import { toast } from 'react-toastify';

const UploadForm = () => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("이미지 파일을 업로드 해주세요.");


  const imageSelectHandler = (e) => {
    const imageFile = e.target.files[0];
    setFile(imageFile);
    setFileName(imageFile.name);
  }  

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("image", file);

    try {
      const res = await axios.post("/upload", formData, {
        headers: { "Content-Type": "multipart/form-data"}
      });
      console.log({ res })
      toast.success("이미지 업로드 성공!")
    } catch (error) {
      toast.error(error.message)
      console.log(error)
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="file-dropper">
        {fileName}
        <input id="image" type="file" onChange={imageSelectHandler}/>      
      </div>      
      <button type="submit" style={{ width: "100%", height: 40, borderRadius: "3px", cursor: "pointer" }}>제출</button>
    </form>
  )
}

export default UploadForm;