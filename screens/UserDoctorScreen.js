import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Image,
  SafeAreaView
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import * as Icon from "react-native-feather";

export default function UserDoctorScreen() {
  const navigation = useNavigation();
  const handleNavigateToChat = () => {
    navigation.navigate("Chat"); // Navigate to the ChatScreen
  };

  return (
    <View className="">
      <View className="rounded-t-3xl w-full -mt-12 bg-white relative">
        <View
          style={{ backgroundColor: "rgba(255,255,255,0.8)" }}
          className="p-2 flex-row justify-between items-center rounded-full my-5 mx-2">
          <View
            style={{ backgroundColor: "rgba(255,255,255,0.8)" }}
            className="p-2 flex-row justify-between items-center rounded-full my-5 mx-2">
            <View
              style={{ backgroundColor: "rgba(255,255,255,0.4)" }}
              className="p-1 rounded-full">
              <Image
                style={{ backgroundColor: "rgba(255,255,255,0.4)" }}
                className="w-16 h-16 rounded-full"
                source={require("../assets/images/deliveryGuy.jpg")}
              />
            </View>

            <View className="flex-1 ml-3">
              <Text className="text-[16px] font-bold text-black">
                Бадамсэрээжид{" "}
              </Text>
              <Text className="text-black text-[14px] font-semibold">
                Адъяадорж
              </Text>
            </View>
            <View className="flex-row items-center space-x-3 mr-3">
              <TouchableOpacity
                onPress={handleNavigateToChat}
                className="bg-white p-2 rounded-full">
                <Icon.MessageCircle
                  fill="rgb(251, 146, 60)"
                  stroke="rgb(251, 146, 60)"
                  strokeWidth="1"
                />
              </TouchableOpacity>
              <TouchableOpacity className="bg-white p-2 rounded-full">
                <Icon.X stroke={"red"} strokeWidth="5" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
