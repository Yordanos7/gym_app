// gymapp/app/components/CalendarView.tsx
import React from "react";
import { View, Text } from "react-native";

interface CalendarViewProps {
  // Add props for calendar configuration (e.g., markedDates, onDayPress)
}

const CalendarView: React.FC<CalendarViewProps> = () => {
  return (
    <View className="bg-white rounded-lg p-4 my-2 shadow-md shadow-gray-300 items-center justify-center h-64">
      <Text className="text-lg font-bold text-gray-800 mb-2">
        Calendar View
      </Text>
      {/* Placeholder for actual calendar rendering */}
      <Text className="text-gray-500">Calendar component goes here</Text>
      {/* Example: <Calendar markedDates={{...}} onDayPress={(day) => console.log(day)} /> */}
    </View>
  );
};

export default CalendarView;
