import { ScrollView, Text, View, Pressable, ImageBackground, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

function MealCard() {
    return (
        <View className='border-2 border-gray-300 rounded-2xl w-[85vw] pb-2 mb-8'>
            <ImageBackground
                className='w-[85vw] h-[100px] ml-[-2px] mt-[-2px] overflow-hidden rounded-t-2xl'
                source={{uri: 'https://img.cdn4dd.com/cdn-cgi/image/fit=cover,width=1000,height=300,format=auto,quality=80/https://doordash-static.s3.amazonaws.com/media/store/header/f4382bb2-c3de-4c33-bb65-fa144e999906.jpg'}}
            />
            <View className="flex flex-row justify-between">
                <Text className="pl-4 pt-2 text-2xl font-medium">3 Taco Meal</Text>
                <Pressable className="bg-red-300 py-2 px-5 mt-2 mr-4 items-center rounded-xl">
                     <Text className="font-medium text-md">Add</Text>
                </Pressable>
            </View>
        </View>
    )
}

function RestaurantScreen({navigation}) {
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="bg-white">
        <View className="flex-1 items-center bg-white">
        <ImageBackground
            className='w-[100vw] h-[250px] pt-[100px]'
            source={{uri: 'https://img.cdn4dd.com/cdn-cgi/image/fit=cover,width=1000,height=300,format=auto,quality=80/https://doordash-static.s3.amazonaws.com/media/store/header/f4382bb2-c3de-4c33-bb65-fa144e999906.jpg'}}
        >
            <View style={{position: 'absolute', left: 10, bottom: 10, justifyContent: 'center', alignItems: 'center'}}>
            <Text className='text-5xl text-white font-bold'>Taco Bell</Text>
            </View>
        </ImageBackground>
        <View className='mt-8'>
            <MealCard />
            <MealCard />
            <MealCard />
            <MealCard />
            <MealCard />
            <MealCard />
        </View>

        <Pressable onPress={() => navigation.navigate('Home')} className="bg-white w-full items-center py-5 rounded-xl">
          <Text className="font-medium text-xl">Home</Text>
        </Pressable>
        </View>
    </ScrollView>
  )
}

export default RestaurantScreen