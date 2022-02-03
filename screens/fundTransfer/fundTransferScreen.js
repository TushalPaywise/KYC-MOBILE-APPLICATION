import React, { Component } from "react";
import { Text, View, StyleSheet, SafeAreaView, StatusBar, BackHandler, TouchableOpacity } from "react-native";
import { withNavigation } from "react-navigation";
import { Colors, Fonts, Sizes } from "../../constant/styles";
import { MaterialIcons } from '@expo/vector-icons';

class FundTransferScreen extends Component {

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
                        onPress={() => this.props.navigation.navigate('OneTimeTrasfer')}
                    >
                        {this.transferTypesInfo({ type: 'One Time Transfer' })}
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => this.props.navigation.navigate('Benificiaries')}
                    >
                        {this.transferTypesInfo({ type: 'Beneficiaries' })}
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        )
    }

    transferTypesInfo({ type }) {
        return (
            <View style={styles.trasferTypesInfoContentStyle}>
                <View style={styles.fundTransferIconContentStyle}>
                    <MaterialIcons name="compare-arrows" size={24} color={Colors.primaryColor} />
                </View>
                <Text style={{ ...Fonts.blackColor14Bold, marginLeft: Sizes.fixPadding }}>
                    {type}
                </Text>
            </View>
        )
    }

    header() {
        return (
            <View style={styles.headerContentStyle}>
                <Text style={{ ...Fonts.blackColor18Bold }}>Fund Transfer</Text>
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
    fundTransferIconContentStyle: {
        width: 40.0,
        height: 40.0,
        borderRadius: 20.0,
        borderColor: Colors.primaryColor,
        borderWidth: 1.0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(96, 163, 42, 0.2)'
    },
    trasferTypesInfoContentStyle: {
        backgroundColor: Colors.whiteColor,
        elevation: 3.0,
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginTop: Sizes.fixPadding * 2.0,
        padding: Sizes.fixPadding,
        borderRadius: Sizes.fixPadding,
    }
})

FundTransferScreen.navigationOptions = () => {
    return {
        header: () => null
    }
}

export default withNavigation(FundTransferScreen);