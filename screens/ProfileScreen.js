import { useState, useEffect } from 'react';
import { ScrollView, Text, View, Pressable, TextInput, TouchableOpacity, TouchableWithoutFeedback, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import useDidMountEffect from '../hooks/useDidMountEffect';
import Icon from 'react-native-vector-icons/Ionicons';



function ProfileScreen({navigation, route}) {

    const { userId } = route.params;

    const [userInfo, setUserInfo] = useState([]);

    const [modifyName, setModifyName] = useState(false);
    const [modifyPhone, setModifyPhone] = useState(false);
    const [modifyEmail, setModifyEmail] = useState(false);
    const [modifyAddresses, setModifyAddresses] = useState(false);

    const [update, setUpdate] = useState(0);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    navigation.setOptions({
        headerShown: true,
        headerTitle: "",
        headerTransparent: true,
        headerMode: "screen",
        headerLeft: () => {
            return (
            <TouchableWithoutFeedback 
                onPress={() => navigation.navigate('Home', {
                userId: userId
            })}
            >
            <Icon name="ios-arrow-back" size={56} color="#000" />
            </TouchableWithoutFeedback>
            )
        }
    })

    const getUserInfo = () => {
        fetch(`http://sebackend-env.eba-tmkzmafs.us-east-1.elasticbeanstalk.com/getUserByID/${userId}`)
        .then(async(res) => await res.json())
        .then((data) => {
          setUserInfo(data);
          console.log("UserId", userId);
          console.log("pls", data);
        })
    }

    const changeName = () => {
        fetch(`http://sebackend-env.eba-tmkzmafs.us-east-1.elasticbeanstalk.com/updateUserName/${userInfo[0].id}/${name}`)
        .then(async(res) => await res.json())
        .then((data) => {
            console.log(data);
        })
    }

    const changeEmail = () => {
        fetch(`http://sebackend-env.eba-tmkzmafs.us-east-1.elasticbeanstalk.com/updateUserEmail/${userInfo[0].id}/${email}/${userInfo[0].password}`)
        .then(async(res) => await res.json())
        .then((data) => {
            console.log(data);
        })
    }

    useEffect(() => {
        getUserInfo();
    }, [update])

  return (
    <View>
        <View className='h-32'/>
        { userInfo.length ? 
        <View className='w-[85vw] mx-auto'>
            <Text className='text-5xl font-medium'>Profile</Text>
            {modifyName 
                ? <View className='flex flex-row mt-8 justify-between'>
                    <View className='flex flex-row'>
                        <Text className='text-xl'>Name: </Text>
                        <TextInput className='text-xl bg-white w-[57.5vw] h-6 rounded-full pl-3 pt-[-100px] my-auto'
                            onChangeText={(text) => {
                                setName(text);
                            }}
                            placeholder={userInfo[0].username}
                        >
                            
                        </TextInput>
                    </View>
                    {/* Approve Change */}
                    <TouchableOpacity className='w-[25px] h-[25px] my-auto mr-[-5px]'
                        onPress={() => {
                            changeName();
                            setUpdate(update + 1);
                            setModifyName(false);
                        }}
                    >
                        <Image 
                            className='w-[25px] h-[25px]'
                            source={require('../images/checkmark.png')}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity className='w-[20px] h-[20px] my-auto'
                        onPress={() => {
                            setModifyName(false)
                        }}
                    >
                        <Image 
                            className='w-[20px] h-[20px]'
                            source={require('../images/xMark.png')}
                        />
                    </TouchableOpacity>
                </View>
                : <View className='flex flex-row mt-8 justify-between'>
                    <Text className='text-xl font'>Name: {userInfo[0].username}</Text>
                    <TouchableOpacity className='w-[20px] h-[20px] my-auto'
                        onPress={() => {
                            setModifyName(true)
                        }}
                    >
                        <Image 
                            className='w-[20px] h-[20px]'
                            source={{uri: 'https://www.freeiconspng.com/uploads/edit-editor-pen-pencil-write-icon--4.png'}}
                        />
                    </TouchableOpacity>
                </View>
            }
            {userInfo[0].email
            ?  (modifyEmail 
                ? <View className='flex flex-row mt-2 justify-between'>
                    <View className='flex flex-row'>
                        <Text className='text-xl'>Email: </Text>
                        <TextInput className='text-xl bg-white w-[57.5vw] h-6 rounded-full pl-3 pt-[-100px] my-auto'
                            onChangeText={(text) => {
                                setEmail(text.toLowerCase());
                            }}
                            placeholder={userInfo[0].email}
                        >
                            
                        </TextInput>
                    </View>
                    {/* Approve Change */}
                    <TouchableOpacity className='w-[25px] h-[25px] my-auto mr-[-5px]'
                        onPress={() => {
                            changeEmail();
                            setUpdate(update + 1);
                            setModifyEmail(false);
                        }}
                    >
                        <Image 
                            className='w-[25px] h-[25px]'
                            source={require('../images/checkmark.png')}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity className='w-[20px] h-[20px] my-auto'
                        onPress={() => {
                            setModifyEmail(false)
                        }}
                    >
                        <Image 
                            className='w-[20px] h-[20px]'
                            source={require('../images/xMark.png')}
                        />
                    </TouchableOpacity>
                </View>
                : <View className='flex flex-row mt-2 justify-between'>
                    <Text className='text-xl font'>Email: {userInfo[0].email}</Text>
                    <TouchableOpacity className='w-[20px] h-[20px] my-auto'
                        onPress={() => {
                            setModifyEmail(true)
                        }}
                    >
                        <Image 
                            className='w-[20px] h-[20px]'
                            source={{uri: 'https://www.freeiconspng.com/uploads/edit-editor-pen-pencil-write-icon--4.png'}}
                        />
                    </TouchableOpacity>
                </View>)
            :  <Text className='text-xl mt-2 font'>Email: Set Email</Text> }
            {userInfo[0].phone_number 
            ?  (modifyPhone 
                ? <View className='flex flex-row mt-2 justify-between'>
                    <Text className='text-xl font'>Phone: {userInfo[0].phone_number}</Text>
                    <Image 
                        className='w-[20px] h-[20px] my-auto'
                        source={{uri: 'https://www.freeiconspng.com/uploads/edit-editor-pen-pencil-write-icon--4.png'}}
                    />
                </View>
                : <View className='flex flex-row mt-2 justify-between'>
                    <Text className='text-xl font'>Phone: {userInfo[0].phone_number}</Text>
                    <TouchableOpacity className='w-[20px] h-[20px] my-auto'
                        onPress={() => {
                        navigation.navigate('Home', {
                            userInfo: userInfo
                        })}
                        }
                    >
                        <Image 
                            className='w-[20px] h-[20px]'
                            source={{uri: 'https://www.freeiconspng.com/uploads/edit-editor-pen-pencil-write-icon--4.png'}}
                        />
                    </TouchableOpacity>
                </View>)
            :  <View className='flex flex-row mt-2 justify-between'>
                <Text className='text-xl font'>Phone: Set Phone Number</Text>
                <TouchableOpacity className='w-[20px] h-[20px] my-auto'
                    onPress={() => {
                    navigation.navigate('Home', {
                        userInfo: userInfo
                    })}
                    }
                >
                    <Image 
                        className='w-[20px] h-[20px]'
                        source={{uri: 'https://www.freeiconspng.com/uploads/edit-editor-pen-pencil-write-icon--4.png'}}
                    />
                </TouchableOpacity>
            </View> }
            
            <Text className='text-xl mt-2 font'>Addresses: </Text>
        </View>
        : <Text>Loading...</Text>
        }
        
    </View>
  )
}

export default ProfileScreen