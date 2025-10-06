import React, { useEffect, useState } from "react";
import { View, Text, Image, ActivityIndicator, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";
import { LinearGradient } from "expo-linear-gradient"; // Correct import for expo-linear-gradient

export default function Index() {
  const router = useRouter();
  const { isSignedIn, isLoaded } = useAuth();
  const [isLoadingSplash, setIsLoadingSplash] = useState(true);

  useEffect(() => {
    if (isLoaded) {
      const timer = setTimeout(() => {
        setIsLoadingSplash(false);
        if (isSignedIn) {
          router.replace("/(home)");
        } else {
          router.replace("/(auth)/sign-in");
        }
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isLoaded, isSignedIn]);

  return (
    <LinearGradient
      colors={["black", "#192f6a"]} // Example gradient colors
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <Image
        source={{
          uri: "https://img.freepik.com/premium-vector/bodybuilding-gym-logo-template_981215-140.jpg",
        }}
        className="w-48 h-48 mb-8 rounded-lg"
        resizeMode="contain"
      />
      <Text className="text-4xl font-bold text-white mb-4">GymApp</Text>
      {(isLoadingSplash || !isLoaded) && (
        <ActivityIndicator size="large" color="#FFFFFF" />
      )}
      <Text className="mt-4 text-lg text-white">Loading...</Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
