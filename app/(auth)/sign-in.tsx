import { useOAuth, useSignIn } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import React from "react";

import * as WebBrowser from "expo-web-browser";

WebBrowser.maybeCompleteAuthSession();

export default function Page() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();

  const { startOAuthFlow: startGoogleOAuth } = useOAuth({
    strategy: "oauth_google",
  });
  const { startOAuthFlow: startTikTokOAuth } = useOAuth({
    strategy: "oauth_tiktok",
  });

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");

  // Handle the submission of the sign-in form
  const onSignInPress = async () => {
    if (!isLoaded) return;

    // Start the sign-in process using the email and password provided
    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      });

      // If sign-in process is complete, set the created session as active
      // and redirect the user
      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace("/");
      } else {
        // If the status isn't complete, check why. User might need to
        // complete further steps.
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    }
  };

  const onSignInWithGoogle = React.useCallback(async () => {
    try {
      const { createdSessionId, setActive } = await startGoogleOAuth();

      if (createdSessionId && setActive) {
        await setActive({ session: createdSessionId });
        router.replace("/");
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, [startGoogleOAuth, router]);

  const onSignInWithTikTok = React.useCallback(async () => {
    try {
      const { createdSessionId, setActive } = await startTikTokOAuth();

      if (createdSessionId && setActive) {
        await setActive({ session: createdSessionId });
        router.replace("/");
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, [startTikTokOAuth, router]);

  return (
    <View className="flex-1 justify-center items-center bg-gray-100 p-4">
      <View className="w-full max-w-sm bg-white rounded-lg shadow-md p-6">
        <Text className="text-2xl font-bold text-center text-gray-800 mb-6">
          Sign In
        </Text>
        <TextInput
          autoCapitalize="none"
          value={emailAddress}
          placeholder="Email Address"
          onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
          className="w-full px-4 py-3 mb-4 bg-gray-200 rounded-lg text-gray-800 placeholder-gray-500"
        />
        <TextInput
          value={password}
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
          className="w-full px-4 py-3 mb-6 bg-gray-200 rounded-lg text-gray-800 placeholder-gray-500"
        />
        <TouchableOpacity
          onPress={onSignInPress}
          className="w-full bg-blue-600 py-3 rounded-lg"
        >
          <Text className="text-white text-center font-bold text-lg">
            Continue
          </Text>
        </TouchableOpacity>

        <View className="flex-row items-center my-6">
          <View className="flex-1 h-px bg-gray-300" />
          <Text className="mx-4 text-gray-500">OR</Text>
          <View className="flex-1 h-px bg-gray-300" />
        </View>

        <TouchableOpacity
          onPress={onSignInWithGoogle}
          className="w-full bg-red-600 py-3 rounded-lg mb-4"
        >
          <Text className="text-white text-center font-bold text-lg">
            Sign in with Google
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onSignInWithTikTok}
          className="w-full bg-black py-3 rounded-lg"
        >
          <Text className="text-white text-center font-bold text-lg">
            Sign in with TikTok
          </Text>
        </TouchableOpacity>

        <View className="flex-row justify-center mt-6">
          <Text className="text-gray-600">Don't have an account? </Text>
          <Link href="/sign-up">
            <Text className="text-blue-600 font-bold">Sign up</Text>
          </Link>
        </View>
      </View>
    </View>
  );
}
