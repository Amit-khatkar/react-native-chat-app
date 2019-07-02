import React, { useEffect, useState } from 'react';
import {StatusBar, StyleSheet, Text, View, TouchableOpacity, ActivityIndicator} from 'react-native';
import { Icon } from 'react-native-elements';
import { GoogleSignin } from 'react-native-google-signin';
import firebase from 'react-native-firebase'

const db = firebase.firestore();


const login = props => {
  const [loading, setLoading] = useState(false)

  useEffect(() => {
      if(firebase.auth().currentUser){
        props.navigation.navigate('inbox')
      }
  }, [])

const doGoogleLogin = async() => {
  // firebase.auth().signOut();
  try {
    setLoading(true)
    // add any configuration settings here:
    await GoogleSignin.configure();

    const data = await GoogleSignin.signIn();

    // create a new firebase credential with the token
    const credential = firebase.auth.GoogleAuthProvider.credential(data.idToken, data.accessToken)
    // login with credential
    const firebaseUserCredential = await firebase.auth().signInWithCredential(credential);
    const uid = firebaseUserCredential.user.uid

    db.collection('users').doc(uid).set({
      uid
    }).then(() => {
      setLoading(false)
      props.navigation.navigate('inbox')
    })
  } catch (e) {
    setLoading(false)
    console.error(e);
  }
}

  return(
    <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <TouchableOpacity onPress={doGoogleLogin} style={styles.loginButton}> 
          <Icon name="google" color="#EF5350" type="font-awesome"/>
        {loading ? <ActivityIndicator  color="#EF5350" /> : <Text style={styles.loginText}>Login with Google</Text> }
        </TouchableOpacity>
      </View>
);
  }

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#EF5350',
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
     color: '#EF5350',
     fontWeight: '500',
     fontSize: 20,
     marginHorizontal: 16,
   }
  });

export default login;
