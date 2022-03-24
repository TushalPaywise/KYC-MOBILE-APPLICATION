import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  BackHandler,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { withNavigation } from "react-navigation";
import { Colors, Fonts, Sizes } from "../../constant/styles";
import { MaterialIcons } from "@expo/vector-icons";
import CustomButton from "../../component/CustomButton";
import {
  backendUseSelector,
  clearState,
  backendService,
} from "../../redux/backend.js";
import { useDispatch, useSelector } from "react-redux";
import Fetching from "../../component/Fetching";
import Notification from "../../component/Notification";
import { SUCCESS } from "../../constant/ApiConstant";
import PhoneInput from "react-native-phone-number-input";

const SupportScreen = (props) => {
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

  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");
  const [notify, setNotify] = useState(false);

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
    if (isSuccess && payload.status === SUCCESS) {
      setNotify(true);
      setName("");
      setPhoneNumber("");
      setMessage("");
    }
  }, [isError, isSuccess]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F2F4F6" }}>
      {isFetching && <Fetching />}
      <StatusBar backgroundColor={Colors.primaryColor} />
      <View style={{ flex: 1 }}>
        <View style={styles.headerContentStyle}>
          <Text style={{ ...Fonts.blackColor18Bold }}>Message Support</Text>
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
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: Sizes.fixPadding * 2.0 }}
        >
          <TouchableOpacity activeOpacity={0.9} style={styles.loanContentStyle}>
            <Image
              source={require("../../assets/images/support/support.png")}
              style={{
                height: 170,
                width: "100%",
                borderRadius: Sizes.fixPadding - 3.0,
              }}
              resizeMode="stretch"
            />
          </TouchableOpacity>
          <View style={{ marginHorizontal: Sizes.fixPadding * 2.0 }}>
            <Text style={{ ...Fonts.blackColor18Bold, textAlign: "center" }}>
              How can we help you ?
            </Text>
          </View>
          <View style={styles.loanOfferDetailContentStyle}>
            <Text style={{ ...Fonts.blackColor14Bold }}>Name</Text>
            <TextInput
              placeholder="Enter your name"
              placeholderTextColor={Colors.grayColor}
              value={name}
              onChangeText={(value) => setName(value)}
              style={{
                height: 36.0,
                ...styles.textFieldStyle,
              }}
            />
            <Text style={{ ...Fonts.blackColor14Bold }}>Phone number</Text>

            <View style={styles.textFieldStyle}>
              <PhoneInput
                placeholder="Enter your phone number"
                value={phoneNumber}
                defaultCode="US"
                onChangeText={(value) => setPhoneNumber(value)}
                placeholderTextColor={Colors.grayColor}
                required
                maxLength={20}
              />
            </View>
            <Text style={{ ...Fonts.blackColor14Bold }}>Message</Text>
            <TextInput
              placeholder="Enter your message here"
              placeholderTextColor={Colors.grayColor}
              value={message}
              onChangeText={(value) => setMessage(value)}
              multiline={true}
              numberOfLines={6}
              style={{
                ...styles.textFieldStyle,
              }}
            />

            <CustomButton
              style={styles.sendInquiryButtonStyle}
              title="Email Support"
              name={name}
              phoneNumber={phoneNumber}
              message={message}
            />
          </View>
        </ScrollView>
      </View>
      {isSuccess && notify && (
        <Notification
          header="Successful"
          status="success"
          message={payload.moreDetails}
          notify={true}
        />
      )}
      {isSuccess && !notify && (
        <Notification
          header="Error"
          status="fail"
          message="Error Sending Email, Please Retry !"
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
  loanContentStyle: {
    marginHorizontal: Sizes.fixPadding * 2.0,
    borderRadius: Sizes.fixPadding - 3.0,
    elevation: 1.0,
    marginVertical: Sizes.fixPadding * 2.0,
  },
  textFieldStyle: {
    ...Fonts.blackColor14Regular,
    backgroundColor: Colors.whiteColor,
    elevation: 3.0,
    borderRadius: Sizes.fixPadding,
    borderColor: "rgba(128, 128, 128, 0.3)",
    borderWidth: 0.5,
    paddingHorizontal: Sizes.fixPadding + 2.0,
    marginTop: Sizes.fixPadding,
    marginBottom: Sizes.fixPadding * 2.0,
  },
  sendInquiryButtonStyle: {
    backgroundColor: Colors.primaryColor,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: Sizes.fixPadding,
    borderRadius: Sizes.fixPadding,
  },
  loanOfferDetailContentStyle: {
    backgroundColor: Colors.whiteColor,
    elevation: 3.0,
    borderRadius: Sizes.fixPadding,
    marginHorizontal: Sizes.fixPadding * 2.0,
    marginVertical: Sizes.fixPadding + 5.0,
    paddingHorizontal: Sizes.fixPadding,
    paddingVertical: Sizes.fixPadding * 2.0,
  },
});

SupportScreen.navigationOptions = () => {
  return {
    header: () => null,
  };
};

export default withNavigation(SupportScreen);
