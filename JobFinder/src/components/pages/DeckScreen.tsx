import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

export const DeckScreen = () => {
    const navigation = useNavigation();

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Deck Screen</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
                <Text>
                    Go to settings screen
                </Text>
            </TouchableOpacity>
        </View>
    );
};
