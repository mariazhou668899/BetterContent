import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet, ScrollView, Image, ImageBackground } from 'react-native';
import * as FileSystem from 'expo-file-system';

import { generateHTMLContent } from '../components/tools';

import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';
import MyImage from '../assets/walk_read2.gif';
import { auth, db } from '../components/firebase';
import { collection, doc, deleteDoc, getDocs, query, orderBy } from "firebase/firestore";

export default function ContentCenter({ navigation }) {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    checkAndSyncStories();
  }, []);

  const checkAndSyncStories = async () => {
    try {
      const localStories = await loadStoriesFromLocal();
  
      const q = query(collection(db, "stories"), orderBy("createTime", "desc"));
      const firestoreStories = await getDocs(q);
      //console.log("Firestore firestoreStories:", firestoreStories);
  
      const storyResult = firestoreStories.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
  
      //console.log("Firestore Stories:", storyResult);
  
      if (!areStoriesSynced(localStories, storyResult)) {
        await saveStoriesToLocal(storyResult);
      }
  
      setStories(storyResult);
    } catch (error) {
      console.error('Error checking and syncing stories:', error);
      // Handle error appropriately
    }
  };
  

  const loadStoriesFromLocal = async () => {
    try {
      const path = `${FileSystem.documentDirectory}generated_stories.json`;
      const fileInfo = await FileSystem.getInfoAsync(path);

      if (!fileInfo.exists) {
        await FileSystem.writeAsStringAsync(path, JSON.stringify([]));
        return [];
      }

      const fileData = await FileSystem.readAsStringAsync(path);
      return JSON.parse(fileData) || [];
    } catch (error) {
      console.error('Error loading stories from local storage:', error);
      throw error;
    }
  };

  const areStoriesSynced = (localStories, firestoreStories) => {
    if (localStories.length !== firestoreStories.length) {
      return false;
    }

//..............................................
// Delete to avoid copying
//..............................................

    return true;
  };

  const saveStoriesToLocal = async (storiesToSave) => {
    try {
      const path = `${FileSystem.documentDirectory}generated_stories.json`;
      await FileSystem.writeAsStringAsync(path, JSON.stringify(storiesToSave));
    } catch (error) {
      console.error('Error saving stories to local storage:', error);
      throw error;
    }
  };

  const deleteStory = async (item, index) => {
    Alert.alert('Delete Story', 'Are you sure you want to delete this story?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
//..............................................
// Delete to avoid copying
//..............................................
      },
    ]);
  };

  const printAndSharePDF = async (storyData) => {
//..............................................
// Delete to avoid copying
//..............................................
  };

  const handleShareStory = (storyData) => {
    printAndSharePDF(storyData);
  };


  return (
    <ImageBackground source={MyImage} style={styles.backgroundImage}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.container}>
          {stories.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => navigation.navigate('ViewContent', {
                storyData: item,
                index,
                stories,
              })}
            >
              <View style={styles.storyItem}>
                {item.images && item.images.length > 0 && (
                  <Image source={{ uri: item.images[0] }} style={styles.previewImage} />
                )}
                <View style={styles.storyTextContainer}>
                  <Text style={styles.storyTitle} numberOfLines={1}>
                    {item.title.split(' ').slice(0, 4).join(' ')}{item.title.split(' ').length > 4 ? '...' : ''}
                  </Text>
                  <Text style={styles.storySummary} numberOfLines={4}>
                    {item.summary.split(' ').slice(0, 20).join(' ')}{item.summary.split(' ').length > 20 ? '...' : ''}
                  </Text>
                </View>
                <View style={styles.storyActions}>
                  <TouchableOpacity style={styles.actionButton} onPress={() => handleShareStory(item)}>
                    <Text style={styles.actionText}>Share</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.deleteButton} onPress={() => deleteStory(item, index)}>
                    <Text style={styles.deleteText}>Delete</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
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
  scrollViewContent: {
    padding: 20,
  },
  container: {
    flex: 1,
  },
  storyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#f9f9f9',
  },
  previewImage: {
    width: 100,
    height: 100,
    borderRadius: 5,
    marginRight: 10,
  },
  storyTextContainer: {
    flex: 2,
  },
  storyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    maxWidth: '60%',
  },
  storySummary: {
    marginBottom: 5,
    fontStyle: 'italic',
    maxWidth: '80%',
  },
  storyActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    backgroundColor: '#666666',
    padding: 5,
    marginRight: 5,
  },
  actionText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 3,
  },
  deleteButton: {
    backgroundColor: '#666666',
    padding: 5,
  },
  deleteText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 3,
  },
});









// import React, { useEffect, useState } from 'react';
// import { View, Text, TouchableOpacity, Alert, StyleSheet, ScrollView, Image, ImageBackground } from 'react-native';
// import * as FileSystem from 'expo-file-system';

// import { generateHTMLContent } from '../components/tools';

// import * as Print from 'expo-print';
// import { shareAsync } from 'expo-sharing';
// import MyImage from '../assets/walk_read2.gif';
// import { auth, db } from '../components/firebase';
// import { addDoc, collection, doc, setDoc, deleteDoc, getDocs } from "firebase/firestore";

// export default function ContentCenter({ navigation }) {
//   const [stories, setStories] = useState([]);

//   useEffect(() => {
//     checkAndSyncStories();
//   }, []);
  
//   const parseCustomDate = (dateString) => {
//     try {
//       // Split the dateString into its components
//       const [datePart, timePart] = dateString.split(', ');
  
//       // Extract date components
//       const [month, day, year] = datePart.split('/');
  
//       // Extract time components
//       let [time, period] = timePart.split(' ');
//       const [hours, minutes, seconds] = time.split(':');
  
//       // Adjust hours for PM period
//       if (period === 'PM' && hours !== '12') {
//         hours = String(Number(hours) + 12);
//       } else if (period === 'AM' && hours === '12') {
//         hours = '00'; // Handle midnight edge case
//       }
  
//       // Construct the ISO date string format
//       const isoDateString = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
  
//       // Return milliseconds since epoch or NaN if invalid
//       const parsedTime = Date.parse(isoDateString);
//       return parsedTime || NaN; // Return NaN if date parsing fails
//     } catch (error) {
//       console.error('Error parsing date:', error);
//       return NaN; // Return NaN if any error occurs during parsing
//     }
//   };
  


// const checkAndSyncStories = async () => {
//   try {
//     // Load local stories and sort by timestamp
//     const localStories = await loadStoriesFromLocal();
//     //setStories(localStories);
//     //console.log("content: localStories 1 :", localStories);
//     let storyResult = localStories;

//     // Fetch Firestore stories and sort by timestamp
//     const firestoreStories = await fetchFirestoreStories();
//     //console.log("content: firestoreStories 1:", firestoreStories);

//     // Check if localStories and firestoreStories are in sync
//     if (!areStoriesSynced(localStories, firestoreStories)) {
//       // If not synced, update localStories with firestoreStories
//       firestoreStories.sort((a, b) => parseCustomDate(b.createTime) - parseCustomDate(a.createTime));
//       //console.log("content: firestoreStories 2:", firestoreStories);

//       await saveStoriesToLocal(firestoreStories);

//       const newLocalStories = await loadStoriesFromLocal();
//       //console.log("content: newLocalStories:", newLocalStories);
//       storyResult = firestoreStories; // Update state with sorted firestoreStories
//     }

//     storyResult.sort((a, b) => parseCustomDate(b.createTime) - parseCustomDate(a.createTime));
//     console.log("content: storyResult 1:", storyResult);

//     setStories(storyResult);
//     // else{
//     //   setStories(localStories);
//     // }
//   } catch (error) {
//     console.error('Error checking and syncing stories:', error);
//     // Handle error appropriately
//   }
// };

  
//   const loadStoriesFromLocal = async () => {
//     try {
//       const path = `${FileSystem.documentDirectory}generated_stories.json`;
  
//       // Check if the file exists
//       const fileInfo = await FileSystem.getInfoAsync(path);
  
//       if (!fileInfo.exists) {
//         // If the file doesn't exist, create it with an empty array
//         await FileSystem.writeAsStringAsync(path, JSON.stringify([]));
//         return [];
//       }
  
//       // Read the file data
//       const fileData = await FileSystem.readAsStringAsync(path);
//       const localStories = JSON.parse(fileData) || [];
//       return localStories;
//     } catch (error) {
//       console.error('Error loading stories from local storage:', error);
//       throw error;
//     }
//   };
  

//   const fetchFirestoreStories = async () => {
//     try {
//       const querySnapshot = await getDocs(collection(db, 'stories'));
//       const firestoreStories = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//       return firestoreStories;
//     } catch (error) {
//       console.error('Error fetching stories from Firestore:', error);
//       throw error;
//     }
//   };

//   const areStoriesSynced = (localStories, firestoreStories) => {
//     if (localStories.length !== firestoreStories.length) {
//       return false;
//     }
  
//     // Create a map of story IDs for efficient comparison
//     const localStoryMap = new Map(localStories.map(story => [story.id, story]));
//     const firestoreStoryMap = new Map(firestoreStories.map(story => [story.id, story]));
  
//     // Compare each story ID in both maps
//     for (let id of localStoryMap.keys()) {
//       if (!firestoreStoryMap.has(id)) {
//         return false;
//       }
//     }
  
//     return true;
//   };
  
//   const saveStoriesToLocal = async (storiesToSave) => {
//     try {
//       //const sortedStories = storiesToSave.slice().sort((a, b) => b.createTime - a.createTime);

//       const path = `${FileSystem.documentDirectory}generated_stories.json`;
//       await FileSystem.writeAsStringAsync(path, '[]'); // Overwrite with an empty array

//       await FileSystem.writeAsStringAsync(path, JSON.stringify(storiesToSave));
      
//     } catch (error) {
//       console.error('Error saving stories to local storage:', error);
//       throw error;
//     }
//   };

//   const deleteStory = async (item, index) => {
//     Alert.alert('Delete Story', 'Are you sure you want to delete this story?', [
//       {
//         text: 'Cancel',
//         style: 'cancel',
//       },
//       {
//         text: 'OK',
//         onPress: async () => {
//           try {
//             const updatedStories = [...stories];
//             updatedStories.splice(index, 1);
//             setStories(updatedStories);
//             await saveStoriesToLocal(updatedStories);

//             // Delete story from Firestore
//             //console.log("delete firebase item: ", item)
//             const id = item.id;
//             //console.log("delete firebase id: ", id)

//             const docRef = doc(db, 'stories', id);
//             await deleteDoc(docRef);

//             Alert.alert('Success', 'Story deleted successfully!');
//           } catch (error) {
//             console.error('Error deleting story:', error);
//             Alert.alert('Error', 'Failed to delete story.');
//           }
//         },
//       },
//     ]);
//   };

//   const deleteStoryFromFirestore = async (id) => {
//     try {
//       await deleteDoc(doc(db, 'stories', id));
//     } catch (error) {
//       console.error('Error deleting story from Firestore:', error);
//       throw error;
//     }
//   };

//   const printAndSharePDF = async (storyData) => {
//     try {
//       const htmlContent = generateHTMLContent(storyData);

//       // Print the HTML content to a PDF file
//       const { uri } = await Print.printToFileAsync({ html: htmlContent });

//       console.log('File has been saved to:', uri);

//       // Share the generated PDF file
//       await shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' });
//     } catch (error) {
//       console.error('Error printing or sharing PDF:', error);
//       // Handle errors appropriately
//     }
//   };

//   return (
//     <ImageBackground source={MyImage} style={styles.backgroundImage}>
//       <ScrollView contentContainerStyle={styles.scrollViewContent}>
//         <View style={styles.container}>
//           {stories.map((item, index) => (
//             <TouchableOpacity
//               key={index}
//               onPress={() => navigation.navigate('ViewContent', {
//                 storyData: item,
//                 index,
//                 stories,
//                 setStories
//               })}
//             >
//               <View style={styles.storyItem}>
//                 {item.images && item.images.length > 0 && (
//                   <Image source={{ uri: item.images[0] }} style={styles.previewImage} />
//                 )}
//                 <View style={styles.storyTextContainer}>
//                   <Text style={styles.storyTitle} numberOfLines={1}>
//                     {item.title.split(' ').slice(0, 4).join(' ')}{item.title.split(' ').length > 4 ? '...' : ''}
//                   </Text>
//                   <Text style={styles.storySummary} numberOfLines={4}>
//                     {item.summary.split(' ').slice(0, 20).join(' ')}{item.summary.split(' ').length > 20 ? '...' : ''}
//                   </Text>
//                 </View>
//                 <View style={styles.storyActions}>
//                   <TouchableOpacity style={styles.actionButton} onPress={() => printAndSharePDF(item)}>
//                     <Text style={styles.actionText}>Share</Text>
//                   </TouchableOpacity>
//                   <TouchableOpacity style={styles.deleteButton} onPress={() => deleteStory(item, index)}>
//                     <Text style={styles.deleteText}>Delete</Text>
//                   </TouchableOpacity>
//                 </View>
//               </View>
//             </TouchableOpacity>
//           ))}
//         </View>
//       </ScrollView>
//     </ImageBackground>
//   );
// }

// const styles = StyleSheet.create({
//   backgroundImage: {
//     flex: 1,
//     resizeMode: 'cover',
//     zIndex: -1,
//     backgroundColor: 'transparent',
//   },
//   scrollViewContent: {
//     padding: 20,
//   },
//   container: {
//     flex: 1,
//   },
//   storyItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 10,
//     marginBottom: 10,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 5,
//     backgroundColor: '#f9f9f9',
//   },
//   previewImage: {
//     width: 100,
//     height: 100,
//     borderRadius: 5,
//     marginRight: 10,
//   },
//   storyTextContainer: {
//     flex: 2,
//   },
//   storyTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 5,
//     maxWidth: '60%',
//   },
//   storySummary: {
//     marginBottom: 5,
//     fontStyle: 'italic',
//     maxWidth: '80%',
//   },
//   storyActions: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   actionButton: {
//     backgroundColor: '#666666',
//     padding: 5,
//     marginRight: 5,
//   },
//   actionText: {
//     color: '#fff',
//     fontSize: 13,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     paddingVertical: 3,
//   },
//   deleteButton: {
//     backgroundColor: '#666666',
//     padding: 5,
//   },
//   deleteText: {
//     color: '#fff',
//     fontSize: 13,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     paddingVertical: 3,
//   },
// });
