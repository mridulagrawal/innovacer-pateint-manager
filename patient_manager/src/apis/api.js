
const URL_PREFIX = 'http://localhost:3001/'

const fetchAllPatientsDetails = async (patientId) => {
    return await fetch(`${URL_PREFIX}patients`).then(res => res.json());
};

const fetchPatientDetails = async (patientId) => {
    return await fetch(`${URL_PREFIX}patients/${patientId}`).then(res => res.json());
};

const uploadPatientsDetails = async (file) => {
    return await fetch(`${URL_PREFIX}patients/`, {
        method: 'POST',
        body: file
    }).then(res => res.json());
};

export {
    fetchAllPatientsDetails,
    fetchPatientDetails,
    uploadPatientsDetails
};