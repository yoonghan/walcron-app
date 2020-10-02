import * as React from "react";
import Link from 'next/link';

export interface IconBoxProps {
  href: string;
}


const IconBox: React.SFC<IconBoxProps> = ({children, href}) => {
  return (
     <Link href={href} passHref>
      <div className="cursor-pointer bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
        {children}
      </div>
    </Link>
  );
}

export default IconBox;
