// import React, {useEffect, useState} from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   StyleSheet,
//   Dimensions,
//   TouchableOpacity,
//   StatusBar,
//   FlatList,
//   Alert,
// } from 'react-native';
// import database from '@react-native-firebase/database';
// import firestore from '@react-native-firebase/firestore';
// import auth from '@react-native-firebase/auth';

// export default function Login() {
//   const [name, setName] = useState('');
//   const [age, setAge] = useState('');
//   const [hobby, setHobby] = useState('');

//   const [list, setList] = useState([]);
//   const [isUpdateData, setIsUpdateData] = useState(false);
//   const [selectedCardIndex, setSelectedCardIndex] = useState(null);
//   const [cardId, setCardId] = useState(null);

//   const user = auth().currentUser;
//   const userId = user ? user.uid : null;
//   useEffect(() => {
//     if (userId) {
//       getDatabase();
//     }
//   }, [userId]);

//   const getDatabase = async () => {
//     try {
//       const snapshot = await firestore()
//         .collection('Dummy')
//         .where('userId', '==', userId)
//         .get();
//       const tempArray = snapshot.docs.map(doc => ({
//         ...doc.data(),
//         id: doc.id,
//       }));
//       setList(tempArray);
//       console.log("tempArray =========",tempArray);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const handleAddData = async () => {
//     try {
//       if (name && age && hobby) {
//         const existingData = list.find(item => item.userId === userId);

//         if (existingData) {
//           await firestore().collection('Dummy').doc(existingData.id).update({
//             name: name,
//             age: age,
//             hobby: hobby,
//             // userId: userId,

//           });
//         } else {
//           await firestore().collection('Dummy').doc(userId).set({
//             name: name,
//             age: age,
//             hobby: hobby,
//             userId: userId,
//           });
//         }

//         setAge('');
//         setHobby('');
//         setName('');
//       } else {
//         Alert.alert('Please Enter Value & Then Try Again');
//       }
//     } catch (err) {
//       console.log(err.message);
//     }
//   };

//   const handleUpdateData = async () => {
//     try {
//       if (name && age && hobby) {
//         await firestore().collection('Dummy').doc(cardId).update({
//           name: name,
//           age: age,
//           hobby: hobby,
//         });
//         setAge('');
//         setHobby('');
//         setName('');
//         setIsUpdateData(false);
//         setCardId(null);
//         //button will set to Add after updaing the data
//         // const response = await database()
//         //   .ref(`todo/${selectedCardIndex}`)
//         //   .update({
//         //     value: inputTextValue,
//         //   });

//         // console.log(response);
//         // setInputTextValue('');
//         // setIsUpdateData(false);
//       } else {
//         Alert.alert('Please Enter Value & Then Try Again');
//       }
//     } catch (err) {
//       console.log(err);
//     }
//   };
//   const handleCardPress = (cardId, cardValue) => {
//     try {
//       setIsUpdateData(true);
//       setCardId(cardId);
//       // setInputTextValue(cardValue);
//       setName(cardValue.name);
//       setAge(cardValue.age);
//       setHobby(cardValue.hobby);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const handleCardLongPress = (cardId, cardValue) => {
//     try {
//       Alert.alert('Alert', `Are You Sure To Delete ${cardValue} ?`, [
//         {
//           text: 'Cancel',
//           onPress: () => {
//             console.log('Cancel Is Press');
//           },
//         },
//         {
//           text: 'Ok',
//           onPress: async () => {
//             try {
//               await firestore().collection('Dummy').doc(cardId).delete();
//               setInputTextValue('');
//               setIsUpdateData(false);
//               // const response = await database()
//               //   .ref(`todo/${cardIndex}`)
//               //   .remove();
//               // setInputTextValue('');
//               // setIsUpdateData(false);
//               // console.log(response);
//             } catch (err) {
//               console.log(err);
//             }
//           },
//         },
//       ]);
//       setIsUpdateData(true);
//       setSelectedCardIndex(cardId);
//       setInputTextValue(cardValue);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   // const handleUpdateUserData = async () => {
//   //   try {
//   //     const user = auth().currentUser; // Get the currently logged-in user

//   //     if (user) {
//   //       // Use the user's ID to update their data in Firestore
//   //       await firestore()
//   //         .collection('Users')
//   //         .doc(user.vwP3KxpsjVYA7tHaGwIN2h3blb03)
//   //         .update({
//   //           // Update the necessary fields here
//   //           // For example: name, email, etc.
//   //         });

//   //       // Inform the user that the update was successful
//   //       Alert.alert('Success', 'User data updated successfully');
//   //     } else {
//   //       Alert.alert('Error', 'User not logged in');
//   //     }
//   //   } catch (error) {
//   //     console.log(error.message);
//   //     Alert.alert('Error', 'Failed to update user data');
//   //   }
//   // };

//   return (
//     <View style={styles.container}>
//       <StatusBar hidden={true} />
//       <View>
//         <Text
//           style={{
//             textAlign: 'center',
//             fontSize: 20,
//             fontWeight: 'bold',
//             marginVertical: 15,
//           }}>
//           Enter Your Detais
//         </Text>
//         <TextInput
//           style={styles.inputBox}
//           placeholder="Enter Name"
//           value={name}
//           onChangeText={value => setName(value)}
//         />
//         <TextInput
//           style={styles.inputBox}
//           placeholder="Enter Age"
//           value={age}
//           keyboardType="number-pad"
//           onChangeText={value => setAge(value)}
//         />
//         <TextInput
//           style={styles.inputBox}
//           placeholder="Enter Hobby"
//           value={hobby}
//           onChangeText={value => setHobby(value)}
//         />
//         {!isUpdateData ? (
//           <TouchableOpacity
//             style={styles.addButton}
//             onPress={() => handleAddData()}>
//             <Text style={{color: '#fff', fontSize: 20, fontWeight: 'bold'}}>
//               Add
//             </Text>
//           </TouchableOpacity>
//         ) : (
//           <TouchableOpacity
//             style={styles.addButton}
//             onPress={() => handleUpdateData()}>
//             <Text style={{color: '#fff'}}>Update</Text>
//           </TouchableOpacity>
//         )}
//       </View>

//       <View style={styles.cardContainer}>
//         <Text style={{marginVertical: 20, fontSize: 20, fontWeight: 'bold'}}>
//           Student Data
//         </Text>

//         <FlatList
//           data={list}
//           renderItem={item => {
//             const cardIndex = item.index;
//             if (item.item !== null) {
//               return (
//                 <View>
//                   <TouchableOpacity
//                     style={styles.card}
//                     // onPress={() => handleCardPress(cardIndex, item.item.value)}
//                     onPress={() =>
//                       handleCardPress(item.item.id, item.item.name)
//                     }
//                     onLongPress={() =>
//                       handleCardLongPress(item.item.id, item.item.name)
//                     }>
//                     {/* onLongPress={() =>
//                     handleCardLongPress(cardIndex, item.item.value)
//                   }> */}
//                     <Text>{item.item.name}</Text>
//                   </TouchableOpacity>
//                   <TouchableOpacity
//                     style={styles.card}
//                     onPress={() =>
//                       handleCardPress(item.item.id, item.item.age)
//                     }
//                     onLongPress={() =>
//                       handleCardLongPress(item.item.id, item.item.age)
//                     }>
//                     <Text>{item.item.age}</Text>
//                   </TouchableOpacity>
//                   <TouchableOpacity
//                     style={styles.card}
//                     onPress={() =>
//                       handleCardPress(item.item.id, item.item.hobby)
//                     }
//                     onLongPress={() =>
//                       handleCardLongPress(item.item.id, item.item.hobby)
//                     }>
//                     <Text>{item.item.hobby}</Text>
//                   </TouchableOpacity>
//                 </View>
//               );
//             }
//           }}
//         />
//       </View>
//     </View>
//   );
// }

// const {height, width} = Dimensions.get('screen');

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//   },
//   inputBox: {
//     width: width - 30,
//     borderRadius: 15,
//     borderWidth: 2,
//     marginVertical: 10,
//     padding: 10,
//   },
//   addButton: {
//     backgroundColor: '#a34fc5',
//     alignItems: 'center',
//     padding: 10,
//     borderRadius: 30,
//     marginVertical: 15,
//   },
//   cardContainer: {
//     marginVertical: 20,
//   },
//   card: {
//     backgroundColor: '#fff',
//     width: width - 40,
//     padding: 20,
//     borderRadius: 15,
//     marginVertical: 5,
//   },
// });
