import * as React from 'react';
import { Alert,TouchableOpacity,SafeAreaView,StatusBar,ActionSheetIOS,StyleSheet,ScrollView,Button, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons'; 
import { useEffect,useState } from 'react';
import * as SQLite from 'expo-sqlite';
import recipe from "./data/recipe.json"
import {Card} from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';



const App=()=> {
  const [data, setData] = useState([]);
  const [retrieve, setRetrieve] = useState(false);
  const fetchAllSavedRecipes = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const result = await AsyncStorage.multiGet(keys);
      let currResult = result.map(req => {
        var key = req[0];
        var value = JSON.parse(req[1]);
        return ({"name":key,"recipe":value})
      });
      
      setData(currResult);
      console.log(data);
    } catch (error) {
      console.error(error)
    }
  };
  useEffect (() => {

    if (retrieve) {
      fetchAllSavedRecipes();
      console.log(data);
    } 
    setRetrieve(false);
  },[retrieve]);

  async function deleteData(key) {
    try {
      await AsyncStorage.removeItem(key);
    } catch (e) { }
    console.log("Deleted");
  }
  async function storeData(key,value) {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
      // saving error
  
    }
  };
  async function getData(key) {
    try {
      const jsonValue = await AsyncStorage.getItem(key)
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch(e) {
      return false;
    }
  };
  
  async function mergeData(key,value) {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.mergeItem(key,jsonValue);
      return true;
    } catch (e) {
      console.log(e);
    }
  };
  async function clearData() {
    try {const keys = await AsyncStorage.getAllKeys();
    await AsyncStorage.multiRemove(keys);
  setRetrieve(true);
}
    
    catch (e) {

      console.log(e);
    }
  };

 function confirmCancelSave(itemKey)  {
    ActionSheetIOS.showActionSheetWithOptions ({
      options:["Cancel","Unsave"],
      cancelButtonIndex:0,
      destructiveButtonIndex: 1,

    },buttonIndex => {
      if (buttonIndex==0) {
        //cancel
      } else {
        // delete this item from the asyncstorage and set retrieve to true to reset data
        deleteData(itemKey);
        setRetrieve(true);
      }
    })
  }
  async function saveRecipe(item) {
    try {
      var val = await getData(item.name);
      await mergeData(item.name,item);
      if (!val) {
        console.log("Storing Item");
        await storeData(item.name,item); 
      }
      
    } catch (e) {
      console.log(e);
      
    } finally {setRetrieve(true)};
  };
  function DetailsScreen({route,navigation}) {
    const {itemID,otherParam} = route.params;
    return (
      <View style={styles.leftContainer}>
        <Text style={styles.detailTitle}>{otherParam["name"]}</Text>
        <Text style = {styles.itemSubtitle}>Total: {otherParam["timers"].map(datum => datum).reduce((a, b) => a + b)} minutes</Text>
        <Text style = {styles.itemSubtitle}>Ingredients</Text>
        {otherParam["ingredients"].map((ingredient,index) => (
          <Text>{index+1}. {ingredient["name"]}* {ingredient["quantity"]}</Text>
          
        ))}
        <Text style = {styles.itemSubtitle}>Steps</Text>
        {otherParam["steps"].map((step,index) => (
          <Text>{index+1}. {step} ({otherParam["timers"][index]} minutes)</Text>
          
        ))}
        <TouchableOpacity
            style={styles.button}
            onPress={() =>(saveRecipe(otherParam))}
          ><Text><FontAwesome name="heart" size={24} color="tomato" /></Text></TouchableOpacity>
      </View>
    );
  }
  
  function HomeScreen({ navigation }) {
    
    return (
      <View style={styles.centerContainer}>
        {/* <Button
          title="Go to Details"
          onPress={() => navigation.navigate('Details')}
        /> */}
         <SafeAreaView>
         <ScrollView style={styles.scrollView}>
        
          {recipe.map((item,index) =>  {
            const saved = data.find(v => v.name === item.name);
            const iconName = saved ? 'heart':'heart-o';
            return (
              <Card key={item["name"]}>
             <View>
                <View style={styles.leftContainer}>
              <Card.Title className="item-title">{item["name"]}</Card.Title>
   </View>
   <Card.Image source={{
          uri: item["imageURL"],
        }}/>
              <View style={styles.fixToText}>
          <TouchableOpacity
            style={styles.button}
            onPress={() =>( saved?confirmCancelSave(item.name):saveRecipe(item))}
          ><Text><FontAwesome name={iconName} size={18} color="tomato" /></Text></TouchableOpacity>
           <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate(
              "Details",{itemId:index,otherParam:item}
            )}><Text>Read</Text></TouchableOpacity>
            </View>
  
            </View>
            </Card>
          )})}
  
          
              </ScrollView>
      </SafeAreaView>
      </View>
    );
  }
  
  function SavedScreen({ navigation }) {
  
    if (data.length === 0) {
      return (
        <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}> 
             <Text >Empty</Text>
        </SafeAreaView>
   )
    }
    return (
      <View>
        <ScrollView>
        {data.map((item,index) => {
          console.log(item["recipe"]["imageURL"])
          return (
            <Card key={item["name"]}>
             <View>
                <View style={styles.leftContainer}>
              <Card.Title className="item-title">{item["name"]}</Card.Title>
   </View>
   <Card.Image source={{
          uri: item["recipe"]["imageURL"],
        }}/>

              <View style={styles.fixToText}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => (confirmCancelSave(item["name"]))}
          ><Text><FontAwesome name="heart" size={18} color="tomato" 
          /></Text></TouchableOpacity>
           <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate(
              "Details",{itemId:index,otherParam:item["recipe"]}
            )}><Text>Read</Text></TouchableOpacity>
            </View>
  
            </View>
            </Card>
          );
        })}
        <View>
          
        </View>
        </ScrollView>
      </View>
    );
  }
  
  const HomeStack = createStackNavigator();
  
  function HomeStackScreen() {
    return (
      <HomeStack.Navigator>
        <HomeStack.Screen name="Home" component={HomeScreen} />
        <HomeStack.Screen name="Details" component={DetailsScreen} />
      </HomeStack.Navigator>
    );
  }
  
  const SavedStack = createStackNavigator();
  
  function SavedStackScreen() {
    return (
      <SavedStack.Navigator>
        <SavedStack.Screen name="Saved" component={SavedScreen} />
        <SavedStack.Screen name="Details" component={DetailsScreen} />
      </SavedStack.Navigator>
    );
  }
  
  const Tab = createBottomTabNavigator();
  
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'Home') {
          iconName = focused
            ? 'ios-information-circle'
            : 'ios-information-circle-outline';
        } else if (route.name === 'Saved') {
          iconName = focused ? 'ios-list' : 'ios-list';
        }

        // You can return any component that you like here!
        return <Ionicons name={iconName} size={size} color={color} />;
      },
    })}
    tabBarOptions={{
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    }}>
        <Tab.Screen name="Home" component={HomeStackScreen} />
        <Tab.Screen name="Saved" component={SavedStackScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  centerContainer: 
  { flex: 1, justifyContent: 'center', 
  alignItems: 'center',
  textAlign:"center"},

  leftContainer: 
  { flex: 1, justifyContent: "flex-start", 
  alignItems: 'flex-start',
  textAlign:"left",
  paddingHorizontal:10},

  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight+10,
    marginTop:10,
  },
  scrollView: {
    marginHorizontal: 10,
  },
  detailTitle:{
    fontWeight:'bold',
    alignSelf:"center",
  },itemTitle:{
    fontWeight:'bold',
    alignSelf:"flex-start",
  },
  itemSubtitle:{
    fontSize:15,
    alignSelf:"flex-start",
    color:"tomato",
  },
  text: {
    textAlign:"left",
    fontSize: 10,
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding:10,
  },
  
  button: {
    alignItems: "center",
    alignSelf:"center",
    backgroundColor: "#DDDDDD",
    padding: 10
  },
});
export default App;
