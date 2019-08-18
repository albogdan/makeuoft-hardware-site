import React, { PureComponent } from 'react';
import styles from './itemSelector.module.scss';
import Select from 'react-select';
import { colourStyles } from './SelectorStyles'
  
// Note sure if we even need the id or not
const participants = [
    { id: '1', label: 'Lisa Li' },
    { id: '2', label: 'Alex Bogdan'},
    { id: '3', label: 'Martin Ffrench' },
    { id: '4', label: 'Raghav Skrivikjndkajathan' },
];

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
        let { type, options, formatGroupLabel, id } = this.props;
        
        let style = (type === "team") ? styles.team : styles.component;

        return (
            <Select
                value={selectedOption}
                onChange={this.handleChange}
                className={style}
                styles={colourStyles}
                id={id}

                options={participants}
                formatGroupLabel={formatGroupLabel}
            />
        );
    }
}
