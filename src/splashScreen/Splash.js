import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  StatusBar,
  ActivityIndicator
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
// import { firebase } from '@react-native-firebase/auth';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import * as Animatable from 'react-native-animatable';
// import Animated, {Easing} from 'react-native-reanimated';

import ArrowIcon from 'react-native-vector-icons/MaterialIcons';

import {
  height,
  moderateScale,
  moderateScaleVertical,
  textScale,
  verticalScale,
  width,
  // Animated
} from '../styles/responsiveSize';
import { firebase } from '@react-native-firebase/database';
// import SlideScreen from './SlideScreen';

export default function Splash() {
  const [userExist, setUserExist] = useState(false);
  const nav = useNavigation();

  useEffect(() => {
    const unsubscribeAuth = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        // Check Firestore for user data
        const userRef = firestore().collection('users').doc(user.uid);
        userRef.get().then(doc => {
          if (doc.exists) {
            setUserExist(true);
          } else {
            setUserExist(false);
          }
        });
      } else {
        setUserExist(false);
      }
    });
    return () => unsubscribeAuth(); // Clean up on unmount
  }, []);

  useEffect(() => {
    if (userExist !== null) {
      if (userExist) {
        nav.navigate('MainDashboard'); // Navigate to ViewDetails
      } else {
        nav.navigate('LoginUser'); // Navigate to LoginUser
      }
    }
  }, [userExist, nav]);

  const handleLogin = () => {
    if (userExist) {
      nav.navigate('LoginUser');
    } else {
      nav.navigate('MainDashboard');
    }
  };
  return (
    <View style={[styles.mainContainer]}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <StatusBar hidden={true} />
        <View style={styles.parentContainer}>
          <Image
            source={require('../assets/splash/shapeImage.png')}
            style={styles.topImage}
          />
          <Animatable.View
            animation={'zoomIn'}
            style={styles.centerImageContainer}>
            <Image
              source={require('../assets/splash/splashMobile.png')}
              style={styles.centerImg}
            />
          </Animatable.View>
        </View>
        <Animatable.View animation={'zoomIn'} style={styles.childContainer}>
          {/* <Image
          source={require('../assets/splash/splashMobile.png')}
          style={styles.centerImg}
        /> */}
          <View style={styles.textContainer}>
            <Text style={styles.text1}>Get things done with TODO</Text>
            <Text style={styles.text2}>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book.
            </Text>
          </View>

          <Animatable.View
            animation={'slideInUp'}
            style={styles.loginButtonContainer}>
            {/* <ActivityIndicator size="large" color="#0000ff" />
            <Text>Loading...</Text> */}
            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
              <Text style={styles.loginText}>Get Started</Text>
              {/* <ArrowIcon
              style={styles.arrowIcon}
              name="arrow-forward"
              size={24}
              color="white"
            /> */}
            </TouchableOpacity>
          </Animatable.View>
        </Animatable.View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
  },
  parentContainer: {
    flex: 0.5,

    // backgroundColor: 'green',
  },
  topImage: {
    height: moderateScale(145),
    width: moderateScale(195),
  },

  centerImageContainer: {
    alignItems: 'center',
    // backgroundColor: '#ffa',

    top: moderateScaleVertical(40),
  },
  centerImg: {
    width: 202,
    height: 161.5,
    // backgroundColor: '#f43',
  },
  childContainer: {
    flex: 0.5,
    // backgroundColor: '#E5E5',
  },
  textContainer: {
    marginVertical: moderateScaleVertical(50),
    alignItems: 'center',
    // backgroundColor: '#f43',
  },
  text1: {
    // justifyContent: 'center',
    width: moderateScale(350),
    // backgroundColor:'green',
    textAlign: 'center',
    // paddingVertical: moderateScaleVertical(10),
    fontSize: textScale(25),
    fontWeight: 'bold',
    color: '#000',
  },
  text2: {
    width: moderateScale(250),
    paddingVertical: moderateScaleVertical(10),

    // backgroundColor:'red',
    textAlign: 'center',
    // marginTop: '2%',
    fontSize: textScale(18),
    color: '#000',
    fontWeight: '600',
  },
  loginButtonContainer: {
    position: 'absolute',
    bottom: moderateScaleVertical(10),
    // marginVertical:moderateScaleVertical(45),
    alignSelf: 'center',
  },
  loginButton: {
    backgroundColor: '#62D2C3',
    // flexDirection: 'row',

    justifyContent: 'center',
    // marginBottom: moderateScale(30),
    width: moderateScale(width - 50),
    padding: moderateScaleVertical(10),
    borderRadius: 10,
    alignItems: 'center',

    elevation: 3,
  },
  loginText: {
    color: '#000',

    fontSize: textScale(20),
    paddingVertical: moderateScaleVertical(10),
    fontWeight: 'bold',
  },
  // arrowIcon: {
  //   position: 'absolute',
  //   right: moderateScale(20),
  // },
  // lastImg: {
  //   position: 'absolute',
  //   bottom: 0,
  //   height: '13%',
  //   width: '13%',
  //   alignSelf: 'center',
  // },
});
