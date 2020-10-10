import {SFC, useState, useEffect, useMemo} from 'react';

const Counter:SFC<any> = ({}) => {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    console.log('icounter');
  }, [counter]);

  return (<div>Message</div>)
}

export default Counter;
