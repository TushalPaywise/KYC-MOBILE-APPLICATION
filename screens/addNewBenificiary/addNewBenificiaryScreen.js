import React, { Component } from "react";
import {
    Text,
    View,
    StyleSheet,
    SafeAreaView,
    StatusBar,
    BackHandler,
    ScrollView,
    TextInput,
    Dimensions,
    TouchableOpacity
} from "react-native";
import { withNavigation } from "react-navigation";
import { Colors, Fonts, Sizes } from "../../constant/styles";
import { MaterialIcons } from '@expo/vector-icons';
import SelectDropdown from 'react-native-select-dropdown'
import { BottomSheet } from 'react-native-elements';

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

class AddNewBenificiaryScreen extends Component {

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
        showBottomSheet: false,
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#F2F4F6' }}>
                <StatusBar backgroundColor={Colors.primaryColor} />
                <View style={{ flex: 1 }}>
                    {this.header()}
                    <ScrollView>
                        {this.changePhoto()}
                        {this.bankDetail()}
                        {this.accountDetail()}
                        {this.addBenificiaryButton()}
                    </ScrollView>
                </View>
                {this.chooseOptionBottomSheet()}
            </SafeAreaView>
        )
    }

    chooseOptionBottomSheet() {
        return (
            <BottomSheet
                isVisible={this.state.showBottomSheet}
                containerStyle={{ backgroundColor: 'rgba(0.5, 0.50, 0, 0.50)' }}
            >
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => this.setState({ showBottomSheet: false })}
                    style={styles.bottomSheetContentStyle}
                >
                    <Text style={{
                        ...Fonts.blackColor16Bold, textAlign: 'center',
                        marginVertical: Sizes.fixPadding
                    }}>
                        Choose Option
                    </Text>
                    <View style={styles.bottomSheetDividerStyle}>

                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: Sizes.fixPadding * 2.0 }}>
                        <MaterialIcons name="photo-camera" size={20} color={Colors.blackColor} />
                        <Text style={{ ...Fonts.blackColor14Medium, marginLeft: Sizes.fixPadding }}>
                            Camera
                        </Text>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginTop: Sizes.fixPadding,
                        marginHorizontal: Sizes.fixPadding * 2.0
                    }}>
                        <MaterialIcons name="photo-album" size={18} color={Colors.blackColor} />
                        <Text style={{ ...Fonts.blackColor14Medium, marginLeft: Sizes.fixPadding }}>
                            Upload from gallery
                        </Text>
                    </View>
                </TouchableOpacity>
            </BottomSheet>
        )
    }

    addBenificiaryButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => this.props.navigation.goBack()}
                style={styles.addBenificiaryButtonStyle}>
                <Text style={{ ...Fonts.whiteColor16Bold }}>
                    Add beneficiary
                </Text>
            </TouchableOpacity>
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
                    onSelect={(selectedItem, index) => {
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
                    onSelect={() => {
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

    changePhoto() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => this.setState({ showBottomSheet: true })}
                style={{
                    width: 80.0, height: 80.0, borderRadius: 40.0,
                    backgroundColor: Colors.whiteColor,
                    elevation: 4.0,
                    alignItems: 'center',
                    justifyContent: 'center',
                    alignSelf: 'center',
                    marginVertical: Sizes.fixPadding * 2.0
                }}>
                <MaterialIcons name="add-a-photo" size={24} color={Colors.blackColor} />
            </TouchableOpacity>
        )
    }

    header() {
        return (
            <View style={styles.headerContentStyle}>
                <Text style={{ ...Fonts.blackColor18Bold }}>
                    Add new beneficiary
                </Text>
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
    bankDetailContentStyle: {
        backgroundColor: Colors.whiteColor,
        elevation: 4.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginBottom: Sizes.fixPadding * 2.0,
        borderRadius: Sizes.fixPadding,
        padding: Sizes.fixPadding
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
    accountDetailContentStyle: {
        backgroundColor: Colors.whiteColor,
        elevation: 4.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginBottom: Sizes.fixPadding * 2.0,
        borderRadius: Sizes.fixPadding,
        padding: Sizes.fixPadding
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
    addBenificiaryButtonStyle: {
        backgroundColor: Colors.primaryColor,
        borderRadius: Sizes.fixPadding,
        paddingVertical: Sizes.fixPadding,
        alignItems: 'center',
        marginHorizontal: Sizes.fixPadding * 2.0,
    },
    bottomSheetContentStyle: {
        backgroundColor: Colors.whiteColor,
        paddingBottom: Sizes.fixPadding,
    },
    bottomSheetDividerStyle: {
        backgroundColor: Colors.grayColor,
        height: 1.0,
        marginBottom: Sizes.fixPadding + 2.0,
        marginHorizontal: Sizes.fixPadding * 2.0
    }
})

AddNewBenificiaryScreen.navigationOptions = () => {
    return {
        header: () => null
    }
}

export default withNavigation(AddNewBenificiaryScreen);