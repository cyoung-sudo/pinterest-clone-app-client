import { render, cleanup, waitFor } from "@testing-library/react";
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
import { testUser, testUsers } from "../../../data/userTestData";
import { testImages } from "../../../data/imageTestData";

// Mocks
jest.mock("../../../apis/authAPI");
jest.mock("../../../apis/userAPI");
jest.mock("../../../apis/imageAPI");

describe("----- <Users/> -----", () => {
  afterEach(() => {
    cleanup();
  });

  //----- Test 1 -----
  it("correctly retrieves data on load", async () => {
    // Mock API functions
    authAPI.getUser.mockResolvedValue({
      data: { 
        success: true,
        user: testUser
      }
    });
  
    userAPI.getAll.mockResolvedValue({
      data: { 
        success: true,
        users: testUsers
      }
    });

    imageAPI.getForUser.mockResolvedValue({
      data: {
        success: true,
        images: testImages
      }
    });

    const router = createMemoryRouter(routesConfig, {
      initialEntries: ["/users"]
    });
  
    render(
      <Provider store={ store }>
        <RouterProvider router={ router } />
      </Provider>
    );

    await waitFor(() => {
      expect(userAPI.getAll).toHaveBeenCalled();
      expect(imageAPI.getForUser).toHaveBeenCalledTimes(testUsers.length);
    });
  });
});
