import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, Image, TouchableOpacity, ImageBackground } from 'react-native';

import * as FileSystem from 'expo-file-system';
import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';

import { generateHTMLContent } from '../components/tools';
import MyImage from '../assets/read.png';
import { useNavigation } from '@react-navigation/native';
import { db } from '../components/firebase';
import { doc, deleteDoc } from "firebase/firestore";

const ViewContent = ({ route }) => {
  const navigation = useNavigation();
  const { storyData, index, stories } = route.params;

  const saveStoriesToLocal = async (storiesToSave) => {
    try {
      const path = `${FileSystem.documentDirectory}generated_stories.json`;
      await FileSystem.writeAsStringAsync(path, JSON.stringify(storiesToSave));
    } catch (error) {
      console.error('Error saving stories to local storage:', error);
      throw error;
    }
  };

  const deleteStory = async (storyData, index) => {
    Alert.alert('Delete Story', 'Are you sure you want to delete this story?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
//..............................................
// Delete to avoid copying
//..............................................
      },
    ]);
  };

  useEffect(() => {
    navigation.setOptions({
      deleteStory: () => deleteStory(storyData, index),
    });
  }, [navigation, storyData, index]);

  if (!storyData) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No story data available.</Text>
      </View>
    );
  }

  const printAndSharePDF = async (storyData) => {
//..............................................
// Delete to avoid copying
//..............................................
  };

  const handleShareStory = () => {
    printAndSharePDF(storyData);
  };

  const handleDelete = () => {
    deleteStory(storyData, index);
  };

  return (
    <ImageBackground source={MyImage} style={styles.backgroundImage}>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.content}>
          {storyData && (
            <View>
              <Text style={styles.storyTitle}>{storyData.title}</Text>
              {storyData.storyContent.map((paragraph, index) => (
                <View key={index}>
                  <Text style={styles.storyText}>{paragraph}</Text>
                  {index % Math.ceil(storyData.storyContent.length / storyData.images.length) === 0 && (
                    <Image
                      source={{ uri: storyData.images[Math.floor(index / Math.ceil(storyData.storyContent.length / storyData.images.length))] }}
                      style={styles.storyImage}
                    />
                  )}
                </View>
              ))}
            </View>
          )}
        </ScrollView>

        <View style={styles.horizontalButtonContainer}>
          {storyData && (
            <>
              <TouchableOpacity onPress={handleShareStory} style={styles.horizontalButtonStyle}>
                <Text style={styles.horizontalButtonContext}>【 Share 】</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={handleDelete} style={styles.horizontalButtonStyle}>
                <Text style={styles.horizontalButtonContext}>【 Delete 】</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    zIndex: -1,
    backgroundColor: 'transparent',
  },
  container: {
    flex: 2,
    padding: 20,
  },
  storyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  storyText: {
    color: 'black',
    fontSize: 18,
    marginBottom: 10,
  },
  storyImage: {
    width: 300,
    height: 300,
    alignSelf: 'center',
    marginBottom: 20,
    resizeMode: 'cover',
  },
  horizontalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    paddingHorizontal: 10,
    width: '100%',
  },
  horizontalButtonStyle: {
    flex: 1,
    marginHorizontal: 5,
    padding: 5,
    backgroundColor: '#666666',
    alignItems: 'center',
  },
  horizontalButtonContext: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ViewContent;
