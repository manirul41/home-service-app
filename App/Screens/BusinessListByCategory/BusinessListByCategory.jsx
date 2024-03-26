import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import PageHeading from "../../Components/PageHeading";
import Colors from "../../Utils/Colors";
import GlobalApi from "../../Utils/GlobalApi";
import BusinessListItem from "./BusinessListItem";

export default function BusinessListByCategory() {
  const [businessList, setBusinessList] = useState();
  const param = useRoute().params;

  useEffect(() => {
    param && getBusinessByCategory();
  }, [param]);

  const getBusinessByCategory = () => {
    GlobalApi.getBusinessListByCategory(param.category).then((res) => {
      // console.log("res", res?.businessLists)
      setBusinessList(res?.businessLists);
    });
  };

  return (
    <View style={{ padding: 20, paddingTop: 30 }}>
      <PageHeading title={param?.category}/>
      {businessList?.length > 0 ? (
        <FlatList
          data={businessList}
          style={{ marginTop: 15 }}
          renderItem={({ item, index }) => <BusinessListItem business={item} />}
        />
      ) : (
        <Text style={{ fontSize: 20, fontFamily: "outfit-medium", textAlign:'center', color:Colors.GRAY, marginTop: '20%' }}>No Business Found!</Text>
      )}
    </View>
  );
}
