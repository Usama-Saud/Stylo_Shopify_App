// Import necessary modules
import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet, Image} from 'react-native';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
  width,
} from '../styles/responsiveSize';
import Icon from 'react-native-vector-icons/FontAwesome';
export default function MainDashboard() {
  const nav = useNavigation();

  return (
    <View style={styles.mainContainer}>
      {/* <View style={styles.firstChildContainer}></View> */}
      {/* <View style={styles.bgOpacity}> */}
      <View style={styles.parentContainer}>
        <TouchableOpacity
          onPress={() => nav.goBack()}
          style={styles.arrowIconView}>
          <Image
            source={require('../assets/mainDashboard/back.png')}
            style={styles.arrowIcon}
          />
        </TouchableOpacity>

        <Image
          source={require('../assets/login/shapeImage.png')}
          style={styles.topImage}
        />
        <Text style={styles.userDetailsText}>User Details</Text>

        <View
          // animation={'zoomIn'}
          style={styles.centerImageContainer}>
          <Image
            source={require('../assets/login/loginMobile.png')}
            style={styles.centerImg}
          />

          {/* <Icon
          name="arrow-left"
          size={50}
          // color="#000"
          style={styles.arrowIcon}
        /> */}
        </View>
        {/* </View> */}
      </View>
      <View style={styles.childContainer}>
        <View style={styles.parentContainer}>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => nav.navigate('Dashboard')}>
              <Image
                tintColor={'#62d2c3'}
                source={require('../assets/mainDashboard/add.png')}
                style={styles.iconImages}
              />
              <Text style={styles.buttonText}>Add </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => nav.navigate('ViewDetails')}>
              <Image
                tintColor={'#62d2c3'}
                source={require('../assets/mainDashboard/view.png')}
                style={styles.iconImages}
              />
              <Text style={styles.buttonText}>View </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}
// Styling
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },

  parentContainer: {
    flex: 0.6,
    // backgroundColor: '#cf3',
    // justifyContent:''
  },
  childContainer: {
    flex: 0.4,
    // backgroundColor: '#ffc',
    // justifyContent:"flex-end"
  },
  userDetailsText: {
    fontSize: textScale(35),
    color: '#000',
    fontWeight: '600',
    paddingLeft: moderateScale(20),
    // marginLeft: moderateScale(15),
    marginTop: moderateScale(15),
  },
  topImage: {
    height: moderateScale(145),
    width: moderateScale(195),
  },
  arrowIconView: {
    zIndex: 1,
  },
  arrowIcon: {
    height: moderateScale(45),
    width: moderateScale(45),
    position: 'absolute',
    left: moderateScale(5),
    top: moderateScale(5),
  },
  centerImageContainer: {
    alignItems: 'center',
    paddingTop: moderateScaleVertical(40),
  },
  centerImg: {
    width: moderateScale(200),
    height: moderateScale(200),
  },

  buttonsContainer: {
    top: moderateScale(100),
    // justifyContent:'flex-end',
    // backgroundColor: '#afc',
    // flexDirection: 'row',
    // alignItems: 'center',
    justifyContent: 'flex-end',
  },
  button: {
    margin: moderateScale(12),
    width: width - 50,
    height: moderateScale(60),
    borderRadius: moderateScale(10),
    alignSelf: 'center',
    // borderTopLeftRadius: moderateScale(30),
    // borderBottomRightRadius: moderateScale(30),
    backgroundColor: '#fff',
    // padding: moderateScale(10),
    // alignItems: 'flex-end',

    // justifyContent: 'center',
    elevation: 3,
  },
  iconImages: {
    height: moderateScale(35),
    width: moderateScale(35),
    position: 'absolute',
    right: moderateScale(15),
    top: moderateScale(10),
  },
  buttonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: textScale(25),
    padding: moderateScale(15),
    // // textAlign: 'center',
    // top:moderateScale(30),
  },
});
