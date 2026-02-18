import React, { useEffect, useRef } from "react";

interface Props {
  onClose: () => void;
  children: React.ReactNode;
}

const OutsideCloseWrapper: React.FC<Props> = ({ onClose, children }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        onClose(); // close modal
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  return (
    <div
      ref={containerRef}
      className="contents"
    // className="bg-white rounded-[20px] max-w-[756px] w-full mx-auto z-[10] relative h-full"
    >
      {children}
    </div>
  );
};

export default OutsideCloseWrapper;
