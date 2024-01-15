import React, { useContext } from 'react';

export const SettingsContext = React.createContext();



export function MenuProvider(props) {
    const [settings, setSettings] = React.useState({
        selectedCategories: [],
        menuitems:[],
        searchText: ''
      });

      const updateSetting = (key, value) => {        
        console.log(`updateSetting function called with key: ${key} and value: ${value}`);
        setSettings(prevSettings => ({
          ...prevSettings,
          [key]: value,
        }));
      };

  return (
    <SettingsContext.Provider value={{ settings, updateSetting }}>
      {props.children}
    </SettingsContext.Provider>
  );
}
