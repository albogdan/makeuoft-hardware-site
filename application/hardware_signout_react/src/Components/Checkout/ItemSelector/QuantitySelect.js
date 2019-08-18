
import React, { PureComponent } from 'react';
import styles from './itemSelector.module.scss';
import Select from 'react-select';

const colourStyles = {
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
  
export default class BasketItem extends PureComponent {
    constructor(props) {
        super(props);
        this.state = { selectedOption: null, isClearable: true}
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange = selectedOption => {
        this.setState({ selectedOption });
    };
   
    render() {
        let {selectQuantity, quantity, fieldIndex, reset } = this.props
        let { selectedOption } = this.state;
        
        let options = [];
        for (let i = 1; i < quantity+1; i++) {
            options.push({value: i, label: i});
        }

        return (
            <Select
                value={selectedOption}
                onChange={this.handleChange}
                onBlur={(index, quantity) => selectQuantity(fieldIndex, selectedOption)}
                className={styles.quantity}
                styles={colourStyles}
                options={options}
                placeholder={""}
            />
        );
    }
}
