import React from "react";
interface FooterListprops {
    children :React.ReactNode
}


const FooterList:React.FC<FooterListprops> = ({children}) => {
    return (
        <div className="w-full flex flex-col ">
        {children}
        </div>
      );
}
 
export default FooterList;