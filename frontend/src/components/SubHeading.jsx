
import PropTypes from 'prop-types';


export default function SubHeading({ label }) {
    return (
        <div className='text-center text-gray-500 mb-4'>
            {label}
        </div>
    );
    
}

SubHeading.propTypes = {
    label: PropTypes.string.isRequired,
    BottomText: PropTypes.string,
    to: PropTypes.string,
};
