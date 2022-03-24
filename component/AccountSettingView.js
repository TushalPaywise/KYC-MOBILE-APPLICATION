import React, { useEffect, useRef, useState } from "react";
import { Text, View, Switch } from "react-native";

import { MaterialIcons } from "@expo/vector-icons";
import { Colors, Fonts, Sizes } from "../constant/styles";
import { USERSESSION } from "../constant/ApiConstant";
import * as SecureStore from "expo-secure-store";
const AccountSettingView = (props) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const calledOnce = useRef(false);
  useEffect(() => {
    if (calledOnce.current) {
      console.log("I run only once if toggle is false.");
      return;
    } else {
      calledOnce.current = true;
      retrieveBiometricFromDevice();
    }
  }, [isEnabled]);

  const retrieveBiometricFromDevice = async () => {
    let userSession = await SecureStore.getItemAsync(USERSESSION);
    const session = JSON.parse(userSession);

    if (
      session !== null &&
      session.emailAddress !== null &&
      session.password !== null &&
      session.emailAddress !== "undefined" &&
      session.password !== "undefined"
    ) {
      console.log("session.emailAddress", session.emailAddress);
      console.log("session.password", session.password);
      setIsEnabled(true);
    }
  };

  const deleteBiometricFromDevice = async () => {
    console.log("Deleting Biometric");
    await SecureStore.deleteItemAsync(USERSESSION);
  };

  const saveBiometricData = async (emailAddress, password) => {
    console.log("Trying to save biometric data");
    try {
      //save biometric data
      const userSession = JSON.stringify({ emailAddress, password });
      console.log("Saving Biometric", userSession);
      console.log("Saving Biometric emailAddress", emailAddress);
      console.log("Saving Biometric password", password);
      await SecureStore.setItemAsync(USERSESSION, userSession)
        // .setItemAsync("password", password)
        .then(() => {
          console.log("userSessionStored");
        });
      // need to remove else after testing
    } catch (e) {
      // if there is an error, fall back to another authentication option
      console.log("Error", e);
    }
  };

  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  const onChangeToogle = () => {
    console.log(!isEnabled);
    if (!isEnabled) {
      saveBiometricData(props.emailAddress, props.password);
    } else {
      deleteBiometricFromDevice();
    }
  };

  return (
    <View style={{ marginHorizontal: Sizes.fixPadding * 2.0 }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View style={{ width: props.width / 1.5 }}>
          <Text numberOfLines={1} style={{ ...Fonts.blackColor14Medium }}>
            {props.title}
          </Text>
        </View>

        {props.biometric ? (
          <View>
            <Switch
              trackColor={{
                false: Colors.grayColor,
                true: Colors.primaryColor,
              }}
              thumbColor={isEnabled ? Colors.blackColor : Colors.whiteColor}
              ios_backgroundColor="#3e3e3e"
              value={isEnabled}
              onValueChange={toggleSwitch}
              onChange={onChangeToogle}
            />
          </View>
        ) : (
          <MaterialIcons
            name="arrow-forward-ios"
            size={11}
            color={Colors.blackColor}
          />
        )}
      </View>
      <View
        style={{
          backgroundColor: Colors.grayColor,
          height: 1.0,
          marginVertical: Sizes.fixPadding - 3.0,
        }}
      ></View>
    </View>
  );
};

export default AccountSettingView;
