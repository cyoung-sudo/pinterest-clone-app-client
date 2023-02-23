import { render, screen, cleanup, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
// Routing
import { BrowserRouter } from "react-router-dom";
// Redux
import { Provider } from "react-redux";
import store from "../../../redux/store";
// Components
import Navbar from "../Navbar";
// APIs
import * as authAPI from "../../../apis/authAPI";
// Data
import { testUser } from "../../../data/userTestData";

// Mocks
jest.mock("../../../apis/authAPI");

describe("----- <Navbar/> -----", () => {
  afterEach(() => {
    cleanup();
  });

  //----- Test 1 -----
  it("correctly logs-out user", async () => {
    // Mock API functions
    authAPI.logout.mockResolvedValue({
      data: { success: true }
    });
  
    render(
      <Provider store={ store }>
        <BrowserRouter>
          <Navbar authUser={ testUser }/>
        </BrowserRouter>
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText("Logout", { selector: "button" })).toBeInTheDocument();
    });

    userEvent.click(screen.getByText("Logout", { selector: "button" }));

    await waitFor(() => {
      expect(authAPI.logout).toHaveBeenCalled();
    });
  });
});
