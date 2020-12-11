import { Heading, Paragraph, Placeholder, PlaceholderParagraph, Subheading } from '@innovaccer/design-system';
import '@innovaccer/design-system/css';
import { useEffect, useState } from 'react';
import { fetchPatientDetails } from '../apis/api';

const PatientProfile = (props) => {
    const [data, setData] = useState({});
    useEffect(() => {
        const patientId = props.match.params.id;
        const fetchData = async () => {
            const data = await fetchPatientDetails(patientId);
            setData(data.data);
        };

        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const loader = () => <Placeholder withImage={false}>
        <PlaceholderParagraph length="medium" />
    </Placeholder>;

    return <div className="d-flex justify-content-center align-items-center mt-9">
        <div>
            <div style={{
                background: 'transparent'
            }}>
                <Heading appearance="default" size="xl">
                    Patient Profile
                </Heading>
                <Subheading appearance="default">
                    Name
                </Subheading>
                {data.name ? <Paragraph appearance="default">
                    {data.name}
                </Paragraph> : loader()}

                <Subheading appearance="default">
                    Age
                </Subheading>
                {data.age ? <Paragraph appearance="default">
                    {data.age}
                </Paragraph> : loader()}

                <Subheading appearance="default">
                    Gender
                </Subheading>
                {data.gender ? <Paragraph appearance="default">
                    {data.gender}
                </Paragraph> : loader()}

                <Subheading appearance="default">
                    Contact Number
                </Subheading>
                {data.contactnumber ? <Paragraph appearance="default">
                    {data.contactnumber}
                </Paragraph> : loader()}
            </div>
        </div>
    </div>;
}

export default PatientProfile;
