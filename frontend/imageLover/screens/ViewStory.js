import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, ImageBackground, Alert } from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';
import { auth, db } from '../components/firebase';
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import MyImage from '../assets/read.png';
import { generateHTMLContent } from '../components/tools';

import { useNavigation } from '@react-navigation/native';



const ViewStory = ({ route }) => {
  const navigation = useNavigation();
  const { storyData } = route.params;
  const [firebaseId, setFirebaseId] = useState(null);

  useEffect(() => {
    const curUser = auth.currentUser.uid;
    console.log("Logged in user: ", curUser);
  }, []);

  const backupToFirebase = async (storyData) => {
    try {
      const docRef = await addDoc(collection(db, 'stories'), {
        createTime: storyData.createTime,
        genre: storyData.genre,
        title: storyData.title,
        summary: storyData.summary,
        images: storyData.images,
        storyContent: storyData.storyContent,
        userId: auth.currentUser.uid
      });

      console.log('Document written with ID: ', docRef.id);
      setFirebaseId(docRef.id);
      return docRef.id;
    } catch (error) {
      console.error('Error saving story to Firestore: ', error);
      Alert.alert('Error', 'Failed to save story to content center.');
      throw error;
    }
  };

  const saveToContent = async (storyData) => {
    try {
      const path = `${FileSystem.documentDirectory}generated_stories.json`;

      const fileInfo = await FileSystem.getInfoAsync(path);
      let storiesArray = [];

      if (fileInfo.exists) {
        const fileData = await FileSystem.readAsStringAsync(path);
        storiesArray = JSON.parse(fileData) || [];
        //console.log("viewstory -- storiesArray: ", storiesArray)
      }

      const newStory = { ...storyData, id: null };

      const firebaseDocId = await backupToFirebase(newStory);

      //console.log("viewstory -- firebaseDocId: ", firebaseDocId)

      newStory.id = firebaseDocId;

      //storiesArray.push(newStory);
      
      // Push the new story to the front of the array
      storiesArray.unshift(newStory);

      await FileSystem.writeAsStringAsync(path, JSON.stringify(storiesArray));

      const fileData = await FileSystem.readAsStringAsync(path);
      const localStories = JSON.parse(fileData) || [];
      //console.log("viewstory -- localStories: ", localStories)

      console.log('Saved story at:', path);
      //console.log('newStory:', newStory);
      Alert.alert("Success", "Story saved successfully!");
    } catch (error) {
      console.error('Error saving story to content center:', error);
      Alert.alert("Error", "Failed to save story to content center.");
    }
  };

  const printAndSharePDF = async (storyData) => {
    try {
      const htmlContent = generateHTMLContent(storyData);
      const { uri } = await Print.printToFileAsync({ html: htmlContent });

      console.log('File has been saved to:', uri);
      await shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' });
    } catch (error) {
      console.error('Error printing or sharing PDF:', error);
    }
  };

  const handleSaveStory = () => {
    saveToContent(storyData);
  };

  const handleShareStory = () => {
    printAndSharePDF(storyData);
  };

  return (
    <ImageBackground source={MyImage} style={styles.backgroundImage}>
      <View style={styles.container}>


      <ScrollView contentContainerStyle={styles.content}>
          {storyData && (
            <View>
              <Text style={styles.storyTitle}>{storyData.title}</Text>
              {storyData.storyContent.map((paragraph, index) => {
                // Calculate the image placement intervals
                const interval = Math.ceil(storyData.storyContent.length / storyData.images.length);
                const imageIndex = Math.floor(index / interval);
                const shouldDisplayImage = (index + 1) % interval === 0 && imageIndex < storyData.images.length;

                return (
                  <View key={index}>
                    <Text style={styles.storyText}>{paragraph}</Text>
                    {shouldDisplayImage && (
                      <Image
                        source={{ uri: storyData.images[imageIndex] }}
                        style={styles.storyImage}
                      />
                    )}
                  </View>
                );
              })}
            </View>
          )}
        </ScrollView>


        <View style={styles.horizontalButtonContainer}>
          {storyData && (
            <>
              <TouchableOpacity onPress={handleSaveStory} style={styles.horizontalButtonStyle}>
                <Text style={styles.horizontalButtonContext}>【 Save 】</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleShareStory} style={styles.horizontalButtonStyle}>
                <Text style={styles.horizontalButtonContext}>【 Share 】</Text>
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
    //backgroundColor: '#f9f9f9',
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

export default ViewStory;
