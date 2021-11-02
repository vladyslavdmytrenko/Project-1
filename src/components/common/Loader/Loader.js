import React from 'react';

import loaderIcon from 'assets/images/loader.svg';

const Loader = (props) => {
  return (
    <img
      src={loaderIcon}
      alt="loader"
      height={props.width}
      width={props.width}
    />
  );
};

export default Loader;
