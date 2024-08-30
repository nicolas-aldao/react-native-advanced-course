import { useNavigation } from '@react-navigation/native';
import { Card } from '@rneui/base';
import React, { useState } from 'react';
import { Image } from 'react-native';
import { Text, TouchableOpacity, View } from 'react-native';
import { generateRandomProfiles } from '../../utils';
import { Deck } from '../atoms/Deck';
import { ThemedText } from '../atoms/ThemedText';

export const DeckScreen = () => {
    const [data, setData] = useState(generateRandomProfiles(3))

    const renderCard = (item) => {
        return (
            <Card containerStyle={{
                padding: 0, margin: 0, alignItems: "center", borderRadius: 20, width: 300
            }}
                wrapperStyle={{}}>
                <Image
                    style={{ width: 300, height: 520 }}
                    resizeMode="cover"
                    source={{ uri: item.photo }}
                />
                <Card.Title style={{ marginBottom: 0 }}>{item.name}</Card.Title>
            </Card>
        )
    }

    const renderNoMoreCards = () => {
        return (
            <Card containerStyle={{
                padding: 0, margin: 0, alignItems: "center", borderRadius: 20, width: 300
            }}>
                <TouchableOpacity
                    onPress={() => setData(generateRandomProfiles(3))}
                    style={{
                        width: 300, height: 520, alignItems: "center", justifyContent: "center",
                        padding: 50
                    }}
                >
                    <ThemedText style={{
                        marginBottom: 16, textAlign: "center",
                        fontSize: 20
                    }}>
                        No more profiles.
                    </ThemedText>
                    <ThemedText style={{
                        marginBottom: 0, textAlign: "center",
                        fontSize: 20
                    }}>
                        Tap to browse more!
                    </ThemedText>
                </TouchableOpacity>
            </Card>)
    }

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Deck data={data} renderCard={renderCard}
                onSwipeLeft={() => { }}
                onSwipeRight={() => { }}
                renderNoMoreCards={renderNoMoreCards}
            />
        </View>
    );
};
