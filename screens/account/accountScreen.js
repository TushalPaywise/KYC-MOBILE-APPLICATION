import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Alert,
  BackHandler,
  TextInput,
} from "react-native";
import { withNavigation } from "react-navigation";
import { Colors, Fonts, Sizes } from "../../constant/styles";
import { MaterialIcons } from "@expo/vector-icons";
import Dialog from "react-native-dialog";
import * as SecureStore from "expo-secure-store";
import AccountSettingView from "../../component/AccountSettingView";

const { width } = Dimensions.get("screen");

const AccountScreen = (props) => {
  const componentDidMount = () => {
    BackHandler.addEventListener(
      "hardwareBackPress",
      handleBackButton.bind(this)
    );
  };

  const componentWillUnmount = () => {
    BackHandler.removeEventListener(
      "hardwareBackPress",
      handleBackButton.bind(this)
    );
  };

  const handleBackButton = () => {
    props.navigation.pop();
    return true;
  };
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  useEffect(() => {
    const userLoginData = async () => {
      const userData = await SecureStore.getItemAsync("userLoginData");
      try {
        if (userData !== null) {
          const transformedData = JSON.parse(userData);
          setUserName(
            transformedData.firstName + " " + transformedData.lastName
          );
          setEmail(transformedData.email);
        } else {
          props.navigation.navigate("Signin");
        }
      } catch (e) {
        // error reading value
      }
    };
    userLoginData();
  }, []);

  const [isLogout, setIsLogout] = useState(false);
  useEffect(() => {
    const backAction = () => {
      Alert.alert("Hold on!", "Are you want to close the app?", [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel",
        },
        { text: "YES", onPress: () => BackHandler.exitApp() },
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  const logoutAction = async () => {
    await SecureStore.deleteItemAsync("userLoginData");
    await SecureStore.deleteItemAsync("userCardDetails");
    props.navigation.navigate("Signin");
  };
  return (
    <View style={{ flex: 1, backgroundColor: "#F2F4F6" }}>
      <View style={styles.headerContentStyle}>
        <Text style={{ ...Fonts.blackColor18Bold }}>User Settings</Text>
        <MaterialIcons
          name="arrow-back"
          size={24}
          color={Colors.blackColor}
          style={{
            position: "absolute",
            left: 20.0,
          }}
          onPress={() => props.navigation.navigate("BottomTabBar")}
        />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.userInfoContentStyle}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image
              source={require("../../assets/images/card/user.png")}
              style={{ width: 70.0, height: 70.0, borderRadius: 35.0 }}
            />
            <View style={{ width: width / 2.0 }}>
              <Text
                numberOfLines={1}
                style={{
                  ...Fonts.blackColor16Bold,
                  marginLeft: Sizes.fixPadding,
                  marginBottom: Sizes.fixPadding,
                }}
              >
                {userName.toUpperCase()}
              </Text>
              <Text
                numberOfLines={1}
                style={{
                  ...Fonts.grayColor14Medium,
                  marginLeft: Sizes.fixPadding,
                }}
              >
                {email}
              </Text>
            </View>
          </View>
        </View>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => props.navigation.navigate("ResetPassword")}
        >
          <AccountSettingView
            title="Enable Biometric"
            width={width}
            biometric={true}
            emailAddress={props.emailAddress}
            password={props.password}
          />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => props.navigation.navigate("ResetPassword")}
        >
          <AccountSettingView title="Change Password" width={width} />
        </TouchableOpacity>

        <Text style={styles.titleStyle}>ABOUT</Text>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => props.navigation.navigate("PrivacyPolicy")}
        >
          <AccountSettingView title="Privacy Policy" width={width} />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => props.navigation.navigate("TermsOfUse")}
        >
          <AccountSettingView title="Terms & Conditions" width={width} />
        </TouchableOpacity>
        <Text style={styles.titleStyle}>APP</Text>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => props.navigation.navigate("Support")}
        >
          <AccountSettingView title="Support" width={width} />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => {
            setIsLogout(true);
          }}
          style={styles.logoutInfoContentStyle}
        >
          <MaterialIcons name="exit-to-app" size={22} color="#FF0000" />
          <Text
            style={{ ...Fonts.redColor14Medium, marginLeft: Sizes.fixPadding }}
          >
            Logout
          </Text>
        </TouchableOpacity>
      </ScrollView>
      <Dialog.Container
        visible={isLogout}
        contentStyle={styles.dialogContainerStyle}
      >
        <View
          style={{ backgroundColor: Colors.whiteColor, alignItems: "center" }}
        >
          <Text
            style={{
              ...Fonts.blackColor16Bold,
              paddingBottom: Sizes.fixPadding - 5.0,
            }}
          >
            You sure want to logout?
          </Text>
          <View style={styles.cancelAndLogoutButtonStyle}>
            <TouchableOpacity
              activeOpacity={0.9}
              style={styles.cancelButtonStyle}
              onPress={() => {
                setIsLogout(false);
              }}
            >
              <Text style={{ ...Fonts.blackColor14Medium }}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={logoutAction}
              style={styles.logOutButtonStyle}
            >
              <Text style={{ ...Fonts.whiteColor14Medium }}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Dialog.Container>
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
  editProfileIconStyle: {
    width: 40.0,
    height: 40.0,
    borderRadius: 20.0,
    backgroundColor: "#4667D5",
    alignItems: "center",
    justifyContent: "center",
  },
  titleStyle: {
    ...Fonts.blackColor12Regular,
    marginHorizontal: Sizes.fixPadding * 2.0,
    marginTop: Sizes.fixPadding,
    marginBottom: Sizes.fixPadding + 5.0,
  },
  userInfoContentStyle: {
    flexDirection: "row",
    marginHorizontal: Sizes.fixPadding * 2.0,
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: Sizes.fixPadding * 2.0,
    marginBottom: Sizes.fixPadding * 3.0,
  },
  dialogContainerStyle: {
    borderRadius: Sizes.fixPadding,
    width: width - 40,
    paddingTop: -Sizes.fixPadding,
    paddingBottom: Sizes.fixPadding * 2.0,
  },
  cancelButtonStyle: {
    flex: 0.45,
    backgroundColor: Colors.whiteColor,
    borderRadius: Sizes.fixPadding,
    borderColor: Colors.primaryColor,
    borderWidth: 1.0,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: Sizes.fixPadding - 5.0,
  },
  logOutButtonStyle: {
    flex: 0.45,
    backgroundColor: Colors.primaryColor,
    borderRadius: Sizes.fixPadding,
    paddingVertical: Sizes.fixPadding - 5.0,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: Sizes.fixPadding + 10.0,
  },
  logoutInfoContentStyle: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: Sizes.fixPadding * 2.0,
    marginVertical: Sizes.fixPadding + 5.0,
  },
  cancelAndLogoutButtonStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: Sizes.fixPadding,
  },
  textFieldStyle: {
    ...Fonts.blackColor14Medium,
    marginHorizontal: Sizes.fixPadding * 2.0,
    backgroundColor: "#F2F4F6",
    marginVertical: Sizes.fixPadding - 3.0,
    height: 40.0,
  },
});
AccountScreen.navigationOptions = () => {
  return {
    header: () => null,
  };
};
export default withNavigation(AccountScreen);
