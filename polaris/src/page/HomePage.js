import NavBar from "../component/NavBar";

const HomePage = () =>{
    return (
        <>
            <NavBar />
            {"port: " + process.env.REACT_APP_PORT}
        </>
    )
}

export default HomePage;