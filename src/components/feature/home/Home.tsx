import React, { useMemo, useState } from 'react';
import { Button, Container } from 'react-bootstrap';

import Masthead from '../../layout/Masthead';
import SearchBox from '../../layout/SearchBox';

import { samples, Tile, TileData } from './vis';

import styles from './Home.module.css';

export interface HomeProps {

}

function findSample(query: string): [q: string, s: TileData[]] {
    const matches = Object.keys(samples).filter(x => x.toLowerCase().startsWith(query.toLowerCase()));
    if (matches.length === 1) {
        return [matches[0], samples[matches[0]]];
    }
    return [query, []];
}

export default function Home(props: HomeProps) {
    const [query, setQuery] = useState('all');
    const [q, smp] = useMemo(() => findSample(query), [query]);
    return (
        <div>
            <Masthead title='Homepage Preview'/>
            <div className={styles.searchPanel}>
                <Container>
                    <SearchBox value={q} onChange={setQuery}>
                        <Button>Lookup</Button>
                    </SearchBox>
                </Container>
            </div>
            <Container className="my-4">
                {smp.map((x, i) =>
                    <Tile key={i} data={x}></Tile>
                )}
            </Container>
        </div>
    );
}
