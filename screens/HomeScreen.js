import { ScrollView, Text, View, Pressable } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';

function HomeScreen({navigation}) {
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View className="flex-1 items-center justify-center bg-white">

        {/* Dev Nav Buttons */}
        <Pressable onPress={() => navigation.navigate('Restaurant')} className="bg-white w-full items-center py-5 rounded-xl">
          <Text className="font-medium text-xl">Taco Bell</Text>
        </Pressable>
        <Pressable onPress={() => navigation.navigate('Order')} className="bg-white w-full items-center py-5 rounded-xl">
          <Text className="font-medium text-xl">View Active Order</Text>
        </Pressable>
        <Pressable onPress={() => navigation.navigate('Login')} className="bg-white w-full items-center py-5 rounded-xl">
          <Text className="font-medium text-xl">Sign Out</Text>
        </Pressable>

        {/* Testing Map View for use in Order Screen and thumbnail view on Home Screen. These coords map to a Taco Bell. */}
        {/* <MapView
            initialRegion={{
            latitude: 33.12783688178995,
            longitude: -96.72796024170364,
            latitudeDelta: 0.000922,
            longitudeDelta: 0.000421,
            }}
            className='w-full h-[400px]'
        >
            <Marker
                coordinate={{ latitude : 33.12783688178995 , longitude : -96.72796024170364 }}
            />
        </MapView> */}
            

      </View>
    </ScrollView>
  )
}

export default HomeScreen