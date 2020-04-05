import { combineReducers } from '@reduxjs/toolkit';
import fileReducer from './feature/file/filesSlice';

const rootReducer = combineReducers({ file: fileReducer });

export default rootReducer;
