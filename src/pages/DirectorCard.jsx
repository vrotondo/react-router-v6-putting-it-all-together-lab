import { useParams, useOutletContext, Outlet, Link } from 'react-router-dom';

function DirectorCard() {
    const { id } = useParams();
    const { directors, updateDirector } = useOutletContext();

    // Find the director - convert numeric IDs to string for comparison
    const director = directors.find(d => d.id == id); // Using loose equality to match string/number IDs

    if (!director) {
        return <h2>Director not found.</h2>;
    }

    return (
        <div>
            <h2>{director.name}</h2>
            <p>{director.bio}</p>
            <h3>Movies:</h3>
            <ul>
                {director.movies.map((movie) => (
                    <li key={movie.id}>
                        <Link to={`/directors/${id}/movies/${movie.id}`}>{movie.title}</Link>
                    </li>
                ))}
            </ul>
            <Link to={`/directors/${id}/movies/new`}>Add New Movie</Link>
            <Outlet context={{ director, updateDirector }} />
        </div>
    );
}

export default DirectorCard;