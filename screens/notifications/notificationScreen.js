import React, { useState, useRef, Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  Animated,
  BackHandler,
} from "react-native";
import { withNavigation } from "react-navigation";
import { Colors, Fonts, Sizes } from "../../constant/styles";
import { SwipeListView } from "react-native-swipe-list-view";
import { Snackbar } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";

const { width } = Dimensions.get("screen");

const notificationList = [
  {
    key: "1",
    name: "Account Registered",
    description: "Congratulation... Your account was registered successfully",
  },
  {
    key: "2",
    name: "Get control of your cards",
    description: "You can now control your card details with our app!!",
  },
];

class NotificationScreen extends Component {
  componentDidMount() {
    BackHandler.addEventListener(
      "hardwareBackPress",
      this.handleBackButton.bind(this)
    );
  }

  componentWillUnmount() {
    BackHandler.removeEventListener(
      "hardwareBackPress",
      this.handleBackButton.bind(this)
    );
  }

  handleBackButton = () => {
    this.props.navigation.pop();
    return true;
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Notification navigation={this.props.navigation} />
      </View>
    );
  }
}

const rowTranslateAnimatedValues = {};

const Notification = ({ navigation }) => {
  const [showSnackBar, setShowSnackBar] = useState(false);

  const [snackBarMsg, setSnackBarMsg] = useState("");

  const [listData, setListData] = useState(notificationList);

  Array(listData.length + 1)
    .fill("")
    .forEach((_, i) => {
      rowTranslateAnimatedValues[`${i}`] = new Animated.Value(1);
    });

  const animationIsRunning = useRef(false);

  const onSwipeValueChange = (swipeData) => {
    const { key, value } = swipeData;

    if (
      value < -Dimensions.get("window").width &&
      !animationIsRunning.current
    ) {
      animationIsRunning.current = true;
      Animated.timing(rowTranslateAnimatedValues[key], {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start(() => {
        const newData = [...listData];
        const prevIndex = listData.findIndex((item) => item.key === key);
        newData.splice(prevIndex, 1);
        const removedItem = listData.find((item) => item.key === key);

        setSnackBarMsg(`${removedItem.name} dismissed`);

        setListData(newData);

        setShowSnackBar(true);

        animationIsRunning.current = false;
      });
    }
  };

  const renderItem = (data) => (
    <Animated.View
      style={[
        {
          height: rowTranslateAnimatedValues[data.item.key].interpolate({
            inputRange: [0, 1],
            outputRange: [0, 98],
          }),
        },
      ]}
    >
      <View style={{ flex: 1, backgroundColor: "#F2F4F6" }}>
        <View style={styles.notificationContentStyle}>
          <View style={styles.notificationIconContentStyle}>
            <MaterialIcons
              name="notifications"
              size={24}
              color={Colors.whiteColor}
            />
          </View>
          <View
            style={{
              marginLeft: Sizes.fixPadding + 5.0,
              width: width - 140,
            }}
          >
            <Text numberOfLines={1} style={{ ...Fonts.blackColor14Bold }}>
              {data.item.name}
            </Text>
            <Text
              numberOfLines={2}
              style={{
                ...Fonts.blackColor14Medium,
                marginTop: Sizes.fixPadding - 5.0,
              }}
            >
              {data.item.description}
            </Text>
          </View>
        </View>
      </View>
    </Animated.View>
  );

  const renderHiddenItem = () => <View style={styles.rowBack}></View>;

  function header() {
    return (
      <View style={styles.headerContentStyle}>
        <Text style={{ ...Fonts.blackColor18Bold }}>Notifications</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {header()}
      {listData.length == 0 ? (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <MaterialIcons
            name="notifications-off"
            size={50}
            color={Colors.grayColor}
          />
          <Text
            style={{
              ...Fonts.grayColor16Bold,
              marginTop: Sizes.fixPadding * 2.0,
            }}
          >
            No new notifications
          </Text>
        </View>
      ) : (
        <SwipeListView
          disableRightSwipe
          data={listData}
          renderItem={renderItem}
          renderHiddenItem={renderHiddenItem}
          rightOpenValue={-Dimensions.get("window").width}
          onSwipeValueChange={onSwipeValueChange}
          useNativeDriver={false}
          contentContainerStyle={{ paddingVertical: Sizes.fixPadding + 2.0 }}
        />
      )}
      <Snackbar
        style={styles.snackBarStyle}
        visible={showSnackBar}
        onDismiss={() => setShowSnackBar(false)}
      >
        {snackBarMsg}
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContentStyle: {
    backgroundColor: Colors.whiteColor,
    height: 56.0,
    elevation: 5.0,
    alignItems: "center",
    justifyContent: "center",
  },
  notificationContentStyle: {
    height: 81.0,
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "white",
    borderColor: "rgba(128, 128, 128, 0.05)",
    borderWidth: 1.0,
    marginHorizontal: Sizes.fixPadding * 2.0,
    marginVertical: Sizes.fixPadding - 5.0,
    borderRadius: Sizes.fixPadding,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: Sizes.fixPadding,
    elevation: 2.0,
    paddingLeft: Sizes.fixPadding,
  },
  notificationIconContentStyle: {
    height: 40.0,
    width: 40.0,
    backgroundColor: Colors.primaryColor,
    borderRadius: 20.0,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    backgroundColor: "#F2F4F6",
    flex: 1,
  },
  rowBack: {
    alignItems: "center",
    backgroundColor: "red",
    flex: 1,
    marginTop: Sizes.fixPadding - 3.0,
    marginBottom: Sizes.fixPadding + 2.0,
  },
  snackBarStyle: {
    position: "absolute",
    bottom: 40.0,
    left: -10.0,
    right: -10.0,
    backgroundColor: "#333333",
  },
});

export default withNavigation(NotificationScreen);
