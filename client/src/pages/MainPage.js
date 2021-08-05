import React from "react";
import ImageList from '../components/ImageList';
import UploadForm from '../components/UploadForm'

const MainPage = () => {
  return (
    <>
      <h2>사진첩</h2>      
      <UploadForm />
      <ImageList />
    </>
  )
}

export default MainPage;