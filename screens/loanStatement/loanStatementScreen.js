import React, { Component } from "react";
import {
    Text,
    View,
    StyleSheet,
    SafeAreaView,
    StatusBar,
    FlatList,
    BackHandler,
    Dimensions,
    ImageBackground,
    TouchableOpacity
} from "react-native";
import { withNavigation } from "react-navigation";
import { Colors, Fonts, Sizes } from "../../constant/styles";
import { MaterialIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('screen');

const recentTransactionsList = [
    {
        id: '1',
        iscredit: false,
        type: 'Auto debited EMI',
        date: '2 April 2021',
        amount: '912.00',
    },
    {
        id: '2',
        iscredit: false,
        type: 'Auto debited EMI',
        date: '2 March 2021',
        amount: '912.00',
    },
    {
        id: '3',
        iscredit: false,
        type: 'Auto debited EMI',
        date: '2 Feb 2021',
        amount: '912.00',
    },
    {
        id: '4',
        iscredit: false,
        type: 'Auto debited EMI',
        date: '2 Jan 2021',
        amount: '912.00',
    },
    {
        id: '5',
        iscredit: false,
        type: 'Auto debited EMI',
        date: '2 Dec 2020',
        amount: '912.00',
    },
    {
        id: '6',
        iscredit: false,
        type: 'Auto debited EMI',
        date: '2 Nov 2020',
        amount: '912.00',
    },
    {
        id: '7',
        iscredit: false,
        type: 'Auto debited EMI',
        date: '2 Oct 2020',
        amount: '912.00',
    },
    {
        id: '8',
        iscredit: true,
        type: 'Disbursed amout credited',
        date: '14 Sept 2020',
        amount: '85,000.00',
    },
];

class LoanStatementScreen extends Component {

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

    loanType = this.props.navigation.getParam('loanType');
    accountNumber = this.props.navigation.getParam('accountNumber');
    dueAmount = this.props.navigation.getParam('dueAmount');
    emiAmount = this.props.navigation.getParam('emiAmount');

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#F2F4F6' }}>
                <StatusBar backgroundColor={Colors.primaryColor} />
                <View style={{ flex: 1 }}>
                    {this.header()}
                    {this.card()}
                    {this.recentTransactionsTitle()}
                    {this.recentTransactions()}
                </View>
            </SafeAreaView>
        )
    }

    recentTransactionsTitle() {
        return (
            <Text style={{
                ...Fonts.blackColor16Bold,
                marginHorizontal: Sizes.fixPadding * 2.0,
                marginTop: Sizes.fixPadding + 5.0,
                marginBottom: Sizes.fixPadding,
            }}>
                Recent transactions
            </Text>
        )
    }

    recentTransactions() {
        const renderItem = ({ item }) => (
            <View style={styles.transactionContentStyle}>
                <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                    <View style={styles.transactionIconContentStyle}>
                        <MaterialIcons
                            name={item.iscredit ? "arrow-downward" : "arrow-upward"}
                            size={24}
                            color={Colors.primaryColor}
                        />
                    </View>
                    <View style={{ width: width / 1.7, marginLeft: Sizes.fixPadding }}>
                        <Text numberOfLines={1} style={{ ...Fonts.blackColor16Medium }}>
                            {item.type}
                        </Text>
                        <Text numberOfLines={1} style={{ ...Fonts.grayColor14Medium, marginTop: 2.0 }}>
                            {item.date}
                        </Text>
                    </View>
                </View>
                <View style={{ alignItems: 'flex-end' }}>
                    <Text style={{ ...Fonts.blackColor14Medium }}>USD</Text>
                    <Text style={{ ...Fonts.blackColor16Bold }}>
                        {item.iscredit ? '+' : '-'}{item.amount}
                    </Text>
                </View>
            </View>
        )
        return (
            <FlatList
                data={recentTransactionsList}
                keyExtractor={(item) => `${item.id}`}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingBottom: Sizes.fixPadding,
                }}
                scrollEnabled={true}
            />
        )
    }

    card() {
        return (
            <ImageBackground
                source={require('../../assets/images/card/bg1.png')}
                style={styles.cardImageBackgroundStyle}
                resizeMode="cover"
                borderRadius={Sizes.fixPadding}
            >
                <View style={styles.cardImageBackgroundShadowStyle}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View>
                            <Text style={{ ...Fonts.whiteColor14Bold }}>
                                {this.loanType}
                            </Text>
                            <Text style={{ ...Fonts.whiteColor14Medium }}>
                                {this.accountNumber}
                            </Text>
                        </View>
                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() => this.props.navigation.navigate('LoanStatement')}
                        >
                            <Text style={{ ...Fonts.whiteColor12Regular }}>
                                View statement
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View>
                            <Text style={{ ...Fonts.whiteColor12Regular }}>
                                Due Amount
                            </Text>
                            <Text style={{ ...Fonts.whiteColor16Medium }}>
                                ${this.dueAmount}
                            </Text>
                        </View>
                        <View>
                            <Text style={{ ...Fonts.whiteColor12Regular }}>
                                EMI
                            </Text>
                            <Text style={{ ...Fonts.whiteColor16Medium }}>
                                ${this.emiAmount}
                            </Text>
                        </View>
                    </View>
                </View>
            </ImageBackground>
        )
    }

    header() {
        return (
            <View style={styles.headerContentStyle}>
                <Text style={{ ...Fonts.blackColor18Bold }}>Loan Statement</Text>
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
    cardImageBackgroundStyle: {
        height: 150.0,
        width: width - 40.0,
        alignSelf: 'center',
        marginTop: Sizes.fixPadding * 2.0,
    },
    cardImageBackgroundShadowStyle: {
        width: width - 40.0,
        alignSelf: 'center',
        height: 150.0,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        borderRadius: Sizes.fixPadding,
        paddingVertical: Sizes.fixPadding,
        paddingHorizontal: Sizes.fixPadding,
        justifyContent: 'space-between'
    },
    transactionContentStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: Sizes.fixPadding * 2.0,
        alignItems: 'center',
        marginBottom: Sizes.fixPadding + 5.0
    },
    transactionIconContentStyle: {
        width: 40.0,
        height: 40.0,
        borderRadius: 20.0,
        borderColor: Colors.primaryColor,
        borderWidth: 1.0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(96, 163, 42, 0.2)'
    },
})

LoanStatementScreen.navigationOptions = () => {
    return {
        header: () => null
    }
}

export default withNavigation(LoanStatementScreen);