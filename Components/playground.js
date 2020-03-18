import React, { useState, useEffect, Component } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    Image,
    Alert,
    Platform,
    Dimensions,
} from 'react-native';

import MapView, { PROVIDER_GOOGLE, Marker, Callout, Polygon, Circle } from 'react-native-maps'

import Geolocation from '@react-native-community/geolocation';

import { request, PERMISSIONS } from 'react-native-permissions'

import Carousel from 'react-native-snap-carousel'

class Playground extends Component {

    state = {

        coordinates: [

            { name: "Burger", latitude: 37.8025259, longitude: -122.4351431, image: require("./images/burger.jpg") },
            { name: "Curry", latitude: 37.7896386, longitude: -122.4216466, image: require("./images/curry.jpg") },
            { name: "Pizza", latitude: 37.7665248, longitude: -122.4161628, image: require("./images/pizza.jpg") },
            { name: "Soup", latitude: 37.7734153, longitude: -122.4577787, image: require("./images/soup.jpg") },
            { name: "Sushi", latitude: 37.7948605, longitude: -122.4596065, image: require("./images/sushi.jpg") },

        ],


    }


    showWelcomeMessage = () => {

        Alert.alert("Welcome message")


    }


    locateCurrentPosition = () => {

        Geolocation.getCurrentPosition(
            (position) => {
                const location = JSON.stringify(position);

                // console.log(location)

                let initialPosition = {

                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    latitudeDelta: 0.09,
                    longitudeDelta: 0.035,
                }

                this.setState({

                    initialPosition
                })

                console.log("......")
                console.log(this.state.initialPosition)
            },
            (error) => Alert.alert(error.message),

            { enableHighAccuracy: true, timeout: 90000, maximumAge: 1000 }
        );

    }

    requestLocationPermission = async () => {

        if (Platform.OS === "android") {

            var response = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)

            console.log("android : " + response);

            if (response === "granted") {

                this.locateCurrentPosition();

            }

        } else {

            var response = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE)

            console.log("ios : " + response);

            if (response === "granted") {

                this.locateCurrentPosition();
            }
        }

    }


    componentDidMount() {

        this.requestLocationPermission();
    }

    renderCarouselItem = ({ item }) => {
        return (
            <View style={styles.cardContainer}>
                <Text style={styles.cardTitle} >{item.name}</Text>
                <Image style={styles.cardImage} source={item.image} />
            </View>
        );
    }




    render() {



        return (

            <View style={styles.container}>

                <MapView
                    style={styles.map}
                    provider={PROVIDER_GOOGLE}
                    // ref={map => this._map = map}
                    initialRegion={this.state.initialPosition}
                    showsUserLocation={true}
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





                    {/* {
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


                } */}

                </MapView>
                <Carousel
                    ref={(c) => { this._carousel = c; }}
                    data={this.state.coordinates}
                    renderItem={this.renderCarouselItem}
                    sliderWidth={Dimensions.get("window").width}
                    itemWidth={300}
                    containerCustomStyle={styles.carousel}
                />

            </View>

        )





    }






}

const styles = StyleSheet.create({


    container: {
        ...StyleSheet.absoluteFillObject
    },

    map: {
        ...StyleSheet.absoluteFillObject
    },
    carousel:{
        position:"absolute",
        bottom:0,
        marginBottom:48,
    },
    cardContainer:{

        backgroundColor:"rgba(0,0,0,0.6)",
        height:200,
        width:300,
        padding:24,
        borderRadius:24,
    },
    cardImage:{
        height:120,
        width:300,
        bottom:0,
        position:"absolute",
        borderBottomLeftRadius:24,
        borderBottomRightRadius:24,
    },
    cardTitle:{

        color:"white",
        fontSize:22,
        alignSelf:"center"
    }


})



export default Playground;