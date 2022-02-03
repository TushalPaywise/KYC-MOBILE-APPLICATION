import React, { Component } from "react";
import {
    Text,
    View,
    StyleSheet,
    SafeAreaView,
    StatusBar, BackHandler,
    Dimensions,
    TextInput,
    ScrollView,
    TouchableOpacity
} from "react-native";
import { withNavigation } from "react-navigation";
import { Colors, Fonts, Sizes } from "../../constant/styles";
import { MaterialIcons } from '@expo/vector-icons';
import SelectDropdown from 'react-native-select-dropdown'
import Dialog from "react-native-dialog";

const { width } = Dimensions.get('screen');

const banksList = [
    'Select bank',
    'AXIS BANK',
    'CITI BANK',
    'FEDERAL BANK LTD.',
    'HDFC BANK LTD',
    'KOTAK MAHINDRA BANK',
    'OTHER BANKS'
];

const accountTypeList = [
    'Select account type',
    'Savings',
    'Current',
    'Overdraft',
    'Cash Credit',
    'Loan',
    'NRE',
];

class OneTimeTransferWithAccountScreen extends Component {

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton.bind(this));
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton.bind(this));
    }

    handleBackButton = () => {
        this.props.navigation.pop();
        return true;
    };

    state = {
        accountNumber: '',
        confirmAccountNumber: '',
        benificiaryName: '',
        ifscCode: '',
        amount: '',
        remark: '',
        changeAccountDialog: false,
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#F2F4F6' }}>
                <StatusBar backgroundColor={Colors.primaryColor} />
                <View style={{ flex: 1 }}>
                    {this.header()}
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                    >
                        {this.accountInfo()}
                        {this.bankDetail()}
                        {this.accountDetail()}
                        {this.transferDetail()}
                        {this.continueButton()}
                    </ScrollView>
                </View>
                {this.changeAccountDialogInfo()}
            </SafeAreaView>
        )
    }

    changeAccountDialogInfo() {
        return (
            <Dialog.Container
                visible={this.state.changeAccountDialog}
                contentStyle={styles.dialogContainerStyle}
            >
                <View style={{ backgroundColor: Colors.whiteColor, }}>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}>
                        <Text style={{ ...Fonts.primaryColor14Medium }}>
                            Select account to transfer from
                        </Text>
                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() => this.setState({ changeAccountDialog: false })}
                            style={styles.dialogCloseButtonStyle}>
                            <MaterialIcons name="close" size={17} color={Colors.whiteColor} />
                        </TouchableOpacity>
                    </View>
                    {this.divider()}
                    {this.accountTypeInfo({ type: 'Saving', accountNumber: '032523651475' })}
                    {this.divider()}
                    {this.accountTypeInfo({ type: 'Current', accountNumber: '598745623258' })}
                    {this.divider()}
                </View>
            </Dialog.Container>
        )
    }

    accountTypeInfo({ type, accountNumber }) {
        return (
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={styles.selectAccountProfileIconStyle}>
                        <MaterialIcons name="person" size={27} color={Colors.whiteColor} />
                    </View>
                    <View style={{
                        marginLeft: Sizes.fixPadding + 7.0,
                        width: width / 3.1,
                    }}>
                        <Text style={{ ...Fonts.blackColor14Bold }}>
                            Ellison Perry
                        </Text>
                        <Text style={{ ...Fonts.grayColor12Regular, marginTop: Sizes.fixPadding - 5.0 }}>
                            BankX | {type}
                        </Text>
                    </View>
                </View>
                <Text style={{ ...Fonts.primaryColor14Medium, alignSelf: 'flex-start' }}>
                    {accountNumber}
                </Text>
            </View>
        )
    }

    divider() {
        return (
            <View style={{
                backgroundColor: Colors.grayColor, height: 1.0,
                marginVertical: Sizes.fixPadding
            }}>
            </View>
        )
    }

    continueButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => this.props.navigation.navigate('TransferSuccessfull', {
                    transferType: 'One time transfer',
                    transferTo: 'Amara Smith'
                })}
                style={styles.continueButtonStyle}>
                <Text style={{ ...Fonts.whiteColor16Bold }}>Continue</Text>
            </TouchableOpacity>
        )
    }

    transferDetail() {
        return (
            <View style={styles.transferDetailContentStyle}>
                <Text style={{ ...Fonts.blackColor16Bold, marginBottom: Sizes.fixPadding }}>
                    Transfer Details
                </Text>
                {this.amountTextField()}
                {this.remarkTextField()}
            </View>
        )
    }

    remarkTextField() {
        return (
            <TextInput
                placeholder="Remark (optional)"
                placeholderTextColor={Colors.grayColor}
                value={this.state.remark}
                onChangeText={(value) => this.setState({ remark: value })}
                style={{ ...styles.textFieldStyle, marginBottom: Sizes.fixPadding }}
            />
        )
    }

    amountTextField() {
        return (
            <TextInput
                placeholder="Amount"
                keyboardType="numeric"
                placeholderTextColor={Colors.grayColor}
                value={this.state.amount}
                onChangeText={(value) => this.setState({ amount: value })}
                style={{ ...styles.textFieldStyle, marginBottom: Sizes.fixPadding }}
            />
        )
    }

    accountDetail() {
        return (
            <View style={styles.accountDetailContentStyle}>
                <Text style={{ ...Fonts.blackColor16Bold, marginBottom: Sizes.fixPadding }}>
                    Account Details
                </Text>
                {this.accountNumberTextField()}
                {this.confirmAccountNumberTextField()}
                {this.selectAccountTypeDropDown()}
                {this.benificiaryNameTextField()}
            </View>
        )
    }

    selectAccountTypeDropDown() {
        return (
            <View>
                <SelectDropdown
                    data={accountTypeList}
                    defaultButtonText="Select account type"
                    buttonTextStyle={{ ...Fonts.blackColor14Medium, textAlign: 'left' }}
                    buttonStyle={styles.accountTypeDropDownFieldStyle}
                    renderDropdownIcon={() => (
                        <MaterialIcons name="keyboard-arrow-down" size={24} color="black" />
                    )}
                    rowStyle={{
                        borderBottomWidth: 0.0,
                        height: 35.0,
                    }}
                    rowTextStyle={{
                        ...Fonts.blackColor14Medium,
                        marginHorizontal: Sizes.fixPadding + 5.0,
                        textAlign: 'left'
                    }}
                    onSelect={() => {
                    }}
                    buttonTextAfterSelection={(selectedItem, index) => {
                        return selectedItem
                    }}
                    rowTextForSelection={(item, index) => {
                        return item
                    }}
                    dropdownStyle={{
                        borderRadius: Sizes.fixPadding - 5.0,
                    }}
                />
                <View style={styles.accountTypeDropDownBottomBorderStyle}></View>
            </View>
        )
    }

    benificiaryNameTextField() {
        return (
            <TextInput
                placeholder="Enter beneficiary name"
                placeholderTextColor={Colors.grayColor}
                value={this.state.benificiaryName}
                onChangeText={(value) => this.setState({ benificiaryName: value })}
                style={{ ...styles.textFieldStyle, top: -7.0, marginBottom: Sizes.fixPadding - 5.0 }}
            />
        )
    }

    accountNumberTextField() {
        return (
            <TextInput
                placeholder="Enter account number"
                keyboardType="numeric"
                placeholderTextColor={Colors.grayColor}
                value={this.state.accountNumber}
                onChangeText={(value) => this.setState({ accountNumber: value })}
                style={{ ...styles.textFieldStyle, marginBottom: Sizes.fixPadding, }}
            />
        )
    }

    confirmAccountNumberTextField() {
        return (
            <TextInput
                placeholder="Confirm account number"
                keyboardType="numeric"
                placeholderTextColor={Colors.grayColor}
                value={this.state.confirmAccountNumber}
                onChangeText={(value) => this.setState({ confirmAccountNumber: value })}
                style={{ ...styles.textFieldStyle, marginBottom: Sizes.fixPadding, }}
            />
        )
    }

    bankDetail() {
        return (
            <View style={styles.bankDetailContentStyle}>
                <Text style={{ ...Fonts.blackColor16Bold, }}>
                    Bank Details
                </Text>
                {this.selectBankDropDown()}
                {this.ifscTextField()}
            </View>
        )
    }

    selectBankDropDown() {
        return (
            <View>
                <SelectDropdown
                    data={banksList}
                    defaultButtonText="Select bank"
                    buttonTextStyle={{ ...Fonts.blackColor14Medium, textAlign: 'left' }}
                    buttonStyle={
                        styles.selectBankDropDownFieldStyle
                    }
                    renderDropdownIcon={() => (
                        <MaterialIcons name="keyboard-arrow-down" size={24} color="black" />
                    )}
                    rowStyle={{
                        borderBottomWidth: 0.0,
                        height: 35.0,
                    }}
                    rowTextStyle={{
                        ...Fonts.blackColor14Medium,
                        marginHorizontal: Sizes.fixPadding + 5.0,
                        textAlign: 'left'
                    }}
                    onSelect={(selectedItem, index) => {
                    }}
                    buttonTextAfterSelection={(selectedItem, index) => {
                        return selectedItem
                    }}
                    rowTextForSelection={(item, index) => {
                        return item
                    }}
                    dropdownStyle={{
                        marginTop: Sizes.fixPadding - 50.0,
                        borderRadius: Sizes.fixPadding - 5.0
                    }}
                />
                <View style={styles.selectBankDropdownBottomBorderStyle}></View>
            </View>
        )
    }

    ifscTextField() {
        return (
            <TextInput
                placeholder="Enter IFSC"
                placeholderTextColor={Colors.grayColor}
                value={this.state.ifscCode}
                onChangeText={(value) => this.setState({ ifscCode: value })}
                style={styles.ifscCodeTextFieldStyle}
            />
        )
    }

    accountInfo() {
        return (
            <View style={styles.accountInfoContentStyle}>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginBottom: Sizes.fixPadding
                }}>
                    <View style={styles.accountHolderContentStyle}>
                        <MaterialIcons
                            name="person"
                            size={30}
                            color={Colors.whiteColor}
                        />
                    </View>
                    <View style={{ marginLeft: Sizes.fixPadding }}>
                        <Text style={{ ...Fonts.grayColor12Regular }}>
                            From
                        </Text>
                        <Text style={{ ...Fonts.blackColor16Medium }}>
                            032523651475
                        </Text>
                    </View>
                </View>
                <Text style={{ ...Fonts.blackColor16Medium }}>
                    Saving | Ellison Perry
                </Text>
                <Text style={{ ...Fonts.blackColor16Medium, marginTop: Sizes.fixPadding - 8.0 }}>
                    Balance: $1,899
                </Text>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => this.setState({ changeAccountDialog: true })}
                    style={styles.changeAccountInfoContentStyle}>
                    <Text style={{ ...Fonts.primaryColor12Medium, marginRight: Sizes.fixPadding - 5.0 }}>Change</Text>
                    <View style={styles.changeAccountInfoIconStyle}>
                        <MaterialIcons name="arrow-forward-ios" size={10} color={Colors.primaryColor} />

                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    header() {
        return (
            <View style={styles.headerContentStyle}>
                <Text style={{ ...Fonts.blackColor18Bold }}>One Time Transfer</Text>
                <MaterialIcons name="arrow-back" size={24} color={Colors.blackColor}
                    style={{
                        position: 'absolute',
                        left: 20.0,
                    }}
                    onPress={() => this.props.navigation.goBack()}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    headerContentStyle: {
        height: 56.0,
        backgroundColor: Colors.whiteColor,
        elevation: 2.0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    accountInfoContentStyle: {
        backgroundColor: Colors.whiteColor,
        elevation: 4.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginVertical: Sizes.fixPadding * 2.0,
        borderRadius: Sizes.fixPadding,
        padding: Sizes.fixPadding
    },
    bankDetailContentStyle: {
        backgroundColor: Colors.whiteColor,
        elevation: 4.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginBottom: Sizes.fixPadding * 2.0,
        borderRadius: Sizes.fixPadding,
        padding: Sizes.fixPadding
    },
    accountDetailContentStyle: {
        backgroundColor: Colors.whiteColor,
        elevation: 4.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginBottom: Sizes.fixPadding * 2.0,
        borderRadius: Sizes.fixPadding,
        padding: Sizes.fixPadding
    },
    transferDetailContentStyle: {
        backgroundColor: Colors.whiteColor,
        elevation: 4.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
        //marginVertical: Sizes.fixPadding * 2.0,
        borderRadius: Sizes.fixPadding,
        padding: Sizes.fixPadding
    },
    accountHolderContentStyle: {
        width: 50.0,
        height: 50.0,
        borderRadius: 25.0,
        backgroundColor: Colors.primaryColor,
        alignItems: 'center',
        justifyContent: 'center'
    },
    changeAccountInfoContentStyle: {
        flexDirection: 'row',
        position: 'absolute',
        alignItems: 'center',
        right: 10.0,
        top: 10.0,
        justifyContent: 'center',
    },
    changeAccountInfoIconStyle: {
        width: 16.0, height: 16.0,
        borderRadius: 8.0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.whiteColor,
        borderWidth: 1.0,
        borderColor: Colors.primaryColor
    },
    textFieldStyle: {
        ...Fonts.blackColor14Medium,
        borderBottomColor: Colors.grayColor,
        borderBottomWidth: 1.0,
        height: 28.0,
    },
    accountTypeDropDownFieldStyle: {
        backgroundColor: 'white',
        width: width - 51,
        paddingHorizontal: -20,
        left: -8.0,
        top: Sizes.fixPadding - 20.0,
    },
    accountTypeDropDownBottomBorderStyle: {
        position: 'absolute',
        bottom: 20.0,
        left: 0.0,
        right: 0.0,
        backgroundColor: 'black',
        height: 0.70,
    },
    selectBankDropDownFieldStyle: {
        backgroundColor: 'white',
        width: width - 51,
        paddingHorizontal: -20,
        left: -8.0,
    },
    selectBankDropdownBottomBorderStyle: {
        position: 'absolute',
        bottom: 10.0,
        left: 0.0,
        right: 0.0,
        backgroundColor: 'black',
        height: 1.0,
    },
    ifscCodeTextFieldStyle: {
        ...Fonts.blackColor14Medium,
        borderBottomColor: Colors.grayColor,
        borderBottomWidth: 1.0,
        marginBottom: Sizes.fixPadding,
    },
    continueButtonStyle: {
        backgroundColor: Colors.primaryColor,
        borderRadius: Sizes.fixPadding,
        paddingVertical: Sizes.fixPadding,
        alignItems: 'center',
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginVertical: Sizes.fixPadding * 2.0
    },
    dialogContainerStyle: {
        borderRadius: Sizes.fixPadding,
        width: width - 40,
        paddingTop: -Sizes.fixPadding,
        paddingBottom: Sizes.fixPadding
    },
    selectAccountProfileIconStyle: {
        width: 40.0,
        height: 40.0,
        borderRadius: 20.0,
        backgroundColor: Colors.primaryColor,
        alignItems: 'center',
        justifyContent: 'center',
    },
    dialogCloseButtonStyle: {
        backgroundColor: '#FF0000',
        width: 22.0, height: 22.0,
        borderRadius: 11.0,
        alignItems: 'center',
        justifyContent: 'center',
    }
})

OneTimeTransferWithAccountScreen.navigationOptions = () => {
    return {
        header: () => null,
    }
}

export default withNavigation(OneTimeTransferWithAccountScreen);