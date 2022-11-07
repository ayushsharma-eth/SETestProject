import { ScrollView, Text, View, Pressable } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

function LoginScreen({navigation}) {
  return (
    <View className="flex-1 bg-blue-500 items-center justify-center">

      <View className="flex-1 items-center justify-center">
        <Text className='text-xl'>[Customer App]</Text>
        <Text className='text-xl'>Logo Goes Here</Text>
      </View>
      <View className="w-[80vw] mb-20">
        <Pressable onPress={() => navigation.navigate('Home')} className="bg-white w-full items-center py-5 mb-5 rounded-xl">
          <Text className="font-medium text-xl">Login</Text>
        </Pressable>
        <Pressable onPress={() => navigation.navigate('Home')} className="bg-white w-full items-center py-5 rounded-xl">
          <Text className="font-medium text-xl">Sign Up</Text>
        </Pressable>
      </View>
    </View>
  )
}

export default LoginScreen