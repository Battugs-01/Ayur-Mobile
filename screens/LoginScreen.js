import { View, Text, TouchableOpacity, Image, TextInput } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import { themeColors } from "../theme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
import { HOST_API_KEY } from "../config/API";

export default function LoginScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("batsukh@gmail.com");
  const [password, setPassword] = useState("1234");
  const [selectedRole, setSelectedRole] = useState("customer"); // Default role

  const handleLogin = async () => {
    try {
      const response = await fetch(
        HOST_API_KEY +
          (selectedRole === "customer" ? "/login" : "/login/employee"),
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ email, password })
        }
      );

      console.log(
        HOST_API_KEY + selectedRole === "customer"
          ? "/login"
          : "/login/employee"
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data?.user?.role);
        if (data?.user?.role === "customer") {
          navigation.navigate("Home");
        } else if (data?.user?.role === "driver") {
          navigation.navigate("DriverHome");
        } else if (data?.user?.role === "doctor") {
          navigation.navigate("DoctorHome");
        }
        await AsyncStorage.setItem("userToken", data.token);
      } else {
        const errorData = await response.json();
        console.error("Login error:", errorData);
        alert(`Login failed: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred during login");
    }
  };

  return (
    <View
      className="flex-1 bg-white"
      style={{ backgroundColor: themeColors.bg }}>
      <SafeAreaView className="flex ">
        <View className="flex-row justify-start">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="bg-yellow-400 p-2 rounded-tr-2xl rounded-bl-2xl ml-4">
            <ArrowLeftIcon size="20" color="black" />
          </TouchableOpacity>
        </View>
        <View className="flex-row justify-center">
          <Image
            source={require("../assets/images/login.png")}
            style={{ width: 200, height: 200 }}
          />
        </View>
      </SafeAreaView>

      <View
        style={{ borderTopLeftRadius: 50, borderTopRightRadius: 50 }}
        className="flex-1 bg-white px-8 pt-8">
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: 16
          }}>
          <Text style={{ color: "gray", fontSize: 16 }}>Төрөл:</Text>
          <Picker
            style={{ flex: 1 }}
            selectedValue={selectedRole}
            onValueChange={(itemValue) => setSelectedRole(itemValue)}>
            <Picker.Item label="Хэрэглэгч" value="customer" />
            <Picker.Item label="Жолооч" value="driver" />
            <Picker.Item label="Эмч" value="doctor" />
          </Picker>
        </View>
        <View className="form space-y-2">
          <Text className="text-gray-700 ml-4">Утас</Text>
          <TextInput
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-2xl mb-3"
            placeholder="И-майл"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          <Text className="text-gray-700 ml-4">Нууц үг</Text>
          <TextInput
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-2xl"
            secureTextEntry
            placeholder="Нууц үг"
            value={password}
            onChangeText={(text) => setPassword(text)}
          />

          <TouchableOpacity className="flex items-end">
            <Text className="text-gray-700 mb-5">Нууц үг ээ мартсан?</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleLogin}
            className="py-3 bg-yellow-400 rounded-xl">
            <Text className="text-xl font-bold text-center text-gray-700">
              Нэвтрэх
            </Text>
          </TouchableOpacity>
        </View>

        <View className="flex-row justify-center mt-7">
          <Text className="text-gray-500 font-semibold">
            Танд хаяг байхгүй юу?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
            <Text className="font-semibold text-yellow-500"> Бүртгүүлэх</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
