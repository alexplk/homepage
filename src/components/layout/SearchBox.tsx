import React, { PropsWithChildren, useCallback } from 'react';
import { Button, FormControl, InputGroup } from 'react-bootstrap';

import './SearchBox.css'

export interface SearchBoxProps {
    value?: string;
    onChange?: (value: string) => void;
}

export interface SearchBoxState {

}

export default function SearchBox(props: PropsWithChildren<SearchBoxProps>) {
    const onChange = useCallback((e) => {
        if (props.onChange) {
            props.onChange(e.target.value);
        }
    }, [props]);
    return (
        <InputGroup className='searchbox'>
            <FormControl
                placeholder="Search"
                aria-label="Search"
                aria-describedby="basic-addon2"
                value={props.value}
                onChange={onChange}
            />
            {
                React.Children.map(props.children, x => {
                    return <div style={{ padding: 0, margin: 0, marginLeft: '4px'}}>{x}</div>;
                })
            }
        </InputGroup>
    );
}
