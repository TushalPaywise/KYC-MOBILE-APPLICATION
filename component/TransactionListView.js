import React from "react";
import { Text, View, StyleSheet, FlatList, Dimensions } from "react-native";
import { Colors, Fonts, Sizes } from "../constant/styles";
import { MaterialIcons } from "@expo/vector-icons";
import { withNavigation } from "react-navigation";

const { width } = Dimensions.get("screen");

const renderItem = ({ item }) => {
  const credit = item.Trans_Type_Indicator === "Credit" ? true : false;
  return (
    <View style={styles.transactionContentStyle}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View style={styles.transactionIconContentStyle}>
          <MaterialIcons
            name={credit ? "arrow-downward" : "arrow-upward"}
            size={24}
            color={Colors.primaryColor}
          />
        </View>
        <View style={{ width: width / 1.7, marginLeft: Sizes.fixPadding }}>
          <Text numberOfLines={1} style={{ ...Fonts.blackColor16Medium }}>
            {item.TransacionType}
          </Text>
          <Text
            numberOfLines={1}
            style={{ ...Fonts.grayColor14Medium, marginTop: 2.0 }}
          >
            {item.Card_Acceptor_Name_Loc}
          </Text>
          <Text
            numberOfLines={1}
            style={{ ...Fonts.grayColor14Medium, marginTop: 2.0 }}
          >
            Auth {item.Authorization_Id_Resp}
          </Text>
        </View>
      </View>
      <View style={{ alignItems: "flex-end" }}>
        <Text style={{ ...Fonts.blackColor14Medium }}>USD</Text>
        {credit && (
          <Text style={{ ...Fonts.greenColor16Bold }}>+ {item.Amount} </Text>
        )}
        {!credit && (
          <Text style={{ ...Fonts.redColor16Bold }}>- {item.Amount}</Text>
        )}
      </View>
    </View>
  );
};

const TransactionListView = (props) => {
  return (
    <View>
      {props.transactionList != null && (
        <FlatList
          data={props.transactionList}
          keyExtractor={(item) => `${item.Record}`}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: Sizes.fixPadding * 2.0,
          }}
        />
      )}
      {!props.transactionList && (
        <Text
          style={{
            ...Fonts.grayColor14Medium,
            marginTop: 2.0,
            alignContent: "center",
          }}
        >
          No Transaction History{" "}
        </Text>
      )}
    </View>
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
});
export default withNavigation(TransactionListView);
