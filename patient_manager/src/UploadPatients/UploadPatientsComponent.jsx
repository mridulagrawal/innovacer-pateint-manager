import '@innovaccer/design-system/css';
import { Button, Label, Message } from '@innovaccer/design-system';
import { Card } from '@innovaccer/design-system';
import { Input, Caption } from '@innovaccer/design-system';
import { useState } from 'react';
import { uploadPatientsDetails } from '../apis/api';

const UploadPatient = () => {
    const [file, setFile] = useState({});
    const [fileError, setFileError] = useState({
        error: false,
        msg: ''
    });
    const [saveResp, setsaveResp] = useState({
        show: false,
        error: false,
        msg: ''
    });

    const updateFile = (e) => {
        const data = {
            file: e.target.files[0]
        }
        setFile(data);
    }

    const message = () => {
        const { msg, error } = saveResp;
        return (
            <Message appearance={error ? "alert" : "success"}>
                {msg}
            </Message>
        );
    }

    const saveFile = async () => {
        if (Object.keys(file).length > 0) {
            const formData = new FormData()
            formData.append('file', file.file)
            const data = await uploadPatientsDetails(formData);
            if (data.status) {
                setsaveResp({
                    show: true,
                    error: false,
                    msg: 'File successfully uploaded. Visit Patients Details section to view the records.'
                });
            } else {
                setsaveResp({
                    show: true,
                    error: true,
                    msg: data.error
                });
            }
        } else {
            setFileError({
                error: true,
                msg: 'Please select a file'
            });
        }
    }

    return <div className="d-flex flex-column justify-content-center align-items-center mt-9">
        {saveResp.show && <div className="mt-9">
            {message()}
        </div>
        }

        <div className="mt-9" style={{
            height: '150px',
            width: '300px'
        }}>
            <Card className="h-100 w-100 p-5" shadow="medium">
                <Label withInput>
                    Upload pateint details
                    </Label>
                <Input name="patients" type="file" onChange={updateFile} />
                <Caption withInput>
                    Only xls and xlsx file types are supported
                </Caption>
                <Button appearance="primary" className="mt-5" size="regular" onClick={saveFile}>
                    Upload Details
                </Button>
                {fileError.error && <Caption error className="mt-5">
                    {fileError.msg}
                </Caption>
                }
            </Card>
        </div>
    </div>
}

export default UploadPatient;
