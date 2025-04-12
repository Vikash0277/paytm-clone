import { jwtDecode } from 'jwt-decode';

export default function Appbar(){
    const token = localStorage.getItem('token');
    let firstName = "User"; // Default

    if (token) {
        try {
            const decoded = jwtDecode(token);
            firstName = decoded.firstName || "User";
        } catch (err) {
            console.error("Invalid token:", err);
        }
    }

    return <div >
        <div className="shadow flex justify-between items-center w-full h-16  boader-gray-300">
            <div className="ml-2">
                PayTM App
            </div>
            <div className="flex items-end ">
                <div className="pb-2 text-xl pr-2">
                    {firstName}
                </div>
                <div>
                    <div className=" bg-gray-500 h-10 w-10 rounded-full flex justify-center items-center"> 
                        {firstName?.charAt(0).toUpperCase() || ''}
                    </div>
                </div>
            </div>
        </div>
    </div>

}
