import { useState } from "react";
import Button from "../components/Button";
import { Heading } from "../components/Heading";
import InputBox from "../components/InputBox";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

export default function SendMoney() {   
    const [amount, setAmount] = useState();
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const name = searchParams.get("name");

    return <div className="flex  justify-center items-center h-screen bg-gray-100">
            <div className="flex flex-col justify-center items-center w-xl h-90 bg-white rounded-lg shadow-lg p-4">
                <div>
                <Heading label="Send Money" />
                <div className="flex items-center mt-10 mb-2" >
                    <div className="flex justify-center items-center rounded-full bg-gray-500 h-10 mr-2 w-10 text-2xl" >{name?.charAt(0).toUpperCase() || ''}</div>
                    <div className=" font-bold text-xl"> {name}</div>
                </div>
                <InputBox placeholder="123" label="Amount (in Rs)" type="number"
                    onChange={(e)=> {setAmount(e.target.value)}}
                />
                <Button 
                    onPress={ async ()=>{
                        try {
                            await axios.post('http://localhost:5000/api/v1/account/transfer',{
                                to: id,
                                amount: Number(amount)
                            },{
                                headers: {
                                    Authorization: `Bearer ${localStorage.getItem("token")}`
                                  }
                            })
                            console.log("Transfer successful")
                            alert("Transfer successful")
                            
                        } catch (error) {
                            console.error("Error during transfer:", error);
                            alert("transfer failed")
                        }
                    }}
                    label="Initiate Transfer" />
                </div>
            </div>
        </div>
    
}