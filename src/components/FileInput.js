import React from 'react';

export default function FileInput({ onChange }) {
  return (
    <div>
      <label>
        Select a pdf file:
        <input type="file" onChange={onChange} accept=".pdf" />
      </label>
    </div>
  );
}
