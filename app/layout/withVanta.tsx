import React from "react";
import VantaNetBackground from "~/components/withVantaNetBackground";
import Header from "~/components/header";

const WithVanta: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <VantaNetBackground>
      <Header />
      <div className="flex justify-center items-center w-screen h-screen">{children}</div>
    </VantaNetBackground>
  );
};

export default WithVanta;
