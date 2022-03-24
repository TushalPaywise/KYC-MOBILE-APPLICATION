import React, { useState } from "react";
import {
  Text,
  View,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  ScrollView,
  ImageBackground,
  Dimensions,
} from "react-native";
import { withNavigation } from "react-navigation";
import { Colors, Fonts, Sizes } from "../../constant/styles";
import { MaterialIcons } from "@expo/vector-icons";
// import OtpView from "../../component/OtpView";
import CustomButton from "../../component/CustomButton";
import OTPField from "react-native-otp-field";

const { width } = Dimensions.get("screen");

const OtpScreen = (props) => {
  const [otpValue, setOtpValue] = useState("");

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F2F4F6" }}>
      <StatusBar backgroundColor={Colors.primaryColor} />
      <View style={{ flex: 1 }}>
        <ImageBackground
          source={require("../../assets/images/banking.png")}
          style={{ height: 206.0, width: "100%" }}
        >
          <View style={styles.imageBackgroundShadowStyle}>
            <Text style={{ ...Fonts.whiteColor35Bold }}>Authenticate</Text>
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
              marginVertical: Sizes.fixPadding,
            }}
          >
            Enter OTP sent on your registered email address
          </Text>

          <View
            style={{
              alignItems: "center",
            }}
          >
            <OTPField
              length={6}
              onChange={(value) => setOtpValue(value)}
              value={otpValue}
              containerStyle={styles.otpContainerStyle}
              textFieldStyle={styles.otpFieldStyle}
            />
          </View>
          <CustomButton
            title="Authenticate"
            style={styles.continueButtonStyle}
            otpValue={otpValue}
          />
          <View
            style={{
              flexDirection: "row",
              alignItems: "flex-end",
              margin: Sizes.fixPadding * 2.0,
            }}
          >
            <Text style={{ ...Fonts.grayColor14Medium }}>
              Didn’t receive otp code!
            </Text>
            <Text
              style={{
                ...Fonts.blackColor18Bold,
                marginLeft: Sizes.fixPadding - 5.0,
              }}
            >
              Resend
            </Text>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  imageBackgroundShadowStyle: {
    backgroundColor: "rgba(0, 0, 0, 0.46)",
    alignItems: "center",
    justifyContent: "center",
    height: 206.0,
  },
  continueButtonStyle: {
    backgroundColor: Colors.primaryColor,
    borderRadius: Sizes.fixPadding,
    alignItems: "center",
    justifyContent: "center",
    height: 50.0,
    marginHorizontal: Sizes.fixPadding * 2.0,
  },
  otpContainerStyle: {
    flexDirection: "row",
    alignItems: "center",
  },
  otpFieldStyle: {
    marginHorizontal: 10,
    fontSize: 25,
    textAlign: "center",
    height: 50.0,
    width: 50.0,
    elevation: 3.0,
    paddingLeft: Sizes.fixPadding - 2,
    borderRadius: Sizes.fixPadding,
    backgroundColor: Colors.whiteColor,
    marginVertical: Sizes.fixPadding * 2,
    alignItems: "center",
    justifyContent: "center",
  },
  dialogContainerStyle: {
    borderRadius: Sizes.fixPadding,
    width: width - 40,
    paddingHorizontal: Sizes.fixPadding * 3.0,
    paddingTop: -Sizes.fixPadding,
    paddingBottom: Sizes.fixPadding * 2.0,
  },
});

OtpScreen.navigationOptions = () => {
  return {
    header: () => null,
  };
};

export default withNavigation(OtpScreen);
