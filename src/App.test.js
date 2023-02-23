import { render, cleanup, waitFor } from "@testing-library/react";
// Routing
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import routesConfig from "./routing/routesConfig";
// Redux
import { Provider } from "react-redux";
import store from "./redux/store";
// APIs
import * as authAPI from "./apis/authAPI";

// Mocks
jest.mock("./apis/authAPI");

describe("----- <App/> -----", () => {
  afterEach(() => {
    cleanup();
  });

  //----- Test 1 -----
  it("correctly retrieves data on load", async () => {
    // Mock API functions
    authAPI.getUser.mockResolvedValue({
      data: { 
        success: false,
        message: "Test message"
      }
    });

    const router = createMemoryRouter(routesConfig, {
      initialEntries: ["/"]
    });
  
    render(
      <Provider store={ store }>
        <RouterProvider router={ router } />
      </Provider>
    );

    await waitFor(() => {
      expect(authAPI.getUser).toHaveBeenCalled();
    });
  });
});
