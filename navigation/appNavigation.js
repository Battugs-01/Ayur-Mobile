import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import LoginScreen from "../screens/LoginScreen";
import SignUpScreen from "../screens/SignUpScreen";
import { Home, MapPin, PhoneCall } from "lucide-react-native";
import DriverScreen from "../screens/DriverScreen";
import DoctorScreen from "../screens/DoctorScreen";
import UserHomeScreen from "../screens/UserHomeScreen";
import DriverUserScreen from "../screens/DriverUserScreen";
import DoctorUserScreen from "../screens/DoctorUserScreen";
import UserDoctorScreen from "../screens/UserDoctorScreen";
import ChatScreen from "../screens/ChatSCreen";
import DriverHomeScreen from "../screens/DriveHomeSCreen";
import DoctorHomeScreen from "../screens/DoctorHomeScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const UserHomeStack = () => (
  <Tab.Navigator>
    <Tab.Screen
      name="Нүүр"
      options={{
        tabBarLabel: "Нүүр",
        tabBarIcon: ({ color, size }) => <Home fill="#3caea3" stroke="white" />
      }}
      component={UserHomeScreen}
    />

    {/* user  */}
  </Tab.Navigator>
);

const DriverHomeStack = () => (
  <Tab.Navigator>
    <Tab.Screen
      name="Жолоочийн Нүүр"
      options={{
        tabBarLabel: "Жолоочийн Нүүр",
        tabBarIcon: ({ color, size }) => <Home fill="#3caea3" stroke="white" />
      }}
      component={DriverHomeScreen}
    />
  </Tab.Navigator>
);

const DoctorHomeStack = () => (
  <Tab.Navigator>
    <Tab.Screen
      name="Эмчийн Нүүр"
      options={{
        tabBarLabel: "Эмчийн Нүүр",
        tabBarIcon: ({ color, size }) => <Home fill="#3caea3" stroke="white" />
      }}
      component={DoctorHomeScreen}
    />
  </Tab.Navigator>
);

const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen
          name="Welcome"
          options={{ headerShown: false }}
          component={WelcomeScreen}
        />
        <Stack.Screen
          name="Login"
          options={{ headerShown: false }}
          component={LoginScreen}
        />
        <Stack.Screen
          name="SignUp"
          options={{ headerShown: false }}
          component={SignUpScreen}
        />
        <Stack.Screen
          name="Home"
          component={UserHomeStack}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="DriverHome"
          component={DriverHomeStack}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="DoctorHome"
          component={DoctorHomeStack}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="Chat"
          component={ChatScreen}
          options={{
            headerShown: false
          }}
        />
        <Tab.Screen
          name="Газрын зураг"
          options={{
            tabBarLabel: "Дуудлага",
            tabBarIcon: ({ color, size }) => (
              <MapPin fill="#A155b9" stroke="white" />
            )
          }}
          component={HomeScreen}
        />
        <Tab.Screen
          name="userMessage"
          options={{
            tabBarLabel: "Эмч",
            tabBarIcon: ({ color, size }) => (
              <PhoneCall fill="rgb(251, 146, 60)" />
            )
          }}
          component={UserDoctorScreen}
        />
        <Tab.Screen
          name="Жолоочийн газрын зураг"
          options={{
            tabBarLabel: "Газрын зураг",
            tabBarIcon: ({ color, size }) => (
              <Home fill="#3caea3" stroke="white" />
            )
          }}
          component={DriverScreen}
        />
        <Tab.Screen
          name="Өвчтөний түүх"
          options={{
            tabBarLabel: "Өвчтөний түүх",
            tabBarIcon: ({ color, size }) => (
              <PhoneCall fill="rgb(251, 146, 60)" />
            )
          }}
          component={DoctorScreen}
        />
        <Tab.Screen
          name="Хэрэглэгчтэй холбогдох"
          options={{
            tabBarLabel: "Хэрэглэгчтэй холбогдох",
            tabBarIcon: ({ color, size }) => (
              <PhoneCall fill="rgb(251, 146, 60)" />
            )
          }}
          component={DoctorUserScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default function App() {
  return <AppNavigation />;
}
