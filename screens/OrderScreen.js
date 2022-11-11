import { Image, Text, View, Pressable } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MapView from 'react-native-maps';

import { Marker } from 'react-native-maps';

// Phone Icon: https://iconsplace.com/wp-content/uploads/_icons/ffffff/256/png/phone-icon-18-256.png
// images/text_icon.png
export default function OrderScreen({navigation}) {

  const statusMessage = "Driving to Restaurant" // get from Server
  const ETA = "10:15 am" // get from Server

  return (
    <View>
        {/* Nav (white bar with back button) */}
        {/* Full Screen Map, centered on restaurant initially */}
        
        <MapView
            initialRegion={{
            latitude: 33.12783688178995,
            longitude: -96.72796024170364,
            latitudeDelta: 0.000922,
            longitudeDelta: 0.000421,
            }}
            className='w-full h-[100vh] relative'
        >
            <Marker
                coordinate={{ latitude : 33.12783688178995 , longitude : -96.72796024170364 }}
            />
        </MapView>

        {/* Dev Nav */}
        {/* <Pressable onPress={() => navigation.navigate('Home')} className="bg-white w-full items-center py-5 rounded-xl">
          <Text className="font-medium text-xl">Home</Text>
        </Pressable> */}

        <View style={{position: 'absolute',  bottom: 85, left: 0, right: 0, justifyContent: 'center', alignItems: 'center'}}>
            <View className="w-[85vw] h-[300px] bg-[#FAF9F6] mx-auto rounded-3xl border-[1px]">
                <Text className='text-3xl text-black font-bold pl-5 pt-7 mb-[-20px]'>{statusMessage}</Text>
                <Text className='text-lg text-black font-medium pl-5 pt-7'>Estimated Arrival Time: {ETA}</Text>
                {/* Spacer */}
                <View className="flex-1"></View>
                {/* Driver Card (Picture, Name, Contact Buttons) */}
                <View className='w-full flex flex-row px-[5vw] justify-between'>
                    <View className="flex flex-row">
                        <Image 
                            className='w-[60px] h-[60px] rounded-full mb-4 mr-4'
                            source={{uri: 'https://image.shutterstock.com/image-photo/stock-photo-close-up-headshot-portrait-of-smiling-s-caucasian-man-look-at-camera-posing-in-own-flat-or-250nw-1936610998.jpg'}}
                        />
                        <Text className='mx-auto text-2xl mt-3'>
                            John Smith
                        </Text>
                    </View>
                    <View className="flex flex-row">
                        <Pressable onPress={() => navigation.navigate('Home')} className="bg-blue-500 w-[45px] h-[45px] mt-2 justify-center items-center mr-2 rounded-full">
                            <Image 
                                className='w-[25px] h-[25px]'
                                source={{uri: 'https://iconsplace.com/wp-content/uploads/_icons/ffffff/256/png/phone-icon-18-256.png'}}
                            />
                        </Pressable>
                        <Pressable onPress={() => navigation.navigate('Home')} className="bg-blue-500 w-[45px] h-[45px] mt-2 justify-center items-center rounded-full">
                            <Image 
                                className='w-[25px] h-[25px]'
                                source={require('../images/text_icon.png')}
                            />
                        </Pressable>
                    </View>
                </View>
                {/* View Order Button */}
                <Pressable onPress={() => navigation.navigate('Home')} className="bg-blue-500 w-[75vw] mx-auto items-center py-5 rounded-xl mb-5">
                    <Text className="font-medium text-white text-xl">View Order</Text>
                </Pressable>
            </View>
        </View>
    </View>
  )
}