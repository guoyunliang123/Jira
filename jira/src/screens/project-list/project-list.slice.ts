import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../store";

interface State {
  projectModalOpen: boolean;
}

const initialState: State = {
  projectModalOpen: false
}

export const projectListSlice = createSlice({
  // 标识这个 slice 本身
  name: 'projectListSlice',
  initialState,
  reducers: {
    openProjectModal(state) {
      state.projectModalOpen = true
    },
    closeProjectModal(state) {
      state.projectModalOpen = false
    }
  }
})

export const projectListActions = projectListSlice.actions

export const selectProjectModalOpen = (state: RootState) => state.projectList.projectModalOpen