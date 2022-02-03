/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef, useEffect } from "react";
import { View, TextInput, Dimensions, StyleSheet } from "react-native";
import { Colors, Sizes } from "../constant/styles";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const initCodes = [];
const OtpView = (props) => {
  const inputCodeRef = useRef(new Array());
  const [codes, setCodes] = useState(initCodes);
  useEffect(() => {
    const codes = [];
    for (let i = 0; i < props.codeCount; i++) {
      codes.push("");
    }
    setCodes(codes);
  }, []);

  useEffect(() => {
    props.onTyping && props.onTyping(getCodes());
    const isTypeFinish = codes.every(function (i) {
      return i !== "";
    });
    if (isTypeFinish) {
      props.onFinish && props.onFinish(getCodes());
    }
  }, [codes]);

  const getCodes = () => {
    let codeString = "";
    codes.forEach((code) => {
      codeString += code;
    });
    return codeString;
  };

  const onChangeCode = (code, index) => {
    const typedCode = code.slice(-1);
    const currentCodes = [...codes];
    currentCodes[index] = typedCode;
    setCodes(currentCodes);
  };
  const onKeyPress = (event, index) => {
    const key = event.nativeEvent.key;
    let destIndex = index;
    if (key === "Backspace") {
      destIndex = index > 0 ? index - 1 : 0;
    } else {
      destIndex = index < props.codeCount - 1 ? index + 1 : props.codeCount - 1;
    }
    inputCodeRef.current[destIndex].focus();
  };
  return (
    <View style={[styles.form, { marginTop: 10 }]}>
      {codes.map((code, index) => {
        return (
          <TextInput
            ref={(element) => inputCodeRef.current.push(element)}
            key={index}
            style={[
              styles.textFieldContainerStyle,
              { width: width / (props.codeCount + 1), height: height / 14 },
            ]}
            onChangeText={(text) => onChangeCode(text, index)}
            onKeyPress={(event) => onKeyPress(event, index)}
            value={code}
            keyboardType="numeric"
          />
        );
      })}
    </View>
  );
};
const styles = StyleSheet.create({
  form: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  textFieldContainerStyle: {
    marginHorizontal: 5,
    fontSize: 25,
    textAlign: "center",
    height: 50.0,
    width: 50.0,
    elevation: 3.0,
    paddingLeft: Sizes.fixPadding,
    borderRadius: Sizes.fixPadding,
    backgroundColor: Colors.whiteColor,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default OtpView;
