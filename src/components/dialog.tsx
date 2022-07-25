import { ReactNode } from "react";

interface DialogProps {
  isOpen: boolean;
  children: ReactNode;
}

const Dialog = ({ isOpen, children }: DialogProps) => {
  if (isOpen) {
    return (
      <div className="fixed flex place-content-center place-items-center inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
        <div className="relative p-5 w-96 shadow-md bg-white">{children}</div>
      </div>
    );
  } else {
    return <></>;
  }
};

export default Dialog;
