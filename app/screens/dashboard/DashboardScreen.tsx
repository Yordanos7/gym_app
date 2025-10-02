// gymapp/app/screens/dashboard/DashboardScreen.tsx
import React, { useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Card from "../../components/Card";
import Button from "../../components/Button";
import WorkoutItem from "../../components/WorkoutItem";
import ExerciseItem from "../../components/ExerciseItem";
import Chart from "../../components/Chart";
import { useWorkoutStore } from "../../store/workoutStore";
import { AppStackParamList } from "../../navigation/AppStack";
import { useAuth } from "../../hooks/useAuth";

type DashboardScreenNavigationProp = NativeStackNavigationProp<
  AppStackParamList,
  "HomeTabs"
>;

const DashboardScreen: React.FC = () => {
  const navigation = useNavigation<DashboardScreenNavigationProp>();
  const { user } = useAuth();
  const {
    workouts,
    exercises,
    fetchWorkouts,
    fetchExercises,
    isLoading,
    error,
  } = useWorkoutStore();

  useEffect(() => {
    fetchWorkouts();
    fetchExercises();
  }, [fetchWorkouts, fetchExercises]);

  useEffect(() => {
    if (error) {
      Alert.alert("Error", error);
    }
  }, [error]);

  const handleViewAllWorkouts = () => {
    navigation.navigate("HomeTabs", { screen: "Workouts" });
  };

  const handleViewAllExercises = () => {
    navigation.navigate("HomeTabs", { screen: "ExerciseLibrary" });
  };

  const handleCreateWorkout = () => {
    navigation.navigate("WorkoutBuilder", {});
  };

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-100">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-gray-100 p-4">
      <Text className="text-4xl font-bold text-gray-800 mb-6 mt-8">
        Welcome, {user?.name || "Guest"}!
      </Text>

      <Card className="mb-4">
        <Text className="text-xl font-bold text-gray-800 mb-3">
          Quick Actions
        </Text>
        <Button
          title="Start New Workout"
          onPress={handleCreateWorkout}
          className="mb-2"
        />
        <Button
          title="Log Progress"
          onPress={() =>
            navigation.navigate("HomeTabs", { screen: "Progress" })
          }
          variant="secondary"
        />
      </Card>

      <Card className="mb-4">
        <View className="flex-row justify-between items-center mb-3">
          <Text className="text-xl font-bold text-gray-800">Your Workouts</Text>
          <TouchableOpacity onPress={handleViewAllWorkouts}>
            <Text className="text-blue-600">View All</Text>
          </TouchableOpacity>
        </View>
        {workouts.length > 0 ? (
          workouts.slice(0, 2).map((workout) => (
            <WorkoutItem
              key={workout.id}
              workout={workout}
              onPress={() =>
                navigation.navigate("WorkoutBuilder", {
                  workoutId: workout.id,
                })
              }
            />
          ))
        ) : (
          <Text className="text-gray-600">No workouts yet. Create one!</Text>
        )}
      </Card>

      <Card className="mb-4">
        <View className="flex-row justify-between items-center mb-3">
          <Text className="text-xl font-bold text-gray-800">
            Exercise Library
          </Text>
          <TouchableOpacity onPress={handleViewAllExercises}>
            <Text className="text-blue-600">View All</Text>
          </TouchableOpacity>
        </View>
        {exercises.length > 0 ? (
          exercises.slice(0, 2).map((exercise) => (
            <ExerciseItem
              key={exercise.id}
              exercise={exercise}
              onPress={() =>
                navigation.navigate("ExerciseDetail", {
                  exerciseId: exercise.id,
                })
              }
            />
          ))
        ) : (
          <Text className="text-gray-600">No exercises in library.</Text>
        )}
      </Card>

      <Card className="mb-4">
        <Text className="text-xl font-bold text-gray-800 mb-3">
          Progress Overview
        </Text>
        <Chart title="Weight Trend" data={[]} />{" "}
        {/* Placeholder for actual data */}
      </Card>
    </ScrollView>
  );
};

export default DashboardScreen;
