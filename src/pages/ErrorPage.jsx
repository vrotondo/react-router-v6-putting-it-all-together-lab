import NavBar from "../components/NavBar";

function ErrorPage() {
    return (
        <>
            <NavBar />
            <main>
                <h1>Oops! Looks like something went wrong.</h1>
                <p>Sorry, we couldn't find the page you're looking for.</p>
            </main>
        </>
    );
}

export default ErrorPage;