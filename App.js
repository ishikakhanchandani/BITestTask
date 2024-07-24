import { NavigationContainer } from "@react-navigation/native";
import SigninScreen from "./components/screens/SigninScreen";
import SignUpScreen from "./components/screens/SignupScreen";
import SplashScreen from "./components/screens/SplashScreen";
import HomeScreen from "./components/screens/HomeScreen";
import CartScreen from "./components/screens/CartScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

function App(){
  return (
    <NavigationContainer>
         <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
          <Stack.Screen name="SigninScreen" component={SigninScreen} />
          <Stack.Screen name="SignupScreen" component={SignUpScreen} />
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="CartScreen" component={CartScreen} />
         </Stack.Navigator>
    </NavigationContainer>
  );
}


export default App;
