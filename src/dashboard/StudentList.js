import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  View,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Dimensions,
  Text,
} from 'react-native';
// import StudentList from './StudentList'; // Import the StudentList component
// import styles from './styles'; // Import the styles from the styles file

const StudentList = ({list, handleCardPress, handleCardLongPress}) => {
    const nav = useNavigation()
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 25}>
      <View style={styles.container}>
        {/* Render the StudentList component */}
        <FlatList
          data={list}
          keyExtractor={item => item.id}
          renderItem={item => {
            if (item.item !== null) {
              return (
                <View>
                  <TouchableOpacity
                    style={styles.card}
                    onPress={() =>
                      handleCardPress(item.item.id, item.item.name)
                    }
                    onLongPress={() =>
                      handleCardLongPress(item.item.id, item.item.name)
                    }>
                    <View style={{flexDirection: 'row'}}>
                      <Text style={{fontSize: 20, color: '#000'}}>Name:</Text>
                      <Text
                        style={{
                          fontSize: 20,
                          color: '#000',
                          flex: 1,
                          textAlign: 'center',
                          // backgroundColor:'red'
                        }}>
                        {item.item.name}
                      </Text>
                    </View>
                    <View style={{flexDirection: 'row', }}>
                    <Text style={{fontSize: 20, color: '#000'}}>Age:</Text>
                      
                      <Text
                        style={{
                          fontSize: 20,
                          color: '#000',
                          flex: 1,
                          textAlign: 'center',
                          justifyContent:'center',
                          backgroundColor:'red',
                        }}>
                        {item.item.age}
                      </Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                      <Text style={{fontSize: 20, color: '#000'}}>Hobby:</Text>

                      <Text
                        style={{
                          fontSize: 20,
                          color: '#000',
                        //   flex: 1,
                          textAlign: 'center',
                        //   backgroundColor:'red'
                        }}>
                        {item.item.hobby}
                      </Text>
                    </View>
                  </TouchableOpacity>
                  {/* <TouchableOpacity
                    style={styles.card}
                    onPress={() => handleCardPress(item.item.id, item.item.age)}
                    onLongPress={() =>
                      handleCardLongPress(item.item.id, item.item.age)
                    }>
                    <Text>{item.item.age}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.card}
                    onPress={() =>
                      handleCardPress(item.item.id, item.item.hobby)
                    }
                    onLongPress={() =>
                      handleCardLongPress(item.item.id, item.item.hobby)
                    }>
                    <Text>{item.item.hobby}</Text>
                  </TouchableOpacity> */}
                </View>
              );
            }
          }}
        />
        <View>
            <Text style={{fontSize:30}} onPress={() => nav.navigate('Dashboard')}>Add More Details</Text>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const {height, width} = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#afa',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#fff',
    width: width - 40,
    padding: 20,
    borderRadius: 15,
    marginVertical: 5,
  },
});
export default StudentList;
