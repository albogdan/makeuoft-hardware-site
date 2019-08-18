import React, { PureComponent } from 'react';
import styles from './itemSelector.module.scss';
import Select from 'react-select';
import { colourStyles } from './SelectorStyles'
  
export default class ItemSelector extends PureComponent {
    constructor(props) {
        super(props);
        this.state = { selectedOption: null, isClearable: true}
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange = selectedOption => {
        this.setState({ selectedOption });
    };

    render() {
        let { selectedOption } = this.state;
        let { type, options, formatGroupLabel, defaultValue, selectItem, fieldIndex } = this.props;
        
        let style = (type === "team") ? styles.team : styles.component;

        return (
            <Select
                value={selectedOption}
                onChange={this.handleChange}
                onBlur={(evt, index) => selectItem(selectedOption, fieldIndex)}
                className={style}
                styles={colourStyles}

                options={options}
                formatGroupLabel={formatGroupLabel}
                defaultValue={defaultValue}
            />
        );
    }
}
