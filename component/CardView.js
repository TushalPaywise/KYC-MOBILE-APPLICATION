import React from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import { Colors, Fonts, Sizes } from "../constant/styles";

const CardView = (props) => {
  let cardNumber = props.cardNum.replace("XXXXXX", "222222");

  let visa = new RegExp("^4[0-9]{12}(?:[0-9]{3})?$");
  let mastercard = new RegExp("^5[1-5][0-9]{14}$");
  let mastercard2 = new RegExp("^2[2-7][0-9]{14}$");
  // let diners = new RegExp("^3[0689][0-9]{12}[0-9]*$");
  // let jcb = new RegExp("^35[0-9]{14}[0-9]*$");

  return (
    <View
      style={{
        ...styles.userCardContentStyle,
        backgroundColor: visa.test(cardNumber)
          ? Colors.visaCard
          : Colors.masterCard,
      }}
    >
      <Image
        source={require("../assets/images/card/sim-card.png")}
        style={{ height: 50.0, width: 64.0, alignSelf: "flex-start" }}
      />
      <Image
        source={
          visa.test(cardNumber)
            ? require("../assets/images/card/visa.png")
            : require("../assets/images/card/mastercard.png")
        }
        style={
          visa.test(cardNumber)
            ? { height: 25.0, width: 80.0, alignSelf: "flex-end" }
            : { height: 55.0, width: 75.0, alignSelf: "flex-end" }
        }
      />
      <Text style={{ ...Fonts.whiteColor16Medium }}>{props.cardNum}</Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View>
          <Text style={{ ...Fonts.whiteColor12Medium }}>
            {props.userName !== "" ? "Card holder" : ""}
          </Text>
          <Text
            style={{
              ...Fonts.whiteColor14Medium,
              marginTop: Sizes.fixPadding - 8.0,
            }}
          >
            {props.userName.toUpperCase()}
          </Text>
        </View>
        <View style={{ alignItems: "flex-end" }}>
          <Text style={{ ...Fonts.whiteColor12Medium }}>Expiry date</Text>
          <Text
            style={{
              ...Fonts.whiteColor14Medium,
              marginTop: Sizes.fixPadding - 8.0,
            }}
          >
            {props.expiry}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  userCardContentStyle: {
    height: 198.0,
    borderRadius: Sizes.fixPadding - 3.0,
    marginHorizontal: Sizes.fixPadding * 2.0,
    justifyContent: "space-between",
    padding: Sizes.fixPadding * 2.0,
  },
});

export default CardView;
