import React, { useEffect, useState } from "react";
import { Alert, Text, TouchableOpacity } from "react-native";
import { Fonts, Sizes } from "../constant/styles";
import {
  loginUser,
  userAuthenticate,
  userRegistration,
} from "../redux/authentication";
import { withNavigation } from "react-navigation";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useDispatch } from "react-redux";
import { backendService } from "../redux/backend.js";
import {
  EMAIL_SUPPORT,
  PIN_CHANGE,
  PIN_SELECTION,
  RESET_PASSWORD,
  ESTATEMENT,
} from "../constant/ApiConstant";

const CustomButton = (props) => {
  //this is use to get the state values from useSelector
  // const { count, token, password, emailAddress } = useSelector(
  //   (state) => state.authentication
  // );
  const [userDataJson, setUserDataJson] = useState("");
  useEffect(() => {
    const userLoginData = async () => {
      const userData = await AsyncStorage.getItem("userLoginData");
      try {
        if (userData !== null) {
          const transformedData = JSON.parse(userData);
          setUserDataJson(transformedData);
        }
      } catch (e) {
        Alert.alert("Error", "Please login again", [
          { text: "Ok", onPress: () => props.navigation.navigate("Signin") },
        ]);
      }
    };
    userLoginData();
  }, []);

  const dispatch = useDispatch();

  const onPressHandler = () => {
    switch (props.title) {
      case "Register":
        if (
          props.emailAddress === "" ||
          props.password === "" ||
          props.mobileNumber === "" ||
          props.nationalID === "" ||
          props.confirmPassword === ""
        ) {
          return Alert.alert("Details required", "Please input all details !", [
            { text: "OK" },
          ]);
        } else if (props.password !== props.confirmPassword) {
          return Alert.alert(
            "Password Mismatch",
            "Password and Confirm Password does not match !",
            [{ text: "OK" }]
          );
        } else {
          dispatch(
            userRegistration({
              email: props.emailAddress,
              password: props.password,
              mobileNumber: props.mobileNumber,
              idNumber: props.nationalID,
            })
          );
        }
        break;
      case "Authenticate":
        // authenticate with OTP for dashboard login
        const { token, status, expireIn, moreDetails, email } = userDataJson;
        const expirationDate = new Date(expireIn);
        dispatch(
          userAuthenticate({
            email: userDataJson.email,
            token: userDataJson.token,
            otp: props.otpValue,
          })
        );
        break;
      case "New User ?":
        props.navigation.navigate("Register");
        // props.navigation.navigate("BottomTabBar");
        break;
      case "Already Registered ?":
        props.navigation.navigate("Signin");
        break;
      case "Login":
        if (props.emailAddress === "" || props.password === "") {
          return Alert.alert(
            "Wrong Credentials",
            "Please input username and password",
            [{ text: "OK" }]
          );
        } else {
          dispatch(
            loginUser({
              email: props.emailAddress,
              password: props.password,
            })
          );
        }
        break;
      case "Register PIN":
        if (
          props.newPin === "" ||
          props.confirmNewPin === "" ||
          props.fullPan === ""
        ) {
          Alert.alert("Field Empty", "Please input all details required", [
            { text: "Retry" },
          ]);
        } else if (props.newPin !== props.confirmNewPin) {
          Alert.alert("PIN Error", "New PIN and Confirm PIN does not match", [
            { text: "Retry" },
          ]);
        } else {
          dispatch(
            backendService(
              JSON.stringify({
                email: userDataJson.email,
                token: userDataJson.token,
                api: PIN_SELECTION,
                userId: userDataJson.userId,
                newPin: props.newPin,
                cardNumber: props.fullPan,
              })
            )
          );
        }

        break;
      case "Change PIN":
        if (
          props.oldPin === "" ||
          props.newPin === "" ||
          props.confirmNewPin === "" ||
          props.cardNumber === ""
        ) {
          Alert.alert("Field Empty", "Please input all details required", [
            { text: "Retry" },
          ]);
        } else if (props.newPin !== props.confirmNewPin) {
          Alert.alert("PIN Error", "New PIN and Confirm PIN does not match", [
            { text: "Retry" },
          ]);
        } else {
          dispatch(
            backendService(
              JSON.stringify({
                email: userDataJson.email,
                token: userDataJson.token,
                api: PIN_CHANGE,
                userId: userDataJson.userId,
                newPin: props.newPin,
                oldPin: props.oldPin,
              })
            )
          );
        }

        break;
      case "Email Support":
        if (
          props.name === "" ||
          props.phoneNumber === "" ||
          props.message === ""
        ) {
          Alert.alert("Field Empty", "Please input all details required", [
            { text: "Retry" },
          ]);
        } else {
          dispatch(
            backendService(
              JSON.stringify({
                email: userDataJson.email,
                token: userDataJson.token,
                api: EMAIL_SUPPORT,
                userId: userDataJson.userId,
                emailUserName: props.name.toUpperCase(),
                mobileNumber: props.phoneNumber,
                emailMessage: props.message,
              })
            )
          );
        }
        break;
      case "Reset Password":
        if (
          props.newPassword === "" ||
          props.currentPassword === "" ||
          props.confirmPassword === "" ||
          props.idNumber === ""
        ) {
          Alert.alert("Field Empty", "Please input all details required", [
            { text: "Retry" },
          ]);
        } else if (props.confirmPassword !== props.newPassword) {
          Alert.alert(
            "Password Mismatch",
            "New password and confirm password does not match !",
            [{ text: "Retry" }]
          );
        } else if (props.currentPassword === props.newPassword) {
          Alert.alert(
            "Same password",
            "Current and new password cannot be the same !",
            [{ text: "Retry" }]
          );
        } else {
          dispatch(
            backendService(
              JSON.stringify({
                email: userDataJson.email,
                token: userDataJson.token,
                api: RESET_PASSWORD,
                idNumber: props.idNumber,
                password: props.currentPassword,
                newPassword: props.newPassword,
                viaMobileApp: true,
              })
            )
          );
        }
        break;
      case "Search":
        dispatch(
          backendService(
            JSON.stringify({
              email: userDataJson.email,
              token: userDataJson.token,
              api: ESTATEMENT,
              userId: userDataJson.userId,
              dateFrom: props.dateFrom,
              dateTo: props.dateTo,
              currency: props.currency,
            })
          )
        );
        break;
    }
  };

  return (
    <TouchableOpacity
      //  //     <Text>{count}</Text>
      activeOpacity={0.9}
      onPress={onPressHandler}
      style={props.style}
    >
      <Text
        style={{
          ...Fonts.whiteColor16Bold,
          marginHorizontal: Sizes.fixPadding,
          marginVertical:
            props.marginVertical !== null ? props.marginVertical : "",
        }}
      >
        {props.title}
      </Text>
    </TouchableOpacity>
  );
};

export default withNavigation(CustomButton);
