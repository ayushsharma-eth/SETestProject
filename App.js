import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import all screens
import LoginScreen from './screens/LoginScreen'
import HomeScreen from './screens/HomeScreen';
import RestaurantScreen from './screens/RestaurantScreen';
import OrderScreen from './screens/OrderScreen';

// App navigation use stack system, pages are push on top of another and can be popped off with back button
const Stack = createNativeStackNavigator();

// NOTE: Never push Maps API key onto GitHub


// The Restaurant and Order Screens will be generalized with props
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='LoginScreen'>
        <Stack.Screen name='Login' component={LoginScreen} options={{headerShown: false}}/>
        <Stack.Screen name='Home' component={HomeScreen} options={{headerShown: false}}/>
        <Stack.Screen name='Restaurant' component={RestaurantScreen} options={{headerShown: false}}/>
        <Stack.Screen name='Order' component={OrderScreen} options={{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}