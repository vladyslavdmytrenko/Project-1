import React from 'react';

import loaderIcon from 'assets/images/loader.svg';

interface IProps {
  height?: string,
  width?: string,
}

const Loader = (props: IProps) => {
  return (
    <img
      src={loaderIcon}
      alt="loader"
      height={props.height}
      width={props.width}
    />
  );
};

export default Loader;
