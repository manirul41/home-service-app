import { View, Text, FlatList, Image, StyleSheet, Touchable, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import GlobalApi from "../../Utils/GlobalApi";
import Heading from "../../Components/Heading";
import Colors from "../../Utils/Colors";
import { useNavigation } from "@react-navigation/native";

export default function Categories() {
  const [categories, setCategories] = useState();
  const navigator = useNavigation();
  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = () => {
    GlobalApi.getCategory().then((res) => {
      //   console.log("res", res?.categories)
      setCategories(res?.categories);
    });
  };
  return (
    <View style={{ marginTop: 10 }}>
      <Heading text={"Categories"} isViewAll={true} />
      <FlatList
        data={categories}
        numColumns={4}
        renderItem={({ item, index }) => index <= 3 && (
          <TouchableOpacity 
          style={styles.container}
          onPress={() =>navigator.push('business-list',{category: item?.name})}
          >
            <View style={styles.iconContainer}>
              <Image
                source={{ uri: item?.icon?.url }}
                style={{ width: 30, height: 30 }}
              />
            </View>
            <Text style={{fontFamily:'outfit-medium',marginTop:5}}>{item?.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
    flex: 1,
    alignItems: 'center',
  },
  iconContainer: {
    backgroundColor: Colors.LIGHT_GRAY,
    padding: 17,
    borderRadius: 99,
  },
});
