import * as React from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { useOAuth, useSignUp } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import { Screen } from "expo-router/build/views/Screen";
WebBrowser.maybeCompleteAuthSession();
import Stack from "expo-router";
export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();

  const { startOAuthFlow: startGoogleOAuth } = useOAuth({
    strategy: "oauth_google",
  });
  const { startOAuthFlow: startTikTokOAuth } = useOAuth({
    strategy: "oauth_tiktok",
  });

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [pendingVerification, setPendingVerification] = React.useState(false);
  const [code, setCode] = React.useState("");

  // Handle submission of sign-up form
  const onSignUpPress = async () => {
    if (!isLoaded) return;

    // Start sign-up process using email and password provided
    try {
      await signUp.create({
        emailAddress,
        password,
      });

      // Send user an email with verification code
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      // Set 'pendingVerification' to true to display second form
      // and capture OTP code
      setPendingVerification(true);
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    }
  };

  const onSignUpWithGoogle = React.useCallback(async () => {
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

  const onSignUpWithTikTok = React.useCallback(async () => {
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

  // Handle submission of verification form
  const onVerifyPress = async () => {
    if (!isLoaded) return;

    try {
      // Use the code the user provided to attempt verification
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      });

      // If verification was completed, set the session to active
      // and redirect the user
      if (signUpAttempt.status === "complete") {
        await setActive({ session: signUpAttempt.createdSessionId });
        router.replace("/");
      } else {
        // If the status is not complete, check why. User may need to
        // complete further steps.
        console.error(JSON.stringify(signUpAttempt, null, 2));
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    }
  };

  if (pendingVerification) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-100 p-4">
        <View className="w-full max-w-sm bg-white rounded-lg shadow-md p-6">
          <Text className="text-2xl font-bold text-center text-gray-800 mb-6">
            Verify Your Email
          </Text>
          <TextInput
            value={code}
            placeholder="Verification Code"
            onChangeText={(code) => setCode(code)}
            className="w-full px-4 py-3 mb-6 bg-gray-200 rounded-lg text-gray-800 placeholder-gray-500"
          />
          <TouchableOpacity
            onPress={onVerifyPress}
            className="w-full bg-blue-600 py-3 rounded-lg"
          >
            <Text className="text-white text-center font-bold text-lg">
              Verify
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View className="flex-1 justify-center items-center bg-gray-100 p-4">
      <View className="w-full max-w-sm bg-white rounded-lg shadow-md p-6">
        <Text className="text-2xl font-bold text-center text-gray-800 mb-6">
          Sign Up
        </Text>
        <TextInput
          autoCapitalize="none"
          value={emailAddress}
          placeholder="Email Address"
          onChangeText={(email) => setEmailAddress(email)}
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
          onPress={onSignUpPress}
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
          onPress={onSignUpWithGoogle}
          className="w-full bg-red-600 py-3 rounded-lg mb-4"
        >
          <Text className="text-white text-center font-bold text-lg">
            Sign up with Google
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onSignUpWithTikTok}
          className="w-full bg-black py-3 rounded-lg"
        >
          <Text className="text-white text-center font-bold text-lg">
            Sign up with TikTok
          </Text>
        </TouchableOpacity>

        <View className="flex-row justify-center mt-6">
          <Text className="text-gray-600">Already have an account? </Text>
          <Link href="/sign-in">
            <Text className="text-blue-600 font-bold">Sign in</Text>
          </Link>
        </View>
      </View>
    </View>
  );
}
