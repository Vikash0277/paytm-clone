import { Heading } from "../components/Heading"
import SubHeading from "../components/SubHeading"
import InputBox from "../components/InputBox"
import Button from "../components/Button"
import ButtomWarning from "../components/BottomWarning"
import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export default function Signup() {
    const Navigate = useNavigate();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSignup = async () => {
        try {
            const response = await axios.post("http://localhost:5000/api/v1/user/signup", {
                firstName,
                lastName,
                username,
                password,
            });
            localStorage.setItem("token", response.data.token);
            
            console.log("Signup successful:", response.data);
            Navigate("/dashboard");
        } catch (error) {
            console.error("Error during signup:", error);
        }
    };

    return <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-96">
                <div>
                    <Heading label="Sign Up" />
                    <SubHeading label="Enter the information to create account" />
                    <InputBox label={"First Name"} type="text" placeholder="Enter your first name" 
                        onChange={(e) => setFirstName(e.target.value)} 
                    />
                    <InputBox label="Last Name" type="text" placeholder="Enter your last name" 
                        onChange={(e) => setLastName(e.target.value)}
                    />
                    <InputBox label="Email" type="email" placeholder="Enter your email" 
                        onChange={(e) => setUsername(e.target.value)}
                    />  
                    <InputBox label="Password" type="password" placeholder="Enter your password" 
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button label="Sign Up" onPress={handleSignup} />
                    <ButtomWarning label="Already have an account?" bottomText="Sign In" to="/signin" />
                </div>
            </div>
        </div>
    
}