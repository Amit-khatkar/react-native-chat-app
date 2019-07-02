import React, { useEffect, useState } from 'react';
import {StatusBar, StyleSheet, Text, View, FlatList} from 'react-native';
import { Icon, Header } from 'react-native-elements';
import InboxItem from '../component/inboxItem';
import firebase from 'react-native-firebase';

let db = firebase.firestore();
let user = firebase.auth().currentUser;

const inbox = props => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    db.collection('users').onSnapshot(querySnapshot => {
      let tempUser = [];
      querySnapshot.forEach(user => {
        tempUser.push(user.data());
      })

      setUsers(tempUser);
      console.log(tempUser)
    })
  }, []);

  return(
    <View style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <Header
        backgroundColor="white"
        leftComponent={<Icon name="align-right" color="#080808" type="font-awesome" size={17} />}
        centerComponent={{ text: 'Messages', style: styles.title}}
        rightComponent={<Icon name="search" color="#080808" type="font-awesome" size={17} />}
        />
        <FlatList
          showsVerticalScrollIndicator={false}
          data={users}
          renderItem={({item}) => 
          <InboxItem 
            name={item.name}
            profile={item.profile}
            onPress={() => props.navigation.navigate('ChatBox', {user: item})}
           />}
        />
      </View>
);
  };

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'whitesmoke',
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
   }
  });

export default inbox;
