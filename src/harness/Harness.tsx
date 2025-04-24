import { ReactNode } from "react";

const Harness = ({ children }: { children: ReactNode }) => {
  return <div className="flex h-full w-screen flex-col items-center">{children}</div>;
};

export default Harness;
