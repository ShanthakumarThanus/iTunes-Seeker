import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, Image, StyleSheet, Touchable, TouchableOpacity } from 'react-native';
import TrackDetail from './TrackDetail';
import FavoritesList from './FavoritesList';

const ITunesSearch = () => {
  const [query, setQuery] = useState('Eminem');
  const [results, setResults] = useState([]);
  const [searchType, setSearchType] = useState('artist');

  const [selectedTrack, setSelectedTrack] = useState(null);

  const [favorites, setFavorites] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);

  const searchMusic = async (searchTerm) => {
    try {
      const attribute = getAttribute();
      const response = await fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(searchTerm)}&entity=musicTrack&attribute=${attribute}&limit=10&country=fr`);
      const data = await response.json();
      setResults(data.results);
    } catch (error) {
      console.error('Erreur lors de la requête iTunes:', error);
    }
  };

  useEffect(() => {
    searchMusic(query);
  }, [searchType]);

  const getAttribute = () => {
    if (searchType === 'artist') {
      return 'artistTerm';
    } else if (searchType === 'track') {
      return 'songTerm';
    }
  }

  if (selectedTrack) {
    return (
      <TrackDetail 
      track={selectedTrack} 
      onBack={() => setSelectedTrack(null)} 
      
        onAddToFavorites={(track) => {
          setFavorites((prev) => {
            const alreadyExists = prev.some((item) => item.trackId === track.trackId);
            if (!alreadyExists) {
              return [...prev, { ...track, liked: false, rating: 0 }];
            }
            return prev;
          });
          setSelectedTrack(null); 
        }}
      />
    );
  }

  if (showFavorites) {
    return (
      <FavoritesList
        favorites={favorites}
        onSelect={(track) => {
          setSelectedTrack(track);
          setShowFavorites(false); // facultatif : cacher la vue après sélection
        }}
        onBack={() => setShowFavorites(false)}
        onRemove={(trackId) => {
          setFavorites((prev) => prev.filter((track) => track.trackId !== trackId));
        }}
      />
    );
  }
  

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={query}
        onChangeText={(text) => {
          setQuery(text);
          searchMusic(text);
        }}
        placeholder={`Rechercher par ${searchType === 'artist' ? 'artist' : 'titre'}`}
      />

      <View style={{ flexDirection: 'row', justifyContent: 'center'}}>
        <TouchableOpacity style={styles.button} onPress={() => setSearchType('artist')}>
          <Text>Artiste</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => setSearchType('track')}>
          <Text>Track</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => setShowFavorites(true)}>
          <Text>Mes favoris</Text>
        </TouchableOpacity>

      </View>

      <FlatList
        data={results}
        keyExtractor={(item) => item.trackId.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => setSelectedTrack(item)}>
            <View style={styles.item}>
              <Image source={{ uri: item.artworkUrl100 }} style={styles.image} />
              <View>
                <Text style={styles.title}>{item.trackName}</Text>
                <Text style={styles.artist}>{item.artistName}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, marginTop: 40 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginBottom: 16,
    borderRadius: 8,
  },
  item: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'center',
  },
  image: { width: 60, height: 60, marginRight: 10, borderRadius: 8 },
  title: { fontSize: 16, fontWeight: 'bold' },
  artist: { fontSize: 14, color: 'gray' },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    margin: 10,
  },
});

export default ITunesSearch;
