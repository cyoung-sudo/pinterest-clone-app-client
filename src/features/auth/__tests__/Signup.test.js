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
import * as userAPI from "../../../apis/userAPI";

// Data
import { testUser } from "../../../data/userTestData";

// Mocks
jest.mock("../../../apis/authAPI");
jest.mock("../../../apis/userAPI");
window.scrollTo = jest.fn();

describe("----- <Signup/> -----", () => {
  afterEach(() => {
    cleanup();
  });

  //----- Test 1 -----
  it("correctly submits form data", async () => {
    // Mock API functions
    authAPI.getUser.mockResolvedValue({
      data: { 
        success: false,
        message: "Test message"
      }
    });

    userAPI.create.mockResolvedValue({
      data: { 
        success: true,
        user: testUser
      }
    });

    const router = createMemoryRouter(routesConfig, {
      initialEntries: ["/signup"]
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
      expect(userAPI.create).toHaveBeenCalledWith("User1", "Pass1");
      expect(screen.getByText("Successfully signed-up")).toBeInTheDocument();
    });
  });
});
