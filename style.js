import {StyleSheet,StatusBar} from 'react-native';

const styles = StyleSheet.create({
    cardContainer: {
      borderRadius:10,
      borderWidth:0,
      shadowColor: 'rgba(0,0,0, .2)', // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
    },
    cardImage: {
      borderRadius:10,
    },
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
    
    buttonHeart: {
      shadowColor: 'rgba(0,0,0, .4)', // IOS
      shadowOffset: { height: 1, width: 1 }, // IOS
      shadowOpacity: 1, // IOS
      shadowRadius: 1, //IOS
      backgroundColor: '#fff',
      borderRadius: 20,
      height: 40,
      width: 40,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
  },
  buttonReadMore: {
    shadowColor: 'rgba(0,0,0, .4)', // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
    backgroundColor: 'tomato',
    color:'white',
    borderRadius: 3,
    height: 40,
    width: 150,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  });

  export {styles};