import { createSlice } from "@reduxjs/toolkit";

export const ifcModels = createSlice({
  name: "ifcModels",
  initialState: {
    value: [],
    name: "",
  },
  reducers: {
    addModel: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value.push(action.payload[0]);
      state.name = action.payload[1];
    },
    removeModel: (state) => {
      state.value = [];
      state.name = "";
    },
  },
});

// Action creators are generated for each case reducer function
export const { addModel, removeModel } = ifcModels.actions;

export default ifcModels.reducer;
