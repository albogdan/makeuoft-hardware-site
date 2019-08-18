export const colourStyles = {
    control: (styles, state) => ({ 
        ...styles, 
        backgroundColor: 'white', 
        borderColor: state.isFocused ? '#3386BA' :'#ccc',
        boxShadow: state.isFocused && `0 0 0 1px #3386BA`
     }),
    option: (provided, state) => ({
        ...provided,
        fontSize: 14,
    }),
    placeholder: () => ({ fontSize: 14 }),
    singleValue: () => ({ fontSize: 14 }),
    groupHeading: () => ({ fontSize: 12, padding: 12, paddingTop: 0, color: '#3386BA', fontWeight: 'bold' }),
};