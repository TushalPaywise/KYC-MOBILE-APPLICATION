import { configureStore } from "@reduxjs/toolkit";
import authentication from "./authentication";
import backend from "./backend";

export default configureStore({
  reducer: {
    authentication: authentication,
    backend: backend,
  },
});
