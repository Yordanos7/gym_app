// gymapp/app/screens/auth/SignupScreen.tsx
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Button from "../../components/Button";
import Card from "../../components/Card";
import { AuthStackParamList } from "../../navigation/AuthStack";
import { useAuth } from "../../hooks/useAuth"; // Custom hook for authentication

type SignupScreenNavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  "Signup"
>;

const SignupScreen: React.FC = () => {
  const navigation = useNavigation<SignupScreenNavigationProp>();
  const { register } = useAuth(); // Assuming useAuth provides a register function

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = async () => {
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match.");
      return;
    }

    setIsLoading(true);
    try {
      await register(email, password, name); // Call the register function from useAuth
      // On successful registration, useAuth should handle navigation to AppStack
    } catch (error: any) {
      Alert.alert(
        "Registration Failed",
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
          Sign Up
        </Text>

        <TextInput
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg text-base text-gray-800"
          placeholder="Name"
          autoCapitalize="words"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg text-base text-gray-800"
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg text-base text-gray-800"
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TextInput
          className="w-full p-3 mb-6 border border-gray-300 rounded-lg text-base text-gray-800"
          placeholder="Confirm Password"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />

        <Button
          title="Sign Up"
          onPress={handleSignup}
          isLoading={isLoading}
          disabled={isLoading}
          className="w-full mb-4"
        />

        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text className="text-blue-600 text-center text-base">
            Already have an account? Login
          </Text>
        </TouchableOpacity>
      </Card>
    </View>
  );
};

export default SignupScreen;
