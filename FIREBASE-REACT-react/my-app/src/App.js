// import { useEffect, useState } from "react";
// import "./App.css";
// import { Auth } from "./Components/Auth";
// import { db , auth } from "./config/firebase";
// import {
//   getDocs,
//   collection,
//   addDoc,
//   deleteDoc,
//   updateDoc,
//   doc,
// } from "firebase/firestore";

// function App() {
//   const [movieList, setMovieList] = useState([]);

//   const [newMovieTitle, setNewMovieTitle] = useState("");
//   const [newReleaseDate, setNewReleaseDate] = useState(0);

//   const [isNewMovieOscar, setIsNewMovieOscar] = useState(false);
//   const [updatedTitle, setUpdatedTitle] = useState("");

//   const moviesCollectionRef = collection(db, "movies");

//   const getMovieList = async () => {
//     try {
//       const data = await getDocs(moviesCollectionRef);
//       const filteredData = data.docs.map((doc) => ({
//         ...doc.data(),
//         id: doc.id,
//       }));

//       setMovieList(filteredData);
//     } catch (err) {
//       console.error(err);
//     }
//   };
//   useEffect(() => {
//     getMovieList();
//   }, []);

//   const onSubmitMovie = async () => {
//     try {
//       await addDoc(moviesCollectionRef, {
//         title: newMovieTitle,
//         releaseDate: newReleaseDate,
//         recievedAnOscar: isNewMovieOscar,
//         userId: auth?.currentUser?.uid
//       });

//       getMovieList();
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // const deleteMovie = async (id) => {
//   //   const movieDoc = doc(db, "movies", id);
//   //   await deleteDoc(doc(db, "movies", id));
//   //   getMovieList(); 
//   // };


//   const deleteMovie = async (id) => {
//     if (!auth.currentUser) {
//       alert("Please log in to delete a movie.");
//       return;
//     }
  
//     try {
//       const movieDoc = doc(db, "movies", id);
//       await deleteDoc(movieDoc);
//       getMovieList();
//     } catch (err) {
//       console.error(err);
//       alert("You are not authorized to delete this movie.");
//     }
//   };  
//   // const updateMovieTtile = async (id, ) => {
//   //   // const movieDoc = doc(db, "movies", id);
//   //   // await updateDoc(doc(db, "movies", id, {title: updatedTitle}));
//   //   const movieDoc = doc(db, "movies", id);
//   //   await updateDoc(movieDoc, { title: updatedTitle });
//   //   getMovieList();
//   // };

//   const updateMovieTtile = async (id) => {
//     if (!auth.currentUser) {
//       alert("Please log in to update the movie.");
//       return;
//     }
  
//     try {
//       const movieDoc = doc(db, "movies", id);
//       await updateDoc(movieDoc, { title: updatedTitle });
//       getMovieList();
//     } catch (err) {
//       console.error(err);
//       alert("You are not authorized to update this movie.");
//     }
//   };
  

//   return (
//     <div className="App">
//       <Auth />
//       <div>
//         <input
//           placeholder="Movie title..."
//           onChange={(e) => setNewMovieTitle(e.target.value)}
//         />
//         <input
//           placeholder="Release Date..."
//           type="number"
//           onChange={(e) => setNewReleaseDate(Number(e.target.value))}
//         />
//         <input
//           type="checkbox"
//           checked={isNewMovieOscar}
//           onChange={(e) => setIsNewMovieOscar(e.target.checked)}
//         />
//         <label>recieved An Oscar</label>
//         <button onClick={onSubmitMovie}>Submit Movie</button>
//       </div>
//       <div>
//         {movieList.map((movie) => (
//           <div>
//             <h1 style={{ color: movie.recievedAnOscar ? "green" : "red" }}>
//               {movie.title}
//             </h1>
//             <p>Date: {movie.releaseDate} </p>

//             <button onClick={() => deleteMovie(movie.id)}>Delete Movie</button>
//             <input  placeholder="New Title" onChange={(e) =>setUpdatedTitle(e.target.value)}/>
//             <button onClick={() => updateMovieTtile(movie.id)}>Update Title</button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default App;


import { useEffect, useState } from "react";
import "./App.css";
import { Auth } from "./Components/Auth";
import { db, auth } from "./config/firebase";
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";

function App() {
  const [movieList, setMovieList] = useState([]);
  const [newMovieTitle, setNewMovieTitle] = useState("");
  const [newReleaseDate, setNewReleaseDate] = useState(0);
  const [isNewMovieOscar, setIsNewMovieOscar] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState("");

  const moviesCollectionRef = collection(db, "movies");

  const getMovieList = async () => {
    try {
      const data = await getDocs(moviesCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setMovieList(filteredData);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getMovieList();
  }, []);

  const onSubmitMovie = async () => {
    if (!auth.currentUser) {
      alert("Please log in to add a movie.");
      return;
    }

    try {
      await addDoc(moviesCollectionRef, {
        title: newMovieTitle,
        releaseDate: newReleaseDate,
        recievedAnOscar: isNewMovieOscar,
        userId: auth?.currentUser?.uid,
      });
      getMovieList();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteMovie = async (id) => {
    if (!auth.currentUser) {
      alert("Please log in to delete a movie.");
      return;
    }

    try {
      const movieDoc = doc(db, "movies", id);
      await deleteDoc(movieDoc);
      getMovieList();
    } catch (err) {
      console.error(err);
      alert("You are not authorized to delete this movie.");
    }
  };

  const updateMovieTtile = async (id) => {
    if (!auth.currentUser) {
      alert("Please log in to update the movie.");
      return;
    }

    try {
      const movieDoc = doc(db, "movies", id);
      await updateDoc(movieDoc, { title: updatedTitle });
      getMovieList();
    } catch (err) {
      console.error(err);
      alert("You are not authorized to update this movie.");
    }
  };

  return (
    <div className="App">
      <Auth />
      {auth.currentUser && (
        <div>
          <input
            placeholder="Movie title..."
            onChange={(e) => setNewMovieTitle(e.target.value)}
          />
          <input
            placeholder="Release Date..."
            type="number"
            onChange={(e) => setNewReleaseDate(Number(e.target.value))}
          />
          <input
            type="checkbox"
            checked={isNewMovieOscar}
            onChange={(e) => setIsNewMovieOscar(e.target.checked)}
          />
          <label>Received An Oscar</label>
          <button onClick={onSubmitMovie}>Submit Movie</button>
        </div>
      )}
      <div>
        {movieList.map((movie) => (
          <div key={movie.id}>
            <h1 style={{ color: movie.recievedAnOscar ? "green" : "red" }}>
              {movie.title}
            </h1>
            <p>Date: {movie.releaseDate}</p>

            {/* Show delete and update buttons only for the logged-in user's movies */}
            {auth.currentUser?.uid === movie.userId && (
              <>
                <button onClick={() => deleteMovie(movie.id)}>Delete Movie</button>
                <input
                  placeholder="New Title"
                  onChange={(e) => setUpdatedTitle(e.target.value)}
                />
                <button onClick={() => updateMovieTtile(movie.id)}>Update Title</button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
