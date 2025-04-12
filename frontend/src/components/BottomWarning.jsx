import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function ButtomWarning({ label , bottomText, to }) {
    return <div className='flex justify-center '>
        <div >
            {label}
            <Link to={to} className='text-center text-gray-500 text-sm pt-6 underline'>
                {bottomText}
            </Link>
        </div>
        
    </div>
}

ButtomWarning.propTypes = {
    label: PropTypes.string.isRequired,
    bottomText: PropTypes.string,
    to: PropTypes.string,
};