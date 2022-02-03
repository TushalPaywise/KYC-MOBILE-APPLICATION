import React, { Component } from "react";
import {
    Text,
    View,
    StyleSheet,
    SafeAreaView,
    StatusBar,
    BackHandler,
    Image,
    Dimensions,
    ScrollView,
    TextInput,
    TouchableOpacity
} from "react-native";
import { withNavigation } from "react-navigation";
import { Colors, Fonts, Sizes } from "../../constant/styles";
import { MaterialIcons } from '@expo/vector-icons';
import Dialog from "react-native-dialog";

const { width } = Dimensions.get('screen');

class BenificiaryMoneyTransferScreen extends Component {

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

    holderImage = this.props.navigation.getParam('holderImage');
    holderName = this.props.navigation.getParam('holderName');

    state = {
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
                    <ScrollView>
                        {this.userInfo()}
                        {this.accountInfo()}
                        {this.transferDetail()}
                        {this.continueButton()}
                    </ScrollView>
                </View>
                {this.changeAccountDialogInfo()}
            </SafeAreaView>
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
                onPress={() => this.props.navigation.navigate('TransferSuccessfull',
                    {
                        transferType: 'Beneficiary money transfer',
                        transferTo: this.holderName,
                    }
                )}
                style={styles.continueButtonStyle}>
                <Text style={{ ...Fonts.whiteColor16Bold }}>Continue</Text>
            </TouchableOpacity>
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

    userInfo() {
        return (
            <View style={{ alignItems: 'center', marginVertical: Sizes.fixPadding * 2.0 }}>
                <Image
                    source={this.holderImage}
                    style={{ width: 80.0, height: 80.0, borderRadius: 40.0 }}
                    resizeMode="cover"
                />
                <Text style={{ ...Fonts.blackColor16Medium, marginTop: Sizes.fixPadding }}>
                    {this.holderName}
                </Text>
            </View>

        )
    }

    header() {
        return (
            <View style={styles.headerContentStyle}>
                <Text style={{ ...Fonts.blackColor18Bold }}>Beneficiary Money Transfer</Text>
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
    },
    transferDetailContentStyle: {
        backgroundColor: Colors.whiteColor,
        elevation: 4.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
        borderRadius: Sizes.fixPadding,
        padding: Sizes.fixPadding
    },
    textFieldStyle: {
        ...Fonts.blackColor14Medium,
        borderBottomColor: Colors.grayColor,
        borderBottomWidth: 1.0,
        height: 28.0,
    },
})

BenificiaryMoneyTransferScreen.navigationOptions = () => {
    return {
        header: () => null
    }
}

export default withNavigation(BenificiaryMoneyTransferScreen);