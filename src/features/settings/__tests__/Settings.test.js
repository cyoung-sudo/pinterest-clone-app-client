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
import * as imageAPI from "../../../apis/imageAPI";
// Data
import { testUser } from "../../../data/userTestData";

// Mocks
jest.mock("../../../apis/authAPI");
jest.mock("../../../apis/userAPI");
jest.mock("../../../apis/imageAPI");
window.scrollTo = jest.fn();
// Ignore redirect
const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
   useNavigate: () => mockedUsedNavigate, // Return an empty jest function to test whether it was called or not...I'm not depending on the results so no need to put in a return value
 }));

describe("----- <Settings/> -----", () => {
  afterEach(() => {
    cleanup();
  });

  //----- Test 1 -----
  it("correctly deletes account", async () => {
    // Mock API functions
    authAPI.getUser.mockResolvedValue({
      data: {
        success: true,
        user: testUser
      }
    });

    userAPI.getUser.mockResolvedValue({
      data: { 
        success: true,
        user: testUser
      }
    });

    imageAPI.deleteForUser.mockResolvedValue({
      data: { success: true }
    });

    userAPI.deleteUser.mockResolvedValue({
      data: { success: true }
    });

    authAPI.logout.mockResolvedValue({
      data: { success: true }
    });

    // Other mocks
    window.confirm = jest.fn(() => true);

    const router = createMemoryRouter(routesConfig, {
      initialEntries: ["/settings"],
    });
  
    render(
      <Provider store={ store }>
        <RouterProvider router={ router } />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText("Delete", { selector: "button" })).toBeInTheDocument();
    });

    userEvent.click(screen.getByText("Delete", { selector: "button" }));

    await waitFor(() => {
      expect(authAPI.getUser).toHaveBeenCalled();
      expect(imageAPI.deleteForUser).toHaveBeenCalledWith(testUser._id);
      expect(userAPI.deleteUser).toHaveBeenCalledWith(testUser._id);
      expect(authAPI.logout).toHaveBeenCalled();
      expect(screen.getByText("Successfully deleted account")).toBeInTheDocument();
    });
  });
});
