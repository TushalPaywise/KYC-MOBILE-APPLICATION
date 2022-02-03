import React, { Component } from "react";
import {
    Text,
    View,
    StyleSheet,
    SafeAreaView,
    Dimensions,
    BackHandler,
    ScrollView,
    TouchableOpacity,
    StatusBar,
    TextInput
} from "react-native";
import { withNavigation } from "react-navigation";
import { Colors, Fonts, Sizes } from "../../constant/styles";
import { MaterialIcons } from '@expo/vector-icons';
import Dialog from "react-native-dialog";
import { BottomSheet } from 'react-native-elements';

const { width } = Dimensions.get('screen');

class NewDepositScreen extends Component {

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
        amount: '',
        remark: '',
        changeAccountDialog: false,
        showBottomSheet: false,
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#F2F4F6' }}>
                <StatusBar backgroundColor={Colors.primaryColor} />
                <View style={{ flex: 1 }}>
                    {this.header()}
                    <ScrollView>
                        {this.uploadChequeInfo()}
                        {this.accountInfo()}
                        {this.transferDetail()}
                        {this.depositNowButton()}
                    </ScrollView>
                </View>
                {this.changeAccountDialogInfo()}
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
                    <Text style={{ ...Fonts.primaryColor12Medium, marginRight: Sizes.fixPadding - 5.0 }}>
                        Change
                    </Text>
                    <View style={styles.changeAccountInfoIconStyle}>
                        <MaterialIcons name="arrow-forward-ios" size={10} color={Colors.primaryColor} />

                    </View>
                </TouchableOpacity>
            </View>
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

    depositNowButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => this.props.navigation.navigate('TransferSuccessfull',
                    {
                        transferType: 'One time transfer',
                        transferTo: 'Amara Smith',
                    }
                )}
                style={styles.depositNowButtonStyle}>
                <Text style={{ ...Fonts.whiteColor16Bold }}>Deposit now</Text>
            </TouchableOpacity>
        )
    }

    uploadChequeInfo() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => this.setState({ showBottomSheet: true })}
                style={{
                    marginTop: Sizes.fixPadding * 2.0,
                    marginBottom: Sizes.fixPadding,
                    marginHorizontal: Sizes.fixPadding * 2.0
                }}>
                <Text style={{ ...Fonts.blackColor14Medium }}>
                    Upload cheque images
                </Text>
                {this.uploadChequeWithChooseOptions({ side: 'Front' })}
                {this.uploadChequeWithChooseOptions({ side: 'Back' })}
            </TouchableOpacity>
        )
    }

    uploadChequeWithChooseOptions({ side }) {
        return (
            <View style={styles.uploadImageContentStyle}>
                <View style={styles.chooseOptionsContentStyle}>
                    <MaterialIcons name="add-a-photo" size={24} color={Colors.blackColor} />
                </View>
                <Text style={{ ...Fonts.whiteColor12Medium, position: 'absolute', top: 5.0, left: 10.0 }}>
                    {side} Side
                </Text>
            </View>
        )
    }

    header() {
        return (
            <View style={styles.headerContentStyle}>
                <Text style={{ ...Fonts.blackColor18Bold }}>New Deposit</Text>
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
    uploadImageContentStyle: {
        height: 100.0,
        backgroundColor: Colors.primaryColor,
        borderRadius: Sizes.fixPadding,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: Sizes.fixPadding
    },
    chooseOptionsContentStyle: {
        height: 60.0,
        width: 60.0,
        backgroundColor: Colors.whiteColor,
        borderRadius: 30.0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    accountInfoContentStyle: {
        backgroundColor: Colors.whiteColor,
        elevation: 4.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginBottom: Sizes.fixPadding * 2.0,
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
    depositNowButtonStyle: {
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

NewDepositScreen.navigationOptions = () => {
    return {
        header: () => null
    }
}

export default withNavigation(NewDepositScreen);