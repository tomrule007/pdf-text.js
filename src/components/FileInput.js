import React from 'react';
import PropTypes from 'prop-types';

export default function FileInput({ onChange, htmlFor }) {
  return (
    <div>
      <label htmlFor={htmlFor}>
        Select a pdf file:
        <input type="file" id={htmlFor} onChange={onChange} accept=".pdf" />
      </label>
    </div>
  );
}

FileInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  htmlFor: PropTypes.string.isRequired
};
