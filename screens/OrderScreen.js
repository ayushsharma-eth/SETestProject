import { ScrollView, Text, View, Pressable } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';

export default function OrderScreen({navigation}) {
  return (
    <View>
        {/* Full Screen Map, centered on restaurant initially */}
        <MapView
            initialRegion={{
            latitude: 33.12783688178995,
            longitude: -96.72796024170364,
            latitudeDelta: 0.000922,
            longitudeDelta: 0.000421,
            }}
            className='w-full h-[90vh]'
        >
            <Marker
                coordinate={{ latitude : 33.12783688178995 , longitude : -96.72796024170364 }}
            />
        </MapView>
        <Pressable onPress={() => navigation.navigate('Home')} className="bg-white w-full items-center py-5 rounded-xl">
          <Text className="font-medium text-xl">Home</Text>
        </Pressable>

        <View style={{position: 'absolute', left: 10, bottom: 10, justifyContent: 'center', alignItems: 'center'}}>
            <Text className='text-5xl text-white font-bold'>Taco Bell</Text>
        </View>
    </View>
  )
}
