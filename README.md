# 🛒 SuperReminder 🛒
**SuperReminder** is a mobile application designed to simplify shopping list management and price comparison. This project is my final prject in **Software Engineering class**, and is currently **in development**. The app leverages modern technologies to provide a seamless and efficient user experience for managing shopping needs.

## 📖 About the Project
The goal of SuperReminder is to offer users an intuitive way to manage their shopping lists, and make informed purchasing decisions by comparing supermarket prices. 
The application integrates powerful tools and technologies, enabling users to create, organize, and optimize their shopping experience effectively.

## ✨ Features
### 1. Shopping List Management
* Create new shopping lists stored locally using Realm Database.
* Edit and delete lists as needed.
* Sort and filter lists for better organization.
* Search and add new items to lists.
* Compare the prices of all the items in the list.
### 2. Barcode Scanning
* Scan product barcodes to view all of its' info and compare prices across multiple supermarkets.
### 3. Smart Location-Based Reminders
* Receive notifications when you're near a supermarket to remind you of your shopping lists.
* Configure which shopping lists should trigger reminders and at which supermarket chains.
* Uses Geofencing technology in the background to efficiently detect nearby supermarkets without draining battery.
### 4. Seamless Navigation
* Navigate effortlessly between pages with a user-friendly interface. 
### 5. Multi-Language Support
* Toggle between Hebrew and English interfaces.
* Fully localized shopping experience in both languages.
### 6. Smooth User Interface
* Fluid animations and transitions between screens for an enhanced user experience.
* Responsive design that adapts to different device sizes and orientations.
* Optimized performance for smooth scrolling and real-time feedback.
   Clean, modern design with consistent visual language throughout the app.

## 🛠️ Tools & Technologies
* **React Native**: Built using the Expo CLI with an Expo development build.
* **Firebase**: To fetch and manage supermarket data.
* **Realm Database**: For efficient local storage of shopping lists.
* **Custom API**: Updates the supermarket database with real-time pricing. ([Supermarket Database Updater](https://github.com/Gal-Izhaky/public-supermarket-database-updater))
* **Javascript**: The programming language used for the application

## 🚀 Purpose of the Project
This project is my final project in Software Engineering class (in Highschool). It combines theoretical knowledge with practical application, showcasing my skills in modern development frameworks like React Native, Firebase, and Realm Database. SuperReminder is an opportunity to build a scalable and impactful solution while exploring advanced concepts in software development.

## 💻 How to Run
1. **Clone the Repository:**
    ```console
    git clone https://github.com/Gal-Izhaky/SuperReminder.git
    cd superreminder  
    ```
2. **Install Dependencies:**
    ```console
    npm install  
    ```
3. **Fill out firebase key:**    
    rename src\core\storage\firebase\Config.example.js to Config.js and add your firebase config to the firebaseConfig variable
4. **Configure Radar API:**
    rename src\features\location\RadarKey.example.js to RadarKey.js and add your radar key to the RADAR_KEY variable
5. **Run the App:**
   
   To run the app on android, either open an emulator (using Android studio), or connect your device to your PC, and then paste this command into the terminal:
   ```
   npx expo run:android
   ```
