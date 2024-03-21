import { View, Text, FlatList, Image, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import GlobalApi from "../../Utils/GlobalApi";
import Heading from "../../Components/Heading";
import Colors from "../../Utils/Colors";
import SingleBusiness from "./SingleBusiness";

export default function BusinessList() {
  const [business, setBusiness] = useState();
  useEffect(() => {
    getBusiness();
  }, []);

  const getBusiness = () => {
    GlobalApi.getBusinessList().then((res) => {
        // console.log("res", res?.businessLists)
      setBusiness(res?.businessLists);
    });
  };
  return (
    <View style={{ marginTop: 10 }}>
      <Heading text={"Latest Business"} isViewAll={true} />
      <FlatList
        data={business}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => index <= 3 && (
          <View style={styles.container}>
            <SingleBusiness business={item}/>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
    flex: 1,
    alignItems: 'center',
    marginRight: 10
  },
  iconContainer: {
    backgroundColor: Colors.LIGHT_GRAY,
    padding: 17,
    borderRadius: 99,
  },
});
