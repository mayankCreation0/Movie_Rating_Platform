import { Box, Image, Badge, Text, Flex, Button, ModalOverlay, Modal, ModalContent, ModalCloseButton, ModalBody, useDisclosure } from "@chakra-ui/react";
import { useContext } from "react";
import { FaStar } from 'react-icons/fa';
import { Context } from "../context/Context";
import '../styles/Card.css'
import { Outlet, useNavigate } from "react-router-dom";


const MovieCard = ({ title, releaseYear, genres, duration, imdbRating, img, id }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const navigate = useNavigate()
    const {auth } =useContext(Context)

    return (
        <Box
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            width="300px"
            margin="10px"
            backgroundColor="gray.800"
            boxShadow="lg"
            transition="all 0.3s"
            _hover={{ transform: "scale(1.05)" }}
        >
            <Box position="relative">
                <Image src={img} alt={`${title} poster`} height="450px" width="100%" objectFit="cover" />
                <Flex
                    position="absolute"
                    bottom="10px"
                    left="10px"
                    alignItems="center"
                    backgroundColor="rgba(0, 0, 0, 0.7)"
                    padding="4px 8px"
                    borderRadius="sm"
                >
                    <Box as={FaStar} color="yellow.400" mr="2px" />
                    <Text fontSize="sm" color="white" fontWeight="semibold">
                        {imdbRating}/10
                    </Text>
                </Flex>
                <Flex
                    position="absolute"
                    top="10px"
                    left="10px"
                    alignItems="center"
                    backgroundColor="rgba(0, 0, 0, 0.7)"
                    padding="4px 8px"
                    borderRadius="sm"
                >
                    <Text fontSize="sm" color="white" fontWeight="semibold">
                        {title}
                    </Text>
                </Flex>
            </Box>
            <Box p="6">
                <Box d="flex" alignItems="baseline">
                    <Badge borderRadius="full" px="2" colorScheme="teal">
                        {releaseYear}
                    </Badge>
                    <Box
                        color="white"
                        fontWeight="semibold"
                        letterSpacing="wide"
                        fontSize="xs"
                        textTransform="uppercase"
                        m="2"
                        borderRadius="full"
                        bgColor={"goldenrod"}
                    >
                        {genres.join(", ")}
                    </Box>
                </Box>

                <Box mt="1" fontSize={"2xl"} fontFamily={"cursive"} fontWeight="semibold" as="h4" lineHeight="tight" isTruncated color="white">
                    {title}
                </Box>

                <Box d="flex" justifyContent="center">
                    <Text fontSize="sm" color="white" >
                        {duration}
                    </Text>
                    <Button
                        className="moviecard-btn"
                        size="sm"
                        backgroundColor="teal.500"
                        _hover={{ backgroundColor: "white", backgroundPosition: "bottom", color: "black" }}
                        mt={"2"}
                        ml={"100"}
                        transform="translateX(-50%)"
                        opacity="1"
                        onClick={!auth ? onOpen : navigate('/movies/:id')}
                    // _groupHover={{ opacity: "1" }}
                    >
                        Rate the movie
                    </Button>
                </Box>
            </Box>
        <Box>
            {<Modal isOpen={isOpen} onClose={onClose} isCentered >
                <ModalOverlay style={{ backgroundColor: "transparent", backdropFilter: "blur(4px)", border: "1px solid red" }} />
                <ModalContent
                    backgroundColor="white"
                    borderRadius="md"
                    boxShadow="md"
                    maxW="sm"
                    w="full"
                    zIndex="modal"
                >
                    <ModalCloseButton />
                    <ModalBody>
                       <Outlet />
                    </ModalBody>
                </ModalContent>
            </Modal>}
        </Box>
        </Box>

    );
};

export default MovieCard;