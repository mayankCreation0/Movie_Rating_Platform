import { useState } from "react";
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Textarea,
    useToast,
} from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import { useParams } from "react-router-dom";

const MovieDetailsPage = ({ movie }) => {
    const {id} = useParams;
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState("");
    const toast = useToast();

    const handleRatingChange = (value) => {
        setRating(value);
    };

    const handleReviewChange = (event) => {
        setReview(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // send rating and review to backend
        toast({
            title: "Rating submitted.",
            description: `You gave ${rating} stars and wrote: ${review}`,
            status: "success",
            duration: 5000,
            isClosable: true,
        });
    };

    return (
        <Box p="4">
            <Stack direction={["column", "row"]}>
                <Box flex="1">
                    <img src={movie.img} alt={movie.title} />
                </Box>
                <Box flex="2" pl={["0", "4"]}>
                    <Box d="flex" alignItems="center">
                        <Box as="span" mr="2">
                            {Array.from({ length: 5 }).map((_, index) => (
                                <StarIcon
                                    key={index}
                                    color={index < Math.floor(movie.averageRating) ? "yellow.400" : "gray.300"}
                                    onClick={() => handleRatingChange(index + 1)}
                                    cursor="pointer"
                                />
                            ))}
                        </Box>
                        <Box as="span" fontWeight="bold" fontSize="xl">
                            {movie.title}
                        </Box>
                    </Box>
                    <Box>
                        <Box as="span" fontWeight="bold">
                            Release Date:
                        </Box>{" "}
                        {new Date(movie.releaseDate).toLocaleDateString()}
                    </Box>
                    <Box>
                        <Box as="span" fontWeight="bold">
                            Genres:
                        </Box>{" "}
                        {movie.genres.join(", ")}
                    </Box>
                    <Box>
                        <Box as="span" fontWeight="bold">
                            Duration:
                        </Box>{" "}
                        {movie.duration}
                    </Box>
                    <Box>
                        <Box as="span" fontWeight="bold">
                            Storyline:
                        </Box>{" "}
                        {movie.storyline}
                    </Box>
                    <Box>
                        <Box as="span" fontWeight="bold">
                            Actors:
                        </Box>{" "}
                        {movie.actors.join(", ")}
                    </Box>
                    <Box>
                        <Box as="span" fontWeight="bold">
                            IMDb Rating:
                        </Box>{" "}
                        {movie.imdbRating}
                    </Box>
                    <Box>
                        <Box as="span" fontWeight="bold">
                            Total Counting:
                        </Box>{" "}
                        {movie.totalCounting}
                    </Box>
                    <Box mt="4">
                        <form onSubmit={handleSubmit}>
                            <FormControl id="rating" mb="4">
                                <FormLabel>Rating</FormLabel>
                                <Box d="flex" alignItems="center">
                                    {Array.from({ length: 5 }).map((_, index) => (
                                        <StarIcon
                                            key={index}
                                            color={index < rating ? "yellow.400" : "gray.300"}
                                            onClick={() => handleRatingChange(index + 1)}
                                            cursor="pointer"
                                        />
                                    ))}
                                    <Box ml="2">{rating} stars</Box>
                                </Box>
                            </FormControl>
                            <FormControl id="review" mb="4">
                                <FormLabel>Review</FormLabel>
                                <Textarea value={review} onChange={handleReviewChange} />
                            </FormControl>
                            <FormControl>
                                <Button type="submit" colorScheme="teal">
                                    Submit Rating
                                </Button>
                            </FormControl>
                        </form>
                    </Box>
                </Box>
            </Stack>
        </Box>
    );
};

export default MovieDetailsPage;
