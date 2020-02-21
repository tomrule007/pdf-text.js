import React from 'react';
import PropTypes from 'prop-types';

export default function FileInput({ labelText, onChange, htmlFor, accept }) {
  return (
    <div>
      <label htmlFor={htmlFor}>
        {labelText}
        <input type="file" id={htmlFor} onChange={onChange} accept={accept} />
      </label>
    </div>
  );
}

FileInput.propTypes = {
  labelText: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  htmlFor: PropTypes.string.isRequired,
  accept: PropTypes.string.isRequired
};
