import { ReactNode } from "react";

const Container = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-full h-screen flex flex-col max-w-7xl m-auto">
      {children}
    </div>
  );
};

export default Container;
