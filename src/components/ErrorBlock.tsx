import { FC, memo } from 'react';

import './error-block.scss';


interface IErrorBlock {
  error: String,
  className?: string
}

const ErrorBlock: FC<IErrorBlock> = ({error, className}) =>
  error ? <div className={`error-block ${className || ''}`}>{error}</div> : null

export default memo(ErrorBlock);
