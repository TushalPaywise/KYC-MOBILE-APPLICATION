import React, { Component } from "react";
import { Text, View, StyleSheet, SafeAreaView, StatusBar, BackHandler, TouchableOpacity, Image, Dimensions, FlatList } from "react-native";
import { withNavigation } from "react-navigation";
import { Colors, Fonts, Sizes } from "../../constant/styles";
import { MaterialIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('screen');

const beneficiariesList = [
    {
        id: '1',
        name: 'John',
        image: require('../../assets/images/user/user_1.jpg'),
    },
    {
        id: '2',
        name: 'Amara',
        image: require('../../assets/images/user/user_4.jpg'),
    },
    {
        id: '3',
        name: 'Steve',
        image: require('../../assets/images/user/user_8.jpg'),
    },
    {
        id: '4',
        name: 'Mike',
        image: require('../../assets/images/user/user_2.jpg'),
    },
    {
        id: '5',
        name: 'Linnea',
        image: require('../../assets/images/user/user_3.jpg'),
    },
    {
        id: '6',
        name: 'Beatriz',
        image: require('../../assets/images/user/user_11.jpg'),
    },
];

const historyBeneficiariesList = [
    {
        id: '1',
        name: 'Beatriz',
        image: require('../../assets/images/user/user_11.jpg'),
    },
    {
        id: '2',
        name: 'Shira',
        image: require('../../assets/images/user/user_12.jpg'),
    },
    {
        id: '3',
        name: 'Steve',
        image: require('../../assets/images/user/user_8.jpg'),
    },
    {
        id: '4',
        name: 'Mike',
        image: require('../../assets/images/user/user_2.jpg'),
    },
    {
        id: '5',
        name: 'Linnea',
        image: require('../../assets/images/user/user_3.jpg'),
    },
    {
        id: '6',
        name: 'John',
        image: require('../../assets/images/user/user_1.jpg'),
    },
];

class BeneficiariesScreen extends Component {

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
                <View style={{ flex: 1 }}>
                    {this.header()}
                    {this.addNewBenificiaryButton()}
                    {this.benificiaryTitle()}
                    <View>
                        {this.benificiaries()}
                    </View>
                    {this.historyTitle()}
                    {this.history()}
                </View>
            </SafeAreaView>
        )
    }

    history() {
        const renderItem = ({ item, index }) => (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => this.props.navigation.navigate('BeneficiaryMoneyTransfer', {
                    holderImage: item.image,
                    holderName: item.name,
                })}
                style={{
                    alignItems: 'center',
                    flex: 1,
                    marginBottom: historyBeneficiariesList.length - 1 == index ||
                        historyBeneficiariesList.length - 2 == index ||
                        historyBeneficiariesList.length - 3 == index
                        ? 0.0 : 20.0,
                }}>
                <Text style={{
                    ...Fonts.blackColor14Medium,
                    marginBottom: Sizes.fixPadding
                }}>
                    {item.name}
                </Text>
                <Image
                    source={item.image}
                    style={{ height: 70.0, width: 70.0, borderRadius: 35.0 }}
                    resizeMode="cover"
                />
            </TouchableOpacity>
        )

        return (
            <View style={{
                width: width,
                alignSelf: 'center',
                height: 300.0,
            }}>
                <FlatList
                    data={historyBeneficiariesList}
                    keyExtractor={(item) => `${item.id}`}
                    renderItem={renderItem}
                    numColumns={3}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        paddingBottom: Sizes.fixPadding * 2.0,
                    }}
                />
            </View>
        )
    }

    historyTitle() {
        return (
            <View style={{
                flexDirection: 'row', alignItems: 'center',
                marginHorizontal: Sizes.fixPadding * 2.0,
                marginTop: Sizes.fixPadding * 2.0,
                marginBottom: Sizes.fixPadding
            }}>
                <MaterialIcons name="history" size={20} color="black" />
                <Text style={{ ...Fonts.blackColor16Bold, marginLeft: Sizes.fixPadding }}>
                    History
                </Text>
            </View>
        )
    }

    benificiaries() {
        const renderItem = ({ item, index }) => (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => this.props.navigation.navigate('BeneficiaryMoneyTransfer', {
                    holderImage: item.image,
                    holderName: item.name,
                })}
                style={{
                    alignItems: 'center',
                    flex: 1,
                    marginBottom: beneficiariesList.length - 1 == index ||
                        beneficiariesList.length - 2 == index ||
                        beneficiariesList.length - 3 == index
                        ? 0.0 : 20.0,
                }}>
                <Text style={{
                    ...Fonts.blackColor14Medium,
                    marginBottom: Sizes.fixPadding
                }}>
                    {item.name}
                </Text>
                <Image
                    source={item.image}
                    style={{ height: 70.0, width: 70.0, borderRadius: 35.0 }}
                    resizeMode="cover"
                />
            </TouchableOpacity>
        )

        return (
            <View style={{
                width: width,
                alignSelf: 'center',
                height: 220.0,
            }}>
                <FlatList
                    data={beneficiariesList}
                    keyExtractor={(item) => `${item.id}`}
                    renderItem={renderItem}
                    numColumns={3}
                    showsVerticalScrollIndicator={false}
                />
            </View>

        )
    }

    benificiaryTitle() {
        return (
            <Text style={{
                ...Fonts.blackColor16Bold,
                marginHorizontal: Sizes.fixPadding * 2.0,
                marginBottom: Sizes.fixPadding
            }}>
                Your beneficiaries
            </Text>
        )
    }

    addNewBenificiaryButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => this.props.navigation.navigate('AddNewBenificiary')}
                style={styles.addNewBenificiaryButtonStyle}>
                <Text style={{ ...Fonts.whiteColor16Bold }}>
                    Add new beneficiary
                </Text>
            </TouchableOpacity>
        )
    }

    header() {
        return (
            <View style={styles.headerContentStyle}>
                <Text style={{ ...Fonts.blackColor18Bold }}>
                    Beneficiaries
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
    addNewBenificiaryButtonStyle: {
        backgroundColor: Colors.primaryColor,
        borderRadius: Sizes.fixPadding,
        paddingVertical: Sizes.fixPadding,
        alignItems: 'center',
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginVertical: Sizes.fixPadding * 2.0
    }
})

BeneficiariesScreen.navigationOptions = () => {
    return {
        header: () => null
    }
}

export default withNavigation(BeneficiariesScreen);