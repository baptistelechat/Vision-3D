import { configureStore } from "@reduxjs/toolkit";
import ifcModelsReducer from "./ifcModels";

export default configureStore({
  reducer: {
    ifcModels: ifcModelsReducer,
  },
});
