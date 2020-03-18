import React, { useState, useEffect, Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation'

import Home from './Components/home'
import HeatMap from './Components/heatMap'

import Playground from './Components/playground'




const StackNavigator = createStackNavigator({

  Playground:Playground,
  Home: Home,
  HeatMap: HeatMap,


});










export default createAppContainer(StackNavigator);
