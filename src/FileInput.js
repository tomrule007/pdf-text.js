import React, { useState } from 'react';

export default function FileInput({ onChange }) {
  return (
    <div>
      <label>Select fsdsdyour OGC invoices: </label>
      <input
        type="file"
        onChange={onChange}
        webkitdirectory=""
        directory=""
        accept=".pdf"
      />
    </div>
  );
}
