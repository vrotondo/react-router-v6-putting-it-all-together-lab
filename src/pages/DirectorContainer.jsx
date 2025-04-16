import { useEffect, useState } from 'react';
import { Outlet, useOutletContext } from 'react-router-dom';
import NavBar from '../components/NavBar';

const DirectorContainer = () => {
    const [directors, setDirectors] = useState([])

    useEffect(() => {
        fetch("http://localhost:4000/directors")
            .then(r => {
                if (!r.ok) { throw new Error("failed to fetch directors") }
                return r.json()
            })
            .then(setDirectors)
            .catch(console.log)
    }, [])

    const addDirector = (newDirector) => {
        setDirectors([...directors, newDirector])
    }

    const updateDirector = (updatedDirector) => {
        setDirectors(directors.map(director =>
            director.id === updatedDirector.id ? updatedDirector : director
        ))
    }

    return (
        <>
            <NavBar />
            <main>
                <h1>Welcome to the Director's Directory!</h1>
                <Outlet context={{ directors, addDirector, updateDirector }} />
            </main>
        </>
    );
}

export default DirectorContainer;