import PropTypes from 'prop-types';



export function Heading({ label }) {
    return <div className=' flex justify-center  font-bold text-4xl pt-4'>
        {label}
    </div>;
}

Heading.propTypes = {
    label: PropTypes.string.isRequired,
};
