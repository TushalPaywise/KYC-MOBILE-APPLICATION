import React, { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { Colors, Fonts, Sizes } from "../constant/styles";
import { AntDesign, Entypo } from "@expo/vector-icons";

const PasswordField = (props) => {
  const [isShowPass, setShowPass] = useState(false);
  return (
    <View style={styles.textFieldStyle}>
      <TextInput
        onChangeText={props.onChangeText}
        placeholderTextColor={Colors.grayColor}
        placeholder={props.placeholder}
        keyboardType="default"
        required
        maxLength={25}
        secureTextEntry={isShowPass ? false : true}
      />
      {isShowPass && (
        <AntDesign
          name="eye"
          size={20}
          color="grey"
          onPress={() => setShowPass(false)}
          style={styles.postionIconLeft}
        />
      )}
      {!isShowPass && (
        <Entypo
          name="eye-with-line"
          size={20}
          color="grey"
          onPress={() => setShowPass(true)}
          style={styles.postionIconLeft}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  textFieldStyle: {
    ...Fonts.blackColor14Medium,
    borderRadius: Sizes.fixPadding,
    backgroundColor: Colors.whiteColor,
    elevation: 3.0,
    marginHorizontal: Sizes.fixPadding * 2.0,
    height: 60.0,
    alignItems: "center",
    paddingHorizontal: Sizes.fixPadding * 2.0,
    marginBottom: Sizes.fixPadding * 1.5,
    flexDirection: "row",
    fontSize: 25,
  },
  postionIconLeft: {
    alignContent: "flex-end",
    marginLeft: "auto",
  },
});

export default PasswordField;
