// import { useState } from "react";
// import { auth, googleProvider } from "../config/firebase";
// import {
//   createUserWithEmailAndPassword,
//   signInWithPopup,
//   signOut,
// } from "firebase/auth";
// export const Auth = () => {
//   const [email, setEmail] = useState("");
//   const [Password, setPassword] = useState("");

//   console.log(auth?.currentUser?.photoURL   );

//   const signIn = async () => {
//     try {
//       await createUserWithEmailAndPassword(auth, email, Password);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const signInWithGoogle = async () => {
//     try {
//       await signInWithPopup(auth, googleProvider);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const logout = async () => {
//     try {
//       await signOut(auth);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <div>
//       <input
//         placeholder="Email..."
//         className="inpinp"
//         onChange={(e) => setEmail(e.target.value)}
//       ></input>
//       <input
//         placeholder="Password..."
//         type="password"
//         onChange={(e) => setPassword(e.target.value)}
//       ></input>
//       <button onClick={signIn}>Sign - In</button>
//       <button onClick={signInWithGoogle}>Sign In With Google</button>
//       <button onClick={logout}>LogOut</button>
//     </div>
//   );
// };

// import { useState } from "react";
// import { auth, googleProvider } from "../config/firebase";
// import {
//   createUserWithEmailAndPassword,
//   signInWithPopup,
//   signOut,
// } from "firebase/auth";

// export const Auth = () => {
//   const [email, setEmail] = useState("");
//   const [Password, setPassword] = useState("");

//   const signIn = async () => {
//     try {
//       await createUserWithEmailAndPassword(auth, email, Password);
//       alert("✅ Signed in successfully with email!");
//     } catch (err) {
//       console.error(err);
//       alert("❌ Email sign-in failed: " + err.message);
//     }
//   };

//   const signInWithGoogle = async () => {
//     try {
//       await signInWithPopup(auth, googleProvider);
//       alert("✅ Signed in successfully with Google!");
//     } catch (err) {
//       console.error(err);
//       alert("❌ Google sign-in failed: " + err.message);
//     }
//   };

//   const logout = async () => {
//     try {
//       await signOut(auth);
//       alert("👋 Logged out successfully!");
//     } catch (err) {
//       console.error(err);
//       alert("❌ Logout failed: " + err.message);
//     }
//   };

//   return (
//     <div>
//       <input
//         placeholder="Email..."
//         className="inpinp"
//         onChange={(e) => setEmail(e.target.value)}
//       />
//       <input
//         placeholder="Password..."
//         type="password"
//         onChange={(e) => setPassword(e.target.value)}
//       />
//       <button onClick={signIn}>Sign - In</button>
//       <button onClick={signInWithGoogle}>Sign In With Google</button>
//       <button onClick={logout}>LogOut</button>
//     </div>
//   );
// };

// import { useState } from "react";
// import { auth, googleProvider } from "../config/firebase";
// import {
//   createUserWithEmailAndPassword,
//   signInWithPopup,
//   signOut,
// } from "firebase/auth";

// // 🔧 Always show the Google account selection popup
// googleProvider.setCustomParameters({
//   prompt: "select_account"
// });

// export const Auth = () => {
//   const [email, setEmail] = useState("");
//   const [Password, setPassword] = useState("");

//   const signIn = async () => {
//     try {
//       await createUserWithEmailAndPassword(auth, email, Password);
//       alert("✅ Signed in successfully with email!");
//     } catch (err) {
//       console.error(err);
//       alert("❌ Email sign-in failed: " + err.message);
//     }
//   };

//   const signInWithGoogle = async () => {
//     try {
//       await signInWithPopup(auth, googleProvider);
//       alert("✅ Signed in successfully with Google!");
//     } catch (err) {
//       console.error(err);
//       alert("❌ Google sign-in failed: " + err.message);
//     }
//   };

//   const logout = async () => {
//     try {
//       await signOut(auth);
//       alert("👋 Logged out successfully!");
//     } catch (err) {
//       console.error(err);
//       alert("❌ Logout failed: " + err.message);
//     }
//   };

//   return (
//     <div>
//       <input
//         placeholder="Email..."
//         className="inpinp"
//         onChange={(e) => setEmail(e.target.value)}
//       />
//       <input
//         placeholder="Password..."
//         type="password"
//         onChange={(e) => setPassword(e.target.value)}
//       />
//       <button onClick={signIn}>Sign - In</button>
//       <button onClick={signInWithGoogle}>Sign In With Google</button>
//       <button onClick={logout}>LogOut</button>
//     </div>
//   );
// };

import { useState } from "react";
import { auth, googleProvider } from "../config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";

export const Auth = () => {
  const [email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); 

  const signIn = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        Password
      );
      const user = userCredential.user;

      if (!user.emailVerified) {
        setErrorMessage("Please verify your email before logging in.");
        alert("Please verify your email before logging in.");
        return;
      }

      setErrorMessage("");
      alert("Login successful!");
    } catch (err) {
      if (err.code === "auth/user-not-found") {
        setErrorMessage("Email is invalid or not registered.");
        alert("Email is invalid or not registered. Please try again.");
      } else if (err.code === "auth/wrong-password") {
        setErrorMessage("Incorrect password. Please try again.");
        alert("Incorrect password. Please try again.");
      } else {
        console.error(err);
        setErrorMessage("An error occurred. Please try again later.");
        alert("An error occurred. Please try again later.");
      }
    }
  };

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      if (!user.emailVerified) {
        setErrorMessage("Please verify your email before logging in.");
        alert("Please verify your email before logging in.");
        return;
      }
      setErrorMessage("");
      alert("Login successful with Google!");
    } catch (err) {
      console.error(err);
      setErrorMessage("There was an error logging in with Google.");
      alert("There was an error logging in with Google.");
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      alert("Logged out successfully!");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <input
        placeholder="Email..."
        className="inpinp"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        placeholder="Password..."
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={signIn}>Sign In</button>
      <button onClick={signInWithGoogle}>Sign In With Google</button>
      <button onClick={logout}>Log Out</button>

      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
    </div>
  );
};

export default Auth;
