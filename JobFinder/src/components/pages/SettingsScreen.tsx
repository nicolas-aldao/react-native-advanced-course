import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

export const SettingsScreen = () => {
    const navigation = useNavigation();

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Settings Screen</Text>

            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text>
                    Go back
                </Text>
            </TouchableOpacity>
        </View>
    );
};
