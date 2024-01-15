import React, { useState, useEffect, useContext } from 'react';
import { View } from 'react-native';
import Header from '../components/Header';
import MenuList from '../components/MenuList';
import FilterCategories from '../components/FilterCategories';
import { writeMenuItems, menuitemsExist, getMenuItems } from '../utils/MenuData';
import { SettingsContext } from '../utils/MenuProvider';


export default function HomeScreen() {
    const { settings, updateSetting } = useContext(SettingsContext);
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
   

    const getAndPersistMenuItems = async () => {
      if (!await menuitemsExist()) {
        console.log("getAndPersistMenuItems started");
        const response = await fetch('https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json');
        const json = await response.json();

        
        const writeResult = writeMenuItems(json.menu);
        console.log("writeResult: " + writeResult);
        if (writeResult) {
            return true;
        } 
        return false;
    }

    }
  
    useEffect(() => {     
        fetchData();   
        async function fetchData() {
        console.log("MenuItemsExist:" + await menuitemsExist());
         
        const result = await getAndPersistMenuItems();
        const items = await getMenuItems();
        console.log("Items: " + items);
        updateSetting("menuItems", items);
        setData(await getMenuItems());
        setIsLoading(false);
        
}}, []);

    return (
    <View style={{ flex: 1, alignItems: 'left', justifyContent: 'flex-start', backgroundColor: 'white' }}>
      <Header />
      
          <FilterCategories/>
          <MenuList />
        
    </View>
     );
    }