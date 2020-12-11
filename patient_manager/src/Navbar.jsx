import { Navigation, PageHeader } from '@innovaccer/design-system';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';

const Navbar = () => {

    const title = 'Patient Manager System';
    const navigationData = [
        {
            name: '/patients',
            label: 'View Pateint Details',
            route: '/patients'
        },
        {
            name: '/',
            label: 'Upload Patient Details',
            route: '/'
        }
    ];

    const history = useHistory();
    const { pathname } = history.location;
    const [activeNav, setActiveNav] = useState(pathname);
    const options = {
        title,
        navigation: <Navigation menus={navigationData}
            onClick={(menu) => { setActiveNav(menu.name); history.push(menu.route); }}
            active={{ name: activeNav }} />,
    };

    return <div className="w-100 pb-6 pt-6" style={{ background: '#f4f4f4' }}>
        <PageHeader {...options} />
    </div>
}

export default Navbar;
