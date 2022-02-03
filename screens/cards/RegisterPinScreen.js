import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TextInput,
  Alert,
} from "react-native";
import { withNavigation } from "react-navigation";
import { Colors, Fonts, Sizes } from "../../constant/styles";
import { MaterialIcons } from "@expo/vector-icons";
import CardView from "../../component/CardView";
import CustomButton from "../../component/CustomButton";
import { ScrollView } from "react-native-gesture-handler";
import { backendUseSelector, clearState } from "../../redux/backend";
import Fetching from "../../component/Fetching";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { PINSELECTED } from "../../constant/ApiConstant";
import Notification from "../../component/Notification";

const RegisterPinScreen = (props) => {
  const [fullPan, setFullPan] = useState("");
  const [newPin, setnewPin] = useState("");
  const [confirmNewPin, setConfirmNewPin] = useState("");
  const [cardNum, setCardNum] = useState("");
  const [expiry, setExpiry] = useState("");
  const [userName, setUserName] = useState("");
  const [pinSelected, setPinSelected] = useState(false);
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
      if (payload.rSInfo.infoList[0] === PINSELECTED) {
        setPinSelected(true);
      } else {
        setPinSelected(false);
      }
      setFullPan("");
      setnewPin("");
      setConfirmNewPin("");
    }
  }, [isError, isSuccess]);
  useEffect(() => {
    const userCardDetails = async () => {
      const userCardJsonDetails = await AsyncStorage.getItem("userCardDetails");
      try {
        if (userCardJsonDetails !== null) {
          const transformedData = JSON.parse(userCardJsonDetails);
          setCardNum(transformedData.rSInfo.CardDetails.Cards.Card.CardNum);
          setExpiry(transformedData.rSInfo.CardDetails.Cards.Card.Expiry);
          setUserName(
            transformedData.firstName + " " + transformedData.lastName
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

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F2F4F6" }}>
      <ScrollView>
        <StatusBar backgroundColor={Colors.primaryColor} />
        {isFetching && <Fetching />}
        <View style={{ flex: 1 }}>
          <View style={styles.headerContentStyle}>
            <Text style={{ ...Fonts.blackColor18Bold }}>Register Pin</Text>
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
          <TextInput
            placeholder="Card Number"
            value={fullPan}
            onChangeText={(value) => {
              setFullPan(value);
            }}
            placeholderTextColor={Colors.grayColor}
            style={styles.textFieldStyle}
            maxLength={19}
            keyboardType="numeric"
          />
          <TextInput
            placeholder="New Pin"
            value={newPin}
            onChangeText={(value) => {
              setnewPin(value);
            }}
            placeholderTextColor={Colors.grayColor}
            style={styles.textFieldStyle}
            maxLength={4}
            keyboardType="numeric"
            secureTextEntry={true}
          />
          <TextInput
            placeholder="Confirm New Pin"
            value={confirmNewPin}
            onChangeText={(value) => {
              setConfirmNewPin(value);
            }}
            placeholderTextColor={Colors.grayColor}
            style={styles.textFieldStyle}
            maxLength={4}
            keyboardType="numeric"
            secureTextEntry={true}
          />

          {/* call backend for pin registration */}
          <CustomButton
            title="Register PIN"
            style={styles.primaryButtonStyle}
            confirmNewPin={confirmNewPin}
            newPin={newPin}
            fullPan={fullPan}
          />
          <Text
            style={{
              ...Fonts.blackColor16Bold,
              marginHorizontal: Sizes.fixPadding * 2,
            }}
          >
            Tips to choose your card PIN
          </Text>
          <Text style={styles.titleDescription}>
            - No repeating patterns (1111,2222,5555)
          </Text>
          <Text style={styles.titleDescription}>
            - No consecutive numbers (1234, 5678, 4567)
          </Text>
          <Text style={styles.titleDescription}>
            - No palindrom numbers (0220, 1221, 1001)
          </Text>
        </View>
      </ScrollView>
      {isSuccess && pinSelected && (
        <Notification
          header="Successful"
          status="success"
          message="Pin Selected"
          notify={true}
        />
      )}
      {isSuccess && !pinSelected && (
        <Notification
          header="Unsuccessful"
          status="fail"
          message="Cannot Set PIN"
          notify={true}
        />
      )}
      {isError && (
        <Notification
          header="Error"
          status="fail"
          message={payload.moreDetails}
          notify={true}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  primaryButtonStyle: {
    flexDirection: "row",
    backgroundColor: Colors.primaryColor,
    alignItems: "center",
    paddingVertical: Sizes.fixPadding,
    marginHorizontal: Sizes.fixPadding * 2.0,
    borderRadius: Sizes.fixPadding,
    justifyContent: "center",
    marginTop: Sizes.fixPadding * 2.0,
    marginBottom: Sizes.fixPadding * 2.0,
    height: 50.0,
    elevation: 3.0,
  },
  headerContentStyle: {
    height: 56.0,
    backgroundColor: Colors.whiteColor,
    elevation: 2.0,
    alignItems: "center",
    justifyContent: "center",
  },
  titleDescription: {
    ...Fonts.blackColor12Medium,
    alignItems: "flex-start",
    marginHorizontal: Sizes.fixPadding * 2,
    // marginTop: Sizes.fixPadding,
  },
  textFieldStyle: {
    ...Fonts.blackColor14Medium,
    borderRadius: Sizes.fixPadding,
    borderColor: Colors.primaryColor,
    backgroundColor: Colors.whiteColor,
    elevation: 3.0,
    marginHorizontal: Sizes.fixPadding * 2.0,
    height: 50.0,
    alignItems: "center",
    paddingHorizontal: Sizes.fixPadding * 2.0,
    marginBottom: Sizes.fixPadding,
    marginTop: Sizes.fixPadding * 2.0,
  },
});

RegisterPinScreen.navigationOptions = () => {
  return {
    header: () => null,
  };
};

export default withNavigation(RegisterPinScreen);
