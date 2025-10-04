import { ClerkProvider } from "@clerk/clerk-expo";
import * as SecureStore from "expo-secure-store";
import "./globals.css";
import { Slot } from "expo-router";
import { AuthProvider } from "./hooks/useAuth";

export default function RootLayout() {
  return (
    <ClerkProvider
      tokenCache={{
        async getToken(key: string) {
          try {
            return SecureStore.getItemAsync(key);
          } catch (err) {
            return null;
          }
        },
        async saveToken(key: string, value: string) {
          try {
            return SecureStore.setItemAsync(key, value);
          } catch (err) {
            return;
          }
        },
        async clearToken(key: string) {
          try {
            return SecureStore.deleteItemAsync(key);
          } catch (err) {
            return;
          }
        },
      }}
      publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!}
    >
      <AuthProvider>
        <Slot />
      </AuthProvider>
    </ClerkProvider>
  );
}
