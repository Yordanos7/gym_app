import { Text, View } from "react-native";

export default function Index() {
  return (
    <View className="flex-1 justify-center items-center bg-gray-100">
      <Text className="text-2xl font-bold text-blue-600">
        Welcome to NativeWind!
      </Text>
      <Text className="mt-2 text-lg">
        Edit app/index.tsx to edit this screen.
      </Text>
    </View>
  );
}
