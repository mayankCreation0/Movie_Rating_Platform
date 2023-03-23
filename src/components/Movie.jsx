import { useState, useEffect, useContext } from "react";
import { Grid, Heading, Spinner } from "@chakra-ui/react";
import axios from "axios";
import MovieCard from "./MovieCard";
import Pagination from "./Pagination";
import { Context } from "../context/Context";
import Navbar from "./Navbar";
import Banner from "./Banner";
import Footer from "./Footer";

const Movie = () => {
    const [movies, setMovies] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(12);
    const [datalength, setDatalength] = useState(0);
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        axios.get("http://localhost:8080/movies").then((response) => {
            setMovies(response.data.data);
            console.log(response.data.data);
            setDatalength(response.data.data.length);
            setLoading(false);
        });
    }, []);

    const lastPostIndex = currentPage * postsPerPage;
    const firstPostIndex = lastPostIndex - postsPerPage;
    const paginateData = movies.slice(firstPostIndex, lastPostIndex);
    return (
        <>
            <Navbar />
            <Banner />
            {loading ? <Spinner position={"fixed"} color={"red"} top={"50%"} /> : <div style={{ marginTop: "-80px", backgroundColor: "black", zIndex: "1" }}>
                <Heading style={{ paddingTop: "20px" }} color="white">Top Rated Movies</Heading>
                <Grid templateColumns="repeat(auto-fill, minmax(300px, 1fr))" gap="40px" padding="40px" >
                    {paginateData.map((movie, id) => (
                        <>
                            <MovieCard key={movie.id} {...movie} />
                        </>
                    ))}
                </Grid>
                <Pagination totalPosts={datalength}
                    postsPerPage={postsPerPage}
                    setCurrentPage={setCurrentPage}
                    currentPage={currentPage} />
            </div>}
            <Footer/>
        </>
    );
};

export default Movie;
