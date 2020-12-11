# Getting Started with Create React App
Patient manager system is developed.
Features available:
    1. Upload patients details (excel)
    2. View uploaded details in a table
    3. View per person profile of patient
    4. used innovacer design system for components.

This project was bootstrapped with [Create React App].

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.


Code coverage

File                           | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
-------------------------------|---------|----------|---------|---------|-------------------
All files                      |   64.56 |    60.87 |      50 |   67.57 |
 src                           |   78.57 |      100 |      75 |   84.62 |
  App.js                       |     100 |      100 |     100 |     100 |
  Navbar.jsx                   |      80 |      100 |      50 |   88.89 | 27
  Routes.js                    |     100 |      100 |     100 |     100 |
  index.js                     |       0 |      100 |     100 |       0 | 8
 src/PatientProfile            |     100 |      100 |     100 |     100 |
  PatientProfileComponent.jsx  |     100 |      100 |     100 |     100 |
 src/PatientsDetails           |    62.5 |       40 |      50 |   65.22 |
  PatientsDetailsComponent.jsx |    62.5 |       40 |      50 |   65.22 | 42,53-56,97-104
 src/UploadPatients            |      50 |       40 |      50 |      50 |
  UploadPatientsComponent.jsx  |      50 |       40 |      50 |      50 | 21-24,28-29,38-48
 src/apis                      |      40 |      100 |       0 |      50 |
  api.js                       |      40 |      100 |       0 |      50 | 5,9,13-16
-------------------------------|---------|----------|---------|---------|-------------------