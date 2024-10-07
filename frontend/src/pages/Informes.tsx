import { ReactNode, useLayoutEffect } from "react";
import "./Informes.css";

type Props = {
  children?: ReactNode;
};

export default function Informe({ children }: Props) {
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="informe-page">
      <div className="background-image" />
      <div className="informe-container">
        <div className="titulo">
          <h1>INFORMES</h1>
          {children}
          <hr />
        </div>
      </div>
    </div>
  );
}
