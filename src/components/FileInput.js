import React from 'react';
import PropTypes from 'prop-types';

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

FileInput.propTypes = {
  onChange: PropTypes.func.isRequired
};
