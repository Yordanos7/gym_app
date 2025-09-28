import React from "react";
import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  className?: string;
}

export function Button({ title, className, ...props }: ButtonProps) {
  return (
    <TouchableOpacity
      className={`w-full bg-blue-600 py-3 rounded-lg items-center justify-center ${className}`}
      {...props}
    >
      <Text className="text-white text-center font-bold text-lg">{title}</Text>
    </TouchableOpacity>
  );
}

export default Button;
