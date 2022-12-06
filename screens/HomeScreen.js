import { useState, useEffect } from 'react';
import { ScrollView, Text, View, Pressable, ImageBackground, TouchableOpacity, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import useDidMountEffect from '../hooks/useDidMountEffect';

import { useIsFocused } from '@react-navigation/native';


const fetch = require("node-fetch");



import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';

import * as Location from 'expo-location';



// Component to Show Restaurants quickly


function RestaurantCard({navigation, data, userInfo}) {

  return (
      <TouchableOpacity className='border-2 border-gray-300 rounded-2xl w-[85vw] pb-2 mt-4' 
        onPress={() => navigation.navigate('Restaurant', {
          data: data,
          userInfo: userInfo
        })}
      >
        <ImageBackground
            className='w-[85vw] h-[150px] ml-[-2px] mt-[-2px] overflow-hidden rounded-t-2xl'
            source={{uri: 'https://img.cdn4dd.com/cdn-cgi/image/fit=cover,width=1000,height=300,format=auto,quality=80/https://doordash-static.s3.amazonaws.com/media/store/header/f4382bb2-c3de-4c33-bb65-fa144e999906.jpg'}}
        />
        <View className="flex flex-row justify-between">

            <Text className="pl-4 pt-2 text-2xl font-medium my-auto">{data.name}</Text>
            <View>
              <Text className="pr-4 pt-2 text-md font-medium text-right">4.7 [stars]</Text>
              <Text className="pr-4 text-md font-medium text-right">2 mi [*] 10 min</Text>
            </View>
        </View>
      </TouchableOpacity>
  )
}

// Component to Show Active Orders

function OrderCard({navigation, data, userInfo}) {

  const [restaurant, setRestaurant] = useState([])

  const getRestaurants = () => {
    fetch(`http://sebackend-env.eba-tmkzmafs.us-east-1.elasticbeanstalk.com/getRestaurant/${data.restaurant}`)
    .then(async(res) => await res.json())
    .then((data) => {
      setRestaurant(data)
      console.log("Restaurant", restaurant)
    })
  }

  useEffect(() => {
    getRestaurants();
  }, [])
  

  return (
    <TouchableOpacity className='border-2 border-gray-300 rounded-2xl w-[85vw] pb-2 mt-4' 
      onPress={() => navigation.navigate('Order', {
        userInfo: userInfo,
        orderId: data.restaurant
      })}
    >
      <View className="flex flex-row justify-between">
          { restaurant && restaurant[0] && <Text className="pl-4 py-2 text-2xl font-medium my-auto">{restaurant[0].name}</Text>}
      </View>
      {/* Testing Map View for use in Order Screen and thumbnail view on Home Screen. These coords map to a Taco Bell. */}
      <View className="rounded-3xl overflow-hidden w-[75vw] mx-auto">
        { restaurant && restaurant[0] && <MapView
              initialRegion={{
              latitude: restaurant[0].xCor,
              longitude: restaurant[0].yCor,
              latitudeDelta: 0.000922,
              longitudeDelta: 0.000421,
              }}
              className='w-[85vw] mx-auto h-[200px] mt-[-2px] overflow-hidden border-gray-400 border-2'
          >
              <Marker
                  coordinate={{ latitude : restaurant[0].xCor , longitude : restaurant[0].yCor }}
              />
        </MapView>}
      </View>
      
      <View className="flex flex-row justify-between">
          <Text className="pl-4 pt-2 text-xl font-medium my-auto">On The Way</Text>
          <Text className="pr-4 pt-2 text-xl font-medium my-auto text-right">2 min</Text>
      </View>
    </TouchableOpacity>
  )
}

function HomeScreen({navigation, route}) {

  const { userId } = route.params;
  const [text, setText] = useState('have not called');

  const [restaurants, setRestaurants] = useState([]);
  const [orders, setOrders] = useState([]);

  const [address, setAddress] = useState("");

  const [userInfo, setUserInfo] = useState([]);

  const getText = () => {
    fetch('http://sebackend-env.eba-tmkzmafs.us-east-1.elasticbeanstalk.com/getRestaurant/4')
    .then(async(res) => await res.json())
    .then((data) => {
      console.log(data);
      setText(data[0].xCor);
    })
  }

  const getCurrentOrders = () => {
    fetch(`http://sebackend-env.eba-tmkzmafs.us-east-1.elasticbeanstalk.com/getCAllCurrentOrders/${userId}`)
    .then(async(res) => await res.json())
    .then(async (data) => {
      setOrders(data)
    })
  }

  const getRestaurants = () => {
    fetch('http://sebackend-env.eba-tmkzmafs.us-east-1.elasticbeanstalk.com/getRestaurant/4')
    .then(async(res) => await res.json())
    .then((data) => {
      setRestaurants(restaurants => [...restaurants, data[0]])
    })
    fetch('http://sebackend-env.eba-tmkzmafs.us-east-1.elasticbeanstalk.com/getRestaurant/5')
    .then(async(res) => await res.json())
    .then((data) => {
      setRestaurants(restaurants => [...restaurants, data[0]])
      console.log(data[0]);
    })
    fetch('http://sebackend-env.eba-tmkzmafs.us-east-1.elasticbeanstalk.com/getRestaurant/6')
    .then(async(res) => await res.json())
    .then((data) => {
      setRestaurants(restaurants => [...restaurants, data[0]])
    })
    
  }

  const getUserInfo = () => {
    fetch(`http://sebackend-env.eba-tmkzmafs.us-east-1.elasticbeanstalk.com/getUserByID/${userId}`)
    .then(async(res) => await res.json())
    .then((data) => {
      setUserInfo(data);
      console.log("pls", data);
    })
  }

  useEffect(() => {
    getRestaurants();
    getCurrentOrders();
  }, [])

  const isFocused = useIsFocused();

  useEffect(() => {
    getUserInfo();
    getCurrentOrders();
    console.log("reloaded")
  }, [isFocused])

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  let texte = 'Waiting..';
  if (errorMsg) {
    texte = errorMsg;
  } else if (location) {
    texte = JSON.stringify(location);
  }


  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      
      { userInfo.length ? <View className="flex-1 items-center justify-center bg-white">
        <View className='h-16'/>
        <View className='flex flex-row w-[85vw] justify-between mx-auto'>
          <View className='w-[65vw]'>
            <Text className="text-4xl font-bold">Welcome {userInfo[0].username.split(" ")[0]}</Text>
            <View className="flex flex-row">
              {location && <Text className="text-md font-bold">{location.coords.latitude}, {location.coords.longitude}</Text>}
              <Image 
                className='w-[20px] h-[20px] my-auto ml-2'
                source={{uri: 'https://www.freeiconspng.com/uploads/edit-editor-pen-pencil-write-icon--4.png'}}
              />
            </View>
          </View>
          <TouchableOpacity className='w-[60px] h-[60px] my-auto'
            onPress={() => {
              navigation.navigate('Profile', {
                userId: userId
              })}
            }
          >
            <Image 
              className='w-[60px] h-[60px] rounded-full'
              source={{uri: 'https://image.shutterstock.com/image-photo/stock-photo-close-up-headshot-portrait-of-smiling-s-caucasian-man-look-at-camera-posing-in-own-flat-or-250nw-1936610998.jpg'}}
              
            />
          </TouchableOpacity>
        </View>
        {orders.length > 0 && <Text className="text-3xl text-left w-[85vw] mt-8 font-medium">Active Orders</Text>}

        {orders.map((e, i) => {
          return (
            <OrderCard navigation={navigation} data={orders[i]} userInfo={userInfo}/>
          )
        })}
        

        <Text className="text-3xl text-left w-[85vw] mt-8 font-medium">Restaurants</Text>
        {/* Render all restaurants */}
        {/* <View className='h-4'/> */}
        { userInfo &&
          restaurants.map((e, i) => {
            return (
              <RestaurantCard navigation={navigation} data={restaurants[i]} userInfo={userInfo} />
            )
          })
        }

        {/* Dev Nav Buttons
        
        <Pressable onPress={() => getText()} className="bg-white w-full items-center py-5 rounded-xl">
          <Text className="font-medium text-xl">{texte}</Text>
        </Pressable> */}

      </View> 
      : <Text>Invalid login</Text>}    
    </ScrollView>
  )
}

export default HomeScreen