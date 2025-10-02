// gymapp/app/components/WorkoutItem.tsx
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Workout } from "../constants/types"; // Assuming you'll define Workout interface here
import { formatDate } from "../utils/formatDate"; // Utility for date formatting

interface WorkoutItemProps {
  workout: Workout;
  onPress?: (workout: Workout) => void;
}

const WorkoutItem: React.FC<WorkoutItemProps> = ({ workout, onPress }) => {
  return (
    <TouchableOpacity
      className="flex-row items-center bg-white p-4 rounded-lg my-1 shadow-sm shadow-gray-200"
      onPress={() => onPress && onPress(workout)}
      activeOpacity={onPress ? 0.7 : 1}
    >
      <View className="flex-1">
        <Text className="text-lg font-bold text-gray-800">{workout.name}</Text>
        {workout.date && (
          <Text className="text-sm text-gray-600 mt-1">
            {formatDate(workout.date)}
          </Text>
        )}
      </View>
      {/* You can add an icon or more details like number of exercises */}
    </TouchableOpacity>
  );
};

export default WorkoutItem;
