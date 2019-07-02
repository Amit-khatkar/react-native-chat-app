import React, { useState, useEffect } from 'react';
import {StatusBar, StyleSheet, Text, View, FlatList, TouchableOpacity, Image, KeyboardAvoidingView} from 'react-native';
import { Icon, Header } from 'react-native-elements';
import _ from 'lodash';
import MessageItem from '../component/MessageItem';
import InputBox from '../component/InputBox';
import messagesList from '../constants/messages';
import firebase from 'react-native-firebase';
import moment from 'moment';

let db = firebase.firestore();
let me = firebase.auth().currentUser;
let chatThread = db.collection('chats');

const sampl2 = 'https://scontent-lga3-1.cdninstagram.com/vp/f5c019d6206c45d0f5219880fef40869/5D8E5CC9/t51.2885-15/e35/64435334_416303942556652_1810486530042320405_n.jpg?_nc_ht=scontent-lga3-1.cdninstagram.com'

const ChatBox = props => {
    const [currentM, setCurrentM] = useState('');
    const { user } = props.navigation.state.params;
    const [threadId, setThreadId] = useState('')
    const [sender, setSender] = useState('');
    const [receiver, setReceiver] = useState(user.uid);
    const [messages, setMessages] = useState([]);


    const createMessage = () => {
        console.log(threadId)
        if(currentM && threadId){
        db.collection('chats').doc(threadId).collection('messages').add({
            time: moment().valueOf(),
            content: currentM,
            sender,
            receiver: user.uid,
            status: 'Delivered',
            isRead: false,
        })
        setCurrentM('');
    }
    }

    const checkThread = () => {
       if(threadId){
        fetchMessages()
       }else{
        const sender = me.uid;
        const receiver = user.uid;
        const thread1 = `${receiver}${sender}`
        const thread2 = `${sender}${receiver}`
        chatThread.doc(thread1).get().then(doc => {
            if(doc.exists){
            console.log('doc exist')
              setThreadId(thread1)
            }else{
                chatThread.doc(thread2).get().then(docs => {
                    if(docs.exists){
                        setThreadId(thread2)
                    }else{
                        createThread(thread1, sender) 
                    }
                })
            }
        }).catch(err => console.log(err))
    }
    }

    const createThread = (threadID, createBy) => {
        console.log('thread create')
        chatThread.doc(threadID).set({
            createBy,
            date: moment().valueOf()
        }).then(() => 
        setThreadId(threadID))
    }

    useEffect(() => {
        checkThread()
        const uid = me.uid;
        setSender(uid);
    }, [threadId]);

    const fetchMessages = () => {
        console.log("fetching")
        chatThread.doc(threadId).collection('messages').orderBy('time', 'DESC').onSnapshot(querySnapshot => {
            const tempMessages = [];
            console.log("fetching2")
            querySnapshot.forEach(doc => {
                const item = doc.data();
                // console.log(item.time);
                tempMessages.push({
                    sort: item.time,
                    time: moment(item.time).format('h:mm a'),
                    messages: item.content,
                    isMe: item.sender === sender,
                    status: item.status,
                    profile: user.profile,
                    isRead: item.isRead,
                })
            })
            setMessages(_.sortBy(tempMessages, '').reverse())
        })
    }


    return(
    <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <StatusBar barStyle="dark-content" />
        <Header
        backgroundColor="white"
        leftComponent={
            <TouchableOpacity onPress={() => props.navigation.goBack()} style={styles.leftNavigation}>
                <Icon name="chevron-left" color="#080808" type="ant-design" size={21} />
                <Text style={styles.navigationText}>Back</Text>
            </TouchableOpacity>
        }
        centerComponent={{ text: user.name, style: styles.title}}
        rightComponent={<Image
            source={{uri: user.profile}}
            style={styles.dp}
        />}
        />
        <View style={styles.chatWrapper}>
            <FlatList
                inverted
                showsVerticalScrollIndicator={false}
                data={messages.reverse()}
                extraData={messages}
                renderItem={({item}) =>
                 <MessageItem
                    message={item.messages}
                    profile={item.profile}
                    isRead={item.isRead}
                    status={item.status}
                    time={item.time}
                    isMe={item.isMe}
                 />}
            />
        </View>

        <InputBox
        onChangeText={setCurrentM}
        value={currentM}
        send={createMessage}
        />

      </KeyboardAvoidingView>
);
        };

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
    },
    dp: {
        width: 30,
        height: 30,
        borderRadius: 15,
    },
   loginButton: {
    width: '80%',
    height: 50,
    borderRadius: 25,
    backgroundColor: '#fff',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center'
   },
   loginText: {
     color: '#F44336',
     fontWeight: '500',
     fontSize: 20,
     marginHorizontal: 16,
   },
   title: {
    color: '#080808',
    fontWeight: '500',
    fontSize: 20,
   },
   leftNavigation: {
     flexDirection: 'row',
     alignItems: 'center',
   },
   navigationText: {
       color: 'gray',
       fontWeight: '400',
       fontSize: 14
   },
   chatWrapper: {
       flex: 1,
   },
  });

export default ChatBox;
