// gymapp/app/components/Card.tsx
import React from "react";
import { View } from "react-native";

interface CardProps {
  children: React.ReactNode;
  className?: string; // NativeWind class names
}

const Card: React.FC<CardProps> = ({ children, className = "" }) => {
  return (
    <View
      className={`bg-white rounded-lg p-4 my-2 shadow-md shadow-gray-300 ${className}`}
    >
      {children}
    </View>
  );
};

export default Card;
