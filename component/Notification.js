import React, { useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  Animated,
  TouchableOpacity,
  Dimensions,
  Button,
} from "react-native";
import { AntDesign, Entypo } from "@expo/vector-icons";

const Notification = (props) => {
  const windowHeight = Dimensions.get("window").height;
  const popAnim = useRef(new Animated.Value(windowHeight)).current;
  const successColor = "#6dcf81";
  // const successHeader = "Success !";
  const failColor = "#bf6060";
  // const successMessage = "You pressed the success button";
  // const failMessage = "You pressed the fail button";
  //success or fail
  const heightValue = props.height === undefined ? 0.88 : props.height;

  const popIn = () => {
    Animated.timing(popAnim, {
      toValue: windowHeight * heightValue * -1,
      duration: 700,
      useNativeDriver: true,
    }).start(popOut());
  };

  const popOut = () => {
    setTimeout(() => {
      Animated.timing(popAnim, {
        toValue: windowHeight * -2,
        duration: 2000,
        useNativeDriver: true,
      }).start();
    }, 5000);
  };

  const instantPopOut = () => {
    Animated.timing(popAnim, {
      toValue: windowHeight * -1,
      duration: 150,
      useNativeDriver: true,
    }).start();
  };

  if (props.notify) {
    popIn();
  }

  return (
    <View>
      <Animated.View
        style={[
          styles.toastContainer,
          {
            transform: [{ translateY: popAnim }],
          },
        ]}
      >
        <View style={styles.toastRow}>
          <AntDesign
            name={props.status === "success" ? "checkcircleo" : "closecircleo"}
            size={24}
            color={props.status === "success" ? successColor : failColor}
          />
          <View style={styles.toastText}>
            <Text style={{ fontWeight: "bold", fontSize: 15 }}>
              {props.header}
            </Text>
            <Text style={{ fontSize: 12 }}>{props.message}</Text>
          </View>
          <TouchableOpacity onPress={instantPopOut}>
            <Entypo name="cross" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  toastContainer: {
    height: 50,
    width: "100%",
    backgroundColor: "#f5f5f5",
    justifyContent: "flex-start",
    alignItems: "center",
    borderRadius: 50,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    flexDirection: "row-reverse",
  },
  toastRow: {
    width: "90%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  toastText: {
    width: "70%",
    padding: 2,
  },
});

export default Notification;
