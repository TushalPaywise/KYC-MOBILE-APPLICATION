import React, { useState, useEffect } from "react";
import { View, Dimensions, Animated } from "react-native";
import PropTypes from "prop-types";
import { Colors, Sizes } from "../constant/styles";

const deviceWindow = Dimensions.get("window"),
  regexArr = [/[a-z]/, /[A-Z]/, /[0-9]/, /[^A-Za-z0-9]/];

const PassMeter = (props) => {
  const barLength = deviceWindow.width * 0.7,
    [passStat, setPassStat] = useState("Weak"),
    [animateVal, setAnimateVal] = useState(new Animated.Value(0)),
    [animateColor, setAnimateColor] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.spring(animateVal, {
      bounciness: 20,
      toValue: barLength * (props.password.length / props.maxLength),
      useNativeDriver: false,
    }).start();
    let passPoint = 0;

    if (props.password.length > 0 && props.password.length < props.minLength)
      setPassStat(props.labels[0]);
    else {
      regexArr.forEach((rgx) =>
        rgx.test(props.password) ? (passPoint += 1) : null
      );
      setPassStat(props.labels[passPoint]);
    }
    Animated.timing(animateColor, {
      toValue: passPoint,
      duration: 100,
      useNativeDriver: false,
    }).start();
  }, [props.password]);

  const interpolateColor = animateColor.interpolate({
    inputRange: [0, 3],
    outputRange: ["rgb(255,0,0)", "rgb(0, 255, 0)"],
  });

  return (
    <View style={styles.backBar}>
      <Animated.View
        style={[
          styles.mainBar,
          { backgroundColor: interpolateColor, width: animateVal },
        ]}
      />
      {props.password.length != 0 ? (
        <Animated.Text style={{ marginTop: 1, color: interpolateColor }}>
          {passStat}
        </Animated.Text>
      ) : null}
    </View>
  );
};

const styles = {
  backBar: {
    width: deviceWindow.width * 0.5,
    height: 3,
    borderRadius: 25,
    paddingHorizontal: Sizes.fixPadding * 2.0,
    marginBottom: Sizes.fixPadding - 5,
    alignSelf: "center",
    backgroundColor: Colors.whiteColor,
  },
  mainBar: {
    position: "absolute",
    backgroundColor: "blue",
    height: 5,
    borderRadius: 30,
    alignSelf: "center",
  },
};

PassMeter.propTypes = {
  minLength: PropTypes.number,
  showLabels: PropTypes.bool,
  maxLength: PropTypes.number,
  labels: PropTypes.array.isRequired,
  password: PropTypes.string.isRequired,
};

PassMeter.defaultProps = {
  minLength: 6,
  maxLength: 25,
  showLabels: true,
};

export default PassMeter;
