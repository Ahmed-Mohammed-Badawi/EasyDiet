import {useId} from "react";
// SELECT
import Select from 'react-select';


// CUSTOM STYLE FOR SELECT
const customStyles = {
    control: (provided, state) => ({
        ...provided,
        fontFamily: 'var(--font-roboto)',
        fontSize: '1.5rem',
        padding: '.1rem 1rem',
        borderRadius: '0',
        width: '100%',
        border: `1px solid ${state.isFocused ? 'var(--color-main)' : 'var(--color-input-border)'}`,
        boxShadow: state.isFocused ? `0 0 0 1px var(--color-primary)` : 'initial',
        '&:hover': {
            borderColor: 'var(--color-input-border)',
        },
    }),
    option: (provided, state) => ({
        ...provided,
        color: state.isSelected ? 'var(--color-white)' : 'var(--color-gray-333)',
        backgroundColor: state.isSelected ? 'var(--color-primary)' : 'initial',
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: 'var(--color-select-background)',
        },
    }),
};

const options = [
    {value: 'Sell', label: 'Sell'},
    {value: 'Packages', label: 'Packages'},
    {value: 'Users', label: 'Users'},
];

const CustomSelect = () => {

    // CUSTOM ID
    const id = useId();

    return (
        <>
            <Select id={id} options={options} styles={customStyles} />
        </>
    )
}
export default CustomSelect