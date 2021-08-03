import * as React from 'react';
import { ImageBackground,Image,ActivityIndicator,FlatList,SectionList,Alert,TouchableOpacity,SafeAreaView,StatusBar,ActionSheetIOS,StyleSheet,ScrollView, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome,MaterialCommunityIcons, Ionicons} from '@expo/vector-icons'; 
import { useEffect,useState } from 'react';
import * as SQLite from 'expo-sqlite';
import recipe from "./data/recipe.json"
import {Card} from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { styles,buttons,textStyles } from './style' 


const Item = ({item,onPress}) => {

  const timeTotal = item.timers.reduce((totalTime, i) => totalTime + i, 0);
  const timeDisplay = Math.round(timeTotal>=60?(timeTotal/60):timeTotal);
  const timeUnit = timeTotal>=60?"hr":"min";

  return (
    <TouchableOpacity onPress={onPress}>
  <Card key={item.name} containerStyle={styles.cardContainer}>
  <View>
    <View className="card-image-text" style={styles.fixToText}>
    <View style={{flex:4}}>
  <Image defaultSource={require("./default_food_img.jpg")} source={{
uri: item["imageURL"]}} style={styles.cardImage}/>
</View>
<View  className="card-text"  style={{flex:3}}>
   <Text style={styles.cardRecipeTitle} className="recipe-title">{item["name"]}</Text>
   <View style={styles.cardRecipeDescription}>
          <Text>
            {"\n"}
          <Ionicons name="time-outline" size={15} color="black" /> {timeDisplay} {timeUnit}
          </Text>
        </View>
   </View>
  
</View>


   

 </View>
 </Card>
 </TouchableOpacity>)
  
};
const renderItem = ({item},navigation) => {
  return (<Item key={item.name} item={item.recipe} 
    onPress={()=>(navigation.navigate("Details",{
        itemID:item.name,otherParam:item.recipe}))}></Item>)
};

const renderHomeItem = ({item},navigation) => {

  return (<Item key={item.name} item={item} onPress={()=>(navigation.navigate("Details",{
      itemID:item.name,otherParam:item}))}></Item>)
  

}


const App=()=> {
  const [data, setData] = useState([]);
  const [retrieve, setRetrieve] = useState(false);
  const [scrollPosition,setScrollPosition]=React.useState(0)

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
    } catch (error) {
      console.error(error)
    }
  };
  useEffect (() => {

    if (retrieve) {
      fetchAllSavedRecipes();
    } 
    setRetrieve(false);
  },[retrieve]);

  useEffect(() => {
    fetchAllSavedRecipes();
  },[])

  async function deleteData(key) {
    try {
      await AsyncStorage.removeItem(key);
    } catch (e) { }
  }
  async function storeData(key,value) {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
      // saving error
      setRetrieve(true);
  
    }
  };
  async function getData(key) {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue!=null? jsonValue: null;
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

    }
  };
  async function clearData() {
    try {const keys = await AsyncStorage.getAllKeys();
    await AsyncStorage.multiRemove(keys);
}
    
    catch (e) {

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
        await storeData(item.name,item); 
      }
      
    } catch (e) {
      
    } finally {
      setRetrieve(true);      
    };
  };
  
 

 
  function DetailsScreen({route,navigation}) {
    const {itemID,otherParam} = route.params;
    const favorited = data.find(v=>v.name===itemID)!=null;
    
    const timeTotal = otherParam.timers.reduce((totalTime, item) => totalTime + item, 0);
    const timeDisplay = Math.round(timeTotal>=60?(timeTotal/60):timeTotal);
    const timeUnit = timeTotal>=60?"hr":"min";
    return (
      <SafeAreaView key={otherParam.name}>
          
      <ScrollView>
        <View className="recipe-detail-image" style={styles.imageMask}>
        <ImageBackground resizeMode="cover" defaultSource={require("./default_food_img.jpg")} style={styles.imageBackground} source={{
          uri: otherParam["imageURL"]}}
          onError={(e)=>{e.target.onerror=null;
          e.target.src='./default_food_img.jpg'}}>
            <View className="recipe-favorite-icon" style={styles.floatingIcon}>
            <TouchableOpacity
              style={buttons.heart}
              onPress={() =>( favorited?confirmCancelSave(itemID):saveRecipe(otherParam))}
              ><Text><FontAwesome name={favorited?"heart":"heart-o"} size={18} color="#111127" /></Text></TouchableOpacity>
              </View>
                        </ImageBackground>
        </View>
          <View className="recipe-detial-text" style={styles.recipeDetail}>
            <View className="recipe-detail-text-title">
            <Text style={textStyles.recipeTitle}>{otherParam.name}</Text>
            <View>
              
            </View>
            </View>
            <View className="recipeIconRow" style={styles.fixToText}>
          <View style={styles.iconBlock}>
            <Text>
            <Ionicons name="time-outline" size={15} color="black" /> {timeDisplay} {timeUnit}
            </Text>
          </View>
          <View style={styles.iconBlock}>
            <Text><Ionicons name="bar-chart-outline" size={15} color="black" /> 240 cal    
            </Text>
            </View>
          <View style={styles.iconBlock}>
            <Text>
            <MaterialCommunityIcons name="bread-slice-outline" size={15} color="black" /> 6 servings
          </Text>
          </View>

        </View>
        
            <View className="ingredients" style={styles.detailBlock}>
            <Text style = {textStyles.itemSubtitle}>Ingredients</Text>
        {otherParam["ingredients"].map((ingredient,index) => (
          <View key={index}>
            <Text style={textStyles.itemText}>{ingredient.quantity} {ingredient["name"]}</Text>
          </View>
          
        ))}
            </View>
           
        <View className="steps" style={styles.detailBlock}>
        <Text style = {textStyles.itemSubtitle}>Steps</Text>
        {otherParam["steps"].map((step,index) => (
          <View>
            <Text style={textStyles.itemText}>{step} {"\n"}</Text>
          </View>
          
          
          
        ))}
        </View>

          </View>        
        
        
        
      </ScrollView>
      </SafeAreaView>
    );
  };



const handleScroll=(event)=>{
  let yOffset=event.nativeEvent.contentOffset.y / 200;
}
const getItemLayOut = ({data,idnex}) => (
  { length: 150, offset: 150 * index, index })


  function HomeScreen({ navigation }) {
    
    return (
       
         <SafeAreaView>
        <FlatList 
        onScroll={(event)=>handleScroll(event)}
          removeClippedSubviews={true}
        data={recipe}
        renderItem={(item)=>renderHomeItem(item,navigation)}
        keyExtractor={(item)=>item.name}        
        ></FlatList>
      </SafeAreaView>
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
      <SafeAreaView>
         <FlatList
      data={data}
      renderItem={(item)=> renderItem(item,navigation)}
      keyExtractor={(item)=>(item.name)}
      >
      </FlatList>
      </SafeAreaView>
     
     
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
            ? 'ios-home'
            : 'ios-home-outline';
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


export default App;