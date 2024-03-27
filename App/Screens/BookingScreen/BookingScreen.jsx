import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-expo";
import GlobalApi from "../../Utils/GlobalApi";
import BusinessListItem from "../BusinessListByCategory/BusinessListItem";
import BookingListItem from "../BusinessListByCategory/BookingListItem";

export default function BookingScreen() {
  const { user } = useUser();
  const [bookingList, setBookingList] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    user && getUserBookings();
  }, [user]);

  const getUserBookings = () => {
    setLoading(true);
    GlobalApi.getUserBookings(user?.primaryEmailAddress?.emailAddress).then(
      (res) => {
        setBookingList(res?.bookings);
        setLoading(false);
      }
    );
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontFamily: "outfit-medium", fontSize: 26 }}>
        My Bookings
      </Text>
      <View>
        <FlatList
          data={bookingList}
          onRefresh={() => getUserBookings()}
          refreshing={loading}
          renderItem={({ item, index }) => (
            <BookingListItem business={item?.businessList} booking={item} />
          )}
        />
      </View>
    </View>
  );
}
