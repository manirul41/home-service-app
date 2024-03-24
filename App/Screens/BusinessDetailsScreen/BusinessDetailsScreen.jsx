import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../Utils/Colors";

export default function BusinessDetailsScreen() {
  const param = useRoute().params;
  const navigation = useNavigation();
  const [business, setBusiness] = useState();
  useEffect(() => {
    param && setBusiness(param?.business);
  }, [param]);

  return (
    <View>
      <TouchableOpacity
        style={styles.backBtnContainer}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back-outline" size={24} color="white" />
      </TouchableOpacity>
      <Image
        source={{ uri: business?.images[0]?.url }}
        style={{ width: "100%", height: 300 }}
      />
      <View style={styles.infoContainer}>
        <Text style={{fontFamily:'outfit-bold', fontSize:25}}>{business?.name}</Text>
        <View style={styles.subContainer}>
        <Text style={{fontFamily:'outfit-medium', color:Colors.PRIMARY, fontSize:20}}>{business?.contactPerson}</Text>
        <Text style={{fontFamily:'outfit',color:Colors.PRIMARY,backgroundColor:Colors.PRIMARY_LIGHT,padding:5,borderRadius:5, fontSize:14}}>{business?.category?.name}</Text>
        </View>
        <Text style={{fontFamily:'outfit-bold', fontSize:25}}>{business?.address}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  backBtnContainer: {
    position: "absolute",
    zIndex: 10,
    padding: 20,
  },
  infoContainer: {
    padding: 20,
    display: "flex",
    gap: 7,
  },
  subContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
  }
});
