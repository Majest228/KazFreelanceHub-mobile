import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";

import { FaHome } from "react-icons/fa";
import { Icon } from "react-native-elements";
// import DetailPage from "../../screens/detail-page/DetailPage";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomePage from "../../screens/home/Home";
import DetailPage from "../../screens/order-page/OrderPage";
import { useAuth } from "../../context/AuthContext";
import OrderPage from "../../screens/order-page/OrderPage";
import Profile from "../../screens/profile/Profile";
import UserPage from "../../screens/user-page/UserPage";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Home"
      component={HomePage}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="OrderPage"
      component={OrderPage}
      options={{ title: "Order Details", headerShown: false }}
    />
    <Stack.Screen
      name="UserPage"
      component={UserPage}
      options={{ title: "User Details", headerShown: false }}
    />
  </Stack.Navigator>
);

const TabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          height: 50,
          paddingTop: 10,
        },
      }}
    >
      <Tab.Screen
        name="home"
        component={HomeStack}
        options={{
          headerShown: false,
          tabBarLabel: "Главная",
          tabBarStyle: {
            paddingBottom: 5,
            paddingTop: 5,
          },
          tabBarIcon: () => (
            <Icon
              name="home"
              size={24}
              color="black"
              backgroundColor="white"
              type="ant-design"
            />
          ),
        }}
      />

      <Tab.Screen
        name="profile"
        component={Profile}
        options={{
          headerShown: false,
          tabBarLabel: "Профиль",
          tabBarIcon: () => (
            <Icon
              name="user"
              size={24}
              color="black"
              backgroundColor="white"
              type="ant-design"
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;
