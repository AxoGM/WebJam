import React from 'react';

function FileUpload() {
    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        // Encrypt and upload file
    };

    return (
        <div>
            <h2>Upload File</h2>
            <input type="file" onChange={handleFileUpload} />
        </div>
    );
}

export default FileUpload;
