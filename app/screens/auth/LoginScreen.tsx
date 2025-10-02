// gymapp/app/screens/auth/LoginScreen.tsx
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Button from "../../components/Button";
import Card from "../../components/Card";
import { AuthStackParamList } from "../../navigation/AuthStack";
import { useAuth } from "../../hooks/useAuth"; // Custom hook for authentication

type LoginScreenNavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  "Login"
>;

const LoginScreen: React.FC = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const { login } = useAuth(); // Assuming useAuth provides a login function

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter both email and password.");
      return;
    }

    setIsLoading(true);
    try {
      await login(email, password); // Call the login function from useAuth
      // On successful login, useAuth should handle navigation to AppStack
    } catch (error: any) {
      Alert.alert(
        "Login Failed",
        error.message || "An unexpected error occurred."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View className="flex-1 justify-center items-center bg-gray-100 p-4">
      <Card className="w-full max-w-sm p-6">
        <Text className="text-3xl font-bold text-center text-gray-800 mb-6">
          Login
        </Text>

        <TextInput
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg text-base text-gray-800"
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          className="w-full p-3 mb-6 border border-gray-300 rounded-lg text-base text-gray-800"
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <Button
          title="Login"
          onPress={handleLogin}
          isLoading={isLoading}
          disabled={isLoading}
          className="w-full mb-4"
        />

        <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
          <Text className="text-blue-600 text-center text-base">
            Don't have an account? Sign Up
          </Text>
        </TouchableOpacity>
      </Card>
    </View>
  );
};

export default LoginScreen;
