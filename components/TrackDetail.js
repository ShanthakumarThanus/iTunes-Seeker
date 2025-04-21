import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

const TrackDetail = ({ track, onBack, onAddToFavorites }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{track.trackName}</Text>
            <Text style={styles.artist}>{track.artistName}</Text>
            <Image source={{ uri: track.artworkUrl100 }} style={styles.image} />

            <TouchableOpacity style={styles.button} onPress={onBack}>
                <Text style={styles.buttonText}>Retour</Text> 
            </TouchableOpacity>

            <TouchableOpacity onPress={() => onAddToFavorites(track)} style={styles.button}>
                <Text style={styles.buttonText}>Ajouter à ma base</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, marginTop: 40, alignItems: 'center' },
    title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
    artist: { fontSize: 18, color: 'gray', marginBottom: 20 },
    image: { width: 200, height: 200, borderRadius: 10, marginBottom: 20 },
    button: { backgroundColor: '#2196F3', padding: 10, borderRadius: 5, margin: 10 },
    buttonText: { color: '#fff', fontWeight: 'bold' },
});

export default TrackDetail;