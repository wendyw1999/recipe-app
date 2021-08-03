import {StyleSheet,StatusBar} from 'react-native';
const tomato = "#F55951";
const styles = StyleSheet.create({
    
    centerContainer: 
    { flex: 1, justifyContent: 'center', 
    alignItems: 'center',
    textAlign:"center"},
  
    leftContainer: 
    { flex: 1, justifyContent: "flex-start", 
    alignItems: 'flex-start',
    textAlign:"left"},
  
    container: {
      flex: 1,
      paddingTop: StatusBar.currentHeight+10,
    },
   
    
    text: {
      textAlign:"left",
      fontSize: 10,
    },
    fixToText: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    
   
  cardContainer: {
    backgroundColor: "#FFFFFF",
    shadowColor:"rgba(245,89,81,0.2)",
    shadowOffset: {
      width:0,
      height:2
    },
    borderRadius: 25,
  },
  cardImage: {
    padding:0,
    margin:0,
    backgroundColor: "#D8D8D8",
    borderRadius: 15,
    width:120,
    height:110,
  },
  cardRecipeTitle: {
    fontFamily: "Helvetica",
fontSize: 14,
color: "#111127",
paddingTop:10,
paddingBottom:6,
  },
  cardRecipeDescription: {
    fontFamily: "Helvetica",
    fontSize:11,
color: "#111127",
lineHeight: 15,
  },
  
  recipeDetail: {
    paddingTop:10,
    marginHorizontal:20,
  },
  detailBlock: {
    paddingVertical:10,
  },
  iconBlock: {
    flex:1,
    alignItems:"center",
    justifyContent:"center",
  },
  imageBackground: {
    flex: 1,
  },
  imageMask: {
    flex:1,
    height:150,

  },
  floatingIcon: {
    paddingTop:10,
    paddingHorizontal:10,
    justifyContent:"flex-end",
    alignItems:"flex-end",
  }
  });

  const buttons = StyleSheet.create({
    red: {
      width:138,
      alignItems:'center',
      justifyContent: 'center',
      backgroundColor: tomato,
      shadowColor: tomato,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
elevation: 5,
      borderRadius: 30
      
    },
    heart: {
      shadowOffset: { height: 1, width: 1 }, // IOS
      shadowOpacity: 0.25, // IOS
      shadowRadius: 2, //IOS
      shadowColor:tomato,
      backgroundColor: 'white',
      borderRadius: 20,
      height: 40,
      width: 40,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
     borderWidth: 0,
     borderColor:"#F2DBD5"
     },
     
  });
  const textStyles = StyleSheet.create({
    itemText:{
      fontSize:14,
      color:"grey",
      lineHeight:25,


    },
    textInside: {
  
        color: "white",
        fontSize: 42,
        lineHeight: 84,
        fontWeight: "bold",
        textAlign: "center",
      
    },
    ingredientQuantity: {
      fontSize:12,
      color:"grey",

    },
    recipeTitle: {
      fontFamily: "Helvetica",
  fontSize: 16,
  color: tomato,
  letterSpacing:1.1,
  textAlign: "center",
  paddingTop:10,
  paddingBottom:20,
    },
    itemSubtitle:{
      fontSize:17,
      alignSelf:"flex-start",
      color:tomato,
      paddingVertical:10,
    },
  })
  export {styles,buttons,textStyles};