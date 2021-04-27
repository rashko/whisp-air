import { render, screen, fireEvent } from "@testing-library/react";
import IncidentsFilter from "./IncidentsFilter";

test("should render without errors", () => {
  render(<IncidentsFilter />);
  const SearchButton = screen.getByText(/Search/);
  const ClearButton = screen.getByText(/Clear/);
  expect(SearchButton).toBeInTheDocument();
  expect(ClearButton).toBeInTheDocument();
});

const setup = (label) => {
  const utils = render(<IncidentsFilter handleCallback={() => {}} />);
  const input = utils.getByLabelText(label);
  return {
    input,
    ...utils,
  };
};


test("click on clear should set free text value to be empty", async () => {
  const { input } = setup("free-text");
  const ClearButton = screen.getByText(/Clear/);

  fireEvent.change(input, { target: { value: "evo" } });
  expect(input.value).toBe("evo");

  await fireEvent.click(ClearButton);

  expect(input.value).toBe("");
});
