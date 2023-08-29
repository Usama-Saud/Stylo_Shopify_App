// import React, { useRef } from 'react';
// import { View, StyleSheet } from 'react-native';
// import Animated, { Easing } from 'react-native-reanimated';

// const SlideScreen = ({ children, navigation }) => {
//   const translateX = useRef(new Animated.Value(0)).current;

//   const startAnimation = () => {
//     Animated.timing(translateX, {
//       toValue: 1,
//       duration: 500,
//       easing: Easing.linear,
//     }).start(() => {
//       navigation.navigate('LoginUser');
//     });
//   };

//   const screenStyles = [
//     styles.screen,
//     {
//       transform: [{ translateX: translateX.interpolate({
//         inputRange: [0, 1],
//         outputRange: [0, -500], // Adjust this value as needed
//       }) }],
//     },
//   ];

//   return (
//     <View style={screenStyles}>
//       {/* {children} */}
//       <Animated.View style={StyleSheet.absoluteFill} pointerEvents="none">
//         {/* You can add overlay or background effects here */}
//       </Animated.View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   screen: {
//     flex: 1,
//     flexDirection: 'row', // Adjust this if you need different slide direction
//   },
// });

// export default SlideScreen;
