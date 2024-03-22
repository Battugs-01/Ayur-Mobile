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

export default function DriverUserScreen() {
  const navigation = useNavigation();
  const [data, setData] = React.useState();
  const resturant = useSelector(selectResturant);
  const dispatch = useDispatch();
  const handleCancel = () => {
    dispatch(emptyBasket());
    navigation.navigate("Home");
  };

  return (
    <View className="flex-1">
      <View className="rounded-t-3xl -mt-12 bg-white relative">
        <View
          style={{ backgroundColor: "rgba(255,255,255,0.8)" }}
          className="p-2 flex-row justify-between items-center rounded-full my-5 mx-2">
          <View className="flex-row items-center space-x-3 mr-3">
            <TouchableOpacity className="bg-white p-2 rounded-full">
              <Icon.Phone
                fill="rgb(251, 146, 60)"
                stroke="rgb(251, 146, 60)"
                strokeWidth="1"
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleCancel}
              className="bg-white p-2 rounded-full">
              <Icon.X stroke={"red"} strokeWidth="5" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}
