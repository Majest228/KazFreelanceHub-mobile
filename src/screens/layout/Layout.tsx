import { SafeAreaView, StatusBar, StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { useAuth } from "../../context/AuthContext";
import { ThemeContext } from "../../providers/ThemeProvider";
import { NavigationContainer } from "@react-navigation/native";
import TabNavigation from "../../components/tab-navigation/TabNavigation";
import AuthPage from "../auth-page/AuthPage";

const Layout = () => {
  const { authState, logout } = useAuth();
  const { colors, isDark, setColorScheme } = useContext(ThemeContext);
  console.log("isDark", isDark);
  console.log("auth", authState);
  return (
    <View style={{ flex: 1 }}>
      <StatusBar
        backgroundColor={isDark ? "#111" : "#f0f0f0"}
        barStyle={isDark ? "light-content" : "dark-content"}
      />
      <NavigationContainer>
        {authState?.authenticated ? <TabNavigation /> : <AuthPage />}
      </NavigationContainer>
    </View>
  );
};

export default Layout;

const styles = StyleSheet.create({});
