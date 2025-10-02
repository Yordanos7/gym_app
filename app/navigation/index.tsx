// gymapp/app/navigation/index.tsx
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthStack from "./AuthStack";
import AppStack from "./AppStack";
import { useAuth } from "../hooks/useAuth"; // Custom hook to check auth status

// Define the types for your root stack navigator
export type RootStackParamList = {
  Auth: undefined;
  App: undefined;
};

const RootStack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth(); // Get auth status from your hook

  if (isLoading) {
    // You might want to render a splash screen or loading indicator here
    return null; // Or a loading component
  }

  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      {isAuthenticated ? (
        // If authenticated, show the main app stack
        <RootStack.Screen name="App" component={AppStack} />
      ) : (
        // If not authenticated, show the authentication stack
        <RootStack.Screen name="Auth" component={AuthStack} />
      )}
    </RootStack.Navigator>
  );
};

const Navigation: React.FC = () => {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
};

export default Navigation;
