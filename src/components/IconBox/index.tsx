import * as React from "react";
import Link from 'next/link';

export interface IconBoxProps {
  onClick?: ()=>void;
  href?: string;
  disabled: boolean;
}

const IconBox: React.SFC<IconBoxProps> = ({children, href, disabled, onClick}) => {

  const _drawChild = () => {
    const _onClick = onClick || (()=>{});
    return (
      <div
        className="cursor-pointer bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
        onClick={_onClick}>
        {children}
      </div>
    )
  }

  const _wrappedLink = React.useMemo(() => {
    if(href) {
      return (
        <Link href={href} passHref>
          {_drawChild()}
        </Link>
      );
    }
    else {
      return (
        <>
          {_drawChild()}
        </>
      );
    }
  }, [disabled]);

  if(!disabled) {
    return _wrappedLink
  }
  else {
    return (
      <div className="opacity-50 cursor-not-allowed bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
        {children}
      </div>
    )
  }
}

export default IconBox;
