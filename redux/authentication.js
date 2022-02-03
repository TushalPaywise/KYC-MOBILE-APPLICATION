import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL, FAILURE, SUCCESS, TOKENVALID } from "../constant/ApiConstant";
import AsyncStorage from "@react-native-async-storage/async-storage";

//login controlller

let timer;
export const loginUser = createAsyncThunk(
  "users/loginUser",
  async ({ email, password }) => {
    try {
      const response = await fetch(`${API_URL}/api/rest/login`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
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
//user registration controller
export const userRegistration = createAsyncThunk(
  "users/userRegistration",
  async ({ email, password, mobileNumber, idNumber }) => {
    try {
      const response = await fetch(`${API_URL}/api/rest/register`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          mobileNumber,
          idNumber,
        }),
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
//user authenticate with OTP
export const userAuthenticate = createAsyncThunk(
  "users/userAuthenticate",
  async ({ email, token, otp }) => {
    try {
      const response = await fetch(`${API_URL}/api/rest/authenticate`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          token,
          otp,
        }),
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

export const authenticationSlice = createSlice({
  name: "authentication",
  initialState: {
    isFetching: false,
    isLoginSuccess: false,
    isOtpSuccess: false,
    isError: false,
    moreDetails: "",
    registration: false,
  },
  reducers: {
    clearState: (state) => {
      state.isError = false;
      state.isLoginSuccess = false;
      state.isFetching = false;
      state.isOtpSuccess = false;
      state.moreDetails = "";
      state.registration = false;
      return state;
    },
  },
  extraReducers: {
    //login successfull, check for the token and otp
    [loginUser.fulfilled]: (state, { payload }) => {
      if (payload.status === FAILURE) {
        state.isError = true;
        state.isLoginSuccess = false;
        state.isOtpSuccess = false;
        state.moreDetails = payload.moreDetails;
      } else if (payload.status === SUCCESS && payload.token != null) {
        state.isError = false;
        state.isLoginSuccess = true;
        state.moreDetails = payload.moreDetails;
        const logoutTimer = parseInt(payload.expireIn) * 60000;
        setLogoutTimer(logoutTimer);
        storeUserLoginData(
          payload.token,
          payload.status,
          logoutTimer,
          payload.moreDetails,
          payload.email,
          payload.userId,
          payload.firstName,
          payload.lastName,
          payload.accountStatus
        );
      }
      state.isFetching = false;
      return state;
    },
    [loginUser.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.moreDetails = "Error, please retry !";
      return state;
    },
    [loginUser.pending]: (state) => {
      state.isFetching = true;
      return state;
    },
    //Registration Reducer
    [userRegistration.fulfilled]: (state, { payload }) => {
      if (payload.status === FAILURE) {
        state.isError = true;
        state.isLoginSuccess = false;
        state.moreDetails = payload.moreDetails;
        state.registration = true;
      } else if (payload.status === SUCCESS) {
        state.isError = false;
        state.isLoginSuccess = true;
        state.moreDetails = payload.moreDetails;
        state.registration = true;
      }
      state.isFetching = false;
    },
    [userRegistration.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.moreDetails = "Error, please retry !";
    },
    [userRegistration.pending]: (state) => {
      state.isFetching = true;
    },
    //Authentication OTP
    [userAuthenticate.fulfilled]: (state, { payload }) => {
      if (payload.status === SUCCESS && payload.moreDetails === TOKENVALID) {
        state.isError = false;
        state.moreDetails = payload.moreDetails;
        state.isOtpSuccess = true;
        storeUserCardDetails(payload);
      } else {
        state.isError = true;
        state.isOtpSuccess = false;
        state.moreDetails = payload.moreDetails;
      }
      state.isFetching = false;
    },
    [userAuthenticate.rejected]: (state) => {
      state.isFetching = false;
      state.isError = true;
      state.isLoginSuccess = false;
      state.isOtpSuccess = false;
      state.moreDetails = "Error, please retry !";
    },
    [userAuthenticate.pending]: (state) => {
      state.isFetching = true;
    },
  },
});

export const logout = () => {
  clearLogoutTimer();
  AsyncStorage.removeItem("userLoginData");
  AsyncStorage.removeItem("userCardDetails");
};

const clearLogoutTimer = () => {
  if (timer) {
    clearTimeout(timer);
  }
};

const setLogoutTimer = (expirationTime) => {
  timer = setTimeout(() => {
    logout();
  }, expirationTime);
};

const storeUserLoginData = async (
  token,
  status,
  expireIn,
  moreDetails,
  email,
  userId,
  firstName,
  lastName,
  accountStatus
) => {
  try {
    const jsonValue = JSON.stringify({
      token: token,
      status: status,
      expireIn: expireIn,
      moreDetails: moreDetails,
      email: email,
      userId: userId,
      firstName: firstName,
      lastName: lastName,
      accountStatus: accountStatus,
    });
    await AsyncStorage.setItem("userLoginData", jsonValue);
  } catch (e) {
    // saving error
  }
};

const storeUserCardDetails = async (data) => {
  try {
    await AsyncStorage.setItem("userCardDetails", JSON.stringify(data));
  } catch (e) {
    // saving error
  }
};

// Action creators are generated for each case reducer function
export const { clearState } = authenticationSlice.actions;

export const authencationUseSelector = (state) => state.authentication;

export default authenticationSlice.reducer;
