import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  StatusBar,
  FlatList,
  ImageBackground,
  ScrollView,
  Alert,
  Image,
  KeyboardAvoidingView,
} from 'react-native';

import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
  verticalScale,
} from '../styles/responsiveSize';
import ArrowIcon from 'react-native-vector-icons';

export default function Dashboard() {
  const nav = useNavigation();
  const [userId, setUserId] = useState(null);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [hobby, setHobby] = useState('');

  const [list, setList] = useState([]);
  const [isUpdateData, setIsUpdateData] = useState(false);
  const [selectedCardIndex, setSelectedCardIndex] = useState(null);
  const [cardId, setCardId] = useState(null);

  useEffect(() => {
    const user = auth().currentUser;
    const newUserId = user ? user.uid : null;
    setUserId(newUserId);

    if (newUserId) {
      getUserDocument();
      // // handleAddData()
      // getUserDocument()
    }
  }, [userId]);

  // const getDatabase = async () => {
  //   try {
  //     const snapshot = await firestore()
  //       .collection('Users')
  //       .where('userId', '==', userId)
  //       .get();
  //     const tempArray = snapshot.docs.map(doc => ({
  //       ...doc.data(),
  //       id: doc.id,
  //     }));
  //     setList(tempArray);
  //     console.log('tempArray =========', tempArray);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // Define a function to get the user document
  const getUserDocument = async () => {
    const userRef = firestore().collection('Users').doc(userId);
    console.log(userRef);
    // const userRef = firestore().collection('Users').doc(userId);
    // console.log(userRef);
    const userDoc = await userRef.get();

    return userDoc.exists ? userDoc.data() : null;
  };
  const handleAddData = async () => {
    try {
      const userDoc = await getUserDocument();
      console.log('userDoc', userDoc);

      if (userDoc && name && age && hobby) {
        const userArray = userDoc.users || []; //extracting the users array from the fetched user document. If the users array doesn't exist in the document, you initialize an empty array.
        userArray.push({name, age, hobby});
        await firestore()
          .collection('Users')
          .doc(userId)
          .update({users: userArray});
        const newUser = {name, age, hobby};
        setAge('');
        setHobby('');
        setName('');
        console.log('User data updated', userArray);
        setList([...userArray, newUser]);
        nav.navigate('ViewDetails');

      } else if (name && age && hobby) {
        console.log('else case');
        await firestore()
          .collection('Users')
          .doc(userId)
          .set({users: [{name, age, hobby}]});
        setAge('');
        setHobby('');
        setName('');
        nav.navigate('ViewDetails');

        const userDocuments = await getUserDocument();
        if (userDocuments) {
          console.log('Exist', userDocuments);
          userArray.push({name, age, hobby});
          setList(userDocuments.users);
          nav.navigate('ViewDetails');

        }
      } else {
        console.log('Not exist', getUserDocument);
        //can use alert here

        Alert.alert('Error', 'Please enter details');
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  // const handleDeleteData = async (cardId, cardValue) => {
  //   try {
  //     Alert.alert('Alert', `Are You Sure To Delete ${cardValue} ?`, [
  //       {
  //         text: 'Cancel',
  //         onPress: () => {
  //           console.log('Cancel Is Press');
  //         },
  //       },
  //       {
  //         text: 'Ok',
  //         onPress: async () => {
  //           try {
  //             const userRef = firestore().collection('Users').doc(userId);
  //             const userDoc = await userRef.get();

  //             if (userDoc.exists) {
  //               const userArray = userDoc.data().users || [];
  //               const updatedUserArray = userArray.filter(
  //                 user => user.id !== cardId,
  //               );

  //               await userRef.update({users: updatedUserArray});
  //               console.log('User data deleted');
  //             }
  //           } catch (err) {
  //             console.log(err);
  //           }
  //         },
  //       },
  //     ]);

  //     setIsUpdateData(true);
  //     setSelectedCardIndex(cardId);
  //     setInputTextValue(cardValue);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // const handleAddData = async () => {
  //   try {
  //     const documentSnapshot = await firestore()
  //       .collection('Users')
  //       .doc(userId)
  //       .get();
  //     console.log('User Exists', documentSnapshot.exists);
  //     if (documentSnapshot.exists) {
  //       console.log('User Data Exists', documentSnapshot.data());
  //     } else {
  //       if (name && age && hobby) {
  //         await firestore
  //           .collection('Users')
  //           .doc(userId)
  //           .set({
  //             users: [
  //               {
  //                 name: name,
  //                 age: age,
  //                 hobby: hobby,
  //               },
  //             ],
  //           });
  //         console.log('Users added');
  //         setAge(''), setHobby(''), setName('');
  //       } else {
  //         Alert.alert('Please Enter user details & Then Try Again');
  //       }
  //     }
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // };

  // const handleUpdateData = async () => {
  //   try {
  //     if (name && age && hobby) {
  //       await firestore().collection('Users').doc(cardId).update({
  //         // users: [
  //         //   {name: name, age: age, hobby: hobby},
  //         //   // Add more objects to the array as needed
  //         // ],
  //         name: name,
  //         age: age,
  //         hobby: hobby,
  //       });
  //       setAge('');
  //       setHobby('');
  //       setName('');

  //       setIsUpdateData(false);
  //       setCardId(null);
  //     } else {
  //       Alert.alert('Please Enter updated Values & Then Try Again');
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  // const handleCardPress = (cardId, cardValue) => {
  //   try {
  //     setIsUpdateData(true);
  //     setCardId(cardId);
  //     setName(cardValue.name);
  //     setAge(cardValue.age);
  //     setHobby(cardValue.hobby);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // const handleDeleteData = (cardId, cardValue) => {
  //   try {
  //     Alert.alert('Alert', `Are You Sure To Delete ${cardValue} ?`, [
  //       {
  //         text: 'Cancel',
  //         onPress: () => {
  //           console.log('Cancel Is Press');
  //         },
  //       },
  //       {
  //         text: 'Ok',
  //         onPress: async () => {
  //           try {
  //             await firestore().collection('Users').doc(cardId).delete();
  //             setInputTextValue('');
  //             setIsUpdateData(false);
  //           } catch (err) {
  //             console.log(err);
  //           }
  //         },
  //       },
  //     ]);
  //     setIsUpdateData(true);
  //     setSelectedCardIndex(cardId);
  //     setInputTextValue(cardValue);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // const renderItem = item => {
  //   console.log('item', item);
  //   if (item !== null) {
  //     return (
  //       <View style={styles.item}>
  //         <View style={{padding: 10}}>
  //           <Text style={styles.userDetails}>User Details</Text>
  //           <View style={styles.detailsText}>
  //             <Text style={styles.userHeadings}>User Name: </Text>
  //             <View style={styles.userDetailsParent}>
  //               <Text style={styles.userData}>{item.item.name}</Text>
  //             </View>
  //           </View>

  //           <View style={styles.detailsText}>
  //             <Text style={styles.userHeadings}>User Age: </Text>
  //             <View style={styles.userDetailsParent}>
  //               <Text style={styles.userData}>{item.item.age}</Text>
  //             </View>
  //           </View>
  //           <View style={styles.detailsText}>
  //             <Text style={styles.userHeadings}>User hobby: </Text>
  //             <View style={styles.userDetailsParent}>
  //               <Text style={styles.userData}>{item.item.hobby}</Text>
  //             </View>
  //           </View>
  //         </View>
  //         <View>
  //           <Text
  //             style={{
  //               height: 1,
  //               backgroundColor: 'black',
  //               width: '100%',
  //               //   marginVertical: 10,
  //             }}></Text>
  //         </View>
  //         <View style={[styles.ButtonsContainer]}>
  //           <TouchableOpacity
  //             style={[styles.touchButton, styles.shadow]}
  //             onPress={() => handleAddData(item.item.id, item.item.name)}>
  //             <View style={styles.buttonsView}>
  //               <Text style={styles.editUser}>Edit User</Text>
  //             </View>
  //           </TouchableOpacity>
  //           <TouchableOpacity
  //             style={[styles.touchButton, styles.shadow]}
  //             onPress={() => handleDeleteData(item.item.id, item.item.name)}>
  //             <View style={styles.buttonsView}>
  //               <Text style={styles.deleteUser}>Delete User</Text>
  //             </View>
  //           </TouchableOpacity>
  //         </View>
  //       </View>
  //     );
  //   }
  // };
  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
    <ScrollView contentContainerStyle={{flexGrow: 1}}>

      <View style={styles.parentContainer}>
    {/* <ArrowIcon color='#000' size={20} name='back-arrow'/> */}
    <TouchableOpacity
          onPress={() => nav.goBack()}
          style={styles.arrowIconView}>
          <Image
            source={require('../assets/mainDashboard/back.png')}
            style={styles.arrowIcon}
          />
        </TouchableOpacity>
      <Image
          source={require('../assets/dashboard/shapeImage.png')}
          style={styles.topImage}
        />
        </View>
      <View style={styles.childContainer}>
       
        <Text style={styles.enterDetail}>Enter Your Detais Here</Text>
        <Text style={styles.nameAgeHobbyText}>Enter Name</Text>

        <TextInput
          style={styles.inputBox}
          placeholder="Enter Name"
          placeholderTextColor={'#8A8787'}
          value={name}
          onChangeText={value => setName(value)}
        />
        <Text style={styles.nameAgeHobbyText}>Enter Age</Text>

        <TextInput
          style={styles.inputBox}
          placeholder="Enter Age"
          value={age}
          placeholderTextColor={'#8A8787'}
          keyboardType="number-pad"
          onChangeText={value => setAge(value)}
        />
        <Text style={styles.nameAgeHobbyText}>Enter Hobby</Text>

        <TextInput
          style={styles.inputBox}
          placeholder="Enter Hobby"
          value={hobby}
          placeholderTextColor={'#8A8787'}
          onChangeText={value => setHobby(value)}
        />
      </View>
      <View style={styles.subChildContainer}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => {
            handleAddData();
          }}>
          <Text style={styles.addDetailsText}>Add Details</Text>
        </TouchableOpacity>
      </View>
      </ScrollView>
    </View>
  );
}

const {height, width} = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    backgroundColor: '#fff',
  },
  parentContainer: {
    flex: 0.2,
    // backgroundColor:"#ffc"
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
  childContainer: {
    flex: 0.6,
    // backgroundColor:"green"
  },
  subChildContainer: {
    flex: 0.2,
    justifyContent: 'flex-end',
    // backgroundColor:'red'
  },
  topImage: {
    height: moderateScale(145),
    width: moderateScale(195),
  },
  nameAgeHobbyText: {
    color: '#000',
    // textAlign: 'center',
    fontSize: textScale(22),
    fontWeight: 'bold',
    top: verticalScale(8),
    marginLeft: moderateScale(35),
  },

  enterDetail: {
    fontSize: textScale(40),

    fontWeight: 'bold',
    marginVertical: moderateScaleVertical(10),
    color: '#000',
    padding: moderateScale(18),
    // textAlign:'center'
    // alignSelf: 'center',
  },
  inputBox: {
    width: '90%',
    backgroundColor: '#fff',
    elevation:3,
    borderRadius: 10,
    color: '#8A8787',
    paddingHorizontal: 20,
    fontSize: textScale(20),
    fontWeight: '700',
    // borderColor: '#000',
    // borderWidth: 1,
    marginVertical: 10,
    alignSelf: 'center',
    padding: moderateScaleVertical(15),
  },
  addButton: {
    backgroundColor: '#62D2C3',
    alignItems: 'center',
    alignSelf: 'center',
    paddingVertical: 10,
    borderRadius: 10,
    marginVertical: moderateScaleVertical(50),
    width: width - 30,
    elevation:5
  },

  addDetailsText: {
    color: '#000',
    fontSize: textScale(22),
    paddingVertical: moderateScaleVertical(8),
    fontWeight: 'bold',
  },
});
