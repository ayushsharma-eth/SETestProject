import { ScrollView, Text, View, Pressable } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

function HomeScreen({navigation}) {
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View className="flex-1 items-center justify-center bg-white">
        <Text className="text-red-500">Home Screen!</Text>
        <Text className="text-red-500">Home Screen!</Text>
        <Text className="text-red-500">Home Screen!</Text>
        <Pressable onPress={() => navigation.navigate('Restaurant')} className="bg-white w-full items-center py-5 rounded-xl">
          <Text className="font-medium text-xl">Taco Bell</Text>
        </Pressable>
      </View>
    </ScrollView>
  )
}

export default HomeScreen