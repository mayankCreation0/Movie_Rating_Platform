import {
    FormControl,
    FormLabel,
    Input,
    InputRightAddon,
    InputGroup,
    useToast,
    Spinner,
    Heading,
    Box,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { context } from "../AuthContext/context";
import "../styles/Login.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
// import png from ' ../assets/Gmail_Logo_16px.png';

const SignupPage = () => {
    // const { authstate, fnauthstate, falseAuthState } = useContext(context);
    const navigate = useNavigate();
    const [input, setInput] = useState({
        username:"",
        email: "",
        password: "",
    });
    const [loading, setLoading] = useState(false);
    const toast = useToast();
    const [showPassword, setShowPassword] = useState(false);
    const handleChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        });
    };
    const inputRef = useRef(null);
    useEffect(() => {
        inputRef.current.focus();
    }, []);
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            setLoading(true);
            const res = await axios.post(
                "https://amber-hippo-ring.cyclic.app/users/signup",
                input
            );
            // console.log(res.status);
            if (res) {
                toast({
                    title: 'signup Sucessfully.',
                    description: "Welcome!!",
                    status: 'success',
                    duration: 2500,
                    isClosable: true,
                })
                navigate('/login');
                setLoading(false)
                // fnauthstate();
            }
            else if (res.status === 500) {
                setLoading(false)
                toast({
                    title: "User Already Registered",
                    description: "",
                    status: "error",
                    duration: 4000,
                    isClosable: true,
                });
            }
        } catch (e) {
            setLoading(false)
            toast({
                title: "Something went wrong",
                description: "",
                status: "error",
                duration: 4000,
                isClosable: true,
            });
            console.log(e);

        }
    };
    return (
        <div>  <>
                <form
                    onSubmit={handleSubmit}
                    style={{
                        // backgroundImage:
                        //   "linear-gradient(to right top, #d2d7e0, #c8d3d7, #c3cdcd, #c1c7c3, #bfc0bc)",
                        backgroundColor: "#FFF",
                        // padding: "20px",
                        width: "100%",
                        height: "auto",
                        borderRadius: "20px",
                    }}
                >
                    <Heading >Signup</Heading>
                <FormControl>
                    <FormLabel htmlFor="String">Username</FormLabel>
                    <Input
                        type="String"
                        id="username"
                        name="username"
                        border="1px solid black"
                        bg="white"
                        ref={inputRef}
                        onChange={handleChange}
                        placeholder="Enter your Username"
                    />
                </FormControl>
                    <FormControl>
                        <FormLabel htmlFor="String">Email</FormLabel>
                        <Input
                            type="String"
                            id="email"
                            name="email"
                            border="1px solid black"
                            bg="white"
                            ref={inputRef}
                            onChange={handleChange}
                            placeholder="Enter your email address"
                        />
                    </FormControl>

                    <FormControl mt={4}>
                        <FormLabel htmlFor="password">Password</FormLabel>
                        <InputGroup>
                            <Input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                name="password"
                                bg="white"
                                // ref={inputRef}
                                border="1px solid black"
                                placeholder="Enter your password"
                                onChange={handleChange}
                            />
                            <InputRightAddon
                                onClick={() => setShowPassword(!showPassword)}
                                cursor="pointer"
                            >
                                <FontAwesomeIcon
                                    icon={showPassword ? faEye : faEyeSlash}
                                    cursor="pointer"
                                    border="1px solid black"
                                    onClick={() => setShowPassword(!showPassword)}
                                    size="lg"
                                />
                            </InputRightAddon>
                        </InputGroup>
                    </FormControl>
                <Box display={"inline-flex"}>
                    <button className="stylish-button" type="submit">
                        signup {loading ? <Spinner /> : null}
                    </button>
                <Link to='/login'><button class="already-button" style={{ marginTop: "20px" }}>
                        Already have an account
                    </button></Link>
                    </Box>
                </form>
        </>
        </div>
    );
};

export default SignupPage;