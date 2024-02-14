import React from "react";
import { render, fireEvent } from "@testing-library/react";
import BoxList from "./BoxList";

function addBox(boxList, height = "10", width = "10", color = "purple") {
  const heightInput = boxList.getByLabelText("Height");
  const widthInput = boxList.getByLabelText("Width");
  const backgroundInput = boxList.getByLabelText("Background Color");
  fireEvent.change(backgroundInput, { target: { value: color } });
  fireEvent.change(widthInput, { target: { value: width } });
  fireEvent.change(heightInput, { target: { value: height } });
  const button = boxList.getByText("Add a new box!");
  fireEvent.click(button);
}

it("renders without crashing", function() {
  render(<BoxList />);
});

it("matches snapshot", function() {
  const { asFragment } = render(<BoxList />);
  expect(asFragment()).toMatchSnapshot();
});

it("can add a new box", function() {
  const boxList = render(<BoxList />);

  expect(boxList.queryByText("Remove Box")).not.toBeInTheDocument();
  addBox(boxList);
  const removeButton = boxList.getByText("Remove Box");
  expect(removeButton).toBeInTheDocument();
  expect(removeButton.previousSibling).toHaveStyle(`
    width: 10em;
    height: 10em;
    background-color: purple;
  `);
  expect(boxList.getAllByDisplayValue("")).toHaveLength(3);
});

it("can remove a box", function() {
  const boxList = render(<BoxList />);
  addBox(boxList);
  const removeButton = boxList.getByText("Remove Box");
  fireEvent.click(removeButton);
  expect(removeButton).not.toBeInTheDocument();
});
