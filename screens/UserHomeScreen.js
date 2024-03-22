import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ScrollView
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import * as Icon from "react-native-feather";
import { emptyBasket } from "../slices/basketSlice";
import { HOST_API_KEY } from "../config/API";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setResturant } from "../slices/resturantSlice";
import { PersonStanding, User } from "lucide-react-native";

export default function UserHomeScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [data, setData] = React.useState();
  const [isGoing, setIsGoing] = React.useState(false);

  React.useEffect(() => {
    const intervalId = setInterval(async () => {
      try {
        const userToken = await AsyncStorage.getItem("userToken");

        if (userToken) {
          const response = await fetch(
            HOST_API_KEY + "/orders/my_order?status=going",
            {
              headers: {
                Authorization: `Bearer ${userToken}`
              }
            }
          );

          const res = await response.json();
          if (res?.orders[0]?.status === "going") {
            Alert.alert("Анхааруулга ", "Дуудлага замдаа гарлаа");
            setIsGoing(true);
            clearInterval(intervalId);
          } else {
            setIsGoing(false);
          }
          setData(res);
          console.log("Order Details:", res);
        } else {
          console.error("User token not found.");
        }
      } catch (error) {
        console.error("Error fetching order details:", error);
      }
    }, 2000);

    return () => clearInterval(intervalId);
  }, []);
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View className="flex w-full flex-col justify-between">
        <View className=" w-full bg-white relative">
          <View
            style={{ backgroundColor: "rgba(255,255,255,0.8)" }}
            className="p-2 flex-row justify-between items-center rounded-full mx-2">
            <View
              style={{ backgroundColor: "rgba(255,255,255,0.8)" }}
              className="p-2 flex-row justify-between items-center rounded-full mx-2">
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
                  Чойжил{" "}
                </Text>
                <Text className="text-black text-[14px] font-semibold">
                  Баттөгс
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View className="w-full h-full relative py-10 bg-[#877dfa]">
          {isGoing && (
            <View className="w-full flex flex-col justify-between">
              <View className="w-full flex justify-center items-center ">
                <View className="rounded-full p-4 bg-[#877dfa]/10  overflow-hidden flex justify-center items-center">
                  <View className="rounded-full p-4 bg-white overflow-hidden flex justify-center items-center">
                    <User
                      width={40}
                      height={40}
                      className="w-10 h-10 "
                      stroke="#877dfa"
                    />
                  </View>
                </View>
                <Text className="text-white text-[14px] font-semibold">
                  Түргэн тусламж замдаа гарсан
                </Text>
              </View>

              <View className="flex w-full py-10 gap-10 flex-col ">
                <TouchableOpacity
                  onPress={() => {
                    dispatch(
                      setResturant({
                        orderId: data?.orders[0]?.id
                      })
                    );
                    navigation.navigate("Газрын зураг");
                  }}
                  className="bg-white w-[80%] flex items-center justify-center h-[100px] rounded-r-full">
                  <Text className="text-black text-lg font-semibold">
                    Газрын зураг харах
                  </Text>
                </TouchableOpacity>
                <View className="flex w-full justify-end items-end ">
                  <TouchableOpacity
                    onPress={() => {
                      dispatch(
                        setResturant({
                          orderId: data?.orders[0]?.id
                        })
                      );
                      navigation.navigate("Chat");
                    }}
                    className="bg-white w-[80%] flex items-center justify-center h-[100px] rounded-l-full">
                    <Text className="text-black text-lg font-semibold">
                      Эмчтэй холбогдох
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        </View>
      </View>
    </ScrollView>
  );
}
