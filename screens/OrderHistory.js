import { useState, useEffect } from 'react';
import { ScrollView, Text, View, Pressable, TextInput, TouchableOpacity, TouchableWithoutFeedback, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import useDidMountEffect from '../hooks/useDidMountEffect';
import Icon from 'react-native-vector-icons/Ionicons';

function OrderHistory({navigation, route}) {

navigation.setOptions({
    headerShown: true,
    headerTitle: "",
    headerTransparent: true,
    headerMode: "screen",
    headerLeft: () => {
        return (
        <TouchableWithoutFeedback 
            onPress={() => navigation.navigate('Home', {
            userId: userId
        })}
        >
        <Icon name="ios-arrow-back" size={56} color="#000" />
        </TouchableWithoutFeedback>
        )
    }
})
  return (
    <div>OrderHistory</div>
  )
}

export default OrderHistory