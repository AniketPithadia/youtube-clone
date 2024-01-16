# YouTube2.0 Video Platform 🔗 [LIVE DEMO](https://youtube2.0.onrender.com)

YouTube2.0 is an advanced video platform built on the MERN (MongoDB, Express.js, React, Node.js) stack with Redux for state management. This platform offers a variety of features that enhance the user experience, including user authentication, Google Sign-In, video uploading, interaction functionalities (like, dislike, comment, share), video management (edit, delete), search capabilities, trending videos display, and channel subscription.

## Features

- **User Authentication:**
  - Sign up with email and password.
  - Log in securely.

- **Social Sign-In:**
  - Authenticate using Google Sign-In.

- **Video Posting:**
  - Upload and share your videos seamlessly.

- **Interaction Functionalities:**
  - Like or dislike videos.
  - Leave comments on videos.
  - Share videos with others.

- **Video Management:**
  - Edit your own videos.
  - Delete your uploaded videos.

- **Search Functionality:**
  - Easily find videos using search capabilities.

- **Trending Videos:**
  - Explore the trending videos on the platform.

- **Channel Subscription:**
  - Subscribe to channels for updates on new videos.

## Prerequisites

Before you get started, ensure you have the following software installed on your machine:

- [Node.js](https://nodejs.org/) and npm
- [MongoDB](https://www.mongodb.com/)

## Installation

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/your-username/youtube2.0-video-platform.git
   ```

2. **Change to Project Directory:**

   ```bash
   cd youtube2.0-video-platform
   ```

3. **Install Dependencies:**

   ```bash
   npm install
   ```

4. **Create Environment Variables:**

   Create a .env file in the root directory for the API with the following variables:

   ```env
   MONGO_URL=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

   Additionally, create a .env file in the CLIENT folder for Firebase and Google Sign-In functionality:

   ```env
   FIREBASE_API_KEY=your_firebase_api_key
   ```

5. **Start MongoDB Server:**

   ```bash
   mongod
   ```

6. **Start Backend Server:**

   ```bash
   npm run server
   ```

7. **Start Frontend:**

   ```bash
   npm run client
   ```

8. **Open Your Browser:**

   Navigate to http://localhost:3000 to use the YouTube2.0 Video Platform.

## Contributing

Feel free to contribute to the development of this project by opening issues or submitting pull requests. Follow the standard GitHub flow for contributions.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

Note: Replace placeholder values such as your-username, your_mongodb_connection_string, your_jwt_secret, and your_firebase_api_key with your actual information. Additionally, update the CLIENT_URL variable in the .env file with the correct URL for your client application.









![first](https://user-images.githubusercontent.com/76560880/215963337-cc363a60-102c-4bb4-87d2-736a157816ca.png)
![second](https://user-images.githubusercontent.com/76560880/215963368-f57351a0-83c3-489f-ad93-5bba710de784.png)
![third](https://user-images.githubusercontent.com/76560880/215963376-5366176b-8988-426d-abc7-fce9b9674f56.png)
![fourth](https://user-images.githubusercontent.com/76560880/215963385-ca14349f-5b77-41ff-bed0-631a4c8efa29.png)
