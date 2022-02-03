import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { withNavigation } from "react-navigation";
import { Colors, Fonts, Sizes } from "../../constant/styles";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import CardView from "../../component/CardView";
import CustomButton from "../../component/CustomButton";
import { ScrollView } from "react-native-gesture-handler";
import { backendUseSelector, clearState } from "../../redux/backend";
import Fetching from "../../component/Fetching";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Notification from "../../component/Notification";
import DateTimePicker from "@react-native-community/datetimepicker";
import { CurrencyList } from "../../constant/CurrencyList";
import DepositTitle from "../../component/DepositTitle";

const Estatement = (props) => {
  const height = Dimensions.get("window").height;
  function formatDate(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }
  const [dateFrom, setDateFrom] = useState(new Date());
  const [showFrom, setShowFrom] = useState(false);
  const [dateTo, setDateTo] = useState(new Date());
  const [showTo, setShowTo] = useState(false);
  const [showFlatList, setShowFlatList] = useState(false);
  const [transactionList, setTransactionList] = useState([]);
  const [showAccount, setShowAccount] = useState(false);
  const [accountDetails, setAccountDetails] = useState({});

  const onChangeFrom = (event, selectedDate) => {
    const currentDate = selectedDate || dateFrom;
    setShowFrom(Platform.OS === "ios");
    setDateFrom(currentDate);
    setShowFrom(false);
  };

  const showDatepickerFrom = () => {
    setShowFrom(true);
  };
  const onChangeTo = (event, selectedDate) => {
    const currentDate = selectedDate || dateTo;
    setShowFrom(Platform.OS === "ios");
    setDateTo(currentDate);
    setShowTo(false);
  };

  const showDatepickerTo = () => {
    setShowTo(true);
  };

  const [currency, setCurrency] = useState("");
  useEffect(() => {
    const userLoginData = async () => {
      const userCardJsonDetails = await AsyncStorage.getItem("userCardDetails");
      try {
        if (userCardJsonDetails !== null) {
          const userCardData = JSON.parse(userCardJsonDetails);
          if (
            userCardData.rSInfo != null &&
            userCardData.rSInfo.AccountsBalance != null &&
            userCardData.rSInfo.AccountsBalance.Account
          ) {
            setCurrency(
              CurrencyList.find(
                (element) =>
                  element.number ==
                  userCardData.rSInfo.AccountsBalance.Account.CURRENCY_CODE
              )
            );
          }
        } else {
          props.navigation.navigate("Signin");
        }
      } catch (e) {
        // error reading value
      }
    };
    userLoginData();
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
    if (isSuccess) {
      console.log(payload);
      if (
        payload !== "undefined" &&
        payload.rSInfo !== "undefined" &&
        payload.rSInfo.Estatement !== "undefined"
      ) {
        if (
          payload.rSInfo.Estatement.Transactions !== "undefined" &&
          payload.rSInfo.Estatement.Transactions.Transaction !== "undefined"
        ) {
          setShowFlatList(true);
          setTransactionList(
            payload.rSInfo.Estatement.Transactions.Transaction
          );
        }
        if (
          payload.rSInfo.Estatement.Accounts_Header !== "undefined" &&
          payload.rSInfo.Estatement.Accounts_Header.Accounts !== "undefined"
        ) {
          setShowAccount(true);
          setAccountDetails(payload.rSInfo.Estatement.Accounts_Header.Accounts);
        }
      }
    } else {
    }
  }, [isSuccess, isError]);

  const renderStatementItem = ({ item, index }) => (
    <View
      style={{
        ...styles.depositsMainContentStyle,
        marginBottom:
          transactionList.length - 1 == index ? 0.0 : Sizes.fixPadding,
      }}
    >
      <View style={styles.depositsContentStyle}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View>
            <Text style={{ ...Fonts.grayColor12Regular }}>
              Transaction Indicator
            </Text>
            <Text style={{ ...Fonts.blackColor14Medium }}>
              {item.Transaction_Indicator}
            </Text>
          </View>
          <View>
            <Text style={{ ...Fonts.grayColor12Regular }}>
              Transaction Details
            </Text>
            <Text style={{ ...Fonts.blackColor14Medium }}>
              {item.Transaction_Details}
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "flex-start",
            justifyContent: "space-between",
          }}
        >
          <View>
            <Text style={{ ...Fonts.grayColor12Regular }}>Date & Time</Text>
            <Text style={{ ...Fonts.blackColor14Medium }}>
              {item.Transaction_Date}
            </Text>
          </View>
          <View>
            <Text style={{ ...Fonts.grayColor12Regular }}>Amount</Text>
            <Text style={{ ...Fonts.blackColor14Medium }}>
              {item.sttl_amnt}
            </Text>
          </View>
        </View>
      </View>
      <View
        style={{
          backgroundColor:
            item.Transaction_Status === "SETTLED" ? "#009900" : "#FF0000",
          borderRadius: Sizes.fixPadding,
          ...styles.depositsStatusContentStyle,
        }}
      >
        <MaterialIcons
          name={item.Transaction_Status === "SETTLED" ? "done" : "av-timer"}
          size={20}
          color={Colors.whiteColor}
        />
        <Text
          style={{ ...Fonts.whiteColor14Medium, marginLeft: Sizes.fixPadding }}
        >
          {item.Transaction_Status}
        </Text>
      </View>
    </View>
  );
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F2F4F6" }}>
      <ScrollView>
        <StatusBar backgroundColor={Colors.primaryColor} />
        <View style={{ flex: 1 }}>
          {isFetching && <Fetching />}
          <View style={styles.headerContentStyle}>
            <Text style={{ ...Fonts.blackColor18Bold }}>Estatement</Text>
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
          <StatusBar backgroundColor={Colors.primaryColor} />
          <View style={styles.boxContentStyle}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View>
                <Text style={styles.headerTitle}>Start Date: </Text>
                <TouchableOpacity
                  //  //     <Text>{count}</Text>
                  activeOpacity={0.9}
                  onPress={showDatepickerFrom}
                  style={styles.dateSelector}
                >
                  <MaterialIcons
                    name="calendar-today"
                    size={16}
                    color={Colors.primaryColor}
                    style={{ marginLeft: Sizes.fixPadding }}
                  />
                  <Text
                    style={{
                      ...Fonts.blackColor12Medium,
                      marginHorizontal: Sizes.fixPadding,
                      marginVertical: 5,
                    }}
                  >
                    {formatDate(dateFrom)}
                  </Text>
                </TouchableOpacity>
              </View>
              <View>
                <Text style={styles.headerTitle}>End Date: </Text>

                <TouchableOpacity
                  //  //     <Text>{count}</Text>
                  activeOpacity={0.9}
                  onPress={showDatepickerTo}
                  style={styles.dateSelector}
                >
                  <MaterialIcons
                    name="calendar-today"
                    size={16}
                    color={Colors.primaryColor}
                    style={{ marginLeft: Sizes.fixPadding }}
                  />
                  <Text
                    style={{
                      ...Fonts.blackColor12Medium,
                      marginHorizontal: Sizes.fixPadding,
                      marginVertical: 5,
                    }}
                  >
                    {formatDate(dateTo)}
                  </Text>
                </TouchableOpacity>
              </View>
              <View>
                <Text style={styles.headerTitle}></Text>
                <CustomButton
                  title="Search"
                  style={styles.primaryButtonStyle}
                  dateTo={formatDate(dateTo)}
                  dateFrom={formatDate(dateFrom)}
                  marginVertical={3}
                  currency={currency.code}
                />
              </View>
            </View>
          </View>
          {isSuccess && (
            <Notification
              header="Successful"
              status={showFlatList ? "success" : "fail"}
              message={showFlatList ? "Records Updated" : "No Record Found"}
              notify={true}
              height="0.15"
            />
          )}
          {isError && (
            <Notification
              header="Failed"
              status="fail"
              message={payload.moreDetails}
              notify={true}
              height="0.15"
            />
          )}
        </View>

        {showFrom && (
          <DateTimePicker
            testID="dateTimePicker"
            value={dateFrom}
            mode="date"
            is24Hour={true}
            display="default"
            onChange={onChangeFrom}
          />
        )}
        {showTo && (
          <DateTimePicker
            testID="dateTimePicker"
            value={dateTo}
            mode="date"
            is24Hour={true}
            display="default"
            onChange={onChangeTo}
          />
        )}
      </ScrollView>
      {showFlatList && (
        <View>
          {/* <DepositTitle title="Generated Records" /> */}
          {showAccount && (
            <View style={styles.accountContentStyle}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <View>
                  <Text style={{ ...Fonts.grayColor12Regular }}>
                    Account Number
                  </Text>
                  <Text style={{ ...Fonts.blackColor14Medium }}>
                    {accountDetails.Account_Number}
                  </Text>
                </View>
                <View>
                  <Text style={{ ...Fonts.grayColor12Regular }}>
                    Available Balance
                  </Text>
                  <Text style={{ ...Fonts.blackColor14Medium }}>
                    {accountDetails.AVAL_BALANCE}
                  </Text>
                </View>
                <View>
                  <Text style={{ ...Fonts.grayColor12Regular }}>
                    Account Currency
                  </Text>
                  <Text style={{ ...Fonts.blackColor14Medium }}>
                    {accountDetails.Account_Currency}
                  </Text>
                </View>
              </View>
            </View>
          )}
        </View>
      )}
      {showFlatList && (
        <FlatList
          ListHeaderComponent={
            <>
              <FlatList
                data={transactionList}
                keyExtractor={(item) => `${item.RecordNo}`}
                renderItem={renderStatementItem}
                showsVerticalScrollIndicator={false}
              />
            </>
          }
        />
      )}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  headerContentStyle: {
    height: 65.0,
    backgroundColor: Colors.whiteColor,
    elevation: 2.0,
    alignItems: "center",
    justifyContent: "center",
  },
  dateSelector: {
    flexDirection: "row",
    backgroundColor: Colors.whiteColor,
    alignItems: "center",
    marginHorizontal: 6,
    borderRadius: 5,
    justifyContent: "center",
    elevation: 3.0,
  },
  primaryButtonStyle: {
    flexDirection: "row",
    backgroundColor: Colors.primaryColor,
    alignItems: "center",
    marginHorizontal: 25,
    borderRadius: 5,
    justifyContent: "space-between",
    elevation: 3.0,
  },
  headerTitle: {
    ...Fonts.blackColor14Bold,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 2,
    marginHorizontal: 6,
    justifyContent: "center",
    elevation: 3.0,
  },
  boxContentStyle: {
    backgroundColor: Colors.whiteColor,
    elevation: 4.0,
    marginHorizontal: Sizes.fixPadding,
    marginVertical: Sizes.fixPadding,
    borderRadius: Sizes.fixPadding,
    padding: Sizes.fixPadding,
  },
  depositsContentStyle: {
    backgroundColor: Colors.whiteColor,
    justifyContent: "space-between",
    height: 90.0,
    borderTopLeftRadius: Sizes.fixPadding,
    borderTopRightRadius: Sizes.fixPadding,
    padding: Sizes.fixPadding,
  },
  depositsStatusContentStyle: {
    flexDirection: "row",
    paddingVertical: Sizes.fixPadding - 12.0,
    borderBottomLeftRadius: Sizes.fixPadding,
    borderBottomRightRadius: Sizes.fixPadding,
    alignItems: "center",
    justifyContent: "center",
  },
  depositsMainContentStyle: {
    marginHorizontal: Sizes.fixPadding * 2.0,
    elevation: 3.0,
    backgroundColor: Colors.whiteColor,
    borderRadius: Sizes.fixPadding,
  },
  accountContentStyle: {
    marginHorizontal: Sizes.fixPadding * 2.0,
    // backgroundColor: Colors.whiteColor,
    borderRadius: Sizes.fixPadding,
    padding: Sizes.fixPadding,
    marginBottom: 8,
    // elevation: 5.0,
    height: 50.0,
  },
});
Estatement.navigationOptions = () => {
  return {
    header: () => null,
  };
};

export default withNavigation(Estatement);
