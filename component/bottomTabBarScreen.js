import React, { useState } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  BackHandler,
} from "react-native";
import { withNavigation } from "react-navigation";

import { Colors } from "../constant/styles";
import NotificationScreen from "../screens/notifications/notificationScreen";
import AccountScreen from "../screens/account/accountScreen";
import BankingScreen from "../screens/banking/bankingScreen";
import BottomTab from "./BottomTab";

const BottomTabBarScreen = (props) => {
  const [state, setState] = useState(1);
  handleBackButton = () => {
    BackHandler.exitApp();
    return true;
  };
  componentDidMount = () => {
    BackHandler.addEventListener(
      "hardwareBackPress",
      this.handleBackButton.bind(this)
    );
  };

  constcomponentWillUnmount = () => {
    BackHandler.removeEventListener(
      "hardwareBackPress",
      this.handleBackButton.bind(this)
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
        <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
        {state == 1 ? (
          <BankingScreen />
        ) : state == 2 ? (
          <NotificationScreen />
        ) : (
          <AccountScreen />
        )}
        <View style={styles.bottomTabBarStyle}>
          <BottomTab
            index={1}
            title="Banking"
            onPress={() => {
              setState(1);
            }}
            currentIndex={state}
          />

          <BottomTab
            index={2}
            title="Notifications"
            onPress={() => {
              setState(2);
            }}
            currentIndex={state}
          />

          <BottomTab
            index={3}
            title="Account"
            onPress={() => {
              setState(3);
            }}
            currentIndex={state}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  bottomTabBarStyle: {
    position: "absolute",
    bottom: 0.0,
    left: 0.0,
    right: 0.0,
    height: 50.0,
    backgroundColor: Colors.whiteColor,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 30.0,
    borderTopColor: "rgba(128, 128, 128, 0.2)",
    borderTopWidth: 1.0,
    elevation: 2.0,
  },
});

BottomTabBarScreen.navigationOptions = () => {
  return {
    header: () => null,
  };
};

export default withNavigation(BottomTabBarScreen);
