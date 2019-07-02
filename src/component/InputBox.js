import React from 'react';
import {StatusBar, StyleSheet, Text, View, FlatList, TouchableOpacity, TextInput} from 'react-native';
import { Icon, Header } from 'react-native-elements';

const InputBox = props => (
    <View style={styles.inputWrapper}>
            <View style={styles.inputBox}>
                <TextInput 
                    multiline
                    placeholder="Type Something"
                    onChangeText={props.onChangeText}
                    value={props.value}
                    style={styles.messageInput}
                />
                <Icon
                    name="emoji-happy"
                    color="gray"
                    size={20}
                    type="entypo"
                    style={styles.inputIcon}
                />
                <Icon
                    name="camera"
                    color="gray"
                    size={20}
                    type="entypo"
                    containerStyle={styles.inputIcon}
                />
            </View>
            <TouchableOpacity onPress={props.send} style={styles.sendIcon}>
            <Icon
                name="send"
                color="white"
                size={20}
                type="font-awesome"
            />
            </TouchableOpacity>
        </View>
);

const styles = StyleSheet.create({
    inputWrapper: {
        backgroundColor: 'white',
        minHeight: 60,
        width: '100%',
        padding: 8,
        flexDirection: 'row',
        alignItems: 'center',
    },
    inputBox: {
     flex: 1,
     minHeight: 45,
     borderRadius: 25,
     backgroundColor: 'whitesmoke',
     paddingHorizontal: 8,
     flexDirection: 'row',
     alignItems: 'center',
    },
    inputIcon: {
        marginLeft: 8,
        marginRight: 8,
    },
    messageInput: {
        flex: 1,
    },
    sendIcon: {
        backgroundColor: '#F44336',
        width: 36,
        height: 36,
        borderRadius: 18,
        justifyContent: 'center',
        marginHorizontal: 8,
        alignItems: 'center',
    }
})

export default InputBox;
