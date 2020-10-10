import {SFC} from "react";
import Link from 'next/link';

export interface ButtonProps {
  onClick: ()=>void;
  disabled?: boolean
}

const Button: SFC<IconBoxProps> = ({children, onClick, disabled}) => {
  if(!disabled) {
    return (
      <button
        className="cursor-pointer bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
        onClick={onClick}
      >
        {children}
      </button>
    );
  }
  else {
    return (
      <button
        className="opacity-50 cursor-not-allowed bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
      >
        {children}
      </button>
    )
  }
}

export default Button;
