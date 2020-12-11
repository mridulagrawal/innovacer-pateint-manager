import { Route, Switch } from 'react-router-dom';
import UploadPatient from './UploadPatients/UploadPatientsComponent';
import PatientsDetails from './PatientsDetails/PatientsDetailsComponent';
import PatientProfile from './PatientProfile/PatientProfileComponent';

const Routes = () => {

    return <Switch>
        <Route exact path='/' component={UploadPatient} />
        <Route exact path='/patients' component={PatientsDetails} />
        <Route path='/patients/:id' component={PatientProfile} />
    </Switch>
}

export default Routes;
