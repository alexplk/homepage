import { memo } from "react";
import { Card, ListGroup, ListGroupItem } from "react-bootstrap";
import Skeleton from './Skeleton';

export type TileBody<Data> = (props: { data: Data }) => React.ReactElement;

/**
 * Union of all tile data types.
 */
export type TileData =
  | Text
  | BigNumber
  | Definition
  | QuerySummary
  | EntitySummary
  ;

let _samples: { [key: string]: TileData[] } = {
  'text': [
    {
      type: 'Text',
      text: 'Simple text tile'
    },
  ],
  'cl': [
    {
      type: 'QuerySummary',
      title: 'Corporate Lending',
      previewNumber: '42 M',
      previewTitle: 'Total Exposure',
      alternatives: ['corporate lending total exposure',
        'corporate lending total exposure by industry']
    },
    {
      type: 'Definition',
      title: 'Corporate Lending',
      subtitle: 'Portfolio',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    },
    {
      type: 'Definition',
      title: 'CL',
      subtitle: 'Attribute',
      text: 'Risk Domicile, Legal Domicile, Ultimate Parent Risk Domicile...',
      link: '8 dimensions in Credit Risk IB'
    },
    {
      type: 'BigNumber',
      number: '42 M',
      title: 'Corporate Lending Total Exposure'
    },
  ],
  'google': [
    {
      type: 'EntitySummary',
      title: 'Google LLC',
      previewNumber: '42 M',
      previewTitle: 'Exposure',
      parentTitle: 'Alphabet Inc.',
      parentNumber: '100 M',
      parentLink: 'Ultimate Parent',
      alternatives: ['Google Inc.', 'Google UK', 'Google'],
      link: 'See all 22'
    },
  ],

  'barclays': [
    {
      type: 'EntitySummary',
      title: 'Barclays Group',
      previewNumber: '123 M',
      previewTitle: 'Exposure',
      alternatives: ['Barclays', 'Barclays US', 'Barclays UK'],
      link: 'See all 8'
    },
    {
      type: 'EntitySummary',
      title: '',
      previewNumber: '',
      previewTitle: '',
      alternatives: ['Barclays', 'Barclays US', 'Barclays UK'],
      link: 'See all 8'
    },
  ]
};

_samples['all'] = Object.entries(_samples).flatMap(([, samples]) => samples);

export const samples = _samples;

/**
 * Root component for all tile types.
 */
export const Tile = memo(({ data }: { data: TileData }) => {
  return <div className="py-1"><TileSwitch data={data} /></div>
});

const TileSwitch = ({ data }: { data: TileData }) => {
  switch (data.type) {
    case 'Text': return <TextTile data={data} />
    case 'BigNumber': return <BigNumberTile data={data} />
    case 'Definition': return <DefinitionTile data={data} />
    case 'QuerySummary': return <QuerySummaryTile data={data} />
    case 'EntitySummary': return <EntitySummaryTile data={data} />
    default: return <UnsupportedTile data={data} />
  }
};

export const UnsupportedTile = memo<TileBody<TileData>>(({ data }) => {
  return (
    <Card bg="danger" text="white">
      <Card.Body>Unsupported tile type: {data.type}</Card.Body>
    </Card>
  );
});


export interface Text {
  type: 'Text';
  text: string;
}

export const TextTile = memo<TileBody<Text>>(({ data }) => {
  return (
    <Card>
      <Card.Body>
        <Card.Text>{data.text}</Card.Text>
      </Card.Body>
    </Card>
  );
});


export interface BigNumber {
  type: 'BigNumber';
  number: string;
  title: string;
}

export const BigNumberTile = memo<TileBody<BigNumber>>(({ data }) => {
  return (
    <Card><Card.Body className="clearfix">
      <div className="display-4">{data.number}</div>
      <Card.Title>{data.title}</Card.Title>
    </Card.Body></Card>
  );
});


export interface Definition {
  type: 'Definition';
  title: string;
  subtitle: string;
  text: string;
  link?: string;
}

export const DefinitionTile = memo<TileBody<Definition>>(({ data }) => {
  return (
    <Card>
      <Card.Body>
        <Card.Title>{data.title}</Card.Title>
        <Card.Subtitle>{data.subtitle}</Card.Subtitle>
        <Card.Text>{data.text}</Card.Text>
        <Card.Link>{data.link || 'See more'} ↗</Card.Link>
        <Card.Link>Use as filter</Card.Link>
      </Card.Body>
    </Card>
  );
});





export interface QuerySummary {
  type: 'QuerySummary';
  title: string;
  previewNumber: string;
  previewTitle: string;
  alternatives: string[];
}

export const QuerySummaryTile = memo<TileBody<QuerySummary>>(({ data }) => {
  return (
    <Card>
      <Card.Body className="clearfix">
        <Card.Title className="display-6">{data.title}</Card.Title>
        <div className="display-4">{data.previewNumber}</div>
        <Card.Title>{data.previewTitle}</Card.Title>
      </Card.Body>
      <ListGroup variant="flush">
        {data.alternatives.map((x, i) => <ListGroupItem key={i}>{x}</ListGroupItem>)}
      </ListGroup>
    </Card>
  );
});


export interface EntitySummary {
  type: 'EntitySummary';
  title: string;
  previewNumber: string;
  previewTitle: string;
  parentTitle?: string;
  parentNumber?: string;
  parentLink?: string;
  alternatives: string[];
  link?: string;
}


export const EntitySummaryTile = memo<TileBody<EntitySummary>>(({ data }) => {
  return (
    <Card>
      <Card.Body className="clearfix">
        <Card.Title className="display-6">{data.title || <Skeleton format="medium"/>}</Card.Title>
        <div className="display-4">{data.previewNumber || <Skeleton format="1000"/>}</div>
        <Card.Title>{data.previewTitle || <Skeleton format="medium"/>}</Card.Title>
      </Card.Body>
      {(data.parentTitle || data.parentNumber) &&
        <Card.Body className="border-top">
          <Card.Title>{data.parentTitle || <Skeleton format="medium"/>}</Card.Title>
          <div className="display-6">{data.parentNumber || <Skeleton format="1000"/>}</div>
          <Card.Link>{data.parentLink || <Skeleton format="long"/>} ↗</Card.Link>
        </Card.Body>
      }
      <ListGroup variant="flush">
        {data.alternatives.map((x, i) => <ListGroupItem key={i}>{x}</ListGroupItem>)}
        <ListGroupItem>
          <Card.Link>{data.link} ↗</Card.Link>
        </ListGroupItem>
      </ListGroup>
    </Card>
  );
});

