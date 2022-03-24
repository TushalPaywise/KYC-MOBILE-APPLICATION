import React from "react";
import { createAppContainer } from "react-navigation";
import {
  createStackNavigator,
  TransitionPresets,
} from "react-navigation-stack";
import bottomTabBarScreen from "./component/bottomTabBarScreen";
import addNewBenificiaryScreen from "./screens/addNewBenificiary/addNewBenificiaryScreen";
import beneficiariesScreen from "./screens/beneficiaries/beneficiariesScreen";
import benificiaryMoneyTransferScreen from "./screens/beneficiaryMoneyTransfer/benificiaryMoneyTransferScreen";
import cardsScreen from "./screens/cards/cardsScreen";
import depositeScreen from "./screens/deposite/depositeScreen";
import fundTransferScreen from "./screens/fundTransfer/fundTransferScreen";
import loanStatementScreen from "./screens/loanStatement/loanStatementScreen";
import newDepositScreen from "./screens/newDeposit/newDepositScreen";
import oneTimeTransferScreen from "./screens/oneTimeTransfer/oneTimeTransferScreen";
import oneTimeTrasferWithAccountScreen from "./screens/oneTimeTransferWithAcount/oneTimeTrasferWithAccountScreen";
import privacyPolicyScreen from "./screens/privacyPolicy/privacyPolicyScreen";
import supportScreen from "./screens/support/supportScreen";
import termsOfUseScreen from "./screens/termsOfUse/termsOfUseScreen";
import transactionScreen from "./screens/transaction/transactionScreen";
import transferSuccessfullScreen from "./screens/transferSuccessfull/transferSuccessfullScreen";
import signinScreen from "./screens/auth/signinScreen";
import registerScreen from "./screens/auth/registerScreen";
import otpScreen from "./screens/auth/otpScreen";
import splashScreen from "./screens/splashScreen";
import AccountScreen from "./screens/account/accountScreen";
import RegisterPinScreen from "./screens/cards/RegisterPinScreen";

import store from "./redux/store";
import { Provider } from "react-redux";
import ChangePin from "./screens/cards/ChangePin";
import ResetPassword from "./screens/resetPassword/ResetPassword";
import Estatement from "./screens/statement/Estatement";

const switchNavigator = createStackNavigator(
  {
    Splash: splashScreen,
    Signin: signinScreen,
    Register: registerScreen,
    Otp: otpScreen,
    BottomTabBar: bottomTabBarScreen,
    Transaction: transactionScreen,
    FundTransfer: fundTransferScreen,
    OneTimeTrasfer: oneTimeTransferScreen,
    OneTimeTransferWithAccount: oneTimeTrasferWithAccountScreen,
    TransferSuccessfull: transferSuccessfullScreen,
    Benificiaries: beneficiariesScreen,
    AddNewBenificiary: addNewBenificiaryScreen,
    BeneficiaryMoneyTransfer: benificiaryMoneyTransferScreen,
    LoanStatement: loanStatementScreen,
    Deposit: depositeScreen,
    NewDeposit: newDepositScreen,
    Cards: cardsScreen,
    PrivacyPolicy: privacyPolicyScreen,
    TermsOfUse: termsOfUseScreen,
    Support: supportScreen,
    AccountScreen: AccountScreen,
    RegisterPinScreen: RegisterPinScreen,
    ChangePin: ChangePin,
    ResetPassword: ResetPassword,
    Estatement: Estatement,
  },
  {
    initialRouteName: "Splash",
    defaultNavigationOptions: {
      ...TransitionPresets.SlideFromRightIOS,
    },
    transitionSpec: {
      duration: 400,
    },
  }
);

const App = createAppContainer(switchNavigator);

export default () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};
