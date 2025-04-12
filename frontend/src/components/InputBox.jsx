import PropTypes from 'prop-types';

export default function InputBox({ label, placeholder, onChange , type}) {
    return (
        <div className="mb-4">
            {label && (
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    {label}
                </label>
            )}
            <input 
                
                onChange={onChange}
                placeholder={placeholder} 
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                type={type} 
            />
        </div>
    );
}

InputBox.propTypes = {
    label: PropTypes.string,
    placeholder: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    type: PropTypes.string.isRequired
};