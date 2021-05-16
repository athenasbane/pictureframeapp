import React, { ReactEventHandler, useState } from 'react';
import styles from './Upload.module.scss';
import { Button } from '../../Components/Atoms/Button/Button';
import { useHistory } from 'react-router-dom';

export type UploadProps = {
    changeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleSubmission: () => void;
    uploadStatus: 'none' | 'success' | 'failed';
}



export const Upload: React.FC<UploadProps> = ({changeHandler, handleSubmission, uploadStatus}) => {
    const history = useHistory();
		
    const status = uploadStatus === 'failed' ? <p style={{color: 'red'}}>Upload Failed</p> : <p style={{color: 'green'}}>Upload Success</p>

    return (
        <div className={styles.root}>
            <div className={styles.homeBtn}>
                <Button onClick={() => history.push('/')}>Home</Button>
            </div>
            <div className={styles.container}>
                <h3 className={styles.label}>Upload</h3>
            </div>
            <div className={styles.container}>
                <input type="file" onChange={(event) => changeHandler(event)} />
                <Button onClick={handleSubmission}>Upload</Button>
                {uploadStatus !== 'none' ? status : null}
            </div>
        </div>
    );
}