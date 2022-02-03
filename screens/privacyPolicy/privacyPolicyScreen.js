import React from "react";
import { Component } from "react";
import {
  Text,
  View,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  BackHandler,
} from "react-native";
import { withNavigation } from "react-navigation";
import { Colors, Fonts, Sizes } from "../../constant/styles";
import { MaterialIcons } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";

class PrivacyPolicyScreen extends Component {
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
      <SafeAreaView style={{ flex: 1, backgroundColor: "#F2F4F6" }}>
        <StatusBar backgroundColor={Colors.primaryColor} />
        <ScrollView style={{ flex: 1 }}>
          {this.header()}
          <Text style={styles.dummyTextStyle}>
            This Privacy Policy depicts the sorts of "Individual Information"
            (data that is recognizable to a specific individual) that is
            gathered (straightforwardly or through specialist organizations)
            regarding the portable downloadable application ("App") and related
            administrations (all things considered, the "Administration")
            presented by your monetary foundation ("we" or "us"). This Privacy
            Policy is planned to enhance the divulgences in any Privacy Policy
            that you might have as of now been given by us in association
            internet banking or different administrations.
          </Text>
          <Text style={styles.textHeader}>
            What Types of Personal Information We May Collect.
          </Text>
          <Text style={styles.dummyTextStyle}>
            We might gather Personal Information about you, which might include:
            name, postal location, postal district, email address, phone number,
            account numbers, installment card termination date, installment card
            distinguishing proof or confirmation numbers, government backed
            retirement number, cell phone area, and other data that we can use
            to reach you, check your character, give the usefulness accessible
            through utilization of the App and the Service, and oversee hazards,
            for example, data kept up with about you by personality check
            administrations and buyer detailing offices, including credit
            departments, and installment and other exchange data, and history
            for installments and different exchanges in which you partake
            through the Service, and any Personal Information that you might go
            into data blocks present in the App interface or made accessible
            through the Service.
          </Text>
          <Text style={styles.textHeader}>
            How We May Collect Personal Information About You.
          </Text>
          <Text style={styles.dummyTextStyle}>
            We might gather Personal Information about you from the accompanying
            sources: We might gather data viewing your cell phone like gadget
            settings, one of a kind gadget identifiers, data about your area,
            and insightful data that might help with diagnostics and execution.
            For your benefit, you might be approached to allow consent for
            admittance to your cell phone's reallocation information. This data
            might be gathered when you utilize specific administrations that are
            reliant upon your cell phone's area (like the area of an ATM or in
            store exchanges). Data that you contribution to the App or that the
            App gathers naturally; 1. Your utilization of the App and the
            Service, and your cooperation’s with client care, including data you
            enter or talk, and data sent by your PC or cell phone or different
            gadgets you use as a feature of your receipt of the Service.
          </Text>
          <Text style={styles.textHeader}>
            How We May Use Personal Information About You.
          </Text>
          <Text style={styles.dummyTextStyle}>
            We utilize Personal Information about you just as allowed by law,
            including however not restricted to the accompanying purposes:
          </Text>
          <Text style={styles.dummyTextStyle}>
            1. To finish exchanges and render administrations approved by you;
          </Text>
          <Text style={styles.dummyTextStyle}>
            2. Other ordinary business purposes, for example, to keep up with
            your capacity to get to the Service, to send you data about the
            Service, to impact, manage and authorize exchanges, to perform
            extortion screening, to forestall real or possible misrepresentation
            and unapproved exchanges, to confirm your character, to decide your
            record as a consumer, to check the data you give to the Service, to
            perform assortments, to answer to credit authorities (counting
            outfitting delinquent record data), to follow laws, guidelines,
            court orders and legitimate directions from government
            organizations, to secure the individual wellbeing of clients of the
            Service or people in general, to forestall and guard claims, to
            determine questions, to investigate issues, to implement our Terms
            of Use, to ensure our privileges and property, and to modify,
            measure, and work on the Service and the App, including design
            acknowledgment, demonstrating, upgrade and improvement, framework
            examination, and Service execution investigation.
          </Text>
          <Text style={styles.textHeader}>
            How We Protect Personal Information About You.
          </Text>
          <Text style={styles.dummyTextStyle}>
            To shield Personal Information about you from unapproved access and
            use, we keep up with physical, electronic, and procedural
            protections, including however not restricted to safety efforts that
            follow material government and laws. Information Retention. We will
            hold, ensure, use and offer Personal Information about you as long
            as it is sensibly needed for the reasons portrayed in this Privacy
            Policy, and as legally necessary, including however not restricted
            to for hazard the board, administrative consistence, and review
            purposes. We might alter this approach whenever by posting an
            updated rendition in the App. The modified variant will be taking
            effect right now at the time it is posted except if a deferred
            compelling date is explicitly expressed in that. You may (in our
            carefulness) likewise be furnished with an email notice of such
            revisions. On the off chance that we roll out any improvement by
            they way we utilize your Personal Information, we will tell you by
            email or through a notification in the App preceding the change
            becoming compelling.
          </Text>
        </ScrollView>
      </SafeAreaView>
    );
  }

  header() {
    return (
      <View style={styles.headerContentStyle}>
        <MaterialIcons
          name="arrow-back"
          size={24}
          color="black"
          onPress={() => this.props.navigation.goBack()}
          style={{ position: "absolute", left: 20.0 }}
        />
        <Text
          style={{
            ...Fonts.blackColor18Bold,
            alignSelf: "center",
            justifyContent: "center",
          }}
        >
          Privacy Policy
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headerContentStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 60.0,
    backgroundColor: Colors.whiteColor,
    paddingHorizontal: Sizes.fixPadding * 2.0,
    elevation: 10.0,
  },
  dummyTextStyle: {
    ...Fonts.blackColor14Medium,
    textAlign: "justify",
    marginHorizontal: Sizes.fixPadding * 2.0,
    marginTop: Sizes.fixPadding + 5.0,
  },
  textHeader: {
    ...Fonts.blackColor14Bold,
    textAlign: "justify",
    marginHorizontal: Sizes.fixPadding * 2.0,
    marginTop: Sizes.fixPadding + 5.0,
  },
});

PrivacyPolicyScreen.navigationOptions = () => {
  return {
    header: () => null,
  };
};

export default withNavigation(PrivacyPolicyScreen);
