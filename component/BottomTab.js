import { Fonts } from "../constant/styles";
import React from "react";
import { TouchableOpacity, Text, Image } from "react-native";

const BottomTab = (props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={{ alignItems: "center" }}
      onPress={props.onPress}
    >
      {props.index == 1 ? (
        <Image
          source={require("../assets/images/bottomTab/banking.png")}
          style={{ height: 25, width: 25, alignSelf: "center" }}
        />
      ) : props.index == 2 ? (
        <Image
          source={require("../assets/images/bottomTab/notification.png")}
          style={{ height: 25, width: 25, alignSelf: "center" }}
        />
      ) : (
        <Image
          source={require("../assets/images/bottomTab/user.png")}
          style={{ height: 25, width: 25, alignSelf: "center" }}
        />
      )}
      <Text
        style={
          props.index == props.currentIndex
            ? { ...Fonts.primaryColor10Regular }
            : { ...Fonts.grayColor10Regular }
        }
      >
        {props.title}
      </Text>
    </TouchableOpacity>
  );
};

export default BottomTab;
