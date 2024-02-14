import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Todo from "./Todo";

it("renders without crashing", function () {
    render(<Todo />);
});

it("matches snapshot", function () {
    const {asFragment} = render(<Todo />)
    expect(asFragment()).toMatchSnapshot();
})

it("matches snapshot when editing", function() {
    const {asFragment, getByText} = render(<Todo />)
    const editButton = getByText("Edit");
    fireEvent.click(editButton);
    expect(asFragment()).toMatchSnapshot();
})

it("runs the update function on form submit", function() {
    const editMock = jest.fn();
    const {getByText} = render(<Todo edit={editMock}/>);
    const editButton = getByText("Edit");
    fireEvent.click(editButton);
    const updateButton = getByText("Update!");
    fireEvent.click(updateButton);
    expect(editMock).toHaveBeenCalled();
})

it("runs the delete function on button click", function() {
    const deleteMock = jest.fn();
    const {getByText} = render(<Todo remove={deleteMock}/>);
    const deleteButton = getByText("X");
    fireEvent.click(deleteButton);
    expect(deleteMock).toHaveBeenCalled();
})