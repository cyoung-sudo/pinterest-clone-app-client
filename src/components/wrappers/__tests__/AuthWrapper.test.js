import { render, screen, cleanup, waitFor } from "@testing-library/react";
// Routing
import { BrowserRouter } from "react-router-dom";
// Redux
import { Provider } from "react-redux";
import store from "../../../redux/store";
// Components
import AuthWrapper from "../AuthWrapper";
// APIs
import * as authAPI from "../../../apis/authAPI";
// Data
import { testUser } from "../../../data/userTestData";

// Mocks
jest.mock("../../../apis/authAPI");

describe("----- <AuthWrapper/> -----", () => {
  afterEach(() => {
    cleanup();
  });

  //----- Test 1 -----
  it("correctly handles valid authentication", async () => {
    // Mock API functions
    authAPI.getUser.mockResolvedValue({
      data: {
        success: true,
        user: testUser
      }
    });

    render(
      <Provider store={ store }>
        <BrowserRouter>
          <AuthWrapper>
            <div>Passed</div>
          </AuthWrapper>
        </BrowserRouter>
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText("Passed")).toBeInTheDocument();
    });
  });

  //----- Test 2 -----
  it("correctly handles invalid authentication", async () => {
    // Mock API functions
    authAPI.getUser.mockResolvedValue({
      data: { success: false }
    });

    render(
      <Provider store={ store }>
        <BrowserRouter>
          <AuthWrapper>
            <div>Passed</div>
          </AuthWrapper>
        </BrowserRouter>
      </Provider>
    );

    await waitFor(() => {
      expect(screen.queryByText("Passed")).not.toBeInTheDocument();
    });
  });
});
