import '@innovaccer/design-system/css';
import { GridCell, Heading, Icon, Table } from '@innovaccer/design-system';
import { Card } from '@innovaccer/design-system';
import { useHistory } from 'react-router-dom';
import { fetchAllPatientsDetails } from '../apis/api';
import { useEffect, useState } from 'react';


const PatientsDetails = () => {

    const [data, setData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchAllPatientsDetails();
            setData(data.data);
        };
        fetchData();
    }, []);

    const schema = [
        {
            name: 'name',
            displayName: 'Name',
            width: '40%',
            resizable: true,
            separator: true,
            tooltip: true,
        },
        {
            name: 'age',
            displayName: 'Age',
            width: '10%',
            resizable: true,
            sorting: true,
            cellType: 'WITH_META_LIST'
        },
        {
            name: 'gender',
            displayName: 'Gender',
            width: '20%',
            resizable: true,
            comparator: (a, b) => a.gender.localeCompare(b.gender),
            cellType: 'STATUS_HINT',
            translate: a => ({
                title: a.gender,
                statusAppearance: (a.gender === 'Female') ? 'alert' : 'success'
            }),
            filters: [
                { label: 'Male', value: 'male' },
                { label: 'Female', value: 'female' },
            ],
            onFilterChange: (a, filters) => {
                for (const filter of filters) {
                    if (a.gender.toLowerCase() === filter) return true;
                }
                return false;
            },
        },
        {
            name: 'contactnumber',
            displayName: 'Contact Number',
            width: 200,
            resizable: false,
            cellType: 'WITH_META_LIST',
            cellRenderer: props => {
                return (
                    <>
                        <Icon className="mr-5" name="phone" />
                        <GridCell
                            {...props}
                            schema={{
                                ...props.schema,
                                name: 'contactnumber'
                            }}
                        />
                    </>
                );
            }
        },
    ];

    const history = useHistory();

    return <div className="w-75 m-auto">
        <Card className="d-flex justify-content-center align-items-center mt-9 p-6">
            <Table
                type='resource'
                data={data}
                loading={!Boolean(data.length)}
                schema={schema}
                data-test="No Patient Found!"
                withHeader={true}
                headerOptions={{
                    withSearch: true
                }}
                onSearch={(currData, searchTerm) => {
                    return currData.filter(d =>
                        d.name.toLowerCase().match(searchTerm.toLowerCase())
                    );
                }}
                onRowClick={(obj) => { history.push(`/patients/${obj.id}`) }}
                withPagination={true}
                pageSize={10}
                onPageChange={newPage => console.log(`on-page-change:- ${newPage}`)}
                errorTemplate={(props) => {
                    const { errorType = 'DEFAULT' } = props;
                    const errorMessages = {
                        'NO_RECORDS_FOUND': 'No record found!',
                        'DEFAULT': 'No record found!'
                    }
                    return (
                        <Heading className="Heading--xxl mt-5">{errorMessages[errorType]}</Heading>
                    );
                }}
            />
        </Card>
    </div >

}

export default PatientsDetails;
