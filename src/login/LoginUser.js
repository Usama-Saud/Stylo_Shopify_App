import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  StatusBar,
  FlatList,
  Alert,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
  verticalScale,
} from '../styles/responsiveSize';
import * as Animatable from 'react-native-animatable';

export default function LoginUser() {
  const nav = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleLogin = async () => {
    try {
      const loginUser = await auth().signInWithEmailAndPassword(
        email,
        password,
      );
      console.log('User Login =========', loginUser);
      nav.navigate('MainDashboard');
      setEmail('');
      setPassword('');
    } catch (error) {
      // console.log(error.message);
      Alert.alert('Login Failed', 'Invalid email or password.');
    }
  };

  const isEmailValid = email => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const isPasswordValid = password => {
    return password.length >= 6;
  };

  const isLoginFormValid = () => {
    return isEmailValid(email) && isPasswordValid(password);
  };
  const handleEmailChange = text => {
    setEmail(text);
    if (text && !isEmailValid) {
      setEmailError('Please enter valid email');
    } else {
      setEmailError('');
    }
  };

  const handlePasswordChange = text => {
    setPassword(text);
    if (text && !isPasswordValid) {
      setPasswordError('Please enter at least 6 digit password');
    } else {
      setPasswordError('');
    }

    const togglePassword = () => {
      setShowPassword(!showPassword);
    };
  };

  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <View style={styles.container}>
        <StatusBar hidden={true} />
        <View style={styles.parentContainer}>
          <Image
            source={require('../assets/login/shapeImage.png')}
            style={styles.topImage}
          />
          <Text style={styles.welcomeText}>Welcome Back!</Text>
          <View
            // animation={'zoomIn'}
            style={styles.centerImageContainer}>
            <Image
              source={require('../assets/login/loginMobile.png')}
              style={styles.centerImg}
            />
          </View>
        </View>
        <View style={styles.childContainer}>
          <Text style={styles.emailPassText}>Email</Text>

          <TextInput
            style={styles.inputBox}
            placeholder="Enter Email"
            value={email}
            placeholderTextColor={'#8A8787'}
            onChangeText={handleEmailChange}
          />
          <Text style={styles.emailPassText}>Password</Text>

          <TextInput
            style={styles.inputBox}
            placeholder="Enter Password"
            value={password}
            secureTextEntry={true}
            keyboardType={'default'}
            placeholderTextColor={'#8A8787'}
            onChangeText={handlePasswordChange}
          />
          <TouchableOpacity
          // style={styles.loginButton}
          // onPress={() => handleLogin()}
          >
            <Text style={styles.forgetPassText}>Forget Password?</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.subChildContainer}>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => handleLogin()}>
            <Text style={styles.loginText}>Login</Text>
          </TouchableOpacity>
          <View style={styles.registerView}>
            <Text style={styles.txt1}>Don't have an account?</Text>
            <TouchableOpacity
              style={styles.signUpBtn}
              onPress={() => nav.navigate('RegisterUser')}>
              <Text style={styles.signupText}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {/* </View> */}
    </ScrollView>
  );
}

const {height, width} = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  parentContainer: {
    flex: 0.2,
    // backgroundColor: 'green',
  },
  topImage: {
    height: moderateScale(145),
    width: moderateScale(195),
  },

  centerImageContainer: {
    alignItems: 'center',
    paddingTop: moderateScaleVertical(40),
  },
  centerImg: {
    width: moderateScale(150),
    height: moderateScale(150),
  },
  welcomeText: {
    fontSize: textScale(22),
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
  },
  forgetPassText: {
    fontSize: textScale(20),
    fontWeight: 'bold',
    color: '#62D2C3',
    textAlign: 'right',
    marginRight: moderateScale(30),
  },
  childContainer: {
    flex: 0.5,

    // backgroundColor: '#ad3'
  },
  subChildContainer: {
    flex: 0.3,
    // backgroundColor: '#E3E',
  },

  emailPassText: {
    color: '#000',
    // textAlign: 'center',
    fontSize: textScale(20),
    fontWeight: 'bold',
    paddingTop: verticalScale(12),

    marginLeft: moderateScale(40),
    // paddingTop:moderateScaleVertical(10)
  },
  inputBox: {
    width: '90%',
    alignSelf: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    color: '#8A8787',
    fontWeight: '700',
    paddingHorizontal: 20,
    fontSize: textScale(20),
    marginVertical: '2%',
    paddingVertical: moderateScaleVertical(15),
    elevation: 5,
  },
  subChildContainer: {
    justifyContent: 'flex-end',

    // position: 'absolute',
    // paddingTop: moderateScaleVertical(90),
    // top: moderateScaleVertical(80),
    // bottom: moderateScaleVertical(30),
    // justifyContent:'flex-end',
    // alignItems:'flex-end'
  },
  loginButton: {
    backgroundColor: '#62D2C3',
    // marginTop: '5%',
    alignItems: 'center',
    alignSelf: 'center',
    padding: 10,
    elevation: 3,
    borderRadius: 10,
    width: width - 30,
  },
  loginText: {
    color: '#000',
    fontSize: textScale(24),
    paddingVertical: moderateScaleVertical(8),
    fontWeight: 'bold',
  },

  registerView: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: '2%',
  },
  // signUpBtn:{
  //   alignItems:'center'
  // },
  txt1: {
    color: '#000',
    fontSize: 20,
    fontWeight: '500',
  },
  signupText: {
    color: '#62D2C3',
    fontSize: 20,
    // justifyContent: 'flex-end',
    fontWeight: '800',
    marginLeft: moderateScale(10),
  },
});
