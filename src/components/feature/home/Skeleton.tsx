
import { useMemo } from 'react';
import styles from  './Skeleton.module.css';

export type SkeletonFormat = '1' | '10' | '100' | '1000' | '100000' | 'short' | 'medium' | 'long' | '1line' | '2lines' | '4lines'

const formatMap: { [key: string]: string } = {
  'medium': 'medium title',
  'long': 'long placeholder format',
}

interface Props {
  format: SkeletonFormat;
}

function formatPlaceholder(format: SkeletonFormat) {
  const placeholder = formatMap[format] || format;
  return placeholder.replaceAll(/[^ ]/g, 'x');
}

export default function Skeleton(props: Props) {
  const placeholder = useMemo(() => formatPlaceholder(props.format), [props]);
  return <span className={styles.skeleton}>{placeholder}</span>;
}
