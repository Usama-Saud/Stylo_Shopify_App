import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
  Alert,
  Image,
  RefreshControl,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect, useCallback} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import firestore, {Filter} from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../styles/responsiveSize';

const ViewDetails = () => {
  const [userList, setUserList] = useState('');
  const [isUpdateData, setIsUpdateData] = useState(false);
  const [selectedCardIndex, setSelectedCardIndex] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const nav = useNavigation();

  // const onRefresh = useCallback(() => {
  //   setRefreshing(true);
  //   setTimeout(() =>{
  //     setRefreshing(false)
  //   },2000)
  // },[])
  useEffect(() => {
    const user = auth().currentUser; //to get the data of the current user
    firestore()
      .collection('Users')
      .doc(user.uid)
      .get()
      .then(documentSnapshot => {
        console.log('User exists ======  ', documentSnapshot.exists);

        if (documentSnapshot.exists) {
          const {users} = documentSnapshot.data();
          if (users !== null)
            console.log('User data ========', documentSnapshot.data());
          setUserList(documentSnapshot.data().users);
        }
      });
  }, []);
  const handleDeleteData = async item => {
    const objectToFilter = item.item;
    // console.log( "objectToFilter", objectToFilter)
    const filteredArray = userList.filter(itemData => {
      return (
        itemData.age !== objectToFilter.age ||
        itemData.hobby !== objectToFilter.hobby ||
        itemData.name !== objectToFilter.name
      );
    });
    console.log('Filtered/Updated Array after deletion: =====', filteredArray);
    try {
      const user = auth().currentUser;
      const userRef = firestore().collection('Users').doc(user.uid);

      // Update the user's document with the new array
      // await userRef.update({users: filteredArray});
      // setUserList(filteredArray);
      // setUserList('')
      console.log('User data updated after deletion.');
      Alert.alert('Alert', 'Are you sure to Delete?', [
        {
          text: 'Cancel',
          onPress: () => {
            console.log('Cancel is Pressed');
          },
        },
        {
          text: 'OK',
          onPress: async () => {
            await userRef.update({users: filteredArray});
            // setUserList(filteredArray);
            setUserList('');

            console.log('User data updated after deletion.');
          },
        },
      ]);
    } catch (error) {
      console.log('Error updating the data', error);
    }
  };

  const handleAddUser = () => {
    nav.navigate('Dashboard');
  };
  const renderItem = item => {
    if (item.item !== null) {
      return (
        <View>
          <View style={styles.item}>
            <View style={styles.textContainer}>
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.headingText}>EXP-R-005432</Text>
              </View>

              <View style={styles.detailsText}>
                <Text style={styles.userHeadings}>User Name: </Text>
                <View style={styles.userDetailsParent}>
                  <Text style={styles.userData}>{item.item.name}</Text>
                </View>
              </View>

              <View style={styles.detailsText}>
                <Text style={styles.userHeadings}>User Age: </Text>
                <View style={styles.userDetailsParent}>
                  <Text style={styles.userData}>{item.item.age}</Text>
                </View>
              </View>
              <View style={styles.detailsText}>
                <Text style={styles.userHeadings}>User hobby: </Text>
                <View style={styles.userDetailsParent}>
                  <Text style={styles.userData}>{item.item.hobby}</Text>
                </View>
              </View>
              <TouchableOpacity
                style={[styles.deleteButton, styles.shadow]}
                onPress={() => handleDeleteData(item)}>
                <View style={styles.deleteButtonView}>
                  <Image
                    source={require('../assets/dashboard/delete.png')}
                    tintColor={'#62d2c3'}
                    style={styles.delImg}
                  />
                  {/* <Text style={styles.deleteText}>Delete User</Text> */}
                </View>
              </TouchableOpacity>
            </View>
            {/* <View>
              <Text
                style={{
                  height: 1,
                  backgroundColor: 'black',
                  width: '100%',
                  //   marginVertical: 10,
                }}></Text>
            </View> */}

            <View style={[styles.ButtonsContainer]}>
              {/* <TouchableOpacity
              style={[styles.touchButton, styles.shadow]}
              onPress={() => handleAddUser()}>
              <View style={styles.buttonsView}>
                <Image
                  source={require('../assets/dashboard/add.png')}
                  style={styles.addImg}
                />
                <Text style={styles.editUser}>Add User</Text>
              </View>
            </TouchableOpacity> */}
            </View>
          </View>
        </View>
      );
    }
  };

  return (
    <View style={styles.container}>
      {/* <View style={styles.bgOpacity}> */}
      {/* <ScrollView
        // contentContainerStyle={{flexGrow: 1}}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }> */}
        <View style={styles.parentContainer}>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              onPress={() => nav.goBack()}
              style={styles.arrowIconView}>
              <Image
                source={require('../assets/mainDashboard/back.png')}
                style={styles.arrowIcon}
              />
            </TouchableOpacity>
            <Image
              source={require('../assets/register/shapeImage.png')}
              style={styles.topImage}
            />
            <View style={styles.addbuttonView}>
              <TouchableOpacity
                style={[styles.addButton, styles.shadow]}
                onPress={() => handleAddUser()}>
                <Image
                  tintColor={'#62d2c3'}
                  source={require('../assets/dashboard/add.png')}
                  style={styles.addImg}
                />
              </TouchableOpacity>
              {/* <Text style={styles.addBtnText}>Add </Text> */}
            </View>
          </View>
          <View>
            <Text
              style={{
                fontSize: textScale(35),
                // alignSelf: 'center',
                paddingLeft: moderateScale(20),
                paddingTop: moderateScale(10),

                color: '#000',
                // backgroundColor:'red',
                fontWeight: 'bold',
              }}>
              User Details
            </Text>
            {/* <Text  style={{
                fontSize: textScale(25),
                alignSelf: 'center',
                // paddingLeft: moderateScale(20),
                paddingTop: moderateScale(10),

                color: '#000',
                // backgroundColor:'red',
                fontWeight: 'bold',
              }}>Pull down to see RefreshControl indicator</Text> */}
          </View>

          <FlatList
            style={{alignSelf: 'center', marginTop: 10}}
            data={userList}
            renderItem={renderItem}
            keyExtractor={(item, index) => {
              return item.id;
            }}
          />
          {/* </ImageBackground> */}
        </View>
      {/* </ScrollView> */}
    </View>
  );
};

export default ViewDetails;

const {height, width} = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E5E5E5',
  },
  parentContainer: {
    flex: 1,
    // backgroundColor: 'green',
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
  textContainer: {
    paddingTop: moderateScaleVertical(8),
  },
  childContainer: {
    flex: 0.7,
    // backgroundColor: '#E5E5',
  },
  topImage: {
    height: moderateScale(145),
    width: moderateScale(195),
  },

  inputBox: {
    color: '#000',
    fontSize: 20,
    width: width - 40,
    borderRadius: 10,
    borderWidth: 1.5,
    marginVertical: '2%',
    paddingLeft: 15,
  },

  cardContainer: {
    marginVertical: 10,
    flex: 1,
  },
  ButtonsContainer: {
    // backgroundColor: '#fcc',
    // borderRadius: 10,
    // elevation: 5,
    // justifyContent: 'flex-end',
    alignItems: 'center',
    // marginTop: '2%',
    flexDirection: 'row',
  },

  addbuttonView: {
    position: 'absolute',
    right: moderateScale(15),
    top: moderateScale(25),
  },

  addButton: {
    height: moderateScale(60),
    width: moderateScale(60),
    borderRadius: moderateScale(10),
    borderWidth: 2,
    borderColor: '#62D2C3',
    // padding: moderateScale(5),
    backgroundColor: '#fff',
    elevation: 4,
    justifyContent: 'center',
    alignItems: 'center',
    // alignSelf:'center',
    // marginVertical:moderateScale(10)
  },
  addImg: {
    height: moderateScale(35),
    width: moderateScale(35),
  },
  deleteButton: {
    position: 'absolute',
    right: moderateScale(15),
    bottom: moderateScale(0),
    borderRadius: 10,
    padding: 5,
    backgroundColor: '#fff',
    elevation: 4,
    borderWidth: 0.5,
    borderColor: '#62D2C3',
  },
  delImg: {
    height: moderateScale(25),
    width: moderateScale(25),
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    // color: '#62D2C3',
  },
  addBtnText: {
    color: '#000',
    fontSize: textScale(20),
    fontWeight: 'bold',
    alignSelf: 'center',
    // backgroundColor:'#fc3'
  },

  deleteText: {
    color: '#000',
    fontSize: 20,
    padding: 5,
    fontWeight: 'bold',
  },
  item: {
    borderRadius: 12,
    borderColor: '#000',
    backgroundColor: '#fff',
    margin: 10,
    width: width - 40,
  },

  ButtonsContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 5,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginVertical: 8,
    flexDirection: 'row',
  },

  pickBtnImg: {
    height: 22,
    width: 22,
    alignSelf: 'center',
  },
  deleteUser: {
    color: '#000',
    fontSize: textScale(18),
    padding: 5,
    fontWeight: 'bold',
    // backgroundColor: '#62D2C3',
    borderRadius: 10,
  },
  packBtnImg: {
    height: 22,
    width: 22,
    alignSelf: 'center',
  },

  invoiceBtnText: {
    color: '#000',
    fontSize: 20,
    padding: 5,
    fontWeight: 'bold',
  },
  invoiceBtnImg: {
    height: 22,
    width: 22,
    alignSelf: 'center',
  },
  headingText: {
    fontSize: textScale(25),
    paddingLeft: 10,
    fontWeight: '800',
    color: '#000',
  },
  userHeadings: {
    flex: 1,
    fontSize: 18,
    paddingLeft: 10,
    paddingVertical: 8,
    fontWeight: '900',
    color: '#000',
  },
  userDetailsParent: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  userData: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  detailsText: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
