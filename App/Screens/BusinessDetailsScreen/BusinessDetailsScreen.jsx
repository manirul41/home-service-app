import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../Utils/Colors";
import Heading from "../../Components/Heading";
import BusinessPhotoScreen from "./BusinessPhotoScreen";
import BookingModal from "./BookingModal";
import * as Linking from 'expo-linking';

export default function BusinessDetailsScreen() {
  const param = useRoute().params;
  const navigation = useNavigation();
  const [business, setBusiness] = useState();
  const [isReadMore, setIsReadMore] = useState(false);
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    param && setBusiness(param?.business);
  }, [param]);

  const onMessageBtnClick = () => {
    Linking.openURL('mailto:'+business?.email+"?subject=I am looking your service&body=Hi there,");
  }

  return (
    business && (
      <View>
        <ScrollView style={{ height: "91%" }}>
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
            <Text style={{ fontFamily: "outfit-bold", fontSize: 25 }}>
              {business?.name}
            </Text>
            <View style={styles.subContainer}>
              <Text
                style={{
                  fontFamily: "outfit-medium",
                  color: Colors.PRIMARY,
                  fontSize: 20,
                }}
              >
                {business?.contactPerson}
              </Text>
              <Text
                style={{
                  fontFamily: "outfit",
                  color: Colors.PRIMARY,
                  backgroundColor: Colors.PRIMARY_LIGHT,
                  padding: 5,
                  borderRadius: 5,
                  fontSize: 14,
                }}
              >
                {business?.category?.name}
              </Text>
            </View>
            <Text
              style={{
                fontFamily: "outfit",
                fontSize: 17,
                color: Colors?.GRAY,
              }}
            >
              <Ionicons name="location-sharp" size={18} color={Colors.GRAY} />
              {business?.address}
            </Text>
            <View
              style={{
                borderWidth: 0.4,
                borderColor: Colors?.GRAY,
                marginBottom: 20,
              }}
            ></View>
            <View>
              <Heading text={"About Me"} />
              <Text
                style={{
                  fontFamily: "outfit",
                  lineHeight: 28,
                  color: Colors?.BLACK,
                }}
                numberOfLines={isReadMore ? 20 : 5}
              >
                {business?.about}
              </Text>
              <TouchableOpacity onPress={() => setIsReadMore(!isReadMore)}>
                <Text
                  style={{
                    color: Colors.PRIMARY,
                    fontSize: 16,
                    fontFamily: "outfit",
                  }}
                >
                  {isReadMore ? "Read Less" : "Read More"}
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                borderWidth: 0.4,
                borderColor: Colors?.GRAY,
                marginBottom: 20,
              }}
            ></View>
            <BusinessPhotoScreen business={business} />
          </View>
        </ScrollView>
        <View
          style={{ display: "flex", flexDirection: "row", margin: 8, gap: 8 }}
        >
          <TouchableOpacity style={styles?.messageBtn} onPress={() => onMessageBtnClick()}>
            <Text
              style={{
                textAlign: "center",
                fontFamily: "outfit-medium",
                color: Colors.PRIMARY,
                fontSize: 18,
              }}
            >
              Message
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles?.bookingBtn}
            onPress={() => setShowModal(true)}
          >
            <Text
              style={{
                textAlign: "center",
                fontFamily: "outfit-medium",
                color: Colors.WHITE,
                fontSize: 18,
              }}
            >
              Book Now
            </Text>
          </TouchableOpacity>
        </View>
        <Modal animationType="slide" visible={showModal}>
          <BookingModal 
          businessId = {business?.id}
          hideModal={() => setShowModal(false)}
          />
        </Modal>
      </View>
    )
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
  },
  messageBtn: {
    padding: 15,
    backgroundColor: Colors.WHITE,
    borderWidth: 1,
    borderColor: Colors.PRIMARY,
    borderRadius: 99,
    flex: 1,
  },
  bookingBtn: {
    padding: 15,
    backgroundColor: Colors.PRIMARY,
    borderWidth: 1,
    borderColor: Colors.PRIMARY,
    borderRadius: 99,
    flex: 1,
  },
});
