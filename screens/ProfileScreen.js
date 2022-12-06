import { useState, useEffect } from 'react';
import { ScrollView, Text, View, Pressable, TextInput, TouchableOpacity, TouchableWithoutFeedback, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import useDidMountEffect from '../hooks/useDidMountEffect';
import Icon from 'react-native-vector-icons/Ionicons';


function RadioButton(props) {
    return (
        <View className='rounded-full h-7 w-7 bg-black'>
            <View className='rounded-full h-6 w-6 bg-white my-auto mx-auto'>
                { props.selected && <View className='rounded-full h-4 w-4 bg-black my-auto mx-auto' />}
            </View>
        </View>
    )
}


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
    const [phone, setPhone] = useState('');

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

    const changePhone = () => {
        fetch(`http://sebackend-env.eba-tmkzmafs.us-east-1.elasticbeanstalk.com/updateUserPhone/${userInfo[0].id}/${phone}/`)
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
        <View className='w-[85vw] h-full mx-auto'>
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
            {modifyEmail 
                ? <View className='flex flex-row mt-2 justify-between'>
                    <View className='flex flex-row'>
                        <Text className='text-xl'>Email: </Text>
                        { userInfo[0].email 
                            ? <TextInput autoCapitalize="none" className='text-xl bg-white w-[57.5vw] h-6 rounded-full pl-3 pt-[-100px] my-auto'
                                onChangeText={(text) => {
                                    setEmail(text.toLowerCase());
                                }}
                                placeholder={userInfo[0].email}
                            />
                            : <TextInput autoCapitalize="none" className='text-xl bg-white w-[57.5vw] h-6 rounded-full pl-3 pt-[-100px] my-auto'
                            onChangeText={(text) => {
                                setEmail(text.toLowerCase());
                            }}
                            placeholder="Set Email"
                            />
                        }
                            
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
                    {userInfo[0].email 
                    ? <Text className='text-xl font'>Email: {userInfo[0].email}</Text>
                    : <Text className='text-xl font'>Email: Set Email Address</Text>}
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
                </View>
            }
            {modifyPhone
                ? <View className='flex flex-row mt-2 justify-between'>
                    <View className='flex flex-row'>
                        <Text className='text-xl'>Phone: </Text>
                        { userInfo[0].phone_number 
                            ? <TextInput autoCapitalize="none" className='text-xl bg-white w-[57.5vw] h-6 rounded-full pl-3 pt-[-100px] my-auto'
                                onChangeText={(text) => {
                                    setPhone(text.toLowerCase());
                                }}
                                placeholder={userInfo[0].phone_number}
                            />
                            : <TextInput autoCapitalize="none" className='text-xl bg-white w-[57.5vw] h-6 rounded-full pl-3 pt-[-100px] my-auto'
                            onChangeText={(text) => {
                                setPhone(text.toLowerCase());
                            }}
                            placeholder="Set Phone Number"
                            />
                        }
                            
                    </View>
                    {/* Approve Change */}
                    <TouchableOpacity className='w-[25px] h-[25px] my-auto mr-[-5px]'
                        onPress={() => {
                            changePhone();
                            setUpdate(update + 1);
                            setModifyPhone(false);
                        }}
                    >
                        <Image 
                            className='w-[25px] h-[25px]'
                            source={require('../images/checkmark.png')}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity className='w-[20px] h-[20px] my-auto'
                        onPress={() => {
                            setModifyPhone(false)
                        }}
                    >
                        <Image 
                            className='w-[20px] h-[20px]'
                            source={require('../images/xMark.png')}
                        />
                    </TouchableOpacity>
                </View>
                : <View className='flex flex-row mt-2 justify-between'>
                    {userInfo[0].phone_number 
                    ? <Text className='text-xl font'>Phone: {userInfo[0].phone_number}</Text>
                    : <Text className='text-xl font'>Phone: Set Phone Number</Text>}
                    <TouchableOpacity className='w-[20px] h-[20px] my-auto'
                        onPress={() => {
                            setModifyPhone(true)
                        }}
                    >
                        <Image 
                            className='w-[20px] h-[20px]'
                            source={{uri: 'https://www.freeiconspng.com/uploads/edit-editor-pen-pencil-write-icon--4.png'}}
                        />
                    </TouchableOpacity>
                </View>
            }
            
            {/* <Text className='text-xl mt-2 font'>Addresses: </Text>

            <RadioButton selected={true} />
            <RadioButton selected={false} />

            <RadioButton selected={false} /> */}

            <Pressable onPress={() => navigation.navigate('OrderHistory')} className="bg-blue-500 w-[65vw] items-center py-5 mt-[45vh] rounded-xl mx-auto">
                <Text className="font-bold text-xl text-white">View Order History</Text>
            </Pressable>
            <Pressable onPress={() => navigation.navigate('Initial')} className="bg-red-500 w-[65vw] items-center py-5 mt-4 rounded-xl mx-auto">
                <Text className="font-bold text-xl text-white">Sign Out</Text>
            </Pressable>
            
        </View>
        : <Text>Loading...</Text>
        }
        
    </View>
  )
}

export default ProfileScreen