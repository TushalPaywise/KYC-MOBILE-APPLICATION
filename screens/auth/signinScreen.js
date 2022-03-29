import React, { useEffect, useState, useCallback } from "react";
import {
  Text,
  View,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  ScrollView,
  ImageBackground,
  TextInput,
  Alert,
  BackHandler,
} from "react-native";
import { withNavigation } from "react-navigation";
import { Colors, Fonts, Sizes } from "../../constant/styles";
import { MaterialIcons } from "@expo/vector-icons";
import CustomButton from "../../component/CustomButton";
import PasswordField from "../../component/PasswordField";
import {
  loginUser,
  authencationUseSelector,
  clearState,
} from "../../redux/authentication";
import { useDispatch, useSelector } from "react-redux";
import Fetching from "../../component/Fetching";
import * as LocalAuthentication from "expo-local-authentication";
import * as SecureStore from "expo-secure-store";
import { USERSESSION } from "../../constant/ApiConstant";

const SigninScreen = (props) => {
  const [emailAddress, setemailAddress] = useState("tushal@softconnectltd.com");
  const [emailValid, setemailValid] = useState(true);
  const [password, setpassword] = useState("superadmin");

  const dispatch = useDispatch();

  const getBiometricData = async (key) => {
    let userSession = await SecureStore.getItemAsync(key);
    console.log("userSession", userSession);
    if (userSession) {
      console.log("Got User Details in local device");
      const session = JSON.parse(userSession);
      if (
        session.emailAddress !== "undefined" &&
        session.password !== "undefined"
      ) {
        console.log(session.emailAddress);
        console.log(session.password);
        setemailAddress(session.emailAddress);
        setpassword(session.password);
        dispatch(
          loginUser({
            email: session.emailAddress,
            password: session.password,
          })
        );
      } else {
        alertBiometricNotAvailable();
      }
    } else {
      alertBiometricNotAvailable();
    }
  };

  const alertBiometricNotAvailable = () => {
    Alert.alert("Error", "Biometric not set", [{ text: "Ok" }]);
  };

  const bioMetricHandler = useCallback(async () => {
    // You can disable the LocalAuthenticationOptions
    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: "Login with Biometrics",
      cancelLabel: "Cancel",
      disableDeviceFallback: true,
    });
    if (result.success) {
      getBiometricData(USERSESSION);
    }
  }, []);

  const {
    isFetching,
    isLoginSuccess,
    isOtpSuccess,
    isError,
    moreDetails,
    registration,
  } = useSelector(authencationUseSelector);

  const resetFields = () => {
    setemailAddress("");
    setpassword("");
  };

  useEffect(() => {
    return () => {
      dispatch(clearState());
    };
  }, []);

  useEffect(() => {
    if (isError) {
      Alert.alert("Error", moreDetails, [
        { text: "Ok", onPress: () => dispatch(clearState()) },
      ]);
    }
    if (isLoginSuccess && !registration) {
      dispatch(clearState());
      props.navigation.navigate("Otp");
    }
    if (isOtpSuccess) {
      dispatch(clearState());
      // saveBiometricData();
      //show dialogue to enable biometric Feature
      //then redirect to the Dashboard
      props.navigation.navigate("BottomTabBar", {
        emailAddress: emailAddress,
        password: password,
      });
      resetFields();
    }
    if (isLoginSuccess && registration) {
      Alert.alert("Success", moreDetails, [
        {
          text: "Ok",
          onPress: () => {
            dispatch(clearState());
            props.navigation.navigate("Signin");
          },
        },
      ]);
    }
  }, [isError, isLoginSuccess, isOtpSuccess]);

  useEffect(() => {
    const backAction = () => {
      Alert.alert("Hold on!", "Are you want to close the app?", [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel",
        },
        { text: "YES", onPress: () => BackHandler.exitApp() },
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  const validatePassword = (text) => {
    setpassword(text);
  };

  const validateEmail = (text) => {
    setemailValid(true);
    setemailAddress(text);
    //check email address
    const emailRegex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailRegex.test(text.toLowerCase())) {
      setemailValid(false);
    }
  };

  //BIOMETRIC
  // wherever the useState is located
  const [isBiometricSupported, setIsBiometricSupported] = useState(false);
  // Check if hardware supports biometrics
  useEffect(() => {
    (async () => {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      setIsBiometricSupported(compatible);
    })();
  });

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.backgroundGrey }}>
      <StatusBar backgroundColor={Colors.primaryColor} />
      <View>
        {isFetching && <Fetching />}

        <ImageBackground
          source={require("../../assets/mamoru/mamoruhoz.png")}
          style={{ height: 206.0, color: Colors.whiteColor }}
          resizeMode="contain"
        >
          <View style={styles.imageBackgroundShadowStyle}>
            {/* <Text style={{ ...Fonts.whiteColor35Bold }}>Mamoru</Text> */}
          </View>
        </ImageBackground>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text
            style={{
              ...Fonts.blackColor14Medium,
              textAlign: "center",
              marginVertical: Sizes.fixPadding * 2.0,
            }}
          >
            Sign in your account
          </Text>
          <View>
            {!emailValid && (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>Email Not Valid</Text>
                <MaterialIcons
                  name="email"
                  size={18}
                  color="red"
                  style={styles.postionIconLeft}
                />
              </View>
            )}
            <TextInput
              placeholder="Email Address"
              value={emailAddress}
              onChangeText={validateEmail}
              placeholderTextColor={Colors.grayColor}
              style={styles.textFieldStyle}
              maxLength={50}
            />
          </View>
          <View>
            <PasswordField
              placeholder="Password"
              value={password}
              onChangeText={validatePassword}
              maxLength={50}
            />
          </View>
          <CustomButton
            title="Login"
            style={{
              backgroundColor: Colors.blackColor,
              borderRadius: Sizes.fixPadding,
              alignItems: "center",
              justifyContent: "center",
              height: 50.0,
              marginHorizontal: Sizes.fixPadding * 2.0,
            }}
            emailAddress={emailAddress}
            password={password}
          />
          <CustomButton title="New User ?" style={styles.blueButtonStyle} />
          {isBiometricSupported && (
            <View>
              <View>
                <View>
                  <Text
                    style={{
                      ...Fonts.blackColor14Medium,
                      textAlign: "center",
                      marginTop: Sizes.fixPadding * 2,
                    }}
                  >
                    Use Biometric Login
                  </Text>
                  <MaterialIcons
                    name="fingerprint"
                    size={80}
                    color={Colors.primaryColor}
                    style={{
                      alignSelf: "center",
                      marginTop: Sizes.fixPadding * 2.5,
                      marginBottom: Sizes.fixPadding * 2.0,
                    }}
                    onPress={bioMetricHandler}
                  />
                </View>
              </View>
            </View>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  textFieldStyle: {
    ...Fonts.blackColor14Medium,
    borderRadius: Sizes.fixPadding,
    borderColor: Colors.primaryColor,
    backgroundColor: Colors.whiteColor,
    elevation: 3.0,
    marginHorizontal: Sizes.fixPadding * 2.0,
    height: 60.0,
    alignItems: "center",
    paddingHorizontal: Sizes.fixPadding * 2.0,
    marginBottom: Sizes.fixPadding * 2.0,
  },

  imageBackgroundShadowStyle: {
    backgroundColor: "rgba(0, 0, 0, 0.46)",
    alignItems: "center",
    justifyContent: "center",
    height: 206.0,
  },
  blueButtonStyle: {
    backgroundColor: Colors.primaryColor,
    borderRadius: Sizes.fixPadding,
    alignItems: "center",
    justifyContent: "center",
    height: 50.0,
    marginHorizontal: Sizes.fixPadding * 2.0,
    marginTop: 3.0,
  },
  errorContainer: {
    flexDirection: "row-reverse",
    alignItems: "flex-end",
    paddingHorizontal: Sizes.fixPadding * 2.0,
    marginBottom: Sizes.fixPadding * 1.0,
  },
  errorText: {
    ...Fonts.redColor12Medium,
    marginRight: 10,
  },
  postionIconLeft: {
    marginRight: 10,
  },
});

SigninScreen.navigationOptions = () => {
  return {
    header: () => null,
  };
};

export default withNavigation(SigninScreen);
