import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('menu.db');

export const menuitemsExist = async () => {
  try {
    const items = await getAllItems();
    console.log("items: " + items.length);
    return (items.length > 0);
  } catch (error) {
    console.error('Database Error: ', error);
    return false;
  }
};

export const writeMenuItems = (items) => {
  return new Promise((resolve, reject) => {
    try {
      console.log("writeMenuItems entered");
      db.transaction(tx => {
        tx.executeSql(
          `DROP TABLE IF EXISTS menuitem;`
        );
      }); 

      db.transaction(tx => {
        tx.executeSql(
          `CREATE TABLE IF NOT EXISTS menuitem (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            category TEXT,
            description TEXT,
            name TEXT,
            price REAL,
            image TEXT
          );`
        );
        console.log("Created table");   
          items.forEach(item => {
              console.log("Inserting item: " + item.name);
            tx.executeSql(
              `INSERT INTO menuitem (category, description, name, price, image) VALUES (?, ?, ?, ?, ?);`,
              [item.category, item.description, item.name, item.price, item.image]
            );
            console.log("Insert complete: " + item.name);
          });   
        
      }, (error) => {
        console.log('Transaction Error: ', error);
        reject(false);
      }, () => {
        console.log('Transaction Success');
        resolve(true);

      });
    } catch (error) {
      console.error('Database Error: ', error);
      reject(false);
    }
  });
};



export const getFilteredMenuItems = (selectedCategories, searchString) => {
  console.log ("fil" + JSON.stringify(selectedCategories));
  const filteredCategories = selectedCategories.filter(item => item.selected).map(item => item.name);
  console.log ("fil" + filteredCategories);
  const items = getFilteredItems(filteredCategories, searchString);  
  console.log("Returning filtered menuitems from DB:" + items.length);    
  return items;
}

const getFilteredItems = (selectedCategories, searchString) => {
  return new Promise((resolve, reject) => {
      try {
          let items = [];
          db.transaction(tx => {
              let query = `SELECT * FROM menuitem`;
              let params = [];

              if (selectedCategories && selectedCategories.length > 0) {
                  query += ` WHERE category IN (${selectedCategories.map(() => '?').join(',')})`;
                  params = [...selectedCategories];
              }

              if (searchString && searchString.trim() !== '') {
                  query += `${params.length > 0 ? ' AND' : ' WHERE'} name LIKE ?`;
                  params.push(`%${searchString}%`);
              }

              query += ';';

              tx.executeSql(
                  query,
                  params,
                  (_, result) => {
                      for (let i = 0; i < result.rows.length; i++) {
                          let item = result.rows.item(i);
                          items.push({
                              id: item.id,
                              name: item.name,
                              description: item.description,
                              category: item.category,
                              price: item.price,
                              image: item.image
                          });
                      }   
                      console.log("Returning items from DB: " + items.length);
                      resolve(items);
                  },
                  (error) => {
                      console.error('Database Error: ', error);
                      reject(error);
                  }
              );
          });
      } catch (error) {
          console.error('Database Error: ', error);
          reject(error);
      }
  });
}

const getAllItems = () => {
    return new Promise((resolve, reject) => {
        try {
            let items = [];
            db.transaction(tx => {
                tx.executeSql(
                    `SELECT * FROM menuitem;`,
                    [],
                    (_, result) => {
                        for (let i = 0; i < result.rows.length; i++) {
                            let item = result.rows.item(i);
                            items.push({
                                id: item.id,
                                name: item.name,
                                description: item.description,
                                category: item.category,
                                price: item.price,
                                image: item.image
                            });
                        }   
                        console.log("Returning items from DB: " + items.length);
                        resolve(items);
                    },
                    (error) => {
                        console.error('Database Error: ', error);
                        reject(error);
                    }
                );
            });
        } catch (error) {
            console.error('Database Error: ', error);
            reject(error);
        }
    });
}

export const getMenuItems = async () => {
    const items = await getAllItems();
    
    console.log("Returning menuitems from DB:" + items);
    return items;
  };
