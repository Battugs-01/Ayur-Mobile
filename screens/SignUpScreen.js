import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView
} from "react-native";
import React, { useState } from "react";
import { themeColors } from "../theme";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";
import { HOST_API_KEY } from "../config/API";

import { Alert } from "react-native";

// subscribe for more videos like this :)
export default function SignUpScreen() {
  const navigation = useNavigation();
  const [name, setname] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async () => {
    try {
      const response = await fetch(HOST_API_KEY + "/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          phone,
          email,
          password
        })
      });

      if (response.ok) {
        const data = await response.json();

        Alert.alert(
          "Бүртгэл амжилттай",
          "Таны бүртгэл амжилттай боллоо та нэвтрэнэ үү!"
        );

        navigation.navigate("Login");
      } else {
        const errorData = await response.json();
        Alert.alert("Үйлдэл амжилтгүй", `Алдаа гарлаа: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Signup error:", error);
      Alert.alert("Үйлдэл амжилтгүй", "Үйлдэл амжилтгүй");
    }
  };

  return (
    <View
      className="flex-1 bg-white"
      style={{ backgroundColor: themeColors.bg }}>
      <SafeAreaView className="flex">
        <View className="flex-row justify-start">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="bg-yellow-400 p-2 rounded-tr-2xl rounded-bl-2xl ml-4">
            <ArrowLeftIcon size="20" color="black" />
          </TouchableOpacity>
        </View>
        <View className="flex-row justify-center">
          <Image
            source={require("../assets/images/signup.png")}
            style={{ width: 165, height: 110 }}
          />
        </View>
      </SafeAreaView>
      <View
        className="flex-1 bg-white px-8 pt-8"
        style={{ borderTopLeftRadius: 50, borderTopRightRadius: 50 }}>
        <ScrollView>
          <View className="form space-y-1">
            <Text className="text-gray-700 ml-4">Нэр</Text>
            <TextInput
              className="py-2 px-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
              value={name}
              onChangeText={(text) => setname(text)}
              placeholder="Нэр"
            />
            <Text className="text-gray-700 ml-4">Утас</Text>
            <TextInput
              className="py-2 px-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
              value={phone}
              onChangeText={(text) => setPhone(text)}
              placeholder="Утас"
            />
            <Text className="text-gray-700 ml-4">И-майл</Text>
            <TextInput
              className="py-2 px-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
              value={email}
              onChangeText={(text) => setEmail(text)}
              placeholder="И-майл"
            />
            <Text className="text-gray-700 ml-4">Нууц үг</Text>
            <TextInput
              className="py-2 px-4 bg-gray-100 text-gray-700 rounded-2xl mb-7"
              secureTextEntry
              value={password}
              onChangeText={(text) => setPassword(text)}
              placeholder="Нууц үг"
            />
            <TouchableOpacity
              onPress={handleSignUp}
              className="py-3 bg-yellow-400 rounded-xl">
              <Text className="font-xl font-bold text-center text-gray-700">
                Бүртгүүлэх
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        <View className="flex-row justify-center my-2">
          <Text className="text-gray-500 font-semibold">Хаяг байгаа бол ?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text className="font-semibold text-yellow-500"> Нэвтрэх</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
