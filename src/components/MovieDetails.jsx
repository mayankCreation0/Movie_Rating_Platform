import { useEffect, useState } from "react";
import {
    Box,
    Button,
    Divider,
    Flex,
    Heading,
    Image,
    Spinner,
    Text,
    Textarea,
    useToast,
    VStack,
} from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import { useParams } from "react-router-dom";
import axios from "axios";
import Cookies from "universal-cookie";
import Navbar from "./Navbar";

const MovieDetailsPage = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState(false)
    const [movie, setMovie] = useState({})
    const [rating, setRating] = useState(0);
    const [reviews, setReviews] = useState("");
    const [comments, setComments] = useState([]);
    const toast = useToast();
    const cookie = new Cookies()
    
    const fetchdata = async () => {
        setLoading(true)
        const data = await axios(`http://localhost:8080/movies/${id}`)
        setMovie(data.data);
        setLoading(false);
        setComments(data.data.reviews)
    }
    useEffect(() => {
        fetchdata();
    }, [id])

    const handleRatingChange = (value) => {
        setRating(value);
    };

    const handleReviewChange = (event) => {
        setReviews(event.target.value);
    };
    const handleDeleteReview = async() => {
        try {
            const userid = cookie.get('userid')
            const movieId = id;
            await axios.delete(`http://localhost:8080/movies/delete/${userid}`, {
                data: {
                    movieId
                }})
            // alert(res)
            toast({
                title: 'Deleted Successfully',
                status: 'success',
                duration: 5000,
                isClosable: true,
            }); 
            fetchdata();
        } catch (error) {
            toast({
                title: "Something went wrong",
                // description: `Invalid input`,
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        }
    }
    const handleSubmit = async (event) => {
        event.preventDefault();

        // send rating and review to backend
        try {
            const movieId = id;
            const userid = cookie.get('userid')
            {
                const review = rating
                await axios.put(`http://localhost:8080/movies/rate/${userid}`, {
                    movieId, review
                })
                console.log("rating" , movie)
            }
            const review = reviews
            const reviewstatus = await axios.put(`http://localhost:8080/movies/review/${userid}`, {
                movieId, review
            })
            console.log("review" , reviewstatus)
            if (reviewstatus.data.error === 'You have already reviewed this movie') {
                toast({
                    title: 'You have already rated & reviewed this movie!',
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                });
                fetchdata();
            }
            else if (reviewstatus.data.message === "Review added successfully"){
                toast({
                    title: "Rating submitted.",
                    description: `You gave ${rating} stars and wrote: ${review}`,
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                });
                fetchdata();
            }
        } catch (error) {
            toast({
                title: "Something went wrong",
                description: `Invalid input`,
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        }
    };

    return (
        <>
            {loading ? <Spinner position={"fixed"} color={"red"} top={"50%"} /> :
                <>
                    <Navbar />
                    <Box p="4" bg={"blackAlpha.400"}  m={0} padding={0}>
                        <Flex align="center" mb="4" >
                            <Box mr="4"  borderRadius="lg" overflow="hidden"height={"600px"} width={"50%"} boxShadow="lg">
                                <Image src={movie.img} alt={movie.title} width="100%" height={"600px"} objectFit="cover" />
                            </Box>

                            <Box flex="1" align="center">
                                <Heading mb="2" size="xl">
                                    {movie.title}
                                </Heading>
                                <Text fontSize="lg" mb="4">
                                    {movie.storyline}
                                </Text>
                                <Flex mb="4">
                                    {movie.genres && movie.genres.length > 0 &&
                                        <Text>
                                            <strong>Genres:</strong> {movie.genres.join(", ")}
                                        </Text>
                                    }
                                </Flex>
                                <Flex mb="4">
                                    <Box mr="4">
                                        <Text fontSize="md" fontWeight="bold">
                                            Release year:
                                        </Text>
                                    </Box>
                                    <Box>
                                        <Text fontSize="md">{movie.releaseYear}</Text>
                                    </Box>
                                </Flex>
                                <Flex mb="4">
                                    <Box mr="4">
                                        <Text fontSize="md" fontWeight="bold">
                                            Duration:
                                        </Text>
                                    </Box>
                                    <Box>
                                        <Text fontSize="md">{movie.duration}</Text>
                                    </Box>
                                </Flex>
                                <Flex mb="4">
                                    <Box mr="4">
                                        <Text fontSize="md" fontWeight="bold">
                                            Viewer's rating:
                                        </Text>
                                    </Box>
                                    <Box>
                                        <Text fontSize="md">{Math.floor(movie.averageRating).toFixed(2)}</Text>
                                    </Box>
                                </Flex>
                                <Flex mb="4">
                                    <Box mr="4">
                                        <Text fontSize="md" fontWeight="bold" color="gray.500">
                                            Total counting:
                                        </Text>
                                    </Box>
                                    <Box>
                                        <Text fontSize="md" color="teal.500" fontWeight="bold">
                                            {movie.totalCounting}
                                        </Text>
                                    </Box>
                                </Flex>
                                <Flex mb="4">
                                    <Box mr="4">
                                        <Text>
                                            <strong>Original title:</strong> {movie.originalTitle}
                                        </Text>
                                        <Text>
                                            <strong>Release date:</strong> {(movie.releaseDate)}
                                        </Text>
                                        <Divider my="6" />
                                        <Box>
                                            <Heading size="md" mb="2">
                                                Ratings
                                            </Heading>

                                            <Box mb="4">
                                                <Heading size="sm">Rate this movie</Heading>
                                                <Flex align="center">
                                                    {[...Array(10)].map((_, index) => (
                                                        <Box key={index} as="label" mx="1">
                                                            <input
                                                                type="radio"
                                                                name="rating"
                                                                value={index + 1}
                                                                onChange={() => handleRatingChange(index + 1)}
                                                            />
                                                            <StarIcon
                                                                color={index + 1 <= rating ? "yellow" : "gray"}
                                                                size={24}
                                                                cursor="pointer"
                                                            />
                                                        </Box>
                                                    ))}
                                                </Flex>
                                                <Textarea
                                                    placeholder="Write your review here..."
                                                    value={reviews}
                                                    onChange={handleReviewChange}
                                                    mt="2"
                                                />
                                                <Button
                                                    colorScheme="green"
                                                    onClick={handleSubmit}
                                                    mt="2"
                                                >
                                                    Submit
                                                </Button>
                                            </Box>
                                            {comments.length > 0 ? (
                                                <VStack align="stretch">
                                                    {comments.map((review) => (
                                                        <Box key={review._id} p="4" bg="gray.200">
                                                            <Text fontStyle="italic" mb="2">
                                                                {movie.rating.userid} rated it{" "}
                                                                
                                                            </Text>
                                                            <Text>{review.review}</Text>
                                                            {movie.rating.map((review) => {
                                                                return (
                                                                    <>
                                                                    {cookie.get('userid') === review.userId ?
                                                                    <Button
                                                                        size="sm"
                                                                        colorScheme="red"
                                                                        mt="2"
                                                                        onClick={handleDeleteReview}
                                                                    >
                                                                        Delete
                                                                    </Button> : null}
                                                                    </>
                                                                );
                                                            })}
                                                        </Box>
                                                    ))}
                                                </VStack>
                                            ) : (
                                                <Text>No reviews yet.</Text>
                                            )}
                                        </Box>
                                    </Box>
                                </Flex>
                            </Box>
                        </Flex>
                    </Box>
                </>
            }
        </>
    );
};

export default MovieDetailsPage;

{/* <Box bg="black" color="white" p="4" height={"100vh"}>
                    <Flex align="center" mb="4">
                        <Box mr="4" >
                            <img src={movie.img} alt={movie.title} width="100%" />
                        </Box>
                        <Box bg={"yellow"}>
                            <Heading size="lg">{movie.title}</Heading>
                            <Text>{movie.storyline}</Text>
                            <Text>
                                <strong>Genres:</strong> {movie.genres.join(", ")}
                            </Text>
                            <Text>
                                <strong>Release year:</strong> {movie.releaseYear}
                            </Text>
                            <Text>
                                <strong>Duration:</strong> {movie.duration}
                            </Text>
                            <Text>
                                <strong>IMDB rating:</strong> {movie.imdbRating}
                            </Text>
                            <Text>
                                <strong>Total counting:</strong> {movie.totalCounting}
                            </Text>
                        </Box>
                    </Flex>
                    <Flex mb="4">
                        <Box mr="4">
                            <Text>Rate this movie:</Text>
                            <Flex align="center">
                                {[...Array(5)].map((_, index) => (
                                    <Box key={index} as="label" mx="1">
                                        <input
                                            type="radio"
                                            name="rating"
                                            value={index + 1}
                                            onChange={() => handleRatingChange(index + 1)}
                                        />
                                        <StarIcon
                                            color={index + 1 <= rating ? "yellow" : "gray"}
                                            size={24}
                                            cursor="pointer"
                                        />
                                    </Box>
                                ))}
                            </Flex>
                        </Box>
                        <Box>
                            <Text>Write a review:</Text>
                            <form onSubmit={handleSubmit}>
                                <Input
                                    value={reviews}
                                    onChange={handleReviewChange}
                                    placeholder="Type your review here"
                                    size="sm"
                                    mb="2"
                                />
                                <Button type="submit" size="sm">
                                    Submit
                                </Button>
                            </form>
                        </Box>
                    </Flex>
                    <Box>
                        <Heading size="md" mb="2">
                            Reviews
                        </Heading>
                        {reviews.length > 0 ? (
                            <Box>
                                {reviews.map((review) => (
                                    <Flex key={review._id} mb="2">
                                        <Box flex="1">
                                            <Text>{review.review}</Text>
                                            <Text fontSize="sm" color="gray.500">
                                                {review.userId} - {review.date}
                                            </Text>
                                        </Box>
                                        <Box>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                colorScheme="red"
                                                onClick={() => handleDeleteReview(review._id)}
                                            >
                                                Delete
                                            </Button>
                                        </Box>
                                    </Flex>
                                ))}
                            </Box>
                        ) : (
                            <Text>No reviews yet.</Text>
                        )}
                    </Box>
                </Box> */}