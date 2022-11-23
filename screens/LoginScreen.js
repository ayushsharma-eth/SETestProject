import { useState, useEffect } from 'react';
import { ScrollView, Text, View, Pressable, Button, TextInput, ImageBackground, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


function LoginScreen({navigation}) {

  const [errorMessage, setErrorMessage] = useState("");
  const [userName, setUserName] = useState(""); //could be either email or phone number
  const [password, setPassword] = useState("");

  const loginUser = () => {

    if (userName && password) {

        if (userName.includes("@")) {
            console.log(userName, password);
            fetch(`http://127.0.0.1:3000/loginUserByEmail/${userName}/${password}`)
            .then(async(res) => await res.json())
            .then(async (data) => {
                if (data == "Invalid User Name or Password")
                {
                    setErrorMessage("Invalid User Name or Password")
                }
                else
                {
                    navigation.navigate('Home', {
                        userInfo: data
                    })
                }
            })
        } else {
            if (userName==="dev") { // Dev access to skip login
                console.log("Dev access")
                fetch(`http://127.0.0.1:3000/loginUserByEmail/dev@foodys.com/dev/`)
                .then(async(res) => await res.json())
                .then(async (data) => {
                    if (data == "Invalid User Name or Password")
                    {
                        setErrorMessage("Invalid User Name or Password")
                    }
                    else
                    {
                        navigation.navigate('Home', {
                            userInfo: data
                        })
                    }
                })
            } 
            else 
            {
                fetch(`http://127.0.0.1:3000/loginUserByPhone/${userName}/${password}`)
                .then(async(res) => await res.json())
                .then((data) => {
                    if (data == "Invalid User Name or Password")
                    {
                        setErrorMessage("Invalid User Name or Password")
                    }
                    else
                    {
                        navigation.navigate('Home', {
                            userInfo: data
                        })
                    }
                })
            }
        }
    }
    else if (userName)
    {
        setErrorMessage("Enter Password")
    }
    else
    {
        setErrorMessage("Enter Email or Phone Number")
    }
  }



  return (
    <View className="flex-1 bg-blue-500 items-center justify-center">
      <View className="flex-1 items-center mt-[30vh]">
        {errorMessage &&
        <View className="bg-red-500 rounded-2xl w-[80vw] p-4 items-center justify-center mb-4">
            <Text className="text-lg text-white font-bold">
                Error: {errorMessage}
            </Text>
        </View>
        }
        <TextInput className="w-[80vw] h-[50px] bg-white rounded-full p-4 mb-4 text-red-300" placeholder="Email or Phone Number" 
            onChangeText={(text) => {
                setUserName(text.toLowerCase());
            }}
        />
        <TextInput className="w-[80vw] h-[50px] bg-white rounded-full p-4 mb-8 text-red-300" placeholder="Password" 
            onChangeText={(text) => {
                setPassword(text);
            }}
        />
        <Pressable onPress={() => loginUser()} className="bg-white w-[80vw] items-center py-5 mb-5 rounded-full">
          <Text className="font-medium text-xl">Login</Text>
        </Pressable>
      </View>
    </View>
  )
}

export default LoginScreen