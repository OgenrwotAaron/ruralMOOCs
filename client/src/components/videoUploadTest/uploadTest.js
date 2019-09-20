import React from 'react';
import FileUpload from './fileUpload';

const UploadTest = () => (
    <div className='container mt-4' style={{background:'#333'}}>
        <h4 className='display-4 text-center mb-4'>
            <i className='fab fa-react'></i>React File Upload
        </h4>

        <FileUpload/>
    </div>
)
 
export default UploadTest;