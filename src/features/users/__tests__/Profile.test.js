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
// Utils
import * as imageUtils from "../../../utils/imageUtils";
// Data
import { testUser } from "../../../data/userTestData";
import { testImage, testImages, testFormatttedImage } from "../../../data/imageTestData";

// Mocks
jest.mock("../../../apis/authAPI");
jest.mock("../../../apis/userAPI");
jest.mock("../../../apis/imageAPI");
jest.mock("../../../utils/imageUtils");
window.scrollTo = jest.fn();

describe("----- <Profile/> -----", () => {
  beforeEach(() => {
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

    imageAPI.getForUser.mockResolvedValue({
      data: {
        success: true,
        images: testImages
      }
    });

    imageUtils.formatImage.mockResolvedValue({ testFormatttedImage });
  });

  afterEach(() => {
    cleanup();
  });

  //----- Test 1 -----
  it("correctly retrieves data on load", async () => {
    const router = createMemoryRouter(routesConfig, {
      initialEntries: [`/users/${testUser._id}`]
    });
  
    render(
      <Provider store={ store }>
        <RouterProvider router={ router } />
      </Provider>
    );

    await waitFor(() => {
      expect(userAPI.getUser).toHaveBeenCalledWith(testUser._id);
      expect(imageAPI.getForUser).toHaveBeenCalledWith(testUser._id);
    });
  });

  //----- Test 2 -----
  it("correctly submits image url", async () => {
    // Mock API functions
    imageAPI.create.mockResolvedValue({
      data: {
        success: true,
        image: testImage
      }
    });

    const router = createMemoryRouter(routesConfig, {
      initialEntries: [`/users/${testUser._id}`]
    });
  
    render(
      <Provider store={ store }>
        <RouterProvider router={ router } />
      </Provider>
    );

    await waitFor(() => {
      expect(imageUtils.formatImage).toHaveBeenCalledTimes(3);
      expect(screen.getByTestId("imageForm-url")).toBeInTheDocument();
      expect(screen.getByText("Submit", { selector: "input" })).toBeInTheDocument();
    });

    userEvent.type(screen.getByTestId("imageForm-url"), "Url1");
    userEvent.click(screen.getByText("Submit", { selector: "input" }));

    await waitFor(() => {
      expect(imageUtils.formatImage).toHaveBeenCalledTimes(6);
      // expect(imageAPI.create).toHaveBeenCalledWith(testUser._id, "Url1");
    });

    // expect(screen.queryAllByRole("img")).toHaveLength(0);
    // expect(imageAPI.create).toHaveBeenCalledWith(testUser._id, "Url1");
  });
});
