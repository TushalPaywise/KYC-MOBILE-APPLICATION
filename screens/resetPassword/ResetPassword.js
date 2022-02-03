import React from "react";
import { useEffect, useState } from "react";
import {
  Text,
  View,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  BackHandler,
  TextInput,
  ScrollView,
} from "react-native";
import { withNavigation } from "react-navigation";
import { Colors, Fonts, Sizes } from "../../constant/styles";
import { MaterialIcons } from "@expo/vector-icons";
import CustomButton from "../../component/CustomButton";
import PassMeter from "../../component/Passmeter";
import PasswordField from "../../component/PasswordField";
import { useDispatch, useSelector } from "react-redux";
import {
  backendUseSelector,
  clearState,
  backendService,
} from "../../redux/backend.js";
import Fetching from "../../component/Fetching";
import Notification from "../../component/Notification";

const ResetPassword = (props) => {
  const componentDidMount = () => {
    BackHandler.addEventListener(
      "hardwareBackPress",
      handleBackButton.bind(this)
    );
  };

  const componentWillUnmount = () => {
    BackHandler.removeEventListener(
      "hardwareBackPress",
      handleBackButton.bind(this)
    );
  };

  const handleBackButton = () => {
    props.navigation.pop();
    return true;
  };
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [idNumber, setIdNumber] = useState("");

  const dispatch = useDispatch();

  const { isFetching, isSuccess, isError, payload } =
    useSelector(backendUseSelector);
  useEffect(() => {
    return () => {
      dispatch(clearState());
    };
  }, []);
  useEffect(() => {
    setTimeout(() => {
      if (isSuccess || isError) {
        dispatch(clearState());
      }
    }, 3000);
  }, [isSuccess, isError]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F2F4F6" }}>
      <ScrollView>
        <StatusBar backgroundColor={Colors.primaryColor} />
        <View style={{ flex: 1 }}>
          <View style={styles.headerContentStyle}>
            <MaterialIcons
              name="arrow-back"
              size={24}
              color="black"
              onPress={() => props.navigation.goBack()}
              style={{ position: "absolute", left: 20.0 }}
            />
            <Text
              style={{
                ...Fonts.blackColor18Bold,
                alignSelf: "center",
                justifyContent: "center",
              }}
            >
              Reset Password
            </Text>
          </View>
          {isFetching && <Fetching />}
          <Text style={styles.titleDescription}>
            Please input the current and new password.
          </Text>
          <TextInput
            style={styles.textFieldStyle}
            placeholder="National ID / Password / Driving License"
            value={idNumber}
            onChangeText={(value) => setIdNumber(value)}
          />
          <PasswordField
            placeholder="Current Password"
            value={currentPassword}
            onChangeText={(value) => setCurrentPassword(value)}
            password={currentPassword}
          />
          <PassMeter
            password={currentPassword}
            maxLength={25}
            minLength={6}
            labels={["Weak", "Normal", "Strong", "Secure"]}
          />
          <PasswordField
            placeholder="New Password"
            value={newPassword}
            onChangeText={(value) => setNewPassword(value)}
            password={newPassword}
          />
          <PassMeter
            password={newPassword}
            maxLength={25}
            minLength={6}
            labels={["Weak", "Normal", "Strong", "Secure"]}
          />
          <PasswordField
            placeholder="Confirm Password"
            value={confirmPassword}
            onChangeText={(value) => setConfirmPassword(value)}
            password={confirmPassword}
          />
          <PassMeter
            password={confirmPassword}
            maxLength={25}
            minLength={6}
            labels={["Weak", "Normal", "Strong", "Secure"]}
          />
          <CustomButton
            title="Reset Password"
            style={styles.primaryButtonStyle}
            idNumber={idNumber}
            confirmPassword={confirmPassword}
            newPassword={newPassword}
            currentPassword={currentPassword}
          />
          {isSuccess && (
            <Notification
              header="Successful"
              status="success"
              message={payload.moreDetails}
              notify={true}
              height="0.59"
            />
          )}
          {isError && (
            <Notification
              header="Failed"
              status="fail"
              message={payload.moreDetails}
              notify={true}
              height="0.59"
            />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  titleDescription: {
    ...Fonts.blackColor14Medium,
    textAlign: "center",
    marginHorizontal: Sizes.fixPadding * 2.0,
    marginTop: Sizes.fixPadding * 2.0,
    marginBottom: Sizes.fixPadding * 2.0,
  },
  headerContentStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 60.0,
    backgroundColor: Colors.whiteColor,
    paddingHorizontal: Sizes.fixPadding * 2.0,
    elevation: 10.0,
  },
  textFieldStyle: {
    ...Fonts.blackColor14Medium,
    borderRadius: Sizes.fixPadding,
    backgroundColor: Colors.whiteColor,
    elevation: 3.0,
    marginHorizontal: Sizes.fixPadding * 2.0,
    height: 60.0,
    alignItems: "center",
    paddingHorizontal: Sizes.fixPadding * 2.0,
    marginBottom: Sizes.fixPadding * 2.5,
    flexDirection: "row",
  },
  primaryButtonStyle: {
    flexDirection: "row",
    backgroundColor: Colors.primaryColor,
    alignItems: "center",
    paddingVertical: Sizes.fixPadding,
    marginHorizontal: Sizes.fixPadding * 2.0,
    borderRadius: Sizes.fixPadding,
    justifyContent: "center",
    marginTop: Sizes.fixPadding * 2.0,
    marginBottom: Sizes.fixPadding * 2.0,
    height: 50.0,
    elevation: 3.0,
  },
});

ResetPassword.navigationOptions = () => {
  return {
    header: () => null,
  };
};

export default withNavigation(ResetPassword);
