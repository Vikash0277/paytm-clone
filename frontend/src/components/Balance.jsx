import axios from 'axios';
import { useState } from 'react';

import { useEffect } from 'react';

export default function Balance() {
    const [value, setValue] = useState(0);
    useEffect( () => {
        const fetchBaclance = async () => {
            try {
                const response =await axios.get("http://localhost:5000/api/v1/account/balance")
                 setValue(response.data.balance);
                 console.log("Balance fetched successfully:", response.data.balance);  
             } catch (error) {
                 console.error("Error fetching balance:", error);
             }
        }

        fetchBaclance();
    },[value]);

    return <div>
        <div className='my-4'>
            Your Balance is {value}
        </div>
    </div>
}
 