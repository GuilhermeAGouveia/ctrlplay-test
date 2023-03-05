import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import Checkbox from "../Checkbox";

describe("Testando Checkbox", () => {
  test("Verificando integridade de botão", () => {
    render(<Checkbox label="Jenny" />);
    expect(screen.getByText("Jenny")).toBeInTheDocument();
  });

  test("Verificando estado inicial", () => {
    render(<Checkbox label="Jenny" />);
    expect(screen.getByTestId("checkbox")).not.toBeChecked();
  });
});
