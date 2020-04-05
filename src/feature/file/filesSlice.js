/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const fileSlice = createSlice({
  name: 'file',
  initialState: { loading: 'idle', files: [] },
  reducers: {
    fileLoading: state => {
      if (state.loading === 'idle' || state.loading === 'error') {
        state.loading = 'pending';
      }
    },
    fileReceived: (state, action) => {
      if (state.loading === 'pending') {
        state.loading = 'idle';
      }
      state.files.push(action.payload);
    },
    fileFailed: (state, action) => {
      if (state.loading === 'pending') {
        state.loading = 'error';
        // action.payload.error (contains error msg)
      }
    }
  }
});

const { fileLoading, fileReceived, fileFailed } = fileSlice.actions;

export const loadFiles = files => dispatch => {
  // TODO: add multiple file support
  const file = files[0];

  dispatch(fileLoading(file.name));

  file
    .arrayBuffer()
    .then(data => {
      dispatch(
        fileReceived({
          name: file.name,
          data,
          type: file.type,
          timeReceived: Date.now()
        })
      );
    })
    .catch(error => dispatch(fileFailed(error)));
};

export default fileSlice.reducer;
