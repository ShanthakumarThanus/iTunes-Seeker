import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, Image, StyleSheet } from 'react-native';

const ITunesSearch = () => {
  const [query, setQuery] = useState('Eminem');
  const [results, setResults] = useState([]);

  const searchMusic = async (searchTerm) => {
    try {
      const response = await fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(searchTerm)}&entity=musicTrack&limit=10&country=fr`);
      const data = await response.json();
      setResults(data.results);
    } catch (error) {
      console.error('Erreur lors de la requête iTunes:', error);
    }
  };

  useEffect(() => {
    searchMusic(query);
  }, []);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={query}
        onChangeText={(text) => {
          setQuery(text);
          searchMusic(text);
        }}
        placeholder="Rechercher un artiste..."
      />

      <FlatList
        data={results}
        keyExtractor={(item) => item.trackId.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Image source={{ uri: item.artworkUrl100 }} style={styles.image} />
            <View>
              <Text style={styles.title}>{item.trackName}</Text>
              <Text style={styles.artist}>{item.artistName}</Text>
            </View>
          </View>
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
});

export default ITunesSearch;
