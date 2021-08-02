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
## structure
1. Update to SectionList instead of using ScrollView
2. Right now the screen refreshes after making changes to "Favorited" items. 
Maybe make two hooks, one keep track of all items,
one keep track of favorited items.
3. Move to AWS online datastore. Then think about how to use async storage to update 
## styles
