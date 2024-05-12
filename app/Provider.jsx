import React from "react";
import Header from "./_components/Header";

const Provider = ({ children }) => {
  return (
    <div>
      {" "}
      <Header />{" "}
      <div className="flex flex-col items-center mt-[8rem]">{children}</div>
    </div>
  );
};

export default Provider;
