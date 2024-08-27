import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MapView, { Details, Marker, PROVIDER_GOOGLE, Region } from 'react-native-maps';

export const MapScreen = () => {
    const [region, setRegion] = useState({
        mapLoaded: false,
        region: {
            longitude: -58.3828,
            latitude: -34.6010,
            longitudeDelta: 0.01,
            latitudeDelta: 0.01,
        },
    });
    const [markers, setMarkers] = useState([
        {
            title: 'Marker 1',
            coordinate: {
                latitude: 37.78825,
                longitude: -122.4324,
            },
        },
        {
            title: 'Marker 2',
            coordinate: {
                latitude: 37.78925,
                longitude: -122.4314,
            },
        },
    ])

    const data = {
        includedTypes: ['restaurant', 'bar', 'bakery', 'cafe'],
        maxResultCount: 10,
        locationRestriction: {
            circle: {
                center: {
                    latitude: region.region.latitude,
                    longitude: region.region.longitude,
                },
                radius: 500.0,
            },
        },
    };

    const onRegionChangeComplete = (regionParam: Region, isGesture: boolean | undefined) => {
        isGesture && setRegion({ ...region, region: regionParam });
    };

    useEffect(() => {
        setRegion({ ...region, mapLoaded: true });
        fetchData();
    }, []);

    const fetchData = async () => {
        const res = await axios.post('https://places.googleapis.com/v1/places:searchNearby', data, {
            headers: {
                'Content-Type': 'application/json',
                'X-Goog-Api-Key': '',
                'X-Goog-FieldMask': 'places.displayName,places.location,places.photos',
            },
        })
            .then(response => {
                let markersList: any[] = [];
                response?.data?.places?.map((place: any) => {
                    markersList.push({
                        title: place.displayName.text,
                        coordinate: {
                            latitude: place.location.latitude,
                            longitude: place.location.longitude,
                        },
                    });
                });
                return markersList;
            }).then(list => {
                setMarkers(list);
            })
            .catch(error => {
                console.error('Error:', error);
            });
        return res;
    }

    if (!region.mapLoaded) {
        return (
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <ActivityIndicator size='large' />
            </View>
        )
    }

    return (
        <>
            <View style={{ flex: 1, justifyContent: 'space-between', alignItems: 'center' }}>
                <View style={{
                    zIndex: 2, width: '100%', backgroundColor: 'white',
                    padding: 20, alignItems: 'center',
                }}>
                    <Text style={{ fontSize: 20 }}>Map Screen</Text>
                </View>
                <MapView
                    provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                    style={styles.map}
                    region={region.region}
                    onRegionChangeComplete={(regionParam: Region, details: Details) => onRegionChangeComplete(regionParam, details.isGesture)}
                >
                    {markers.map(marker => (
                        <Marker
                            key={marker.title}
                            title={marker.title}
                            coordinate={marker.coordinate}
                        />
                    ))}
                </MapView>
                <View style={{ paddingVertical: 24 }}>
                    <TouchableOpacity
                        style={{
                            padding: 12, opacity: 1,
                            borderRadius: 12, backgroundColor: "#4F4D"
                        }}
                        onPress={() => fetchData()}>
                        <Text style={{ color: 'black', fontSize: 18 }}>Buscar en esta zona</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        height: 400,
        width: 400,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});
