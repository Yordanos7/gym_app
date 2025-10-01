import React from "react";
import { TouchableOpacity, Text, ActivityIndicator } from "react-native";
interface ButtonProps {
  titel: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "outline" | "danger";
  size?: "small" | "medium" | "large";
  isLoading?: boolean;
  disable?: boolean;
  className?: string;
  textClassName?: string;
}

const Button: React.FC<ButtonProps> = ({
  titel,
  onPress,
  variant = "primary",
  size = "medium",
  isLoading = false,
  disable = false,
  className = "",
  textClassName = "",
}) => {
  // this is for make the style more customized
  let buttonBaseClasses =
    "py-3 px-5 rounded-lg flex-row items-center justify-center";
  let textBaseClasses = "font-semibold";
  let indicatorColor = "white";

  // this is swith for make the button more customized
  switch (variant) {
    case "primary":
      (buttonBaseClasses += "bg-blue-600"),
        (textBaseClasses += "text-white"),
        (indicatorColor = "white");
      break;
    case "secondary":
      buttonBaseClasses += " bg-gray-500";
      textBaseClasses += " text-white";
      indicatorColor = "white";
      break;
    case "outline":
      buttonBaseClasses += " bg-transparent border border-blue-600";
      textBaseClasses += " text-blue-600";
      indicatorColor = "#2563eb"; // Tailwind blue-600
      break;
    case "danger":
      buttonBaseClasses += " bg-red-600";
      textBaseClasses += " text-white";
      indicatorColor = "white";
      break;
  }

  // and for the size
  switch (size) {
    case "small":
      buttonBaseClasses = buttonBaseClasses.replace("py-3 px-5", "py-2 px-4");
      textBaseClasses += " text-sm";
      break;
    case "medium":
      textBaseClasses += " text-base";
      break;
    case "large":
      buttonBaseClasses = buttonBaseClasses.replace("py-3 px-5", "py-4 px-6");
      textBaseClasses += " text-lg";
      break;
  }
  // for improve the ui for the btn

  if (disable || isLoading) {
    buttonBaseClasses += " opacity-60";
  }

  return (
    <TouchableOpacity
      className={`${buttonBaseClasses}, ${className}`}
      onPress={onPress}
      disabled={disable || isLoading}
      activeOpacity={0.7}
    >
      {isLoading ? (
        <ActivityIndicator color={indicatorColor} />
      ) : (
        <Text className={`${textBaseClasses} ${textClassName}`}>{titel}</Text>
      )}
    </TouchableOpacity>
  );
};

export default Button;
