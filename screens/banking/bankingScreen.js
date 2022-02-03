import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Image,
  BackHandler,
  Alert,
} from "react-native";
import { withNavigation } from "react-navigation";
import { Colors, Fonts, Sizes } from "../../constant/styles";
import * as Animatable from "react-native-animatable";
import { MaterialIcons, Ionicons, Entypo, AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CurrencyList } from "../../constant/CurrencyList";
import { TextInput } from "react-native-gesture-handler";
const width = Dimensions.get("window").width;
import Dialog from "react-native-dialog";

const BankingScreen = (props) => {
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
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [accountStatus, setAccountStatus] = useState("");
  const [accountBalance, setAccountBalance] = useState("");
  const [currency, setCurrency] = useState("");
  const [isLogout, setIsLogout] = useState(false);
  const [hideAmount, setHide] = useState(true);

  useEffect(() => {
    const userLoginData = async () => {
      const userData = await AsyncStorage.getItem("userLoginData");
      const userCardJsonDetails = await AsyncStorage.getItem("userCardDetails");
      if (userData !== null) {
        const transformedData = JSON.parse(userData);
        setUserId(transformedData.userId);
        setUserName(transformedData.firstName + " " + transformedData.lastName);
        setAccountStatus(transformedData.accountStatus);

        const userCardData = JSON.parse(userCardJsonDetails);
        if (
          userCardData.rSInfo != null &&
          userCardData.rSInfo.AccountsBalance != null &&
          userCardData.rSInfo.AccountsBalance.Account
        ) {
          setAccountBalance(
            userCardData.rSInfo.AccountsBalance.Account.BALANCE
          );
          setCurrency(
            CurrencyList.find(
              (element) =>
                element.number ==
                userCardData.rSInfo.AccountsBalance.Account.CURRENCY_CODE
            )
          );
        }
      } else {
        Alert.alert("Session Expired", "Please login again", [
          { text: "Ok", onPress: () => props.navigation.navigate("Signin") },
        ]);
      }
    };
    userLoginData();
  }, []);

  return (
    <View>
      <View style={styles.headerContentStyle}>
        <Text style={{ ...Fonts.blackColor18Bold }}>Dashboard</Text>
        <Ionicons
          name="log-out-outline"
          size={24}
          color={Colors.primaryColor}
          style={{
            position: "absolute",
            right: 25.0,
          }}
          onPress={() => setIsLogout(true)}
        />
      </View>
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
              onPress={() => {
                AsyncStorage.removeItem("userLoginData");
                AsyncStorage.removeItem("userCardDetails");
                props.navigation.navigate("Signin");
              }}
              style={styles.logOutButtonStyle}
            >
              <Text style={{ ...Fonts.whiteColor14Medium }}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Dialog.Container>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: Sizes.fixPadding }}
      >
        <View style={styles.accountInfoContentStyle}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: Sizes.fixPadding,
            }}
          >
            <View style={styles.accountHolderContentStyle}>
              <Image
                source={require("../../assets/images/card/user.png")}
                style={{ height: 50.0, width: 50.0, alignSelf: "center" }}
              />
            </View>
            <View style={{ marginLeft: Sizes.fixPadding }}>
              <Text style={{ ...Fonts.grayColor12Regular }}>User ID</Text>
              <Text style={{ ...Fonts.blackColor16Medium }}>{userId}</Text>
            </View>
          </View>
          <View style={{ flexDirection: "row" }}>
            <TextInput style={{ ...Fonts.blackColor16Medium }} editable={false}>
              Username |
            </TextInput>
            <TextInput
              style={{ ...Fonts.blackColor16Medium, marginHorizontal: 3 }}
              editable={false}
            >
              {userName.toUpperCase()}
            </TextInput>
          </View>

          <View style={{ flexDirection: "row" }}>
            <TextInput style={{ ...Fonts.blackColor16Medium }} editable={false}>
              Balance |
            </TextInput>
            <TextInput
              secureTextEntry={hideAmount ? true : false}
              style={{ ...Fonts.blackColor16Medium, marginHorizontal: 3 }}
              editable={false}
            >
              {accountBalance} {currency.code}
            </TextInput>
            {!hideAmount && (
              <AntDesign
                name="eye"
                size={20}
                color={Colors.grayColor}
                onPress={() => setHide(true)}
                style={styles.postionIconLeft}
              />
            )}
            {hideAmount && (
              <Entypo
                name="eye-with-line"
                size={20}
                color={Colors.grayColor}
                onPress={() => setHide(false)}
                style={styles.postionIconLeft}
              />
            )}
          </View>

          <TouchableOpacity
            activeOpacity={0.9}
            style={styles.changeAccountInfoContentStyle}
          >
            <Text
              style={{
                ...Fonts.primaryColor12Medium,
                marginRight: Sizes.fixPadding - 5.0,
              }}
            >
              Account {accountStatus}
            </Text>
            <View style={styles.changeAccountInfoIconStyle}>
              <MaterialIcons
                name="arrow-forward-ios"
                size={10}
                color={Colors.primaryColor}
              />
            </View>
          </TouchableOpacity>
        </View>
        {/* Transactions */}
        <View style={styles.transactionAndTransferMainContentStyle}>
          <TouchableOpacity
            style={styles.userCardContentStyle}
            onPress={() => props.navigation.navigate("RegisterPinScreen")}
          >
            <Animatable.View animation="zoomIn" easing="ease-out">
              <View>
                {/* <MaterialIcons
                  name="calendar-today"
                  size={50}
                  color={Colors.primaryColor}
                  style={{ alignSelf: "center" }}
                /> */}
                <Image
                  source={require("../../assets/images/card/key.png")}
                  style={{ height: 50.0, width: 50.0, alignSelf: "center" }}
                />
                <Text style={{ ...Fonts.blackColor16Bold }}>Register PIN?</Text>
              </View>
            </Animatable.View>
          </TouchableOpacity>
          {/* Change PIN */}
          <TouchableOpacity
            style={styles.userCardContentStyle}
            onPress={() => props.navigation.navigate("ChangePin")}
          >
            <Animatable.View animation="zoomIn" easing="ease-out">
              <View>
                <Image
                  source={require("../../assets/images/card/pin-number.png")}
                  style={{ height: 50, width: 50, alignSelf: "center" }}
                />
                <Text style={{ ...Fonts.blackColor16Bold }}>Change PIN</Text>
              </View>
            </Animatable.View>
          </TouchableOpacity>
        </View>
        <View style={styles.transactionAndTransferMainContentStyle}>
          <TouchableOpacity
            style={styles.userCardContentStyle}
            onPress={() => props.navigation.navigate("Transaction")}
          >
            <Animatable.View animation="zoomIn" easing="ease-out">
              <View>
                <Image
                  source={require("../../assets/images/card/money-transfer.png")}
                  style={{ height: 50.0, width: 50.0, alignSelf: "center" }}
                />
                <Text
                  style={{
                    ...Fonts.blackColor16Bold,
                    alignSelf: "flex-start",
                  }}
                >
                  Transactions
                </Text>
              </View>
            </Animatable.View>
          </TouchableOpacity>

          {/* Statements */}
          <TouchableOpacity
            style={styles.userCardContentStyle}
            // Deposit
            onPress={() => props.navigation.navigate("Estatement")}
          >
            <Animatable.View animation="zoomIn" easing="ease-out">
              <View>
                <Image
                  source={require("../../assets/images/card/bank-statement.png")}
                  style={{ height: 50.0, width: 50.0, alignSelf: "center" }}
                />
                <Text style={{ ...Fonts.blackColor16Bold }}>Statement</Text>
              </View>
            </Animatable.View>
          </TouchableOpacity>
        </View>
        <View style={styles.transactionAndTransferMainContentStyle}>
          {/* Cards */}
          <TouchableOpacity
            style={styles.userCardContentStyle}
            onPress={() => {
              props.navigation.navigate("Cards");
            }}
          >
            <Animatable.View animation="zoomIn" easing="ease-out">
              <View>
                <Image
                  source={require("../../assets/images/card/debit-card.png")}
                  style={{ height: 50, width: 50, alignSelf: "center" }}
                />
                <Text style={{ ...Fonts.blackColor16Bold }}>View Cards</Text>
              </View>
            </Animatable.View>
          </TouchableOpacity>
          {/* My Accounts */}
          <TouchableOpacity
            style={styles.userCardContentStyle}
            // onPress={() =>
            //   props.navigation.navigate("OneTimeTransferWithAccount")
            // }
          >
            <Animatable.View animation="zoomIn" easing="ease-out">
              <View>
                <Image
                  source={require("../../assets/images/card/card-transfer.png")}
                  style={{ height: 50.0, width: 50.0, alignSelf: "center" }}
                />
                <Text style={{ ...Fonts.blackColor16Bold }}>Card Transfer</Text>
              </View>
            </Animatable.View>
          </TouchableOpacity>
        </View>
        <View style={styles.transactionAndTransferMainContentStyle}>
          <TouchableOpacity
            style={styles.userCardContentStyle}
            onPress={() => props.navigation.navigate("AccountScreen")}
          >
            <Animatable.View animation="zoomIn" easing="ease-out">
              <View>
                <Image
                  source={require("../../assets/images/card/settings.png")}
                  style={{ height: 50.0, width: 50.0, alignSelf: "center" }}
                />
                <Text style={{ ...Fonts.blackColor16Bold }}>Settings</Text>
              </View>
            </Animatable.View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.userCardContentStyle}
            onPress={() =>
              props.navigation.navigate("Support", { username: userName })
            }
          >
            <Animatable.View animation="zoomIn" easing="ease-out">
              <View>
                <Image
                  source={require("../../assets/images/card/email.png")}
                  style={{ height: 50.0, width: 50.0, alignSelf: "center" }}
                />
                <Text style={{ ...Fonts.blackColor16Bold }}>
                  Need Support ?
                </Text>
              </View>
            </Animatable.View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContentStyle: {
    backgroundColor: Colors.whiteColor,
    height: 50.0,
    width: "100%",
    elevation: 5.0,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: Sizes.fixPadding,
  },

  transactionAndTransferMainContentStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: Sizes.fixPadding,
    marginBottom: Sizes.fixPadding,
    marginRight: Sizes.fixPadding,
  },
  userCardContentStyle: {
    marginTop: Sizes.fixPadding * 2.0,
    height: "100%",
    width: "42%",
    paddingVertical: Sizes.fixPadding,
    backgroundColor: Colors.whiteColor,
    borderRadius: Sizes.fixPadding,
    elevation: 6.0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: Sizes.fixPadding * 2.0,
    marginHorizontal: Sizes.fixPadding * 2.0,
    shadowColor: Colors.primaryColor,
  },
  accountInfoContentStyle: {
    backgroundColor: Colors.whiteColor,
    marginHorizontal: Sizes.fixPadding,
    marginVertical: Sizes.fixPadding,
    padding: Sizes.fixPadding,
    // elevation: 4.0,
    // borderRadius: 15,
  },
  accountHolderContentStyle: {
    width: 60.0,
    height: 60.0,
    borderRadius: 25.0,
    backgroundColor: Colors.primaryColor,
    alignItems: "center",
    justifyContent: "center",
  },
  changeAccountInfoContentStyle: {
    flexDirection: "row",
    position: "absolute",
    alignItems: "center",
    right: 10.0,
    top: 10.0,
    justifyContent: "center",
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
  cancelAndLogoutButtonStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: Sizes.fixPadding,
  },
  postionIconLeft: {
    marginHorizontal: Sizes.fixPadding,
    marginVertical: Sizes.fixPadding,
  },
});

export default withNavigation(BankingScreen);
