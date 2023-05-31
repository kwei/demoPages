"use client"

import React from 'react';

export interface LoadingPropsType {
  size?: LOADING_SIZE;
  type?: LOADING_TYPE;
  color?: LOADING_COLOR;
  className?: string;
}

export enum LOADING_SIZE {
  DEFAULT = 'w-6 h-6',
  LARGE = 'w-7.5 h-7.5'
}

export enum LOADING_TYPE {
  DEFAULT = 'circle',
}

export enum LOADING_COLOR {
  DEFAULT = 'border-white border-t-transparent ',
}

export const LoadingIcon: React.FC<LoadingPropsType> = (
  props: LoadingPropsType
) => {
  const {
    size = LOADING_SIZE.DEFAULT,
    type = LOADING_TYPE.DEFAULT,
    color = LOADING_COLOR.DEFAULT,
    className = '',
  } = props;
  switch (type) {
    case LOADING_TYPE.DEFAULT:
      return (
        <svg
          className={`animate-spin ${size} rounded-full border-2 ${color} ${className}`}
          viewBox="0 0 24 24"
        ></svg>
      );
  }
};
