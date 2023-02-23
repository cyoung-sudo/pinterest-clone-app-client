import { render, screen, cleanup, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
// Routing
import { BrowserRouter } from "react-router-dom";
// Components
import ImagesDisplay from "../ImagesDisplay";
// Data
import { testFormatttedImages } from "../../../data/imageTestData";
import { testUser } from "../../../data/userTestData";

describe("----- <ImagesDisplay/> -----", () => {
  afterEach(() => {
    cleanup();
  });

  //----- Test 1 -----
  it("correctly displays all users", async () => {
    // Mock props
    const mockHandleDelete = jest.fn();

    render(
      <BrowserRouter>
        <ImagesDisplay
          images={ testFormatttedImages }
          user={ testUser }
          handleDelete={ mockHandleDelete }/>
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getAllByRole("img")).toHaveLength(3);
      expect(screen.getByAltText("img0")).toBeInTheDocument();
      expect(screen.getByAltText("img1")).toBeInTheDocument();
      expect(screen.getByAltText("img2")).toBeInTheDocument();
    });
  });

  //----- Test 2 -----
  it("correctly deletes images if authenticated user is owner", async () => {
    // Mock props
    const mockHandleDelete = jest.fn();

    render(
      <BrowserRouter>
        <ImagesDisplay
          images={ testFormatttedImages }
          user={ testUser }
          authUser={ testUser }
          handleDelete={ mockHandleDelete }/>
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getAllByText("Delete", { selector: "button" })).toHaveLength(3);
    });

    userEvent.click(screen.getAllByText("Delete", { selector: "button" })[0]);

    await waitFor(() => {
      expect(mockHandleDelete).toHaveBeenCalledWith(testFormatttedImages[0].imageId);
    });
  });
});
