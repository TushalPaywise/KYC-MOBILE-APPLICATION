import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  Dimensions,
  Alert,
} from "react-native";
import { withNavigation } from "react-navigation";
import { Colors, Fonts, Sizes } from "../../constant/styles";
import { MaterialIcons } from "@expo/vector-icons";
import TransactionListView from "../../component/TransactionListView";
import * as SecureStore from "expo-secure-store";
import {
  backendUseSelector,
  clearState,
  backendService,
} from "../../redux/backend.js";
import { useDispatch, useSelector } from "react-redux";
import { LATEST_TRANS_HISTORY } from "../../constant/ApiConstant";
import Fetching from "../../component/Fetching";
import Notification from "../../component/Notification";

const TransactionScreen = (props) => {
  const [transactionList, setTransactionList] = useState([]);
  const [noTransaction, setNoTransaction] = useState(false);
  useEffect(() => {
    const userCardDetails = async () => {
      const userData = await SecureStore.getItemAsync("userLoginData");
      try {
        if (userData != null) {
          const transformedData = JSON.parse(userData);

          dispatch(
            backendService(
              JSON.stringify({
                email: transformedData.email,
                token: transformedData.token,
                api: LATEST_TRANS_HISTORY,
                userId: transformedData.userId,
              })
            )
          );
        }
      } catch (e) {
        // error reading value
        props.navigation.navigate("BottomTabBar");
        Alert.alert("Error", "Failed to load transaction history", [
          { text: "Ok" },
        ]);
      }
    };
    userCardDetails();
  }, []);

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
        payload.rSInfo.TransactionHistory != null &&
        payload.rSInfo.TransactionHistory.Transaction !== null
      ) {
        setTransactionList(payload.rSInfo.TransactionHistory.Transaction);
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
          <Text style={{ ...Fonts.blackColor18Bold }}>
            Latest Transaction History
          </Text>
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

        <TransactionListView
          transactionList={transactionList}
        ></TransactionListView>
      </View>
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
          message="No Transactions History"
          notify={true}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  transactionContentStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: Sizes.fixPadding * 2.0,
    alignItems: "center",
    marginBottom: Sizes.fixPadding + 5.0,
  },
  transactionIconContentStyle: {
    width: 40.0,
    height: 40.0,
    borderRadius: 20.0,
    borderColor: Colors.primaryColor,
    borderWidth: 1.0,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(96, 163, 42, 0.2)",
  },
  headerContentStyle: {
    height: 56.0,
    backgroundColor: Colors.whiteColor,
    elevation: 2.0,
    alignItems: "center",
    justifyContent: "center",
  },
});

TransactionScreen.navigationOptions = () => {
  return {
    header: () => null,
  };
};

export default withNavigation(TransactionScreen);
