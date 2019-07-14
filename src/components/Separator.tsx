import React from 'react';
import './Separator.scss';
import rightArrow from '../icons/right-arrow.svg';

interface Props {
  relocate: boolean
}

const Separator: React.FC<Props> = (props) => (
  <span className={`separator ${props.relocate && 'separator--relocate'}`} >
    <img src={rightArrow} />
  </span>
)

export default Separator;
