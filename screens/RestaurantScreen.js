import { ScrollView, Text, View, Pressable, ImageBackground, Image } from 'react-native';
import { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TouchableOpacity } from 'react-native-web';

// Component to handle generic meal cards. (These appear as menu items on the Restaurant screen)

// image: "url"
// https://image.shutterstock.com/image-photo/stock-photo-close-up-headshot-portrait-of-smiling-s-caucasian-man-look-at-camera-posing-in-own-flat-or-250nw-1936610998.jpg
// https://img.cdn4dd.com/cdn-cgi/image/fit=cover,width=1000,height=300,format=auto,quality=80/https://doordash-static.s3.amazonaws.com/media/store/header/f4382bb2-c3de-4c33-bb65-fa144e999906.jpg
function MealCard({data, quantity, updateQuantity, index}) {

    return (
        <View className='border-2 border-gray-300 rounded-2xl w-[85vw] pb-2 mb-8'>
            <ImageBackground
                className='w-[85vw] h-[100px] ml-[-2px] mt-[-2px] overflow-hidden rounded-t-2xl'
                source={{uri: 'https://img.cdn4dd.com/cdn-cgi/image/fit=cover,width=1000,height=300,format=auto,quality=80/https://doordash-static.s3.amazonaws.com/media/store/header/f4382bb2-c3de-4c33-bb65-fa144e999906.jpg'}}
            />
            <View className="flex flex-row justify-between">
                <View>
                    <Text className="pl-4 pt-2 text-2xl font-medium">{data.name} </Text>
                    <Text className="pl-4 text-lg font-medium">${data.cost}</Text>
                </View>
                <View className="my-auto">
                    {!quantity ? // Greater than 0
                        
                        <Pressable className="bg-blue-500 py-2 px-5 mt-2 mr-2 items-center rounded-full" 
                            onPress={() => {
                                quantity++;
                                updateQuantity(quantity, index);
                            }}
                        >
                            <Text className="font-medium text-white text-md">
                                Add
                            </Text>
                        </Pressable>
                        : 
                        <View className="flex flex-row w-[80px] py-2 justify-between mt-2 mr-2 rounded-full border-gray-300 border-2">
                            <Pressable className="pl-3"
                                onPress={() => {
                                    quantity++;
                                    updateQuantity(quantity, index);
                                }}
                            >
                                <Text className="text-md my-auto">+</Text>
                            </Pressable>
                            <Text className="text-lg my-auto">{quantity}</Text>
                            <Pressable className="pr-3"
                                onPress={() => {
                                    quantity--;
                                    updateQuantity(quantity, index);
                                }}
                            >
                                <Text className="text-md my-auto">-</Text>
                            </Pressable>

                        </View>
                    }
                </View>
            </View>
        </View>
    )
}

// Displays Restaurant Menu
function RestaurantScreen({navigation, route}) {

  const { data } = route.params;
  const [ menu, setMenu ] = useState([]);
  const [ quantities, setQuantities ] = useState([]);


  const updateQuantity = (quantity, index) => {
    let temp = quantities;
    temp[index] = quantity;
    setQuantities([...temp]);
    console.log(quantities[index]);
  }

  const getMenu = () => {
    fetch(`http://127.0.0.1:3000/getRMenu/${data.idRestaurant}`)
    .then(async(res) => await res.json())
    .then((data) => {
      setMenu(data[0]);
      // Create array with size of Menu so that it can store quantity of each meal the customer wants (default 0)
      let temp = [];
      for (var i = 0; i < data[0].length; i++) {
        temp.push(0);
      }
      setQuantities(temp);
    })
  }

  useEffect(() => {
    getMenu()
  }, [])
  

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="bg-white">
        {/* Top View is a banner image with text */}
        <View className="flex-1 items-center bg-white">
        <ImageBackground
            className='w-[100vw] h-[250px] pt-[100px]'
            source={{uri: 'https://img.cdn4dd.com/cdn-cgi/image/fit=cover,width=1000,height=300,format=auto,quality=80/https://doordash-static.s3.amazonaws.com/media/store/header/f4382bb2-c3de-4c33-bb65-fa144e999906.jpg'}}
        >
            <View style={{position: 'absolute', left: 10, bottom: 10, justifyContent: 'center', alignItems: 'center'}}>
            <Text className='text-5xl text-white font-bold'>{data.name}</Text>
            </View>
        </ImageBackground>
        
        {/* Example Meal Cards to See List*/}

        <View className='mt-8' />

        { menu && quantities &&
          menu.map((e, i) => {
            return (
                <MealCard data={menu[i]} quantity={quantities[i]} updateQuantity={updateQuantity} index={i}/>
            )
          })
        }

        {/* Dev Button for nav before custom back button is added */}
        <Pressable onPress={() => navigation.navigate('Home')} className="bg-white w-full items-center py-5 rounded-xl">
          <Text className="font-medium text-xl">Home</Text>
        </Pressable>
        </View>
    </ScrollView>
  )
}

export default RestaurantScreen