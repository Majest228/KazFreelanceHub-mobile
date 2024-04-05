import {
  Appearance,
  Button,
  StyleSheet,
  Text,
  View,
  StatusBar,
  useColorScheme,
  ScrollView,
} from "react-native";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { AuthProvider, useAuth } from "./src/context/AuthContext";
import { NavigationContainer, useTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./src/screens/home/Home";

import AuthPage from "./src/screens/auth-page/AuthPage";
import HomePage from "./src/screens/home/Home";
import TabNavigation from "./src/components/tab-navigation/TabNavigation";
import { ThemeContext, ThemeProvider } from "./src/providers/ThemeProvider";
import Layout from "./src/screens/layout/Layout";
import { SafeAreaView } from "react-native-safe-area-context";
const Stack = createNativeStackNavigator();

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } },
});
const App = () => {
  return (
    <AuthProvider>
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          <SafeAreaView style={styles.wrapper}>
            <Layout />
          </SafeAreaView>
        </QueryClientProvider>
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "#f0f0f0",
    flex: 1,
  },
});
