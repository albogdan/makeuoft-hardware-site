import React, { PureComponent } from 'react';
import styles from './itemSelector.module.scss';
import Select from 'react-select';


const component = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
];

const quantity = [
    { value: 1, label: 1},
    { value: 2, label: 2},
    { value: 3, label: 3},
];
  
export default class ItemSelector extends PureComponent {
    constructor(props) {
        super(props);
        this.state = { selectedOption: null }
    }

    handleChange = selectedOption => {
        this.setState({ selectedOption });
        console.log(`Option selected:`, selectedOption);
    };
    render() {
        const { selectedOption } = this.state;
        const { type } = this.props;
        let option, style;
        if (type === "component") {
            option = component;
            style = styles.component;
        } else if (type === "quantity") {
            option = quantity;
            style = styles.quantity;
        }

        return (
            <Select
            value={selectedOption}
            onChange={this.handleChange}
            options={option}
            className={style}
            />
        );
    }
}
