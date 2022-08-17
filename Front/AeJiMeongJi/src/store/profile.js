import {createSlice} from '@reduxjs/toolkit';
import React, {useEffect} from 'react';

const initialState = {
  dog: {},
  id: '',
  ids: [],
};

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    // 현재 선택된 강아지 id 저장
    saveDogid(state, action) {
      state.id = action.payload.id;
      console.log(action.payload.id);
    },
    // 강아지 모든 목록
    saveDogIds(state, action) {
      state.ids = action.payload;
    },
    setDogInfo(state, action) {
      state.dog = action.payload.dog;
    },
  },
});

export const profileActions = profileSlice.actions;
