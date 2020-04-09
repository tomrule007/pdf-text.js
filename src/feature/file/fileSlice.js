/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import localForage from 'localforage';

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
      // TODO: add overwrite detection (get before setting)
      await localForage.setItem(file.name, file);

      dispatch(
        fileReceived({
          name: file.name,
          key: file.name,
          type: file.type,
          size: file.size,
          lastModified: file.lastModified,
          timeReceived: Date.now()
        })
      );
    } catch (error) {
      dispatch(fileFailed(error));
    }
  });
};

export default fileSlice.reducer;
