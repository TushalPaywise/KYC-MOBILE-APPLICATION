import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  BackHandler,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { withNavigation } from "react-navigation";
import { Colors, Fonts, Sizes } from "../../constant/styles";
import { MaterialIcons } from "@expo/vector-icons";
import DepositTitle from "../../component/DepositTitle";

const pendingDepositsList = [
  {
    id: "1",
    depositToNumber: "0325 2365 1478",
    amount: "689.0",
    accountType: "Savings",
    dateAndTime: "14 April 2021 | 11:12 AM",
  },
  {
    id: "2",
    depositToNumber: "5987 4562 3258",
    amount: "878.0",
    accountType: "Current",
    dateAndTime: "19 March 2021 | 11:12 AM",
  },
];

const completeDepositsList = [
  {
    id: "1",
    depositToNumber: "0325 2365 1478",
    amount: "512.0",
    accountType: "Savings",
    dateAndTime: "12 Feb 2021 | 11:12 AM",
  },
];

const renderPendingItem = ({ item, index }) => (
  <View
    style={{
      ...styles.depositsMainContentStyle,
      marginBottom:
        pendingDepositsList.length - 1 == index ? 0.0 : Sizes.fixPadding * 2.0,
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
          <Text style={{ ...Fonts.grayColor12Regular }}>Deposit to</Text>
          <Text style={{ ...Fonts.blackColor14Medium }}>
            {item.depositToNumber}
          </Text>
        </View>
        <View>
          <Text style={{ ...Fonts.grayColor12Regular }}>Account type</Text>
          <Text style={{ ...Fonts.blackColor14Medium }}>
            {item.accountType} account
          </Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View>
          <Text style={{ ...Fonts.grayColor12Regular }}>Amount</Text>
          <Text style={{ ...Fonts.blackColor14Medium }}>${item.amount}</Text>
        </View>
        <View>
          <Text style={{ ...Fonts.grayColor12Regular }}>Date & Time</Text>
          <Text style={{ ...Fonts.blackColor14Medium }}>
            {item.dateAndTime}
          </Text>
        </View>
      </View>
    </View>
    <View
      style={{
        backgroundColor: "#FF0000",
        ...styles.depositsStatusContentStyle,
      }}
    >
      <MaterialIcons name="av-timer" size={20} color={Colors.whiteColor} />
      <Text
        style={{ ...Fonts.whiteColor14Medium, marginLeft: Sizes.fixPadding }}
      >
        Pending
      </Text>
    </View>
  </View>
);

const DepositeScreen = (props) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar backgroundColor={Colors.primaryColor} />
      <View style={{ flex: 1 }}>
        <View style={styles.headerContentStyle}>
          <Text style={{ ...Fonts.blackColor18Bold }}>Deposits</Text>
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
        <FlatList
          ListHeaderComponent={
            <>
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => props.navigation.navigate("NewDeposit")}
                style={styles.newDepositButtonStyle}
              >
                <MaterialIcons name="add" size={20} color={Colors.whiteColor} />
                <Text
                  style={{
                    ...Fonts.whiteColor16Bold,
                    marginLeft: Sizes.fixPadding,
                  }}
                >
                  New deposit
                </Text>
              </TouchableOpacity>
              <DepositTitle title="Pending Deposits" />
              <FlatList
                data={pendingDepositsList}
                keyExtractor={(item) => `${item.id}`}
                renderItem={renderPendingItem}
                showsVerticalScrollIndicator={false}
              />
              <DepositTitle title="Completed Deposits" />
            </>
          }
          data={completeDepositsList}
          keyExtractor={(item) => `${item.id}`}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
};

renderItem = ({ item }) => (
  <View
    style={{
      ...styles.depositsMainContentStyle,
      marginBottom: Sizes.fixPadding * 2.0,
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
          <Text style={{ ...Fonts.grayColor12Regular }}>Deposit to</Text>
          <Text style={{ ...Fonts.blackColor14Medium }}>
            {item.depositToNumber}
          </Text>
        </View>
        <View>
          <Text style={{ ...Fonts.grayColor12Regular }}>Account type</Text>
          <Text style={{ ...Fonts.blackColor14Medium }}>
            {item.accountType} account
          </Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View>
          <Text style={{ ...Fonts.grayColor12Regular }}>Amount</Text>
          <Text style={{ ...Fonts.blackColor14Medium }}>${item.amount}</Text>
        </View>
        <View>
          <Text style={{ ...Fonts.grayColor12Regular }}>Date & Time</Text>
          <Text style={{ ...Fonts.blackColor14Medium }}>
            {item.dateAndTime}
          </Text>
        </View>
      </View>
    </View>
    <View
      style={{
        backgroundColor: "#006400",
        ...styles.depositsStatusContentStyle,
      }}
    >
      <MaterialIcons name="done" size={20} color={Colors.whiteColor} />
      <Text
        style={{ ...Fonts.whiteColor14Medium, marginLeft: Sizes.fixPadding }}
      >
        Completed
      </Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  headerContentStyle: {
    height: 56.0,
    backgroundColor: Colors.whiteColor,
    elevation: 2.0,
    alignItems: "center",
    justifyContent: "center",
  },
  newDepositButtonStyle: {
    flexDirection: "row",
    backgroundColor: Colors.primaryColor,
    alignItems: "center",
    paddingVertical: Sizes.fixPadding,
    marginHorizontal: Sizes.fixPadding * 2.0,
    borderRadius: Sizes.fixPadding,
    justifyContent: "center",
    marginTop: Sizes.fixPadding * 2.0,
  },
  depositsContentStyle: {
    backgroundColor: Colors.whiteColor,
    justifyContent: "space-between",
    height: 110.0,
    borderTopLeftRadius: Sizes.fixPadding,
    borderTopRightRadius: Sizes.fixPadding,
    padding: Sizes.fixPadding,
  },
  depositsStatusContentStyle: {
    flexDirection: "row",
    paddingVertical: Sizes.fixPadding - 5.0,
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
});

DepositeScreen.navigationOptions = () => {
  return {
    header: () => null,
  };
};

export default withNavigation(DepositeScreen);
