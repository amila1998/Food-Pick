import { useEffect, useRef } from "react";

interface Props {
  children: React.ReactNode;
  exceptionRef?: React.RefObject<HTMLElement>;
  onClick: () => void;
}

const ClickOutside: React.FC<Props> = ({ children, exceptionRef, onClick }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node) &&
        (!exceptionRef || (exceptionRef.current && !exceptionRef.current.contains(event.target as Node)))
      ) {
        onClick();
      }
    };

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [onClick]);

  return <div ref={wrapperRef}>{children}</div>;
};

export default ClickOutside;
