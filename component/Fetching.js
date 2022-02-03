import React from "react";
import { Text, View } from "react-native";
import { CircleFade } from "react-native-animated-spinkit";
import { Overlay } from "react-native-elements";
import { Colors, Fonts, Sizes } from "../constant/styles";
const Fetching = (props) => {
  return (
    <View>
      <Overlay>
        <CircleFade
          size={60}
          color={Colors.primaryColor}
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        />
        <Text
          style={{
            ...Fonts.blackColor14Medium,
            textAlign: "center",
            marginTop: Sizes.fixPadding,
          }}
        >
          Loading
        </Text>
      </Overlay>
    </View>
  );
};

export default Fetching;
