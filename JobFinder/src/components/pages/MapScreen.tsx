import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MapView, { Details, Marker, PROVIDER_GOOGLE, Region } from 'react-native-maps';

const API_KEY = '';

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
    const [markers, setMarkers] = useState(undefined);
    const [placeImage, setPlaceImage] = useState(undefined);

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
                'X-Goog-Api-Key': API_KEY,
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
                        photo: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=300&photo_reference=${place.photos[0].name.split('/photos/')[1]}&key=${API_KEY}`,
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
                    {markers && markers?.map(marker => (
                        <Marker
                            title={marker.title}
                            coordinate={marker.coordinate}
                            key={marker.title}
                            onPress={() => setPlaceImage(marker.photo)}>
                            <Image
                                source={require('./../../assets/images/pin.png')}
                                resizeMode={'contain'}
                                style={{ width: 30, height: 30 }}
                            />
                        </Marker>
                    ))}

                </MapView>
                <View style={{ paddingVertical: 16, alignItems: 'center' }}>
                    {placeImage &&
                        <View>
                            <Image
                                source={{ uri: placeImage }}
                                width={350}
                                height={300}
                                style={{
                                    zIndex: 4, borderRadius: 25, marginBottom: 12,
                                }}
                            />
                            <TouchableOpacity
                                style={{
                                    paddingVertical: 6, paddingHorizontal: 12,
                                    backgroundColor: 'white', borderRadius: 24, position: 'absolute',
                                    zIndex: 4, margin: 12,
                                }}
                                onPress={() => setPlaceImage(undefined)}>
                                <Text style={{ fontSize: 16, fontWeight: 500 }}>Close</Text>
                            </TouchableOpacity>
                        </View>
                    }
                    <View style={{ width: 200, justifyContent: 'center' }}>
                        <TouchableOpacity
                            style={{
                                padding: 12, opacity: 1,
                                borderRadius: 12, backgroundColor: "#4F4D"
                            }}
                            onPress={() => fetchData()}>
                            <Text style={{ color: 'black', fontSize: 18, textAlign: 'center' }}>Buscar en esta zona</Text>
                        </TouchableOpacity>
                    </View>
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
