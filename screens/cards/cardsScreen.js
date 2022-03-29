import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Dimensions,
  Alert,
} from "react-native";
import { withNavigation } from "react-navigation";
import { Colors, Fonts, Sizes } from "../../constant/styles";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Slider } from "react-native-elements";
import Dialog from "react-native-dialog";
import TransactionListView from "../../component/TransactionListView";
import {
  backendUseSelector,
  clearState,
  backendService,
} from "../../redux/backend.js";
import { useDispatch, useSelector } from "react-redux";
import { LAST_10_TRANSACTIONS } from "../../constant/ApiConstant";
import CardView from "../../component/CardView";
import Fetching from "../../component/Fetching";
import Notification from "../../component/Notification";
import * as SecureStore from "expo-secure-store";
const { width } = Dimensions.get("screen");

const CardsScreen = (props) => {
  const [currentLimit, setCurrentLimit] = useState(5888);
  const [limitDialog, setLimitDialog] = useState(false);
  const [cardNum, setCardNum] = useState("");
  const [cardType, setCardType] = useState("");
  const [expiry, setExpiry] = useState("");
  const [userName, setUserName] = useState("");
  const [transactionList, setTransactionList] = useState([]);
  const [noTransaction, setNoTransaction] = useState(false);

  useEffect(() => {
    const userCardDetails = async () => {
      const userCardJsonDetails = await SecureStore.getItemAsync(
        "userCardDetails"
      );
      const userData = await SecureStore.getItemAsync("userLoginData");
      try {
        if (userCardJsonDetails !== null) {
          const transformedData = JSON.parse(userCardJsonDetails);
          setCardNum(transformedData.rSInfo.CardDetails.Cards.Card.CardNum);
          setCardType(transformedData.rSInfo.CardDetails.Cards.Card.CardType);
          setExpiry(transformedData.rSInfo.CardDetails.Cards.Card.Expiry);
          setUserName(
            transformedData.firstName + " " + transformedData.lastName
          );
        }
        if (userData != null) {
          const transformedData = JSON.parse(userData);

          dispatch(
            backendService(
              JSON.stringify({
                email: transformedData.email,
                token: transformedData.token,
                api: LAST_10_TRANSACTIONS,
                userId: transformedData.userId,
              })
            )
          );
        }
      } catch (e) {
        // error reading value
        props.navigation.navigate("BottomTabBar");
        Alert.alert("Error", "Failed to load card", [{ text: "Ok" }]);
      }
    };
    userCardDetails();
  }, []);

  //   useEffect(() => {

  //   }, []);

  const dispatch = useDispatch();

  const { isFetching, isSuccess, isError, payload } =
    useSelector(backendUseSelector);
  useEffect(() => {
    return () => {
      dispatch(clearState());
    };
  }, []);
  useEffect(() => {
    if (isError) {
      Alert.alert("Error", payload.moreDetails, [{ text: "Ok" }]);
      dispatch(clearState());
    }
    if (isSuccess) {
      if (
        payload != null &&
        payload.rSInfo != null &&
        payload.rSInfo.Last10Transactions != null &&
        payload.rSInfo.Last10Transactions.Transaction !== null
      ) {
        setTransactionList(payload.rSInfo.Last10Transactions.Transaction);
      } else {
        setNoTransaction(true);
      }
    }
  }, [isError, isSuccess]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F2F4F6" }}>
      <StatusBar backgroundColor={Colors.primaryColor} />
      <View style={{ flex: 1 }}>
        {isFetching && <Fetching />}
        <View style={styles.headerContentStyle}>
          <Text style={{ ...Fonts.blackColor18Bold }}>Cards</Text>
          <MaterialIcons
            name="arrow-back"
            size={24}
            color={Colors.blackColor}
            style={{
              position: "absolute",
              left: 20.0,
            }}
            onPress={() => props.navigation.goBack()}
          />
        </View>
        <View>
          <Text
            style={{
              ...Fonts.blackColor16Bold,
              margin: Sizes.fixPadding * 2.0,
            }}
          >
            Your Card
          </Text>
          <CardView cardNum={cardNum} userName={userName} expiry={expiry} />
        </View>
        <View style={styles.setLimitAndLockCardMainContentStyle}>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => {
              setLimitDialog(true);
            }}
            style={{
              ...styles.setLimitAndLockCardContentStyle,
              marginRight: Sizes.fixPadding * 2.0,
            }}
          >
            <MaterialCommunityIcons
              name="currency-usd"
              size={24}
              color="black"
            />
            <Text
              numberOfLines={1}
              style={{
                ...Fonts.blackColor16Medium,
                marginLeft: Sizes.fixPadding,
              }}
            >
              Set limit
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.9}
            style={styles.setLimitAndLockCardContentStyle}
          >
            <MaterialIcons name="lock" size={24} color="black" />
            <Text
              numberOfLines={1}
              style={{
                ...Fonts.blackColor16Medium,
                marginLeft: Sizes.fixPadding,
              }}
            >
              Lock card
            </Text>
          </TouchableOpacity>
        </View>
        <Text
          style={{
            ...Fonts.blackColor16Bold,
            marginHorizontal: Sizes.fixPadding * 2.0,
            marginBottom: Sizes.fixPadding,
          }}
        >
          Transactions
        </Text>

        <TransactionListView
          transactionList={transactionList}
        ></TransactionListView>
      </View>
      <Dialog.Container
        visible={limitDialog}
        contentStyle={styles.dialogContainerStyle}
      >
        <View
          style={{
            backgroundColor: Colors.whiteColor,
            paddingBottom: Sizes.fixPadding,
          }}
        >
          <Text style={{ ...Fonts.blackColor16Bold }}>
            Monthly spending limit
          </Text>
          <View style={styles.monthlySpendLimitContentStyle}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ ...Fonts.blackColor18Bold }}>
                {Math.round(currentLimit)}
              </Text>
              <View
                style={{
                  backgroundColor: Colors.grayColor,
                  marginLeft: Sizes.fixPadding - 5.0,
                  height: 15.0,
                  width: 1.0,
                }}
              ></View>
            </View>
            <Text style={{ ...Fonts.blackColor14Medium }}>USD</Text>
          </View>
          <View
            style={{
              backgroundColor: Colors.grayColor,
              height: 1.0,
              marginTop: Sizes.fixPadding,
              marginBottom: Sizes.fixPadding + 5.0,
            }}
          ></View>
          <Slider
            value={currentLimit}
            maximumValue={10000}
            minimumValue={1000}
            style={{ height: 10.0 }}
            minimumTrackTintColor={Colors.primaryColor}
            maximumTrackTintColor={Colors.grayColor}
            trackStyle={{ backgroundColor: Colors.primaryColor }}
            onValueChange={(value) => {
              setCurrentLimit(value);
            }}
            thumbStyle={{
              height: 13,
              width: 13,
              backgroundColor: Colors.primaryColor,
            }}
          />
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginVertical: Sizes.fixPadding * 2.0,
              justifyContent: "space-between",
            }}
          >
            <Text style={{ ...Fonts.blackColor14Medium }}>
              This month limit
            </Text>
            <Text style={{ ...Fonts.blackColor14Medium }}>
              USD ${Math.round(currentLimit)}
            </Text>
          </View>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => {
              setLimitDialog(false);
            }}
            style={styles.confirmButtonStyle}
          >
            <Text style={{ ...Fonts.whiteColor16Bold }}>Confirm</Text>
          </TouchableOpacity>
        </View>
      </Dialog.Container>
      {isSuccess && !noTransaction && (
        <Notification
          header="Successful"
          status="success"
          message="Transaction List Updated"
          notify={true}
        />
      )}
      {isSuccess && noTransaction && (
        <Notification
          header="No Transaction"
          status="fail"
          message="No Transactions Found"
          notify={true}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerContentStyle: {
    height: 56.0,
    backgroundColor: Colors.whiteColor,
    elevation: 2.0,
    alignItems: "center",
    justifyContent: "center",
  },

  setLimitAndLockCardContentStyle: {
    flex: 0.43,
    backgroundColor: Colors.whiteColor,
    elevation: 3.0,
    borderRadius: Sizes.fixPadding,
    height: 64.0,
    alignItems: "center",
    paddingHorizontal: Sizes.fixPadding + 10.0,
    flexDirection: "row",
  },
  setLimitAndLockCardMainContentStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: Sizes.fixPadding * 2.0,
    marginBottom: Sizes.fixPadding,
  },

  dialogContainerStyle: {
    borderRadius: Sizes.fixPadding,
    width: width - 40,
    paddingTop: -Sizes.fixPadding,
    paddingBottom: Sizes.fixPadding,
  },
  confirmButtonStyle: {
    backgroundColor: Colors.primaryColor,
    alignItems: "center",
    paddingVertical: Sizes.fixPadding,
    borderRadius: Sizes.fixPadding,
  },
  monthlySpendLimitContentStyle: {
    marginTop: Sizes.fixPadding * 2.0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

CardsScreen.navigationOptions = () => {
  return {
    header: () => null,
  };
};

export default withNavigation(CardsScreen);
