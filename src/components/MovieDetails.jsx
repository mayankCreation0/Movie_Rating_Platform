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
    const [btnloading, setBtnloading] = useState(false);
    const [delloading, setDelloading] = useState(false);
    const toast = useToast();
    const cookie = new Cookies()

    const fetchdata = async () => {
        setLoading(true)
        const data = await axios(`https://amber-hippo-ring.cyclic.app/movies/${id}`)
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
    const handleDeleteReview = async () => {
        try {
            setDelloading(true);
            const userid = cookie.get('userid')
            const movieId = id;
            await axios.delete(`https://amber-hippo-ring.cyclic.app/movies/delete/${userid}`, {
                data: {
                    movieId
                }
            })
            // alert(res)
            setDelloading(false)
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
            setBtnloading(true)
            const movieId = id;
            const userid = cookie.get('userid')
            {
                const review = rating
                await axios.put(`https://amber-hippo-ring.cyclic.app/movies/rate/${userid}`, {
                    movieId, review
                })
                console.log("rating", movie)
            }
            const review = reviews
            const reviewstatus = await axios.put(`https://amber-hippo-ring.cyclic.app/movies/review/${userid}`, {
                movieId, review
            })
            setBtnloading(false)
            console.log("review", reviewstatus)
            if (reviewstatus.data.error === 'You have already reviewed this movie') {
                toast({
                    title: 'You have already rated & reviewed this movie!',
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                });
                fetchdata();
            }
            else if (reviewstatus.data.message === "Review added successfully") {
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
                    <Box p="4" bg={"blackAlpha.400"} m={0} padding={0}>
                        <Flex align="center" mb="4" >
                            <Box mr="4" borderRadius="lg" overflow="hidden" height={"600px"} width={"50%"} boxShadow="lg">
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
                                                    Submit{btnloading ? <Spinner  /> : null}
                                                </Button>
                                            </Box>
                                            {comments.length > 0 ? (
                                                <Box>
                                                <Text color={"Black"}>Comments</Text>
                                                <VStack align="stretch">
                                                    {comments.map((review) => (
                                                        <Box key={review._id} p="4" bg="gray.200">
                                                            <Text fontStyle="italic" mb="2">
                                                                {cookie.get('userid') === review.userId ? <Text color={"purple"} fontStyle={"cursive"}>you rated this</Text> : null } 
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
                                                                                Delete{delloading ? <Spinner /> : null}
                                                                            </Button> : null}
                                                                    </>
                                                                );
                                                            })}
                                                        </Box>
                                                    ))}
                                                </VStack>
                                                </Box>
                                            ) : (
                                                <Text>No reviews yet.</Text>
                                            )}
                                        </Box>
                                    </Box>
                                </Flex>
                            </Box>
                        </Flex>
                    </Box>
                    <footer/>
                </>
            }
        </>
    );
};

export default MovieDetailsPage;
