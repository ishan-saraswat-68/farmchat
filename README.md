# ShieldChat

ShieldChat is a real-time chat application built with React and Firebase. It allows users to sign in using their Google account, join specific chat rooms, and communicate with others in real-time.

## About The Project

ShieldChat provides a simple and effective way to connect with others. Whether you're discussing farming techniques or just catching up, ShieldChat makes it easy.

**Key Features:**
*   **Google Authentication:** Secure and easy sign-in using Google.
*   **Real-time Messaging:** Messages are delivered instantly using Firebase Firestore.
*   **Chat Rooms:** Join different rooms to organize conversations.
*   **Persistent Sessions:** Stay logged in with cookie-based session management.

## Built With

*   [React](https://reactjs.org/) - A JavaScript library for building user interfaces.
*   [Vite](https://vitejs.dev/) - Next Generation Frontend Tooling.
*   [Firebase](https://firebase.google.com/) - Platform for building web and mobile applications (Auth, Firestore).
*   [Universal Cookie](https://www.npmjs.com/package/universal-cookie) - Simple cookie handling for React.

## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

*   npm
    ```sh
    npm install npm@latest -g
    ```

### Installation

1.  Clone the repo
    ```sh
    git clone https://github.com/your_username/shieldchat.git
    ```
2.  Install NPM packages
    ```sh
    npm install
    ```
3.  Create a `firebase-config.js` file in `src/` and add your Firebase configuration (if not already present):
    ```js
    import { initializeApp } from "firebase/app";
    import { getAuth, GoogleAuthProvider } from "firebase/auth";
    import { getFirestore } from "firebase/firestore";

    const firebaseConfig = {
      apiKey: "YOUR_API_KEY",
      authDomain: "YOUR_AUTH_DOMAIN",
      projectId: "YOUR_PROJECT_ID",
      storageBucket: "YOUR_STORAGE_BUCKET",
      messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
      appId: "YOUR_APP_ID"
    };

    const app = initializeApp(firebaseConfig);
    export const auth = getAuth(app);
    export const provider = new GoogleAuthProvider();
    export const db = getFirestore(app);
    ```
4.  Start the development server
    ```sh
    npm run dev
    ```

## Usage

1.  **Sign In:** Click the "Sign In With Google" button to authenticate.
2.  **Enter Room:** Type the name of the room you want to join (e.g., "General", "Crops") and click "Enter Chat".
3.  **Chat:** Type your message and hit send. You will see messages from other users in the same room in real-time.
4.  **Leave/Sign Out:** You can leave the current room to join another or sign out completely.

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.
