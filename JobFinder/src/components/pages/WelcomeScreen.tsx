import React from 'react';
import { Button, Text, View } from 'react-native';
import { AccessToken, LoginButton } from 'react-native-fbsdk-next';
import { Notifications } from 'react-native-notifications';
import messaging from '@react-native-firebase/messaging';

export const WelcomeScreen = () => {
    messaging().subscribeToTopic('all');

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ marginBottom: 24 }}>Facebook test</Text>
            <Text> Push Notification!! </Text>
            <Button title={'Click Here'}
                onPress={() => Notifications.postLocalNotification({
                    body: 'Local notification!',
                    title: 'Local Notification Title',
                    sound: 'chime.aiff',
                    category: 'SOME_CATEGORY',
                    link: 'localNotificationLink',
                    fireDate: new Date() // only iOS
                }, 12)}
            />
            <LoginButton
                onLoginFinished={
                    (error, result) => {
                        if (error) {
                            console.log("login has error: " + result?.error);
                        } else if (result.isCancelled) {
                            console.log("login is cancelled.");
                        } else {
                            AccessToken.getCurrentAccessToken().then(
                                (data) => {
                                    console.log(data?.accessToken.toString())
                                }
                            )
                        }
                    }
                }
                onLogoutFinished={() => console.log("logout.")} />
        </View>
    );
};
