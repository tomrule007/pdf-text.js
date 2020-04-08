/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

// file storage & retrieval utility functions
export function ab2str(buf) {
  return String.fromCharCode.apply(null, new Uint8Array(buf));
}
export function str2ab(str) {
  const buf = new ArrayBuffer(str.length); // 2 bytes for each char
  const bufView = new Uint8Array(buf);
  for (let i = 0, strLen = str.length; i < strLen; i += 1) {
    bufView[i] = str.charCodeAt(i);
  }
  return buf;
}

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
        state.error = action.payload;
      }
    }
  }
});

// only exported for testing (should not be used by production code outside of this module)
export const { fileLoading, fileReceived, fileFailed } = fileSlice.actions;

export const loadFiles = files => async dispatch => {
  [...files].forEach(async file => {
    dispatch(fileLoading(file.name));

    try {
      const bufferString = ab2str(await file.arrayBuffer());

      dispatch(
        fileReceived({
          name: file.name,
          bufferString,
          type: file.type,
          timeReceived: Date.now()
        })
      );
    } catch (error) {
      dispatch(fileFailed(error));
    }
  });
};

export default fileSlice.reducer;
