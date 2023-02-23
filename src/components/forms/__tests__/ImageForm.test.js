import { render, screen, cleanup, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
// Components
import ImageForm from "../ImageForm";

describe("----- <ImageForm/> -----", () => {
  afterEach(() => {
    cleanup();
  });

  //----- Test 1 -----
  it("correctly submits form data", async () => {
    // Mock props
    const mockSetUrl = jest.fn();
    const mockHandleSubmit = jest.fn(e => e.preventDefault());

    render(
      <ImageForm
        setUrl={ mockSetUrl }
        handleSubmit={ mockHandleSubmit }/>
    );

    await waitFor(() => {
      expect(screen.getByTestId("imageForm-url")).toBeInTheDocument();
      expect(screen.getByText("Submit", { selector: "input" })).toBeInTheDocument();
    });

    userEvent.type(screen.getByTestId("imageForm-url"), "Url1");
    userEvent.click(screen.getByText("Submit", { selector: "input" }));

    await waitFor(() => {
      expect(mockSetUrl).toHaveBeenCalledWith("Url1");
      expect(mockHandleSubmit).toHaveBeenCalled();
    });
  });
});
