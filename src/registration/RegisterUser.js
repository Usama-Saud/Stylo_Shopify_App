import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  StatusBar,
  Alert,
  Image,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
  verticalScale,
} from '../styles/responsiveSize';

export default function RegisterUser() {
  const [inputTextValue, setInputTextValue] = useState(null);
  const nav = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMatch, setPasswordMatch] = useState(true);

  const registerUser = async () => {
    if (password === confirmPassword) {
      try {
        const isUserCreated = await auth().createUserWithEmailAndPassword(
          email,
          password,
        );

        console.log(`User Created === ${isUserCreated}`);
        nav.navigate('LoginUser');
      } catch (error) {
        console.log(error.message);
        Alert.alert('Registration Failed', 'User Already Registered');
      }
    } else {
      Alert.alert('Error', 'Passwords do not match');
    }
  };

  const handlePasswordChange = text => {
    setPassword(text);
    // Check if passwords match and update state accordingly
    setPasswordMatch(text === confirmPassword);
  };
  const handleConfirmPasswordChange = text => {
    setConfirmPassword(text);
    setPasswordMatch(password === text);
  };
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 25}>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <StatusBar hidden={true} />
          <View style={styles.parentContainer}>
            <Image
              source={require('../assets/register/shapeImage.png')}
              style={styles.topImage}
            />
            <View style={styles.textContainer}>
              <Text style={styles.welcomeText_1}>Welcome Onboard!</Text>
              {/* <Text style={styles.welcomeText_2}>
                Let's help you in completing your task's
              </Text> */}
            </View>
          </View>
          <View style={styles.childContainer}>
            <View style={styles.registerContainer}>
              <Text style={styles.emailPassText}>Full name</Text>

              <TextInput
                style={styles.inputBox}
                placeholder="Full Name"
                placeholderTextColor={'#8A8787'}

                // onChangeText={value => setEmail(value)}
              />
              <Text style={styles.emailPassText}>Email</Text>

              <TextInput
                style={styles.inputBox}
                placeholder="Enter Email"
                placeholderTextColor={'#8A8787'}
                value={email}
                onChangeText={value => setEmail(value)}
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
              <Text style={styles.emailPassText}>Confirm Password</Text>

              <TextInput
                style={styles.inputBox}
                placeholder="Confirm Password"
                value={confirmPassword}
                secureTextEntry={true}
                keyboardType={'default'}
                placeholderTextColor={'#8A8787'}
                onChangeText={handleConfirmPasswordChange}
              />
            </View>
            <View style={styles.lastContainer}>
              {!passwordMatch && (
                 <Text style={styles.errorText}>Passwords do not match</Text>
              )}
              <TouchableOpacity
                style={styles.registerButton}
                onPress={() => registerUser()}>
                <Text style={styles.registerText}>Register</Text>
              </TouchableOpacity>
              <View style={styles.lastTextContainer}>
                <Text style={styles.alreadyText}>
                  Already have an account?
                </Text>
                <TouchableOpacity
                  // style={styles.registerButton}
                  onPress={() => nav.navigate('LoginUser')}>
                  <Text style={styles.singInText}>Sign in</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
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
  textContainer: {
    marginVertical: moderateScaleVertical(10),
  },
  childContainer: {
    flex: 0.8,
    // backgroundColor: '#E5E5',
  },
  topImage: {
    height: moderateScale(145),
    width: moderateScale(195),
  },
  welcomeText_1: {
    color: '#000',
    textAlign: 'center',
    fontSize: textScale(25),
    fontWeight: 'bold',
  },
  welcomeText_2: {
    color: '#000',
    textAlign: 'center',
    fontSize: textScale(20),
    fontWeight: '700',
  },
  emailPassText: {
    color: '#000',
    // textAlign: 'center',
    fontSize: textScale(20),
    fontWeight: 'bold',
    top: verticalScale(8),
    marginLeft: moderateScale(35),
  },
  errorText: {
    color: 'red',
    marginBottom: moderateScale(8),
    fontSize: textScale(16),
    fontWeight: '700',


  },
  inputBox: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 10,
    // borderWidth:.1,
    color: '#8A8787',
    paddingHorizontal: 20,
    fontSize: textScale(20),
    fontWeight: '700',
    marginVertical: moderateScale(8),
    alignSelf: 'center',
    padding: moderateScaleVertical(15),
    elevation:3
  },
  registerContainer: {
    // marginTop: moderateScaleVertical(10),
    // backgroundColor:'#ffc'
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  registerButton: {
    marginTop: moderateScaleVertical(15),

    backgroundColor: '#62D2C3',
    elevation: 5,
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    width: width - 30,
  },
  registerText: {
    color: '#000',
    fontSize: textScale(24),
    fontWeight: 'bold',
    paddingVertical: moderateScaleVertical(8),
  },
  lastContainer: {
    // position: 'absolute',
    // bottom: moderateScaleVertical(30),
    top: moderateScaleVertical(30),

    alignSelf: 'center',
  },

  lastTextContainer: {
    flexDirection: 'row',
    fontSize: textScale(20),
    justifyContent: 'center',
    fontWeight: '800',
    marginVertical: moderateScaleVertical(10),
    // marginLeft: '10%',
  },
  alreadyText: {
    color: '#000',
    fontSize: textScale(20),
    fontWeight: '500',
  },
  singInText: {
    color: '#62D2C3',
    fontSize: textScale(20),
    fontWeight: 'bold',
    marginLeft: moderateScale(10)

  },
  // cardContainer: {
  //   marginVertical: 20,
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
  // card: {
  //   backgroundColor: '#fff',
  //   width: width - 40,
  //   padding: 20,
  //   borderRadius: 30,
  //   marginVertical: 10,
  // },
  // registerText: {
  //   color: '#000',
  //   fontSize: 20,
  //   fontWeight: '800',
  //   marginLeft: '5%',
  // },
  // registerView: {
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   flexDirection: 'row',
  //   marginTop: '2%',
  // }
});
