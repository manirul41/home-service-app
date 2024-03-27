import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import CalendarPicker from "react-native-calendar-picker";
import Colors from "../../Utils/Colors";
import Heading from "../../Components/Heading";
import GlobalApi from "../../Utils/GlobalApi";
import { useUser } from "@clerk/clerk-expo";
import { ToastAndroid } from "react-native";
import moment from "moment/moment";

export default function BookingModal({businessId, hideModal }) {
  const navigation = useNavigation();
  const [selectedDate, setSelectedDate] = useState();
  const [selectedTime, setSelectedTime] = useState();
  const [note, setNote] = useState('');
  const [timeList, setTimeList] = useState([]);
  const {user} = useUser();

  useEffect(() => {
    getTime();
  }, []);

  function onDateChange(date) {
    setSelectedDate(date);
  }

  const getTime = () => {
    const timeList = [];
    for (let i = 8; i < 12; i++) {
      timeList.push({
        time: i + ":00 AM",
      });
      timeList.push({
        time: i + ":30 AM",
      });
    }
    for (let i = 1; i < 7; i++) {
      timeList.push({
        time: i + ":00 PM",
      });
      timeList.push({
        time: i + ":30 PM",
      });
    }
    setTimeList(timeList);
  };

  const createNewBooking = () => {
    if(!selectedTime||!selectedDate){
        ToastAndroid.show('Please select Date and Time', ToastAndroid.LONG);
        return;
    }

    const data = {
        userName: user?.fullName,
        userEmail: user?.primaryEmailAddress?.emailAddress,
        time: selectedTime,
        date: moment(selectedDate).format('DD-MMM-yyyy'),
        note: note,
        businessId:businessId,
    }
    GlobalApi.createBooking(data).then(resp => {
        // console.log("response: ", resp)
        ToastAndroid.show('Booking Created Successfully!', ToastAndroid.LONG);
        hideModal();
    });
  }

  return (
    <ScrollView>
      <KeyboardAvoidingView style={styles.container}>
        <TouchableOpacity
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 10,
            alignItems: "center",
          }}
          onPress={() => hideModal()}
        >
          <Ionicons name="arrow-back-outline" size={24} color="black" />
          <Text style={{ fontSize: 25, fontFamily: "outfit-medium" }}>
            Booking
          </Text>
        </TouchableOpacity>
        <View style={{ paddingTop: 10 }}>
          <Heading text={"Select Date"} />
          <View
            style={{
              borderWidth: 0.4,
              borderColor: Colors?.GRAY,
              marginBottom: 5,
            }}
          ></View>
          <View style={styles.calendarContainer}>
            <CalendarPicker
              onDateChange={onDateChange}
              width={320}
              minDate={Date.now()}
              todayBackgroundColor={Colors.BLACK}
              todayTextStyle={{ color: Colors.WHITE }}
              selectedDayColor={Colors.PRIMARY}
              selectedDayTextColor={Colors.WHITE}
            />
          </View>
        </View>
        <View style={{ marginTop: 20 }}>
          <Heading text={"Select Time"} />
          <View
            style={{
              borderWidth: 0.4,
              borderColor: Colors?.GRAY,
              marginBottom: 5,
            }}
          ></View>
          <FlatList
            data={timeList}
            horizontal={true}
            showsHorizontalScrollIndicator={false} //
            style={{ marginTop: 10 }}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                style={{ marginRight: 10 }}
                onPress={() => setSelectedTime(item.time)}
              >
                <Text
                  style={[
                    selectedTime === item.time
                      ? styles.selectedTime
                      : styles.unSelectedTime,
                  ]}
                >
                  {item.time}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
        <View style={{ marginTop: 20 }}>
          <Heading text={"Any Suggestion Note"} />
          <View
            style={{
              borderWidth: 0.4,
              borderColor: Colors?.GRAY,
              marginBottom: 5,
            }}
          ></View>
          <TextInput
            placeholder="Note"
            numberOfLines={4}
            style={styles.noteTextArea}
            onChange={(text) => setNote(text)}
          />
        </View>
        <TouchableOpacity style={{ marginTop: 15 }} onPress={() => createNewBooking()}>
          <Text style={styles.confirmBtn}>Confirm & Book</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 15,
  },
  calendarContainer: {
    backgroundColor: Colors.PRIMARY_LIGHT,
    padding: 20,
    borderRadius: 15,
    marginTop: 10,
  },
  unSelectedTime: {
    borderColor: Colors.PRIMARY,
    padding: 10,
    borderRadius: 99,
    borderWidth: 1,
    paddingHorizontal: 18,
    color: Colors.PRIMARY,
  },
  selectedTime: {
    backgroundColor: Colors.PRIMARY,
    padding: 10,
    borderRadius: 99,
    borderWidth: 1,
    paddingHorizontal: 18,
    color: Colors.WHITE,
  },
  noteTextArea: {
    marginTop: 10,
    borderColor: Colors.PRIMARY,
    borderWidth: 1,
    borderRadius: 15,
    padding: 10,
    textAlignVertical: "top",
    fontSize: 16,
    fontFamily: "outfit",
  },
  confirmBtn: {
    textAlign: "center",
    fontFamily: "outfit",
    fontSize: 17,
    backgroundColor: Colors.PRIMARY,
    color: Colors.WHITE,
    padding: 13,
    borderRadius: 99,
    elevation: 2,
  },
});
