import { Stack } from "expo-router";
import React from "react";
import { StatusBar } from "react-native";
import { Example } from "../components/nativewindui/Example";

export default function NativeWindUIExampleScreen() {
  return (
    <>
      <StatusBar barStyle="light-content" />
      <Stack.Screen
        options={{
          title: "NativeWindUI Demo",
          headerShown: false,
        }}
      />
      <Example />
    </>
  );
}
