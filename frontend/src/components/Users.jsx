import InputBox from "./InputBox";
import Button from "./Button";
import { useEffect, useState } from "react";
import axios from "axios";
import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom";



export default function Users() {
 

    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/v1/user/bulk?filter=' + filter);
                setUsers(response.data.user);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        fetchUsers();
    }, [filter]);

    return (
        <div className="">
            <div>Users</div>
            <div className="">
                <InputBox 
                    type="text"
                    placeholder="Search users" 
                    value={filter} 
                    onChange={(e) => setFilter(e.target.value)} 
                />
            </div>
            <div>
                {users.map((user) => (
                    <User key={user._id} user={user} />
                ))}
            </div>
        </div>
    );
}


function User({ user }) {
    const navigate =  useNavigate();

    return (
        <div className="flex h-10 m-2 border-solid border-amber-100 w-full justify-between items-center">
            <div className="flex"> 
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-700 font-bold mx-2">
                    {user.firstName?.charAt(0).toUpperCase() || ''}
                </div>
                <div className="flex items-center" key={user._id}>
                    {user.firstName} {user.lastName}
                </div>
            </div>
            <div className="h-4">
                <Button 
                    label="Send Money" 
                    onPress={() =>
                        navigate(`/send?id=${user._id}&name=${user.firstName}`)
                    } 
                />
            </div>
        </div>
    );
}

User.propTypes = {
    user: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        firstName: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired,
    }).isRequired,
}