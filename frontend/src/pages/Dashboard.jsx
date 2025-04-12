import Appbar from "../components/AppBar"
import Balance from "../components/Balance"
import Users from "../components/Users"
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

export default function Dashboard() {
    return <div className="">
        <Appbar  />
        <div className="m-4">
            
            <div>
                <Balance  />
                <Users/>
            </div>
        </div>
    </div>
}

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem("token");
    return token ? children : <Navigate to="/signin" />;
};

ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired,
};

export { ProtectedRoute };
  