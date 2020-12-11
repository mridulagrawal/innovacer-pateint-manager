import React from "react";
import { shallow } from "enzyme";
import Navbar from './Navbar';
const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
    location: {
      pathname: '/',
      search: '',
      hash: '',
      state: null,
      key: '5nvxpbdafa',
    }
  }),
}));


describe("Navbar Component", () => {
  it("renders", () => {
    shallow(<Navbar />)
  });
});
