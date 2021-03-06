import React from 'react';
import { useHistory } from 'react-router-dom';
import styles from './Upload.module.scss';
import { Button } from '../../Components/Atoms/Button/Button';
import { SubPageHeader } from '../../Components/Molicules/SubPageHeader/SubPageHeader';
import useWindowSize from '../../customHooks/useWindowSize';

export type UploadProps = {
    changeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleSubmission: () => void;
    uploadStatus: 'none' | 'success' | 'failed';
}



export const Upload: React.FC<UploadProps> = ({changeHandler, handleSubmission, uploadStatus}) => {
    const history = useHistory();
    const { width } = useWindowSize();
		
    const status = uploadStatus === 'failed' ? 
        (<p style={{color: 'red'}}>Upload Failed</p>) : 
        (<p style={{color: 'green'}}>Upload Success</p>)

    return (
        <div className={styles.root}>
            <SubPageHeader>
                <div className={styles.homeBtn}>
                    <Button 
                        size={ width && width < 800 ? 'large' : 'medium'}
                        onClick={() => history.push('/')}>
                            Home
                    </Button>
                </div>
                <h3 className={styles.title}>Upload</h3>
            </SubPageHeader>
            <div className={styles.container}>
                <div className={styles.uploadInput}>
                    <input 
                        accept="image/*" 
                        type="file" 
                        onChange={(event) => changeHandler(event)} 
                    />
                </div>
                <Button 
                    size={ width && width < 800 ? 'large' : 'medium'}
                    onClick={handleSubmission}>
                        Upload
                </Button>
                {uploadStatus !== 'none' ? status : null}
            </div>
        </div>
    );
}