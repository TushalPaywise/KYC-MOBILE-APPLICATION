import React, { Component } from "react";
import { View, SafeAreaView, StatusBar, Image } from "react-native";
import { withNavigation } from "react-navigation";
import { Colors } from "../constant/styles";
import { CircleFade } from "react-native-animated-spinkit";

const SplashScreen = (props) => {
  setTimeout(() => {
    props.navigation.navigate("Signin");
  }, 2000);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
      <StatusBar backgroundColor={Colors.primaryColor} />
      <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
        <Image
          source={require("../assets/images/Primecard-Logo.png")}
          style={{ width: 150, height: 150 }}
          resizeMode="cover"
        />
        <CircleFade
          size={60}
          color={Colors.primaryColor}
          style={{
            position: "absolute",
            bottom: 50.0,
          }}
        />
      </View>
    </SafeAreaView>
  );
};

SplashScreen.navigationOptions = () => {
  return {
    header: () => null,
  };
};

export default withNavigation(SplashScreen);
