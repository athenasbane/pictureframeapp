import React from 'react';
import { useHistory } from 'react-router-dom';
import styles from './Upload.module.scss';
import { Button } from '../../Components/Atoms/Button/Button';
import { SubPageHeader } from '../../Components/Molicules/SubPageHeader/SubPageHeader';

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
            <SubPageHeader>
                <div className={styles.homeBtn}>
                    <Button onClick={() => history.push('/')}>Home</Button>
                </div>
                <h3 className={styles.title}>Upload</h3>
            </SubPageHeader>
            <div className={styles.container}>
                <div className={styles.uploadInput}>
                    <input id="file" type="file" onChange={(event) => changeHandler(event)} />
                    <label htmlFor="file">Select A Photo</label>
                </div>
                
                <Button onClick={handleSubmission}>Upload</Button>
                {uploadStatus !== 'none' ? status : null}
            </div>
        </div>
    );
}