import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Dimensions, Alert, Share, Image, TouchableOpacity, Platform, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, ImageBackground,navigation } from 'react-native';

import { Dropdown } from 'react-native-element-dropdown';

import { Picker } from '@react-native-picker/picker';
import * as DocumentPicker from 'expo-document-picker';
import * as Permissions from 'expo-permissions';


import * as FileSystem from 'expo-file-system';
import * as OpenAIServices from '../components/OpenAIServices';
import * as Machiery from '../components/machinery';

//import styles from "./CommonStyleSheet";

import { Cloudinary } from 'cloudinary-core';
import * as Sharing from 'expo-sharing';
import LoadingImage from '../assets/loading2.gif';


import AsyncStorage from '@react-native-async-storage/async-storage';
import MyImage from '../assets/walk_story22.gif';



//..............................................
// Delete to avoid copying
//..............................................



export default function DecorateScreen({ navigation }) {
  const [inputText, setInputText] = useState('');
  const [inputTitle, setInputTitle] = useState('');
  const [storyData, setStoryData] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [imageURLs, setImageURLs] = useState([]);


  const [loading, setLoading] = useState(false);

  const [imageType, setImageType] = useState('illustration');

    // List of image types
  const imageTypeData = [
    { label: 'Illustration', value: 'illustration' },
    { label: 'Historical', value: 'historical image' },
    { label: 'Photos', value: 'picture' },
  ];

  

//====================   gif images control   ===================

  useEffect(() => {
      // Set loading to false initially
      setLoading(false);
    }, []);

  useEffect(() => {
      // Set loading to true once story data is available
      
      if (storyData) {
        navigation.navigate('ViewStory', { storyData });

      }
    }, [storyData]);

  //====================   Statemanagement   ===================

    // Load inputTitle from AsyncStorage on component mount
  useEffect(() => {
    const loadInputData = async () => {
      try {
        const savedInputTitle = await AsyncStorage.getItem('inputTitle');
        if (savedInputTitle !== null) {
          setInputTitle(savedInputTitle);
        }
      } catch (error) {
        console.error('Error loading input data:', error);
      }
    };

    loadInputData();
  }, []);

  // Save inputTitle to AsyncStorage when it changes
  useEffect(() => {
    const saveInputTitle = async () => {
      try {
        await AsyncStorage.setItem('inputTitle', inputTitle);
      } catch (error) {
        console.error('Error saving input title:', error);
      }
    };

    saveInputTitle();
  }, [inputTitle]);


  // Load inputText from AsyncStorage on component mount
  useEffect(() => {
    const loadInputData = async () => {
      try {
        const savedInputText = await AsyncStorage.getItem('inputText');
        const savedInputTitle = await AsyncStorage.getItem('inputTitle');
        if (savedInputText !== null) {
          setInputText(savedInputText);
        }
        if (savedInputTitle !== null) {
          setInputTitle(savedInputTitle);
        }
      } catch (error) {
        console.error('Error loading input data:', error);
      }
    };

    loadInputData();
  }, []);

  // Save inputText to AsyncStorage when it changes
  useEffect(() => {
    const saveInputText = async () => {
      try {
        await AsyncStorage.setItem('inputText', inputText);
      } catch (error) {
        console.error('Error saving input text:', error);
      }
    };

    saveInputText();
  }, [inputText]);


  // Load imageType from AsyncStorage on component mount
  useEffect(() => {
    const loadImageType = async () => {
      try {
        const savedImageType = await AsyncStorage.getItem('imageType');
        if (savedImageType !== null) {
          setImageType(savedImageType);
        }
      } catch (error) {
        console.error('Error loading image type:', error);
      }
    };

    loadImageType();
  }, []);

  // Save imageType to AsyncStorage when it changes
  useEffect(() => {
    const saveImageType = async () => {
      try {
        await AsyncStorage.setItem('imageType', imageType);
      } catch (error) {
        console.error('Error saving image type:', error);
      }
    };

    saveImageType();
  }, [imageType]);


//=================   illustrate functions    ======================
  
const handleStoryPromptChange = (text) => {
//..............................................
// Delete to avoid copying
//..............................................
};

const handleTitlePromptChange = (text) => {
//..............................................
// Delete to avoid copying
//..............................................
};


  
  // load .txt story file into story prompt
  const loadFile = async () => {
    try {
      // //const permission = await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
      // const permission = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);

      //..............................................
      // Delete to avoid copying
      //..............................................

    } catch (error) {
      console.error('Error loading file:', error);
      Alert.alert("Error", "Failed to load file.");
    }
  };


  // Handles image type selection
  const handleImageSelect = async (selectedImageType) => {
    try {
      if (selectedImageType !== imageType) {
        setImageType(selectedImageType);
      }
    } catch (error) {
      console.error('Error saving data:', error);
      Alert.alert('Error', 'Failed to save input.');
    }
  };

  const MakeupStory = async () => {
  try {
    setLoading(true);

    //..............................................
// Delete to avoid copying
//..............................................

    const generatedImageURLs = [];

    for (let i = 0; i < imageNumber; i++) {
      const originalUrl = imageData.imgURL[i].url;

      const formData = new FormData();
      formData.append('file', {
        uri: originalUrl,
        type: 'image/png',
        name: `image_${i}.png`
      });
      formData.append('upload_preset', 'better_images');  // Use your upload preset name here

      const uploadResponse = await fetch(`https://api.cloudinary.com/v1_1/${cloudinary.config().cloud_name}/image/upload`, {
        method: 'POST',
        body: formData
      });

      const uploadData = await uploadResponse.json();

      if (uploadData.secure_url) {
        console.log("Uploaded to Cloudinary:", uploadData.secure_url);
        generatedImageURLs.push(uploadData.secure_url);
      } else {
        console.error('Error uploading image to Cloudinary:', uploadData);
      }
    }

    const storyDataObject = {
      createTime: new Date().toLocaleString(),
      genre: imageType,
      title: inputTitle,
      summary: storySummary,
      images: generatedImageURLs,
      storyContent: storyTextContent
    };

    setLoading(false);
    setStoryData(storyDataObject);
    setErrorMessage('');
    //setImageURLs(generatedImageURLs);
  } catch (error) {
    setLoading(false);
    console.error('Error generating story:', error);
    setStoryData(null);
    setErrorMessage('Error generating story.');
  }
};


// // Prototype test data
// // Function to simulate a delay
// const wait = (milliseconds) => new Promise(resolve => setTimeout(resolve, milliseconds));

// const MakeupStory = async () => {
//   try {
//     setLoading(true);

//     const inputTitle = "A red hat";
//     const storySummary = "A young girl named Little Red Riding Hood is known for her beauty and her signature red hood. When her mother asks her to visit her sick grandmother, she sets off on a journey to check on her well-being.";

//     const generatedImageURLs = [
//       "https://res.cloudinary.com/dnx1m3uxj/image/upload/v1719219012/hf71efuonybbnlar2iut.png",
//     ];

//     const storyTextContent = [
//       "Once upon a time, there lived the prettiest little girl ever seen. Her mother made her a little red hood, and everybody called her by the same name – Little Red Riding Hood. One day her mother asked her to go to her grandmother: “Go my girl, and see how your dear grandmother is doing, for I hear she has been very ill.",
//     ];

//     const storyDataObject = {
//       createTime: new Date().toLocaleString(),
//       genre: imageType, // Assuming `imageType` is defined elsewhere
//       title: inputTitle,
//       summary: storySummary,
//       images: generatedImageURLs,
//       storyContent: storyTextContent
//     };

//     // Simulate a 3000 milliseconds (3 seconds) delay using wait function
//     await wait(3000);

//     setStoryData(storyDataObject);
//     setLoading(false);

//     setErrorMessage('');
//     setImageURLs(generatedImageURLs);
//   } catch (error) {
//     console.error('Error generating story:', error);
//     setStoryData(null);
//     setErrorMessage('Error generating story.');
//     setLoading(false);
//   }
// };


return (
    <ImageBackground source={MyImage} style={styles.backgroundImage}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

          <View style={styles.container}>
            <View style={styles.topContainer}>
              <Text style={styles.label}>Title:</Text>
              <TextInput
                value={inputTitle}
                onChangeText={handleTitlePromptChange}
                placeholder="Enter / paste story title here..."
                multiline
                style={[styles.inputTitle, { width: Dimensions.get('window').width - 40 }]}
              />

              <Text style={styles.label}>Content:</Text>
              <TextInput
                value={inputText}
                onChangeText={handleStoryPromptChange}
                placeholder="Enter / paste content, or load '.txt' story content here..."
                multiline
                style={[styles.inputText, { width: Dimensions.get('window').width - 40 }]}
              />

              <TouchableOpacity onPress={loadFile} style={styles.buttonLoad}>
                <Text style={styles.buttonLoadText}>Load Content</Text>
              </TouchableOpacity>

              <View style={{ height: 10 }} />

              {/* Updated container for dropdown and button */}

                <View style={styles.rowContainer}>
                  {Platform.OS === 'ios' ? (
                    <Dropdown
                      style={styles.dropdown}
                      data={imageTypeData}
                      labelField="label"
                      valueField="value"
                      placeholder="Select image type"
                      value={imageType}
                      onChange={(item) => handleImageSelect(item.value)}
                    />
                  ) : (
                    <View style={styles.pickerContainer}>
                      <Picker
                        style={styles.pickerStyle}
                        selectedValue={imageType}
                        onValueChange={(itemValue) => handleImageSelect(itemValue)}
                      >
                        {imageTypeData.map((item1) => (
                          <Picker.Item key={item1.value} label={item1.label} value={item1.value} />
                        ))}
                      </Picker>
                    </View>
                  )}

                  <TouchableOpacity onPress={MakeupStory} style={styles.illustrateButton}>
                    <Text style={styles.illustrateButtonText}>Better Content</Text>
                  </TouchableOpacity>

                </View>
              </View>

              {/* Story content section */}
          
              <>
                {loading ? (
                  <View style={styles.contentContainer}>
                    <Image source={LoadingImage} style={styles.loadingImage} />
                  </View>
                ) : null}
              </>

              


            </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ImageBackground>
  );




  
}



const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    zIndex: -1,
    backgroundColor: 'transparent',
  },
 container: {
    flex: 1,
    padding: 20,
    color: '#fff',
  },
  topContainer: {
    marginBottom: 10,
    //backgroundColor: '#f9f9f9',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    //marginBottom: 5,
  },
  inputTitle: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 5,
    width: '100%', // Ensures full width
    backgroundColor: '#f9f9f9',
  },
  inputText: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 5,
    width: '100%', // Ensures full width
    height: 100,
    backgroundColor: '#f9f9f9',
  },
  buttonLoad: {
    backgroundColor: '#666666',
    padding: 10,
    alignItems: 'center',
    //marginBottom: 5,
  },
  buttonLoadText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    //padding: 10,
    justifyContent: 'space-between', // Ensures items are evenly spaced
    backgroundColor: '#f9f9f9',
  },
  dropdown: {
    width: '50%',
  },
  pickerContainer: {
    backgroundColor: '#f9f9f9',
    width: '50%',
    paddingHorizontal: 10,
  },
  pickerStyle: {
    width: '100%',
  },
  illustrateButton: {
    backgroundColor: '#666666',
    padding: 5,
    alignItems: 'center',
    paddingVertical: 15,
    flex: 1,
    justifyContent: 'center',
  },
  illustrateButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  contentContainer: {
    backgroundColor: '#fff',
    alignItems: 'center',
    flexGrow: 1, // Ensures content container can grow with dynamic content
  },
  loadingImage: {
    width: 300,
    height: 271,
    resizeMode: 'contain',
    alignSelf: 'center',
  },

});
