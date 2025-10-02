// gymapp/app/components/Chart.tsx
import React from "react";
import { View, Text } from "react-native";

interface ChartProps {
  title: string;
  data: any[]; // Replace with actual chart data type
  // Add other props for chart configuration (e.g., type, labels, colors)
}

const Chart: React.FC<ChartProps> = ({ title, data }) => {
  return (
    <View className="bg-white rounded-lg p-4 my-2 shadow-md shadow-gray-300 items-center justify-center h-48">
      <Text className="text-lg font-bold text-gray-800 mb-2">{title}</Text>
      {/* Placeholder for actual chart rendering */}
      <Text className="text-gray-500">Chart visualization goes here</Text>
      {/* Example: <LineChart data={data} ... /> */}
    </View>
  );
};

export default Chart;
