import { ReactNode } from "react";

const Container = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-full flex flex-col max-w-7xl mx-auto">
      {children}
    </div>
  );
};

export default Container;
