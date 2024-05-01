import React, { useState, useEffect } from 'react';
import { useToken } from './AuthService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { ScrollView, View, Text, StyleSheet, ActivityIndicator } from 'react-native';
