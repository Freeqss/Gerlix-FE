import { ReactNode } from "react";

const Harness = ({ children }: { children: ReactNode }) => {
  return <div className="w-screen h-full flex flex-col items-center">{children}</div>;
};

export default Harness;
