import React, { useState } from 'react';
import axios from 'axios'

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
      alert("success!! ")
    } catch (error) {
      alert("fail!!");
      console.log(error)
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <lable htmlFor="image">{fileName}</lable>
      <input 
        id="image"
        type="file"
        onChange={imageSelectHandler}
      />
      <button type="submit">제출</button>
    </form>
  )
}

export default UploadForm;