import UploadPatientsComponent from './UploadPatientsComponent';
import * as apis from '../apis/api';
import { fireEvent, render } from '@testing-library/react';


describe("Patient Details Component", () => {
    it("should render the component", () => {
        apis.uploadPatientsDetails = jest.fn().mockReturnValue(
            new Promise((resolve, reject) => {
                setTimeout(resolve({}), 2000);
            })
        );
        const { getByRole } = render(
            <UploadPatientsComponent />
        );
        fireEvent.click(getByRole('button'));
    });
});
