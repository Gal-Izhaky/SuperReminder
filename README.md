# 🛒 SuperReminder 🛒
**SuperReminder** is a mobile application designed to simplify shopping list management and price comparison. This project is my final prject in **Software Engineering class**, and is currently **in development**. The app leverages modern technologies to provide a seamless and efficient user experience for managing shopping needs.

## 📖 About the Project
The goal of SuperReminder is to offer users an intuitive way to manage their shopping lists, and make informed purchasing decisions by comparing supermarket prices. 
The application integrates powerful tools and technologies, enabling users to create, organize, and optimize their shopping experience effectively.

## ✨ Features Implemented So Far
### 1. Shopping List Management
* Create new shopping lists stored locally using Realm Database.
* Edit and delete lists as needed.
* Sort and filter lists for better organization.
* Search and add new items to lists.
### 2. Barcode Scanning
* Scan product barcodes to view all of its' info and compare prices across multiple supermarkets.
### 3. Supermarket Data Browsing
* View detailed data for supermarkets, including:
  * Shufersal Deal
  * Shufersal Sheli
  * Shufersal Yesh Hesed
  * Tiv Taam
  * Rami Levi
  * Hazi Hinam
  * Stop Market
  * Osherad
  * am:pm

  Supermarket data is dynamically fetched via Firebase, supported by an API I developed ([Supermarket Database Updater](https://github.com/Gal-Izhaky/public-supermarket-database-updater))
### 4. Seamless Navigation
* Navigate effortlessly between pages with a user-friendly interface. 

## 🛠️ Tools & Technologies
* **React Native**: Built using the Expo CLI with an Expo development build.
* **Firebase**: To fetch and manage supermarket data.
* **Realm Database**: For efficient local storage of shopping lists.
* **Custom API**: Updates the supermarket database with real-time pricing. ([Supermarket Database Updater](https://github.com/Gal-Izhaky/public-supermarket-database-updater))
* **Javascript**: The programming language used for the application

## 🚧 Upcoming Features
### 1. Enhanced Shopping Lists
* Compare prices for the entire shopping list across supermarkets.
### 2. Localization and Personalization
* Multi-language support tailored to user location and preferences.
* Option to change the app's color theme.
### 3. Smart Location-Based Reminders
* Notifications/Alarms when users are near a supermarket, to remind them of their shopping lists.
* Will use Geofencing technology in the background to determine if the user is close to certain locations, that were also fetched from the API I developed.
### 4. Further Enhancements
* Continued improvements in functionality, usability, design, and performance.

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
    
    rename src/firebase/Config.example.js to Config.js and add your firebase config to the firebaseConfig variable

4. **Run the App:**
   
   To run the app on android, either open an emulator (using Android studio), or connect your device to your PC, and then paste this command into the terminal:
   ```
   npx expo run:android
   ```
