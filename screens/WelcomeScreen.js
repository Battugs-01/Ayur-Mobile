import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { themeColors } from "../theme";
import { useNavigation } from "@react-navigation/native";

import * as Animatable from "react-native-animatable";

export default function WelcomeScreen() {
  const navigation = useNavigation();
  useEffect(() => {
    // Trigger bounce animation on mount
    bounceView?.bounce();
  }, []);
  return (
    <SafeAreaView
      className="flex-1"
      style={{ backgroundColor: themeColors.bg }}>
      <View className="flex-1 flex justify-around my-4">
        <Text className="text-white font-bold text-4xl text-center">
          Тавтай морил
        </Text>
        <View className="flex-row justify-center">
          <View
            style={{
              backgroundColor: "white",
              borderRadius: 100,
              overflow: "hidden"
            }}
            className="p-6">
            <Animatable.View
              animation="bounce"
              iterationCount="infinite"
              duration={2000}
              easing="ease-out"
              ref={(ref) => (bounceView = ref)}>
              <Image
                source={require("../assets/icons/ayur-favicon-color.png")}
                style={{ width: 100, height: 100 }}
              />
            </Animatable.View>
          </View>
        </View>
        <View className="space-y-4">
          <TouchableOpacity
            onPress={() => navigation.navigate("SignUp")}
            className="py-3 bg-yellow-400 mx-7 rounded-xl">
            <Text className="text-xl font-bold text-center text-gray-700">
              Бүртгүүлэх
            </Text>
          </TouchableOpacity>
          <View className="flex-row justify-center">
            <Text className="text-white font-semibold">
              Танд хаяг байгаа юу?
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text className="font-semibold text-yellow-400"> Нэвтрэх</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
