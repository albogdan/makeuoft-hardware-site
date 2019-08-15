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
  
export default class ItemSelector extends PureComponent {
    constructor(props) {
        super(props);
        this.state = { selectedOption: null, isClearable: true}
    }

    handleChange = selectedOption => {
        this.setState({ selectedOption });
    };

    // onClick = event => {
    //     this.handleChange() ;
    //     this.props.onChange;
    //  };

    render() {
        let { selectedOption } = this.state;
        let { type, options, formatGroupLabel, defaultValue, onChange } = this.props;
        
        let style, placeholder, isClearable;
        if (type === "quantity") {
            style = styles.quantity; 
            placeholder = "";
            isClearable = false;
        } else if (type === "team") {
            style = styles.team; 
            placeholder = "Select...";
            isClearable = true;
        } else  {
            style = styles.component;
            placeholder = "Select...";
            isClearable = true;
        }
        return (
            <Select
            value={selectedOption}
            onChange={this.handleChange()}
            className={style}
            styles={colourStyles}

            options={options}
            formatGroupLabel={formatGroupLabel}
            defaultValue={defaultValue}
            placeholder={placeholder}
            isClearable={isClearable}
            />
        );
    }
}
