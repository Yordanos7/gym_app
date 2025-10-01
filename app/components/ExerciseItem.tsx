// gymapp/app/components/ExerciseItem.tsx
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

import { Exercise } from "../constants/types"; // Assuming you'll define Exercise interface here

interface ExerciseItemProps {
  exercise: Exercise;
  onPress?: (exercise: Exercise) => void;
}

const ExerciseItem: React.FC<ExerciseItemProps> = ({ exercise, onPress }) => {
  return (
    <TouchableOpacity
      className="flex-row items-center bg-white p-4 rounded-lg my-1 shadow-sm shadow-gray-200"
      onPress={() => onPress && onPress(exercise)}
      activeOpacity={onPress ? 0.7 : 1}
    >
      <View className="flex-1">
        <Text className="text-lg font-bold text-gray-800">{exercise.name}</Text>
        {exercise.type && (
          <Text className="text-sm text-gray-600 mt-1">{exercise.type}</Text>
        )}
      </View>
      {/* You can add an icon or more details here */}
    </TouchableOpacity>
  );
};

export default ExerciseItem;
