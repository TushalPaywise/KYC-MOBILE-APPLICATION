import React, { Component } from "react";
import { Text, View, StyleSheet, SafeAreaView, StatusBar, BackHandler, Dimensions, TouchableOpacity } from "react-native";
import { withNavigation } from "react-navigation";
import { Colors, Fonts, Sizes } from "../../constant/styles";
import { MaterialIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('screen');

class OneTimeTransferScreen extends Component {

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

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#F2F4F6' }}>
                <StatusBar backgroundColor={Colors.primaryColor} />
                <View>
                    {this.header()}
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => this.props.navigation.navigate('OneTimeTransferWithAccount')}
                    >
                        {this.oneTimeTrasferTypesInfo({
                            title: 'Account Number',
                            description: 'Transfer without adding beneficiary'
                        })}
                    </TouchableOpacity>

                    {this.oneTimeTrasferTypesInfo({
                        title: 'Unified Payments Interface (UPI)',
                        description: 'Transfer through virtual payment address'
                    })}
                    {this.oneTimeTrasferTypesInfo({
                        title: 'Repeat transactions',
                        description: 'Repeat a recent transaction'
                    })}
                </View>
            </SafeAreaView>
        )
    }

    oneTimeTrasferTypesInfo({ title, description }) {
        return (
            <View style={styles.oneTimeTrasferTypesInfoContentStyle}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={styles.oneTimeTrasferTypeIconContentStyle}>
                        <MaterialIcons name="compare-arrows" size={24} color={Colors.primaryColor} />
                    </View>
                    <View style={{ marginLeft: Sizes.fixPadding, width: width / 1.6, }}>
                        <Text numberOfLines={1} style={{ ...Fonts.blackColor14Bold }}>
                            {title}
                        </Text>
                        <Text numberOfLines={1} style={{ ...Fonts.grayColor12Regular, marginTop: 2.0 }}>
                            {description}
                        </Text>
                    </View>
                </View>
                <MaterialIcons name="arrow-forward-ios" size={15} color={Colors.blackColor} />
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
    oneTimeTrasferTypesInfoContentStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: Colors.whiteColor,
        elevation: 3.0,
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginTop: Sizes.fixPadding * 2.0,
        padding: Sizes.fixPadding,
        borderRadius: Sizes.fixPadding,
    },
    oneTimeTrasferTypeIconContentStyle: {
        width: 40.0,
        height: 40.0,
        borderRadius: 20.0,
        borderColor: Colors.primaryColor,
        borderWidth: 1.0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(96, 163, 42, 0.2)'
    }
})

OneTimeTransferScreen.navigationOptions = () => {
    return {
        header: () => null
    }
}

export default withNavigation(OneTimeTransferScreen);