import PatientProfileComponent from './PatientProfileComponent';
import * as apis from '../apis/api';
// import { shallow } from 'enzyme';
import { render } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

describe("Patient Profile Component", () => {
    it("should render the component", () => {
        apis.fetchPatientDetails = jest.fn().mockReturnValue(
            new Promise((resolve, reject) => {
                resolve({
                    "status": true,
                    "error": null,
                    "data": {
                        "age": "35",
                        "id": "980",
                        "name": "Jama Ismail",
                        "gender": "Male",
                        "contactnumber": "9888995133"
                    }
                })
            })
        );
        const props = {
            match: {
                params: { id: 1 }
            }
        }
        // shallow(<PatientProfileComponent {...props} />);
        act(() => {
            render(
                <PatientProfileComponent {...props} />
            );
        });
    });
});
