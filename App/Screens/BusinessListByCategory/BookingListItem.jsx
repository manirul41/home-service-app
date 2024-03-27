import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import Colors from "../../Utils/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function BookingListItem({ business, booking}) {
  const navigator = useNavigation();
  return (
    <TouchableOpacity
      style={styles.container}
      // onPress={() =>navigator.push('business-details',{business: business})}
    >
      <Image source={{ uri: business?.images[0]?.url }} style={styles.image} />
      <View style={styles.subContainer}>
        <Text
          style={{ fontFamily: "outfit", color: Colors.GRAY, fontSize: 15 }}
        >
          {business?.contactPerson}
        </Text>
        <Text style={{ fontFamily: "outfit-bold", fontSize: 19 }}>
          {business?.name}
        </Text>
        <Text style={[{padding:5,borderRadius:5,fontSize:14,alignSelf:'flex-start'},
        booking?.bookingStatus == 'Completed' ?
        {backgroundColor:Colors.LIGHT_GREEN,color:Colors.GREEN} :
        booking?.bookingStatus == 'Canceled' ?
        {backgroundColor:Colors.LIGHT_RED,color:Colors.RED} : {
          color:Colors.PRIMARY,backgroundColor:Colors.PRIMARY_LIGHT}]}>
          {booking?.bookingStatus}
        </Text>
        <Text
          style={{ fontFamily: "outfit", color: Colors.GRAY, fontSize: 17 }}
        >
          <Ionicons name="calendar" size={18} color={Colors.PRIMARY} />
          {booking?.date} at {booking.time}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: Colors.WHITE,
    borderRadius: 15,
    marginBottom: 15,
    display: "flex",
    flexDirection: "row",
    gap: 10,
  },
  subContainer: {
    display: "flex",
    gap: 7,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 15,
  },
});
