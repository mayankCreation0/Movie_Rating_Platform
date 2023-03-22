import { useState, useEffect, useContext } from "react";
import { Grid, Heading } from "@chakra-ui/react";
import axios from "axios";
import MovieCard from "./MovieCard";
import Pagination from "./Pagination";
import { Context } from "../context/Context";
import Navbar from "./Navbar";
import Banner from "./Banner";

const Movie = () => {
    const [movies, setMovies] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(12);
    const [datalength, setDatalength] = useState(0);

    useEffect(() => {
        axios.get("http://localhost:8080/movies").then((response) => {
            setMovies(response.data.data);
            console.log(response.data.data);
            setDatalength(response.data.data.length);
        });
    }, []);

    const lastPostIndex = currentPage * postsPerPage;
    const firstPostIndex = lastPostIndex - postsPerPage;
    const paginateData = movies.slice(firstPostIndex, lastPostIndex);
    return (
        <>
            <Navbar />
            <Banner />
            <div style={{ marginTop: "-80px", backgroundColor: "black", zIndex: "1" }}>
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
            </div>
        </>
    );
};

export default Movie;
