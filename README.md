# About BetterContent

## Owner of Better Content

Maria Zhou (Master Student in Computer Science)

## Introduction

Better Content is a cross-platform mobile application available on both iOS and Android. It helps users decorate their content with high-quality serial images efficiently, thanks to OpenAI's advanced capabilities. The app supports a wide range of content types, including stories, poems, introductions, and more.

<div style="border: 2px solid #888; width: 200px; max-width: 25%; margin: 0 auto; padding: 10px;">
  <img src="screenshots/BetterContentIntroduction.gif" alt="screenshot" style="width: 100%; height: auto;">
</div>


## Key Features:

1. **Effortless Decoration**: Automatically enhance your content with relevant, high-quality images by calling a backend public server, encapsulating OpenAI's “gpt-3.5-turbo-instruct” and “dall-e-2” APIs.

2. **Robust Security**: 
   - Public server encapsulates OpenAI APIs, using trained prompts to provide high-quality decoration images.
   - Firebase Authorization provides user login verification, email confirmation for sign-up, and password reset.
   - Firebase Firestore Database stores user files after image decoration, offering secure and efficient data queries across devices.

3. **Data Synchronization**: Users can fetch their own saved content from different devices.

4. **Seamless Sharing**: Share your decorated content to other apps, save it locally, or print it.

5. **Easy File Management**: Users can easily save, delete, and share files locally.

6. **State Management**: If interrupted, the text input or decoration style setting is preserved after app reloading.

7. **Amazing UI**:
   - Use Canva to create a set of background GIFs or images, enhancing visualization.
   - Employ various external libraries to improve user experience, such as local file picking and decoration type selection.

# Compiling Guide for BetterContent

## Downloading the Source Code

1. Download the source code from: [Source Code](https://github.com/mariazhou668899/LoveStoryingFinalTest/tree/testQuiz)

## Setting Up Backend

1. **Install Node.js**: Node.js is required to install dependencies. Download it and install into your laptop.

2. **Install Express**: Run the following command to install Express:

    ```bash
    npm install express –save
    ```

3. **Configure File ‘.env’**: Replace ‘OPAI_CREDENTIALS’ with your own OpenAI API key.

4. **Start Server**: Run the following command to start server:

    ```bash
    npm start
    ```

5. **Public the Server**: Navigate to ‘BetterContent\Backend\OpenAI-Services\node_modules\mime-db’ :

    ```bash
    npx localtunnel -p 4000 -s openai
    ```

## Setting Up Frontend

### Setting Up the Frontend Running Environment

1. **Install Node.js**: If you haven’t installed it, install it.

2. **Install Expo CLI**: Run the following command to install Expo CLI:

    ```bash
    npm install -g expo-cli
    ```

3. **About Firebase**: Create your Firebase project in the Firebase official site firstly. Run the following command to install Firebase:

    ```bash
    npm install --save firebase
    ```
  
    ```bash
    npm install --save firebase
    ```
  
    ```bash
    firebase login
    ```

4. **About Firebase Configure**: Go to the  `BetterContent/Frontend/ imageLover/components` folder to find the ‘firebase.js’ file, change the firebaseConfig using your own keys.


5. **About Cloudinary Configure**: Go to Configure website to create your own account and configure it. Then go to the  `BetterContent/Frontend/ imageLover/screens` folder to find the ‘DecorateScreen.js’ file, change the cloudinary configuration with your own keys.


6. **Navigate to the Source Code Directory**: make sure the directory is `imageLover` where the frontend source code is located.


7. **Install Dependencies**: Run the following command to install expo dependencies:

    ```bash
    npx expo install
    ```

8. **Start the App Server**: Use the following command to start the server for the simulator:

    ```bash
    npx expo start
    ```

## Testing the App

### Option A: Using Expo Go App (Recommended)

1. Download the Expo Go app on your mobile device.
2. Scan the QR code shown in the terminal window if you are using android system. If you are using the iOS system, you need to open this project in the VS Code, install all the extensions about Expo CLI, then the TERMINAL to run the following command, then you can use your iOS device to scan the QR code to use the App.

    ```bash
    npx expo start
    ```

3. Test the app on your phone.

### Option B: Using iPhone Simulator (macOS)

1. Press `i` in the terminal window.

2. The app will open in an iPhone simulator (requires XCode).

### Option C: Using Android Simulator

1. Press `a` in the terminal window.

2. The app will open in an Android simulator (requires Android SDK).

### Option D: Using Web Browser

1. Press `w` to open the app in your browser. Although the app will still be functional, this one is not recommended because of the poor formatting. 

## Logging In

Once the app is running, you can create a new account to use this App.

## Video Demo

Watch a demo of the BetterContent App to how to use it.

[Video Demo Link]( https://youtu.be/2lj9nszsLVg) 
