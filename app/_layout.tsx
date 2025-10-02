import { ClerkProvider } from "@clerk/clerk-expo";
import { tokenCache } from "@clerk/clerk-expo/token-cache";
import "./globals.css";
import { Slot } from "expo-router";
import { AuthProvider } from "./hooks/useAuth";

export default function RootLayout() {
  return (
    <ClerkProvider
      tokenCache={tokenCache}
      publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!}
    >
      <AuthProvider>
        <Slot />
      </AuthProvider>
    </ClerkProvider>
  );
}
