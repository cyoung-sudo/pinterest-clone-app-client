import { render, screen, cleanup } from "@testing-library/react";
// React
import React from "react";
// Routing
import { BrowserRouter } from "react-router-dom";
// Redux
import { Provider } from "react-redux";
import store from "../../../redux/store";
// Components
import Popup from "../Popup";

// Mocks
window.scrollTo = jest.fn();

describe("----- <Popup/> -----", () => {
  afterEach(() => {
    cleanup();
  });

  //----- Test 1 -----
  // **Need to test timeout
  it("correctly displays message", () => {
    render(
      <Provider store={ store }>
        <BrowserRouter>
          <Popup
            message="Test message"
            type="success"
            delay={ 1000 }/>
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText("Test message")).toBeInTheDocument();

    // setTimeout(() => {
    //   expect(screen.queryByText("Test message")).not.toBeInTheDocument();
    //   done();
    // }, 2000);
  }, 5000);
});
