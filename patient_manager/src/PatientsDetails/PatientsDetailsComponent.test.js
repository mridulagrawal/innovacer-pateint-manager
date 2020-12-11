import PatientsDetailsComponent from './PatientsDetailsComponent';
import * as apis from '../apis/api';
// import { shallow } from 'enzyme';
import { act, render } from '@testing-library/react';


describe("Patient Details Component", () => {
    it("should render the component", () => {
        apis.fetchAllPatientsDetails = jest.fn().mockReturnValue(
            new Promise((resolve, reject) => {
                setTimeout(resolve({
                    "status": true,
                    "error": null,
                    "data": [
                        { "age": "12", "id": "1123", "name": "Jason Bajwa", "gender": "Female", "contactnumber": "1234567890" }
                    ]
                }), 2000);
            })
        );
        // shallow(<PatientsDetailsComponent />);
        act(() => {
            render(
                <PatientsDetailsComponent />
            );
        });
    });
});
