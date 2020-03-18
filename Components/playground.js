import React, { useState, useEffect, Component } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    Image,
    Alert
} from 'react-native';

import MapView, { PROVIDER_GOOGLE, Marker, Callout, Polygon, Circle } from 'react-native-maps'




class Playground extends Component {


    showWelcomeMessage = () => {

        Alert.alert("Welcome message")


    }

    state = {

        coordinates: [

            { name: "1", latitude: 37.8025259, longitude: -122.4351431 },
            { name: "2", latitude: 37.7896386, longitude: -122.4216466 },
            { name: "3", latitude: 37.7665248, longitude: -122.4161628 },
            { name: "4", latitude: 37.7734153, longitude: -122.4577787 },
            { name: "5", latitude: 37.7948605, longitude: -122.4596065 },
            { name: "6", latitude: 37.8025259, longitude: -122.4351431 },

        ]

    }



    render() {



        return (


            <MapView
                style={styles.map}
                provider={PROVIDER_GOOGLE}
                region={{

                    latitude: 37.78825,
                    longitude: -122.4324,
                    latitudeDelta: 0.09,
                    longitudeDelta: 0.035,
                }}
            >

                <Polygon
                    coordinates={this.state.coordinates}
                    fillColor={"rgba(100,200,200,0.3)"}
                    strokeWidth={3}
                />

                <Circle

                    center={{ latitude: 37.7734153, longitude: -122.4577787 }}
                    radius={1000}
                    fillColor={"rgba(200,200,200,0.3)"}

                />

                {
                    this.state.coordinates.map((x) => {

                        return (

                            <Marker

                                key={x.name}
                                coordinate={{ latitude: x.latitude, longitude: x.longitude }}
                            >
                                <Callout onPress={this.showWelcomeMessage}>
                                    <Image source={require("./images/sushi.png")} />
                                    <Text>{x.name}</Text>
                                </Callout>

                            </Marker>
                        )

                    })


                }

            </MapView>

        )





    }






}

const styles = StyleSheet.create({

    map: {
        height: "100%"
    }


})



export default Playground;