import { render, screen, cleanup, waitFor } from "@testing-library/react";
// Routing
import { BrowserRouter } from "react-router-dom";
// Components
import UsersDisplay from "../UsersDisplay";
// Data
import { testUsers, testImageCount } from "../../../data/userTestData";

describe("----- <UsersDisplay/> -----", () => {
  afterEach(() => {
    cleanup();
  });

  //----- Test 1 -----
  it("correctly displays all users", async () => {
    render(
      <BrowserRouter>
        <UsersDisplay
          users={ testUsers }
          imageCount={ testImageCount }/>
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getAllByRole("listitem")).toHaveLength(3);
      expect(screen.getByText(testUsers[0].username)).toBeInTheDocument();
      expect(screen.getByText(testUsers[1].username)).toBeInTheDocument();
      expect(screen.getByText(testUsers[2].username)).toBeInTheDocument();
    });
  });
});
