import {createSlice} from '@reduxjs/toolkit';
import React, {useEffect} from 'react';

const initialState = {
  data: {},
};

export const runningSlice = createSlice({
  name: 'running',
  initialState,
  reducers: {
    saveData(state, action) {
      state.data = action.payload.data;
      console.log(action.payload.data, '이것이 data');
    },
  },
});

export const runningActions = runningSlice.actions;
