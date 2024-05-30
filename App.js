import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Main from "./src/components/tabs/Main";
import Cart from './src/components/Cart';
import Intro from './src/components/Intro';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Intro" component={Intro} options={{headerShown: false}} /> 
        <Stack.Screen name="Main"
          component={Main} 
          options={{ headerShown: false }} />
        <Stack.Screen name="Cart"
          component={Cart}
          options={{ headerTitle: 'Carrito'}} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}


