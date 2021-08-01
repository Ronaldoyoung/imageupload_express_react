import React from 'react';

const UploadForm = () => {
  return (
    <form>
      <lable htmlFor="image">사진</lable>
      <input 
        id="image"
        type="file"
      />
      <button type="submit">제출</button>
    </form>
  )
}

export default UploadForm;