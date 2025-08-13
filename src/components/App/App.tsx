import { useState } from 'react';
import { Toaster, toast } from "react-hot-toast";
import SearchBar from '../SearchBar/SearchBar';
import { fetchMovies } from '../../services/movieService';
import type { Movie } from '../../types/movie';
import MovieGrid from '../MovieGrid/MovieGrid';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import MovieModal from '../MovieModal/MovieModal';


export default function App() {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
     const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
    
    const handleSearch = async (query: string) => {
        setMovies([]);
        setError(false);
        setLoading(true);
        
        try {
            const data = await fetchMovies(query);

            if (data.length === 0) {
                toast.error("No movies found for your request.");
            }
            setMovies(data);
        } catch {
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
          <SearchBar onSubmit={handleSearch} />
          {loading && <Loader />}
          {error && <ErrorMessage />}
           {!loading && !error && movies.length > 0 && (
             <MovieGrid movies={movies} onSelect={setSelectedMovie} />
           )}
           {selectedMovie && (
            <MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
           )}
           <Toaster position="top-right" />
        </>
    )

}
    

    







// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'



// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.tsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App
