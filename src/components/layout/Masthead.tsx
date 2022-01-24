import React from 'react';

import './Masthead.css';

interface Props {
    title?: string

}
const Masthead: React.FC<Props> = (props) => {
    return (
        <div className='masthead'>
            <h1>{props.title}</h1>
        </div>
     );
}

export default Masthead;