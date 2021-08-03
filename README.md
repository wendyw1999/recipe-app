# recipe-app

#Key function
1. display list of recipes.
2. Favorite and un-favorite recipes.
3. Read favorited recipes.

# Extended functionalities:
1. navigational panels, recipe streams and saved recipe streams.
2. On home screen, only show core info of a recipe. Route to a detail screen after clicking "read more"


# Libraries
1. React navigation ('@react-navigation/native','@react-navigation/bottom-tabs','@react-navigation/stack')
2. Async Storage ('@react-native-async-storage/async-storage')
3. Card (react-native-elements)
4. FontAwesome,Ionicons (@expo/vector-icons)

#Need Modification
## Problem with Scrollables in React JSX
The flat list re-renders every time when hooks are updated. 
So when the user update favorite/unfav a recipe item, the flatlist goes all the way to the top. 

