import { View, Text } from "react-native";
import React from "react";

export default function DoctorScreen() {
  return (
    <View className=" mt-12">
      <View className=" bg-white relative">
        <View className="p-2 test-start flex-col gap-10 justify-between  rounded-full ">
          {[
            {
              description: "2019 онд харвалт өгч байсан"
            },
            {
              description:
                " 2020 онд улсын нэгдүгээр эмнэлэгт зүрхний хяналтанд байсан"
            },
            {
              description: " 2020 онд зүрхний хавхалга тэлэх эмчилгээ хийлгэсэн"
            },
            {
              description: "2021 онд зүрхний хавхалганд гуурс суулгасан"
            }
          ]?.map((e, i) => (
            <View
              key={i}
              className="px-1 py-4 m-auto w-full flex gap- flex-row">
              <Text className="text-black text-[14px] font-semibold">
                {e?.description}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}
