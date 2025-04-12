
import PropTypes from 'prop-types';

export default function Button({ label , onPress}) {
    return (
        <div className='flex justify-center '>
            <button onClick={onPress} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full">
                {label}
            </button>
        </div>
    );
}

Button.propTypes = {
    label: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired,
};