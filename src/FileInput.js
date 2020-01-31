import React from 'react';

export default function FileInput({ onChange }) {
  return (
    <div>
      <label>
        Select your OGC invoice folder:
        <input type="file" onChange={onChange} accept=".pdf" />
      </label>
    </div>
  );
}
