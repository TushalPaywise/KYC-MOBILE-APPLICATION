import React, { useState } from "react";
import {
  Text,
  View,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  ScrollView,
  ImageBackground,
  TextInput,
} from "react-native";
import { withNavigation } from "react-navigation";
import { Colors, Fonts, Sizes } from "../../constant/styles";
import { MaterialIcons } from "@expo/vector-icons";
import CustomButton from "../../component/CustomButton";
import PhoneInput from "react-native-phone-number-input";
import PasswordField from "../../component/PasswordField";
import PassMeter from "../../component/Passmeter";

const RegisterScreen = (props) => {
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [nationalID, setNationalId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailValid, setEmailValid] = useState(true);

  const emailHandler = (text) => {
    setEmail(text);
    setEmailValid(true);
    const emailRegex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (props.length === 0 || !emailRegex.test(text.toLowerCase())) {
      setEmailValid(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F2F4F6" }}>
      <StatusBar backgroundColor={Colors.primaryColor} />
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        <ImageBackground
          source={require("../../assets/images/registration.png")}
          style={{ height: 206.0, width: "100%" }}
        >
          <View style={styles.imageBackgroundShadowStyle}>
            <Text style={{ ...Fonts.whiteColor35Bold }}>Register Account</Text>
            <MaterialIcons
              name="arrow-back"
              size={24}
              style={{ position: "absolute", top: 20.0, left: 20.0 }}
              color={Colors.whiteColor}
              onPress={() => props.navigation.goBack()}
            />
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
            Enter your details
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
              placeholder="Email"
              keyboardType="email-address"
              value={email}
              onChangeText={emailHandler}
              placeholderTextColor={Colors.grayColor}
              style={styles.textFieldStyle}
              required
              maxLength={50}
            />
          </View>
          <View>
            <View style={styles.textFieldStyle}>
              <PhoneInput
                style={styles.textFieldStyle}
                value={mobileNumber}
                defaultCode="US"
                onChangeText={(value) => setMobileNumber(value)}
                placeholderTextColor={Colors.grayColor}
                required
                maxLength={20}
              />
            </View>
          </View>
          <View>
            <TextInput
              placeholder="National ID/ Driving License / Passport"
              keyboardType="default"
              value={nationalID}
              onChangeText={(value) => setNationalId(value)}
              placeholderTextColor={Colors.grayColor}
              style={styles.textFieldStyle}
              required
              maxLength={50}
            />
          </View>
          <View>
            <PasswordField
              id="passwordField"
              placeholder="Password"
              value={password}
              onChangeText={(value) => setPassword(value)}
              password={password}
            />
            <PassMeter
              id="passwordFieldPassmeter"
              password={password}
              maxLength={25}
              minLength={6}
              labels={["Too Short", "Weak", "Normal", "Strong", "Secure"]}
            />
          </View>
          <View>
            <PasswordField
              id="confirmField"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChangeText={(value) => setConfirmPassword(value)}
              password={confirmPassword}
            />
            <PassMeter
              id="confirmFieldPassmeter"
              password={confirmPassword}
              maxLength={25}
              minLength={6}
              labels={["Too Short", "Weak", "Normal", "Strong", "Secure"]}
            />
          </View>
          <View>
            <CustomButton
              title="Register"
              emailAddress={email}
              password={password}
              mobileNumber={mobileNumber}
              nationalID={nationalID}
              confirmPassword={confirmPassword}
              style={styles.blackButtonStyle}
            />
            <CustomButton
              title="Already Registered ?"
              style={styles.blueButtonStyle}
            />
          </View>
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  textFieldStyle: {
    ...Fonts.blackColor14Medium,
    borderRadius: Sizes.fixPadding,
    backgroundColor: Colors.whiteColor,
    elevation: 3.0,
    marginHorizontal: Sizes.fixPadding * 2.0,
    height: 60.0,
    alignItems: "center",
    paddingHorizontal: Sizes.fixPadding * 2.0,
    marginBottom: Sizes.fixPadding * 1.5,
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
    marginTop: 2.0,
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

RegisterScreen.navigationOptions = () => {
  return {
    header: () => null,
  };
};

export default withNavigation(RegisterScreen);
