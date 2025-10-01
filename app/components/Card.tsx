import React from "react";
import { Text, View } from "react-native";

export function Button({ title, className, ...props }: ButtonProps) {
  return (
    <View
      className={`w-full bg-blue-600 py-3 rounded-lg items-center justify-center ${className}`}
      {...props}
    >
      <Text className="text-white text-center font-bold text-lg">{title}</Text>
    </View>
  );
}

export default Button;
