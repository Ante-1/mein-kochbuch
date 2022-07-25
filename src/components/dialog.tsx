import { ReactNode } from "react";

interface DialogProps {
  isOpen: boolean;
  children: ReactNode;
  close: () => void;
}

const Dialog = ({ isOpen, children, close }: DialogProps) => {
  if (isOpen) {
    return (
      <div
        onClick={close}
        className="fixed flex place-content-center place-items-center inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
      >
        <div className="relative p-5 w-96 shadow-md bg-white">
          <button
            onClick={close}
            className="absolute m-2 right-0 top-0 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
          >
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
          {children}
        </div>
      </div>
    );
  } else {
    return <></>;
  }
};

export default Dialog;
