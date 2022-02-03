import React from "react";
import { Text, View } from "react-native";

import { MaterialIcons } from "@expo/vector-icons";
import { Colors, Fonts, Sizes } from "../constant/styles";

const AccountSettingView = (props) => {
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
        <MaterialIcons
          name="arrow-forward-ios"
          size={11}
          color={Colors.blackColor}
        />
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
