import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './app/screens/Login';
import Register from './app/screens/Register';
import Home from './app/screens/Home';
import { StoreProvider } from './app/context/useStore';

const stack = createNativeStackNavigator()

export default function App() {
  return (
    <StoreProvider>
      <NavigationContainer>
        <stack.Navigator screenOptions={{headerShown: false}}>
          <stack.Screen name="Login" component={Login}/>
          <stack.Screen name="Register" component={Register}/>
          <stack.Screen name="Home" component={Home}/>
        </stack.Navigator>
      </NavigationContainer>
    </StoreProvider>
  );
}
