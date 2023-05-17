import * as React from 'react';
import { ReactNode } from 'react';

interface CardPropsType {
  children: ReactNode;
  scale?: BLOCK_SCALES;
  className?: string;
}

export enum BLOCK_SCALES {
  LARGE,
  MEDIUM,
  SMALL
}

export const Card = React.memo((props: CardPropsType) => {
  const { scale = BLOCK_SCALES.LARGE, children, className = '' } = props;
  const defaultClass = 'relative flex rounded-5 p-5 ml:p-7.5 border border-solid border-mz-gray-df';
  const cardScale = {
    [BLOCK_SCALES.LARGE]: 'w-full',
    [BLOCK_SCALES.MEDIUM]: 'w-48/100',
    [BLOCK_SCALES.SMALL]: 'w-30/100'
  };

  return (
    <div className={`${defaultClass} ${cardScale[scale]} ${className}`}>
      {children}
    </div>
  );
});

Card.displayName = 'Card'
