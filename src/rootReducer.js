import { combineReducers } from '@reduxjs/toolkit';
import fileReducer from './feature/file/fileSlice';

const rootReducer = combineReducers({ file: fileReducer });

export default rootReducer;
