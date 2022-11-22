import { useState, useEffect } from 'react';
import { ScrollView, Text, View, Pressable, Button, TextInput, ImageBackground, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


function SignUpScreen({navigation}) {

  const [errorMessage, setErrorMessage] = useState("example");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");

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
        {/* Display error message if password and repassword do not match */}
        {password && repassword && password != repassword &&
        <View className="bg-red-500 rounded-2xl w-[80vw] p-4 items-center justify-center mb-4">
            <Text className="text-lg text-white font-bold">
                Error: Passwords Do Not Match
            </Text>
        </View>
        }
        <View className="flex flex-row justify-between w-[80vw]">
            <TextInput className="w-[39vw] h-[50px] bg-white rounded-full p-4 mb-4 text-red-300" placeholder="First Name" 
            
            />
            <TextInput className="w-[39vw] h-[50px] bg-white rounded-full p-4 mb-4 text-red-300" placeholder="Last Name" 
            
            />
        </View>
        <TextInput className="w-[80vw] h-[50px] bg-white rounded-full p-4 mb-4 text-red-300" placeholder="Email or Phone Number" 
        onChangeText={(text) => {
            if (text.includes("@")) {
                setEmail(text.toLowerCase());
            } else {
                setPhoneNumber(text);
            }
        }}
        />
        <View className="bg-orange-400 rounded-2xl w-[80vw] p-4 items-center justify-center mb-4">
            <Text className="text-white font-bold">Passwords must contain at least one capital letter and one special character</Text>
        </View>
        <TextInput className="w-[80vw] h-[50px] bg-white rounded-full p-4 mb-4 text-red-300" placeholder="Password" 
        onChangeText={(text) => {
            setPassword(text);
        }}
        />
        <TextInput className="w-[80vw] h-[50px] bg-white rounded-full p-4 mb-8 text-red-300" placeholder="Re-Enter Password" 
        onChangeText={(text) => {
            setRepassword(text);
        }}
        />
        <Pressable onPress={() => navigation.navigate('Login')} className="bg-white w-[80vw] items-center py-5 mb-5 rounded-full">
          <Text className="font-medium text-xl">Sign Up</Text>
        </Pressable>
      </View>
    </View>
  )
}

export default SignUpScreen