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
import { useDispatch, useSelector } from "react-redux";
import { selectResturant } from "../slices/resturantSlice";
import MapView, { Marker } from "react-native-maps";
import * as Icon from "react-native-feather";
import { emptyBasket } from "../slices/basketSlice";
import { HOST_API_KEY } from "../config/API";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MapDistance from "../components/mapDistance";
import * as Location from "expo-location";

import { Alert } from "react-native";
// ...

const getCurrentLocation = async (userToken) => {
  try {
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      console.error("Location permission not granted");
      return;
    }

    const location = await Location.getCurrentPositionAsync({});

    const latitude = location.coords.latitude;
    const longitude = location.coords.longitude;

    console.log("Latitude:", latitude);
    console.log("Longitude:", longitude);

    const response = await fetch(HOST_API_KEY + "/orders/location/2", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`
      },
      body: JSON.stringify({
        latitude: latitude,
        longitude: longitude
      })
    });

    const data = await response.json();
    console.log("API Response:", data);
  } catch (error) {
    console.error("Error getting current location:", error);
  }
};

export default function DriverScreen() {
  const navigation = useNavigation();
  const [data, setData] = React.useState();
  const dispatch = useDispatch();
  const handleCancel = () => {
    dispatch(emptyBasket());
    navigation.navigate("Home");
  };

  React.useEffect(() => {
    const intervalId = setInterval(async () => {
      try {
        const userToken = await AsyncStorage.getItem("userToken");

        if (userToken) {
          const response = await fetch(HOST_API_KEY + "/orders/location/2", {
            headers: {
              Authorization: `Bearer ${userToken}`
            }
          });
          getCurrentLocation(userToken);

          const isSameLocation =
            res?.order?.customer_latitude === res?.order?.driver?.latitude &&
            res?.order?.customer_longitude === res?.order?.driver?.longitude;

          if (isSameLocation) {
            Alert.alert("Анхааруулга", "Эмч ирлээ");
            clearInterval(intervalId);
          }
          const res = await response.json();
          setData(res);
          console.log("Order Details:", res);
        } else {
          console.error("User token not found.");
        }
      } catch (error) {
        console.error("Error fetching order details:", error);
      }
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <View className="flex-1">
      {data && <MapDistance data={data} />}

      <View className="rounded-t-3xl -mt-12 bg-white relative">
        <TouchableOpacity className="absolute right-4 top-2"></TouchableOpacity>
        <View className="flex-row justify-between px-5 pt-10">
          <View>
            <Text className="text-lg text-gray-700 font-semibold">
              Очих хугацаа
            </Text>
            <Text className="text-3xl font-extrabold text-gray-700">
              20-30 Минут
            </Text>
            <Text className="mt-2 text-gray-700 font-semibold"></Text>
          </View>
          <View className="rounded-full overflow-hidden">
            <Image
              className="h-24 w-24 rounded-full overflow-hidden"
              source={require("../assets/images/ambulance.gif")}
            />
          </View>
        </View>

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
        </View>
      </View>
    </View>
  );
}
