import React, { Component } from "react";
import { Text, SafeAreaView, View, StatusBar, StyleSheet, Image, BackHandler, ScrollView, TouchableOpacity } from "react-native";
import { withNavigation } from "react-navigation";
import { Colors, Fonts, Sizes } from "../../constant/styles";
import { MaterialIcons } from '@expo/vector-icons';
import { TextInput } from 'react-native-paper';
import { BottomSheet } from 'react-native-elements';

class EditProfileScreen extends Component {

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
        name: 'Ellison Perry',
        email: 'ellison@test.com',
        password: '123456',
        phoneNumber: '123456789',
        showBottomSheet: false,
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#F2F4F6' }}>
                <StatusBar
                    translucent={false}
                    backgroundColor={Colors.primaryColor}
                />
                <View style={{ flex: 1 }}>
                    {this.header()}
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                    >
                        {this.changeProfilePhoto()}
                        {this.nameTextField()}
                        {this.emailTextField()}
                        {this.phoneNumberTextField()}
                        {this.passwordTextField()}
                        {this.saveButton()}
                    </ScrollView>

                </View>
                {this.changeProfileOptions()}
            </SafeAreaView>
        )
    }

    changeProfileOptions() {
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

    saveButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => this.props.navigation.goBack()}
                style={styles.saveButtonStyle}>
                <Text style={{ ...Fonts.whiteColor16Bold }}>Save</Text>
            </TouchableOpacity>
        )
    }

    phoneNumberTextField() {
        return (
            <TextInput
                label="Phone Number"
                mode="outlined"
                keyboardType="numeric"
                value={this.state.phoneNumber}
                onChangeText={text => this.setState({ phoneNumber: text })}
                style={styles.textFieldStyle}
                selectionColor={Colors.blackColor}
                theme={{ colors: { primary: 'gray', underlineColor: 'transparent', } }}
            />
        )
    }

    passwordTextField() {
        return (
            <TextInput
                label="Password"
                mode="outlined"
                secureTextEntry={true}
                value={this.state.password}
                onChangeText={text => this.setState({ password: text })}
                style={styles.textFieldStyle}
                selectionColor={Colors.blackColor}
                theme={{ colors: { primary: 'gray', underlineColor: 'transparent', } }}
            />
        )
    }

    emailTextField() {
        return (
            <TextInput
                label="Email"
                mode="outlined"
                value={this.state.email}
                onChangeText={text => this.setState({ email: text })}
                style={styles.textFieldStyle}
                selectionColor={Colors.blackColor}
                theme={{ colors: { primary: 'gray', underlineColor: 'transparent', } }}
            />
        )
    }

    nameTextField() {
        return (
            <TextInput
                label="Name"
                mode="outlined"
                value={this.state.name}
                onChangeText={text => this.setState({ name: text })}
                style={styles.textFieldStyle}
                selectionColor={Colors.blackColor}
                theme={{
                    colors: {
                        primary: 'gray',
                        underlineColor: 'transparent',
                    }
                }}
            />
        )
    }

    changeProfilePhoto() {
        return (
            <View style={{
                alignSelf: 'center',
                marginTop: Sizes.fixPadding * 3.0,
                marginBottom: Sizes.fixPadding + 5.0
            }}>
                <Image
                    source={require('../../assets/images/user/user_9.jpg')}
                    style={{ height: 110.0, width: 110.0, borderRadius: 52.5, }}
                    resizeMode="cover"
                />
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => this.setState({ showBottomSheet: true })}
                    style={styles.changeInfoContentStyle}>
                    <MaterialIcons name="photo-camera" size={17} color={Colors.whiteColor} />
                    <Text style={{ ...Fonts.whiteColor12Medium, marginLeft: Sizes.fixPadding - 5.0 }}>
                        Change
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }

    header() {
        return (
            <View style={styles.headerContentStyle}>
                <MaterialIcons name="arrow-back" size={24}
                    color="black"
                    onPress={() => this.props.navigation.goBack()}
                    style={{ position: 'absolute', left: 20.0, }}
                />
                <Text style={{
                    ...Fonts.blackColor18Bold,
                    alignSelf: 'center',
                    justifyContent: 'center'
                }}>
                    Edit Profile
                </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    headerContentStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 60.0,
        backgroundColor: Colors.whiteColor,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        elevation: 10.0,
    },
    saveButtonStyle: {
        backgroundColor: Colors.primaryColor,
        borderRadius: Sizes.fixPadding,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: Sizes.fixPadding * 2.0,
        paddingVertical: Sizes.fixPadding,
        marginVertical: Sizes.fixPadding + 5.0
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
    },
    changeInfoContentStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: -10.0,
        backgroundColor: '#FFA500',
        borderRadius: Sizes.fixPadding * 2.0,
        width: 116.0,
        alignItems: 'center',
        borderColor: Colors.whiteColor,
        borderWidth: 1.0,
        paddingVertical: Sizes.fixPadding - 5.0
    },
    textFieldStyle: {
        ...Fonts.blackColor14Medium,
        marginHorizontal: Sizes.fixPadding * 2.0,
        backgroundColor: '#F2F4F6',
        marginVertical: Sizes.fixPadding - 3.0,
        height: 40.0,
    }
})

EditProfileScreen.navigationOptions = () => {
    return {
        header: () => null
    }
}

export default withNavigation(EditProfileScreen);