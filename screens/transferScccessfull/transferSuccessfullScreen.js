import React, { Component } from "react";
import { Text, View, StyleSheet, SafeAreaView, StatusBar, ScrollView, BackHandler, TouchableOpacity } from "react-native";
import { withNavigation } from "react-navigation";
import { Colors, Fonts, Sizes } from "../../constant/styles";
import { MaterialIcons } from '@expo/vector-icons';
import { TransitionPresets } from 'react-navigation-stack';

class TransferSuccessfullScreen extends Component {

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

    transferType = this.props.navigation.getParam('transferType');
    transferTo = this.props.navigation.getParam('transferTo');

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#F2F4F6' }}>
                <StatusBar backgroundColor={Colors.primaryColor} />
                <View style={{ flex: 1 }}>
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                    >
                        {this.doneIconWithSuccessText()}
                        {this.transferInfo({ title: 'Transfer to', description: this.transferTo })}
                        {this.transferInfo({ title: 'From', description: 'Saving | 0325 2365 1475' })}
                        {this.transferInfo({ title: 'Date & Time', description: '18 April, 2021 | 11:45 AM' })}
                        {this.transferInfo({ title: 'Amount', description: '$1045.00 USD' })}
                        {this.transferInfo({ title: 'Payment mode', description: this.transferType })}
                        {this.transferInfo({ title: 'Remark', description: 'Hospital Bill.' })}
                    </ScrollView>
                    {this.backtoHomeButton()}
                </View>
            </SafeAreaView>
        )
    }

    backtoHomeButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => this.props.navigation.navigate('BottomTabBar')}
                style={styles.backToHomeButtonStyle}>
                <Text style={{ ...Fonts.whiteColor16Bold }}>
                    Back to Home
                </Text>
            </TouchableOpacity>
        )
    }

    transferInfo({ title, description }) {
        return (
            <View style={{
                marginHorizontal: Sizes.fixPadding * 2.0,
                marginBottom: Sizes.fixPadding + 5.0
            }}>
                <Text style={{ ...Fonts.grayColor14Regular }}>
                    {title}
                </Text>
                <Text style={{ ...Fonts.blackColor16Medium }}>
                    {description}
                </Text>
            </View>
        )
    }

    doneIconWithSuccessText() {
        return (
            <View style={{
                alignItems: 'center',
                marginTop: Sizes.fixPadding * 7.0,
                marginBottom: Sizes.fixPadding * 2.0,
            }}>
                <View style={styles.doneIconStyle}>
                    <MaterialIcons name="done" size={40} color={Colors.whiteColor} />
                </View>
                <Text style={{ ...Fonts.blackColor16Medium }}>
                    Transfer successfully..!
                </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    backToHomeButtonStyle: {
        backgroundColor: Colors.primaryColor,
        borderRadius: Sizes.fixPadding,
        paddingVertical: Sizes.fixPadding,
        alignItems: 'center',
        position: 'absolute',
        bottom: 20.0,
        left: 20.0,
        right: 20.0,
    },
    doneIconStyle: {
        width: 80.0,
        height: 80.0,
        borderRadius: 40.0,
        backgroundColor: Colors.primaryColor,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: Sizes.fixPadding
    }
})

const config = {
    animation: 'spring',
    config: {
        stiffness: 1000,
        damping: 500,
        mass: 3,
        overshootClamping: true,
        restDisplacementThreshold: 0.01,
        restSpeedThreshold: 0.01,
    },
};

TransferSuccessfullScreen.navigationOptions = () => {
    return {
        header: () => null,
        ...TransitionPresets.ModalSlideFromBottomIOS,
        transitionSpec: {
            open: config,
            close: config,
        },
    }
}

export default withNavigation(TransferSuccessfullScreen);