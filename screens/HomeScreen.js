import { ScrollView, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

function HomeScreen() {
  return (
    <ScrollView>
      <View className="flex-1 items-center justify-center bg-white">
        <Text className="text-red-500">Home Screen!</Text>
        <Text className="text-red-500">Home Screen!</Text>
        <Text className="text-red-500">Home Screen!</Text>
      </View>
    </ScrollView>
  )
}

export default HomeScreen