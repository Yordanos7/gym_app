// gymapp/app/screens/auth/ProfileSetupScreen.tsx
import React, { useState } from "react";
import { View, Text, TextInput, Alert, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Button from "../../components/Button";
import Card from "../../components/Card";
import { AuthStackParamList } from "../../navigation/AuthStack";
import { useAuth } from "../../hooks/useAuth"; // Custom hook for authentication
import { userService } from "../../services/userService"; // Assuming you'll create this service

type ProfileSetupScreenNavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  "ProfileSetup"
>;

const ProfileSetupScreen: React.FC = () => {
  const navigation = useNavigation<ProfileSetupScreenNavigationProp>();
  const { user, isAuthenticated } = useAuth(); // Get current user from auth hook
  const [age, setAge] = useState("");
  const [goals, setGoals] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Redirect if not authenticated or profile already set up (optional, based on app logic)
  // useEffect(() => {
  //   if (isAuthenticated && user?.age && user?.goals) {
  //     navigation.navigate('App'); // Navigate to main app if profile is complete
  //   }
  // }, [isAuthenticated, user, navigation]);

  const handleSaveProfile = async () => {
    if (!user || !isAuthenticated) {
      Alert.alert("Error", "User not authenticated.");
      return;
    }
    if (!age || !goals) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    setIsLoading(true);
    try {
      await userService.updateUserProfile(user.id, {
        age: parseInt(age),
        goals,
      });
      Alert.alert("Success", "Profile updated successfully!");
      // Assuming successful update means user is ready for main app
      // In a real app, you might refresh the user object in useAuth or navigate
      // navigation.navigate('App'); // Navigate to main app after setup
    } catch (error: any) {
      Alert.alert(
        "Update Failed",
        error.message || "An unexpected error occurred."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      className="bg-gray-100 p-4"
    >
      <View className="flex-1 justify-center items-center">
        <Card className="w-full max-w-sm p-6">
          <Text className="text-3xl font-bold text-center text-gray-800 mb-6">
            Setup Your Profile
          </Text>

          <TextInput
            className="w-full p-3 mb-4 border border-gray-300 rounded-lg text-base text-gray-800"
            placeholder="Age"
            keyboardType="numeric"
            value={age}
            onChangeText={setAge}
          />
          <TextInput
            className="w-full p-3 mb-6 border border-gray-300 rounded-lg text-base text-gray-800 h-24"
            placeholder="Fitness Goals (e.g., Build muscle, Lose weight)"
            multiline
            numberOfLines={4}
            value={goals}
            onChangeText={setGoals}
          />

          <Button
            title="Save Profile"
            onPress={handleSaveProfile}
            isLoading={isLoading}
            disabled={isLoading}
            className="w-full"
          />
        </Card>
      </View>
    </ScrollView>
  );
};

export default ProfileSetupScreen;
