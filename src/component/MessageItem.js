import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';

const sampl2 = 'https://scontent-lga3-1.cdninstagram.com/vp/f5c019d6206c45d0f5219880fef40869/5D8E5CC9/t51.2885-15/e35/64435334_416303942556652_1810486530042320405_n.jpg?_nc_ht=scontent-lga3-1.cdninstagram.com'

const MessageItem = props => (
    <View style={[styles.container, {
        marginRight: props.isMe ? 0 : '20%', marginLeft: props.isMe ? '20%' : 0,
        alignItems: props.isMe ? 'flex-end' : 'flex-start',
        flexDirection: 'column'
        }]}>
        <View style={styles.container}>
        {!props.isMe && <Image
            source={{uri: props.profile}}
            style={styles.dp}
        />
        }
        <View style={[styles.messageWrapper,
             {borderBottomLeftRadius: props.isMe ? 12 : 0,
              borderBottomRightRadius: props.isMe ? 0 : 12,
              backgroundColor: props.isMe ? '#EF5350' : 'whitesmoke',
              }]}>
       <Text allowFontScaling={false} style={[styles.message, {
           color: props.isMe ? 'white' : '#080808'
       }]}>{props.message}</Text>
       </View>
       </View>
       {props.isMe && <Text style={[styles.time, {color: props.isRead ? '#4CAF50' : 'gray'}]}>{`${props.time || ''} ${props.status || ''}`}</Text>}
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 2,
        padding: 6,
        flexDirection: 'row',
        alignItems: 'flex-end',
        // justifyContent: 'flex-start',
        // backgroundColor:'blue'
    },
    messageWrapper: {
        // flex: 1,
        // marginLeft: '20%',
        margin: 4,
        padding: 8,
        borderRadius: 12,
        backgroundColor: 'whitesmoke',
    },
    dp: {
        width: 30,
        height: 30,
        borderRadius: 15,
    },
    message: {
        fontSize: 12,
        fontWeight: '400',
        lineHeight: 15
    },
    time: {
        fontSize: 11,
        fontWeight: '500',
        color: 'gray',
        marginRight: 16,
    }
})

export default MessageItem;
