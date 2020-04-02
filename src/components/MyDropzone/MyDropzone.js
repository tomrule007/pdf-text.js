/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

import './MyDropzone.css';

export default function MyDropzone() {
  const onDrop = useCallback(acceptedFiles => {
    // Do something with the files
    console.log(acceptedFiles);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <section className="container">
      <div {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag 'n' drop some files here, or click to select files</p>
        )}
      </div>
    </section>
  );
}
