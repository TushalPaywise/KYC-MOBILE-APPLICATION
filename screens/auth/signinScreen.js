import React, { useEffect, useState } from "react";
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
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import CustomButton from "../../component/CustomButton";
import PasswordField from "../../component/PasswordField";
import {
  authencationUseSelector,
  clearState,
} from "../../redux/authentication";
import { useDispatch, useSelector } from "react-redux";
import Fetching from "../../component/Fetching";

const SigninScreen = (props) => {
  const [emailAddress, setemailAddress] = useState("");
  const [emailValid, setemailValid] = useState(true);
  const [password, setpassword] = useState("");
  const [passwordValid, setPasswordValid] = useState(true);

  const resetFields = () => {
    setemailAddress("");
    setpassword("");
  };

  const dispatch = useDispatch();
  const {
    isFetching,
    isLoginSuccess,
    isOtpSuccess,
    isError,
    moreDetails,
    registration,
  } = useSelector(authencationUseSelector);

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
      resetFields();
      props.navigation.navigate("Otp");
    }
    if (isOtpSuccess) {
      dispatch(clearState());
      props.navigation.navigate("BottomTabBar");
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

  const validateEmail = (props) => {
    setemailValid(true);
    setemailAddress(props);
    //check email address
    const emailRegex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (props.length === 0 || !emailRegex.test(props.toLowerCase())) {
      setemailValid(false);

      return;
    }
  };

  const validatePassword = (text) => {
    setPasswordValid(true);
    setpassword(text);
    //check the password length
    if (text.length === 0) {
      setPasswordValid(false);
      return;
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F2F4F6" }}>
      <StatusBar backgroundColor={Colors.primaryColor} />
      <View>
        {isFetching && <Fetching />}

        <ImageBackground
          source={require("../../assets/images/banking.png")}
          style={{ height: 206.0, width: "100%" }}
        >
          <View style={styles.imageBackgroundShadowStyle}>
            <Text style={{ ...Fonts.whiteColor35Bold }}>Primecard</Text>
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
            {!passwordValid && (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>Password Invalid</Text>
                <MaterialCommunityIcons
                  name="form-textbox-password"
                  size={18}
                  color="red"
                  style={styles.postionIconLeft}
                />
              </View>
            )}
            <PasswordField
              placeholder="Password"
              value={password}
              onChangeText={validatePassword}
              maxLength={50}
            />
          </View>
          <CustomButton
            title="Login"
            style={styles.blackButtonStyle}
            emailAddress={emailAddress}
            password={password}
          />
          <CustomButton title="New User ?" style={styles.blueButtonStyle} />
          {/* <View>
            <Text
              style={{
                ...Fonts.blackColor14Medium,
                textAlign: "center",
                marginTop: Sizes.fixPadding,
              }}
            >
              Or scan your thumb to continue
            </Text>
          </View>
          <View>
            <MaterialIcons
              name="fingerprint"
              size={80}
              color={Colors.primaryColor}
              style={{
                alignSelf: "center",
                marginTop: Sizes.fixPadding * 2.5,
                marginBottom: Sizes.fixPadding * 2.0,
              }}
            />
          </View> */}
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
  blackButtonStyle: {
    backgroundColor: Colors.blackColor,
    borderRadius: Sizes.fixPadding,
    alignItems: "center",
    justifyContent: "center",
    height: 50.0,
    marginHorizontal: Sizes.fixPadding * 2.0,
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