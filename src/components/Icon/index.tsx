import * as React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

/** Using fontawesome, but layered it.
    If test with page speed, there is shifting problem. To fix it added width(not in document) **/

const Icon: React.SFC<any> = (props) => {
  return <FontAwesomeIcon {...props} width="16"/>
}

export default Icon;
