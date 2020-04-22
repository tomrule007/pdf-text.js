/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useDropzone } from 'react-dropzone';
import { loadFiles } from '../../feature/file/fileSlice';

import './MyDropzone.css';

export default function MyDropzone() {
  const dispatch = useDispatch();
  const onDrop = useCallback(
    acceptedFiles => dispatch(loadFiles(acceptedFiles)),
    []
  );
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
