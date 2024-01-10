import { NavigationContainer } from '@react-navigation/native';
import Home from './pages/home';
import Login from './pages/login';
import { createStackNavigator } from '@react-navigation/stack';
import useAuth from './hooks/useAuth';
import Register from './pages/register';


const Stack = createStackNavigator()

export default function GuardNavigator() {
    const auth = useAuth()
    return (
        <NavigationContainer>
            <Stack.Navigator>
                {
                    auth.user == null ?
                        <>

                            <Stack.Screen name='Login' component={Login} options={{
                                headerShown: false
                            }} />
                            <Stack.Screen name='Register' component={Register} options={{
                                headerShown: false
                            }} />
                        </>
                        :
                        <>
                            <Stack.Screen name='Home' component={Home} options={{
                                headerShown: false
                            }} />
                        </>
                }
            </Stack.Navigator>
        </NavigationContainer>
    )
}