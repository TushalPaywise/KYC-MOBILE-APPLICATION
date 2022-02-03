import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  API_URL,
  EMAIL_SUPPORT,
  FAILURE,
  RESET_PASSWORD,
} from "../constant/ApiConstant";

export const backendService = createAsyncThunk(
  "users/backendService",
  async (requestData) => {
    let endpoint = "mobileservice";
    if (JSON.parse(requestData).api === EMAIL_SUPPORT) {
      endpoint = "emailsupport";
    } else if (JSON.parse(requestData).api === RESET_PASSWORD) {
      endpoint = "passwordReset";
    }

    try {
      const response = await fetch(`${API_URL}/api/rest/${endpoint}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: requestData,
      });
      const data = await response.json();
      if (response.status === 200) {
        return data;
      }
    } catch (e) {
      throw new Error(data.moreDetails);
    }
  }
);

export const backendSlice = createSlice({
  name: "backend",
  initialState: {
    isFetching: false,
    isSuccess: false,
    isError: false,
    payload: "",
  },
  reducers: {
    clearState: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isFetching = false;
      state.payload = "";
      return state;
    },
  },
  extraReducers: {
    //Mobile Service Backend
    [backendService.fulfilled]: (state, { payload }) => {
      if (payload.status === FAILURE) {
        state.isError = true;
        state.isSuccess = false;
        state.isFetching = false;
      } else {
        state.isSuccess = true;
        state.isFetching = false;
        state.isError = false;
      }
      state.payload = payload;
    },
    [backendService.rejected]: (state) => {
      state.isFetching = false;
      state.isError = true;
      state.isSuccess = false;
      state.payload = payload;
    },
    [backendService.pending]: (state) => {
      state.isFetching = true;
    },
  },
});

// Action creators are generated for each case reducer function
export const { clearState } = backendSlice.actions;

export const backendUseSelector = (state) => state.backend;

export default backendSlice.reducer;
