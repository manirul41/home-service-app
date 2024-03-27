import { View, Text, Image, FlatList, TouchableOpacity } from "react-native";
import React from "react";
import { useUser } from "@clerk/clerk-expo";
import Colors from "../../Utils/Colors";
import { Ionicons } from "@expo/vector-icons";

export default function ProfileScreen() {
  const profileMenu = [
    { name: "Home", icon: "home" },
    { name: "My Booking", icon: "bookmark" },
    { name: "Contact Us", icon: "mail" },
    { name: "Logout", icon: "exit-sharp" },
  ];
  const { user } = useUser();
  return (
    <View>
      <View style={{ padding: 20, backgroundColor: Colors.PRIMARY_LIGHT }}>
        <Text style={{ fontFamily: "outfit-medium", fontSize: 26 }}>
          Profile
        </Text>
        <View
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: 20,
          }}
        >
          <Image
            source={{ uri: user.imageUrl }}
            style={{ width: 90, height: 90, borderRadius: 99 }}
          />
          <Text
            style={{
              color: Colors.WHITE,
              fontSize: 20,
              fontFamily: "outfit-medium",
            }}
          >
            {user?.fullName}
          </Text>
          <Text>{user?.primaryEmailAddress?.emailAddress}</Text>
        </View>
      </View>
      <View style={{paddingTop:60}}>
        <FlatList
          data={profileMenu}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 15,
                marginBottom: 20,
                paddingHorizontal: 80,
              }}
            >
              <Ionicons name={item.icon} size={35} color={Colors.PRIMARY} />
              <Text style={{ fontSize: 20, fontFamily: "outfit" }}>
                {item.name}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
}
