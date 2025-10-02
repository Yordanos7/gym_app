// gymapp/app/navigation/AppStack.tsx
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text, View } from "react-native"; // For icons, you'd typically use a library like @expo/vector-icons
import { colors } from "../constants/colors"; // Import colors for tab bar styling

// Import your screens
import DashboardScreen from "../screens/dashboard/DashboardScreen";
import WorkoutListScreen from "../screens/workouts/WorkoutListScreen";
import WorkoutBuilderScreen from "../screens/workouts/WorkoutBuilderScreen";
import WorkoutSessionScreen from "../screens/workouts/WorkoutSessionScreen";
import ExerciseLibraryScreen from "../screens/exercises/ExerciseLibraryScreen";
import ExerciseDetailScreen from "../screens/exercises/ExerciseDetailScreen";
import ProgressScreen from "../screens/progress/ProgressScreen";
import CalendarScreen from "../screens/calendar/CalendarScreen";
import ProfileScreen from "../screens/profile/ProfileScreen";

// Define the types for your main app stack navigator
export type AppStackParamList = {
  HomeTabs: undefined;
  WorkoutBuilder: { workoutId?: string }; // Example for passing params
  WorkoutSession: { workoutId: string };
  ExerciseDetail: { exerciseId: string };
  ExerciseLibrary: undefined; // Added ExerciseLibrary
  // Add other screens that are not part of the bottom tabs but accessible from them
};

// Define the types for your bottom tab navigator
export type BottomTabParamList = {
  Dashboard: undefined;
  Workouts: undefined;
  Progress: undefined;
  Calendar: undefined;
  Profile: undefined;
};

const Stack = createNativeStackNavigator<AppStackParamList>();
const Tab = createBottomTabNavigator<BottomTabParamList>();

// Bottom Tab Navigator for the main app sections
const HomeTabs: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false, // Hide header for tab screens, manage within each screen if needed
        tabBarActiveTintColor: colors.primary, // Active tab icon/label color
        tabBarInactiveTintColor: colors.textSecondary, // Inactive tab icon/label color
        tabBarStyle: {
          backgroundColor: colors.white, // Tab bar background color
          borderTopWidth: 1,
          borderTopColor: colors.lightGray,
          paddingBottom: 5,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
        },
      }}
    >
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          tabBarLabel: "Dashboard",
          tabBarIcon: ({ color, size }) => (
            // Replace with actual icon component, e.g., <Ionicons name="home" color={color} size={size} />
            <Text className={`text-[${color}] text-[${size}px]`}>🏠</Text>
          ),
        }}
      />
      <Tab.Screen
        name="Workouts"
        component={WorkoutListScreen} // This screen will list workouts
        options={{
          tabBarLabel: "Workouts",
          tabBarIcon: ({ color, size }) => (
            <Text className={`text-[${color}] text-[${size}px]`}>🏋️</Text>
          ),
        }}
      />
      <Tab.Screen
        name="Progress"
        component={ProgressScreen}
        options={{
          tabBarLabel: "Progress",
          tabBarIcon: ({ color, size }) => (
            <Text className={`text-[${color}] text-[${size}px]`}>📈</Text>
          ),
        }}
      />
      <Tab.Screen
        name="Calendar"
        component={CalendarScreen}
        options={{
          tabBarLabel: "Calendar",
          tabBarIcon: ({ color, size }) => (
            <Text className={`text-[${color}] text-[${size}px]`}>📅</Text>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Text className={`text-[${color}] text-[${size}px]`}>👤</Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const AppStack: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* The HomeTabs component will contain all your bottom tab screens */}
      <Stack.Screen name="HomeTabs" component={HomeTabs} />

      {/* Screens that are not part of the bottom tabs but are accessible from within the app */}
      <Stack.Screen name="WorkoutBuilder" component={WorkoutBuilderScreen} />
      <Stack.Screen name="WorkoutSession" component={WorkoutSessionScreen} />
      <Stack.Screen name="ExerciseDetail" component={ExerciseDetailScreen} />
      <Stack.Screen name="ExerciseLibrary" component={ExerciseLibraryScreen} />
      {/* Add other screens here as needed */}
    </Stack.Navigator>
  );
};

export default AppStack;
