import { render, screen, cleanup, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
// Routing
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import routesConfig from "../../../routing/routesConfig";
// Redux
import { Provider } from "react-redux";
import store from "../../../redux/store";
// APIs
import * as authAPI from "../../../apis/authAPI";

// Data
import { testUser } from "../../../data/userTestData";

// Mocks
jest.mock("../../../apis/authAPI");
window.scrollTo = jest.fn();
// Ignore redirect
const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
   useNavigate: () => mockedUsedNavigate, // Return an empty jest function to test whether it was called or not...I'm not depending on the results so no need to put in a return value
 }));

describe("----- <Login/> -----", () => {
  afterEach(() => {
    cleanup();
  });

  //----- Test 1 -----
  // **issues with navigation to profile page
  it("correctly submits form data", async () => {
    // Mock API functions
    authAPI.getUser.mockResolvedValue({
      data: { 
        success: false,
        message: "Test message"
      }
    });

    authAPI.login.mockResolvedValue({
      data: { 
        success: true,
        user: testUser
      }
    });

    const router = createMemoryRouter(routesConfig, {
      initialEntries: ["/login"]
    });
  
    render(
      <Provider store={ store }>
        <RouterProvider router={ router } />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByTestId("authForm-username")).toBeInTheDocument();
      expect(screen.getByTestId("authForm-password")).toBeInTheDocument();
      expect(screen.getByText("Submit", { selector: "input" })).toBeInTheDocument();
    });

    userEvent.type(screen.getByTestId("authForm-username"), "User1");
    userEvent.type(screen.getByTestId("authForm-password"), "Pass1");
    userEvent.click(screen.getByText("Submit", { selector: "input" }));

    await waitFor(() => {
      expect(authAPI.login).toHaveBeenCalledWith("User1", "Pass1");
      expect(screen.getByText("Successfully logged-in")).toBeInTheDocument();
    });
  });
});
