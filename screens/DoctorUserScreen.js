import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  TextInput
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { emptyBasket } from "../slices/basketSlice";
import { MoveLeft } from "lucide-react-native";

export default function ChatScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleCancel = () => {
    dispatch(emptyBasket());
    navigation.navigate("Home");
  };

  const [message, setMessage] = React.useState("");
  const [messages, setMessages] = React.useState([
    { id: "1", text: "Хаана явна!", sender: "otherUser" },
    { id: "2", text: "Түгжрээтэй байна  очлоо!", sender: "user" }
    // Add more messages as needed
  ]);
  const handleSendMessage = () => {
    // Replace the following line with your logic to get the new message text
    // Add the new message to the messages array
    const newMessage = {
      id: String(messages.length + 1),
      text: message,
      sender: "otherUser"
    };
    setMessages([...messages, newMessage]);
  };
  return (
    <View className="" style={{ flex: 1 }}>
      <View style={{ flex: 1, padding: 16 }}>
        {/* Chat messages */}
        <FlatList
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View
              style={{
                alignSelf: item.sender === "user" ? "flex-end" : "flex-start"
              }}>
              <View
                style={{
                  backgroundColor:
                    item.sender === "user" ? "#DCF8C6" : "#EFEFEF",
                  padding: 8,
                  borderRadius: 8,
                  marginBottom: 8
                }}>
                <Text>{item.text}</Text>
              </View>
            </View>
          )}
        />

        <View
          className="gap-4"
          style={{ flexDirection: "row", alignItems: "center" }}>
          <TextInput
            onChangeText={(e) => setMessage(e)}
            placeholder="Илгээх хэсэг..."
            style={{ flex: 1, borderWidth: 1, borderRadius: 8, padding: 8 }}
          />
          <TouchableOpacity onPress={handleSendMessage}>
            <Text className="px-4 py-3 bg-[#3caea3] rounded-lg overflow-hidden text-white">
              Илгээх
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
