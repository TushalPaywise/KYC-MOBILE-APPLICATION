import React from "react";
import { Text } from "react-native";
import { Fonts, Sizes } from "../constant/styles";

const DepositTitle = (props) => {
  return (
    <Text
      style={{
        ...Fonts.blackColor16Bold,
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginTop: Sizes.fixPadding,
        marginBottom: 7,
      }}
    >
      {props.title}
    </Text>
  );
};

export default DepositTitle;
