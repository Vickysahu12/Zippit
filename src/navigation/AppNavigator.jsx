import 'react-native'
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"

import SplashScreen from "../screens/SplashScreen"
import LoginScreen from "../screens/LoginScreen"
import RegisterScreen from "../screens/RegisterScreen"

const Stack = createStackNavigator();


const AppNavigator = () => {
    return(
        <NavigationContainer>
            <Stack.Navigator
             initialRouteName="Splash"
             screenOptions={{
                headerShown:false,
                cardStyleInterpolator: ({ current: { progress } }) => ({
                  cardStyle: {
                  opacity: progress,
               },
              }),
             }}
            >
                <Stack.Screen name="Splash" component={SplashScreen}/>
                <Stack.Screen name="Login" component={LoginScreen}/>
                <Stack.Screen name='Register' component={RegisterScreen}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AppNavigator