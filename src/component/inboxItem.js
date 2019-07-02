import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const sampleImage = 'https://scontent-lga3-1.cdninstagram.com/vp/da2f5cad192dcf4ee81aedc7a64e848e/5D8644E6/t51.2885-15/e35/56182702_406318196587042_5132355883854632159_n.jpg?_nc_ht=scontent-lga3-1.cdninstagram.com';
const sampl2 = 'https://scontent-lga3-1.cdninstagram.com/vp/f5c019d6206c45d0f5219880fef40869/5D8E5CC9/t51.2885-15/e35/64435334_416303942556652_1810486530042320405_n.jpg?_nc_ht=scontent-lga3-1.cdninstagram.com'

const InboxItem = props => (
    <TouchableOpacity onPress={props.onPress} style={styles.container}>
        <Image
            source={{uri: props.profile}}
            style={styles.dp}
        />
       <View style={styles.infoWrapper}>
           <Text allowFontScaling={false} style={styles.name}>{props.name}</Text>
            <View style={styles.messageWrapper}>
                <Text allowFontScaling={false} style={styles.message}>Hey its up</Text>
                {/* <View style={styles.indicator}>
                    <Text allowFontScaling={false} style={styles.indicatorText}>2</Text>
                </View> */}
            </View>
       </View>
       <Text allowFontScaling={false} style={styles.time}>12:36</Text>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 8,
        borderBottomWidth: 1,
        borderBottomColor: 'whitesmoke',
        flexDirection: 'row',
        alignItems: 'center',
    },
    dp: {
        width: 60,
        height: 60,
        borderRadius: 30,
    },
    infoWrapper: {
        flex: 1,
        marginHorizontal: 16,
    },
    messageWrapper: {
        flexDirection: 'row',
        marginRight: 20,
    },
    name: {
        fontSize: 16,
        fontWeight: '600',
        color: '#080808'
    },
    message: {
        fontSize: 13,
        fontWeight: '400',
        color: 'gray' 
    },
    indicator: {
        width: 20,
        height: 20,
        marginHorizontal: 20,
        borderRadius: 10,
        backgroundColor: '#4CAF50',
        justifyContent:'center',
        alignItems: 'center',
    },
    indicatorText: {
        color: 'white',
        fontSize: 11,
        fontWeight: '400',
    },
    time: {
        fontSize: 11,
        fontWeight: '500',
        color: 'gray'
    }
})

export default InboxItem;
