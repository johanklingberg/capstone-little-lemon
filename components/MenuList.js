import React, { useContext, useState, useEffect } from 'react';
import { FlatList, View, Text, Image, StyleSheet } from 'react-native';
import {getFilteredMenuItems} from '../utils/MenuData';
import { SettingsContext } from '../utils/MenuProvider';

const styles = StyleSheet.create({
  container: { margin: 10, backgroundColor: '#FFF' },
  title: { fontSize: 24, fontWeight: 'bold' },
  row: { flexDirection: 'row', justifyContent: 'space-between', borderWidth: 0, marginTop: 5 },
  description: { flex: 0.8, margin: 5, fontSize: 14 },
  price: { fontSize: 14, fontWeight: 'bold', alignSelf: 'flex-start' },
  image: { flex: 0.4, width: 100, height: 100 },
  separator: { borderColor: '#DDDDDD', borderBottomWidth: 1 }
});

const MenuList = () => {
  const { settings, updateSetting } = useContext(SettingsContext);
  const [menuData, setMenuData] = useState([]);

  useEffect(() => {
    getFilteredMenuItems(settings.selectedCategories, "")
      .then(data => {
        setMenuData(data);
        
      });
  }, []); 

  useEffect(() => {
    getFilteredMenuItems(settings.selectedCategories, settings.searchText)
      .then(data => setMenuData(data));
      console.log("MenuData: " + JSON.stringify(menuData));
  }, [settings.selectedCategories]);
  
  useEffect(() => {
    getFilteredMenuItems(settings.selectedCategories, settings.searchText)
      .then(data => setMenuData(data));
      console.log("MenuData: " + JSON.stringify(menuData));
  }, [settings.searchText]);


  const renderItem = ({ item }) => (
    <View style={styles.container}>
        
    <Text style={styles.title}>{item.name}</Text>
    <View style={styles.row}>
      <View style={styles.description}>        
        <Text style={styles.description}>{item.description}</Text>
        <View style={{ flex: 1 }}></View>
        <Text style={styles.price}>${item.price}</Text>
      </View>
      <View style={styles.image}>
        {item.name === "Lemon Dessert" && <Image source={require('../images/Lemon_dessert.png')} style={styles.image} />}
        {item.name === "Grilled Fish" && <Image source={require('../images/Grilled_fish.png')} style={styles.image} />}
        {item.name !== "Lemon Dessert" && item.name !== "Grilled Fish" && <Image source={{uri: `https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images/${item.image}?raw=true`}} style={styles.image} />}
      </View>
    </View>
    
    </View>
  );

  return (
    <FlatList
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      data={menuData}
      renderItem={renderItem}
      keyExtractor={item => item.id}
    />
  );
};

export default MenuList;
