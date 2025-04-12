import ButtomWarning from "../components/BottomWarning";
import Button from "../components/Button";
import { Heading } from "../components/Heading";
import InputBox from "../components/InputBox";
import SubHeading from "../components/SubHeading";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode} from "jwt-decode";

export default function Signin() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSignin = async () => {
        try {
            const response = await axios.post("http://localhost:5000/api/v1/user/signin", {
                username,
                password,
            });
            console.log("Signin successful:", response.data);
            localStorage.setItem("token", response.data.token);
            const token = localStorage.getItem("token");
            const decoded = jwtDecode(token);
            console.log("Decoded token:", decoded);
            const firstName = decoded.firstName;
            console.log("First Name:", firstName);
            navigate("/dashboard");
        } catch (error) {
            console.error("Error during signin:", error);
        }
    };
    return <div className="flex  justify-center items-center h-screen bg-gray-100">
        <div className=" bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-96">
            <Heading label="Sign In" />
            <SubHeading label="Enter the information to sign in" />
            <InputBox label={"Email"} type="email" placeholder="Enter your email"
                onChange={(e) => setUsername(e.target.value)}
            />
            <InputBox label="Password" type="password" placeholder="Enter your password" 
                onChange={(e) => setPassword(e.target.value)}
            />
            <Button label="Sign In" onPress={handleSignin}/>
            <ButtomWarning label="Don't have an account?" bottomText="Sign Up" to="/signup" />
        </div>
    </div>
}