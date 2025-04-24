import React from "react";
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from "react-native";

const FavoritesList = ({ favorites, onSelect, onBack, onRemove, onRate }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Ma base personnelle</Text>

            <FlatList
                data={favorites}
                keyExtractor={(item) => item.trackId.toString()}
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <TouchableOpacity onPress={() => onSelect(item)} style={styles.itemInfo}>
                            <Image source={{ uri: item.artworkUrl100 }} style={styles.image} />
                            <View>
                                <Text style={styles.track}>{item.trackName}</Text>
                                <Text style={styles.track}>{item.artistName}</Text>

                                <View style={styles.ratingRow}>
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <TouchableOpacity key={star} onPress={() => onRate(item.trackId, star)}>
                                        <Text style={styles.star}>{star <= item.rating ? '⭐' : '☆'}</Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            </View>
                        </TouchableOpacity>

                        <View style={styles.actions}>
                            <TouchableOpacity onPress={() => onRemove(item.trackId)} style={styles.deleteButton}>
                                <Text style={styles.deleteText}>Supprimer</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
                ListEmptyComponent={<Text style={styles.empty}>Liste vide</Text>}
            />

            <TouchableOpacity onPress={onBack} style={styles.button}>
                <Text style={styles.buttonText}>Retour</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, marginTop: 40, },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    itemInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    image: { width: 60, height: 60, borderRadius: 8, marginRight: 10 },
    track: { fontSize: 16, fontWeight: 'bold' },
    empty: { textAlign: 'center', marginTop: 20, color: 'gray' },
    button: {
        marginTop: 20,
        backgroundColor: '#2196F3',
        padding: 10,
        borderRadius: 8,
        alignSelf: 'center',
    },
    buttonText: { color: '#fff', fontWeight: 'bold' },
    actions: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 10,
    },
    deleteButton: {
        marginRight: 10,
        backgroundColor: '#ff5555',
        padding: 8,
        borderRadius: 6,
    },
    deleteText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    likeButton: {
        padding: 8,
        backgroundColor: '#eee',
        borderRadius: 6,
    },
    likeText: {
        fontSize: 18,
    },
    ratingRow: {
        flexDirection: 'row',
        marginTop: 4,
    },
    star: {
        fontSize: 18,
        marginRight: 4,
    }
});

export default FavoritesList;
