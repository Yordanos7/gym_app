import React from "react";
import { Text, View } from "react-native";

// here the love of ts

interface CardProps {
  children: React.ReactNode;
  className: string;
}

const Card: React.FC<CardProps> = ({ children, className }) => {
  return (
    <View
      className={`bg-white rounded-lg p-4 my-2 shadow-md shadow-gray-300 ${className}`}
    >
      {children}
    </View>
  );
};

export default Card;
