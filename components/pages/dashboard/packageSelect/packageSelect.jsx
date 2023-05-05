import React, {useState, useEffect, useId} from 'react';
import Select from 'react-select';
import classes from './packageSelect.module.scss';
import axios from "axios";
import {toast} from "react-toastify";

const customStyles = {
    control: (provided) => ({
        ...provided,
        width: '100%',
        border: '1px solid var(--color-dashboard-border)',
        borderRadius: '3px',
        padding: '.4rem .6rem',
    }),
    singleValue: (provided) => ({
        ...provided,
        color: 'var(--color-gray-444)',
    }),
    input: (provided) => ({
        ...provided,
        color: 'var(--color-gray-444)',
    }),
};

const PackageSelect = ({changed, defaultValue, labelSelect}) => {
    const [options, setOptions] = useState([]);

    useEffect(() => {
        // Here you would fetch the options from your API or database
        axios.get(`https://api.easydietkw.com/api/v1/client/bundles`)
            .then(res => {
                if (res?.data?.bundles.length > 0) {
                    const options = res.data.bundles.map(object => ({
                        value: object._id,
                        label: object.bundleName,
                    }));

                    setOptions(options);
                }
            })
            .catch(err => {
                toast.error(err.response?.date?.message || err.message)
            })
    }, []);

    const defaultOption = options.find(option => option.value === defaultValue);

    return (
        <div className={classes.SelectContainer}>
            <label style={{
                display: 'block',
                fontSize: '1.4rem',
                textTransform: 'uppercase',
                color: 'var(--color-black-text)',
                marginBottom: '.5rem'
            }}>{labelSelect}</label>
            <Select instanceId={useId()} styles={customStyles} value={defaultOption || ''} options={options} onChange={changed}/>
        </div>
    );
};

export default PackageSelect;
