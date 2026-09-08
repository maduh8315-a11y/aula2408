import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import HomeScreen from './src/screens/HomeScreen.js';
import DetailsScreen from './src/screens/DetailsScreen.js';
import FavoritesScreen from './src/screens/FavorittesScreen.js';

const Stack = createNativeStackNavigator();

export default function App(){
  return(
      <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">

            <Stack.Screen name="Home" component={HomeScreen} options={{title: 'Cine App'}}/>
            <Stack.Screen name="Details" component={DetailsScreen} options={{title: 'Detalhes do Filme'}}/>
            <Stack.Screen name="Favorites" component={FavoritesScreen} options={{title: 'Meus Favoritos'}}/>

          </Stack.Navigator>

      </NavigationContainer>

  )
}