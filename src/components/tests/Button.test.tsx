import {render, screen} from "@testing-library/react";
import  "@testing-library/jest-dom";

import Checkbox from "../Checkbox";



it("Verificando integridade de botão", () => {


  render(<Checkbox label="Jenny"/>);
  
  expect(screen.getByText("Jenny")).toBeInTheDocument()})