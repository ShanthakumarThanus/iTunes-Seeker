import { StyleSheet } from 'react-native';
import ITunesSearch from './components/ItunesSearch';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TrackDetail from './components/TrackDetail';

const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Recherche">
        <Stack.Screen name="Recherche" component={ITunesSearch} />
        <Stack.Screen name="Détail" component={TrackDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
