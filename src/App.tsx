import React, { useEffect, useState} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import { Landing } from './Pages/Landing/Landing';
import { Config } from './Pages/Config/Config';
import { Upload } from './Pages/Upload/Upload';

const API_ENDPOINT = 'https://jjntp4c3r8.execute-api.eu-west-2.amazonaws.com/default/getPresignedUrl';
const URL = 'https://c7mf1zuh86.execute-api.eu-west-2.amazonaws.com/develop/getObjectURLs';

function App() {
  
  const initalConfig = {
    speed: 5
  }
  const [ config, setConfig ] = useState(initalConfig);
  const [ images, setImages ] = useState<undefined | string[]>();
  const [ selectedFile, setSelectedFile] = useState<string | undefined>();
  const [ uploadStatus, setUploadStatus ] = useState<'none' | 'success' | 'failed'>('none')

  const getImages = async () => {
    const response = await fetch(URL);
    const data = await response.json();
    setImages(data.body);
  }

  const configChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target?.value) {
      setConfig({
        speed: +event.target.value
      })
    }
  }

  const createImage = (file: Blob) => {
    let reader = new FileReader()
    reader.onload = (e) => {
      if (reader.result) {
        const result = reader.result as string;
        setSelectedFile(result)
      } 
    }
    reader.readAsDataURL(file)
  }  

	const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUploadStatus('none');
        if (event.target) {
          if(event.target.files) {
            createImage(event.target.files[0])
          }
        }
	};

	const handleSubmission = async () => {
    const response = await fetch(API_ENDPOINT);
    const presignedUrl = await response.json()
   
    if (selectedFile) {
      const binary = atob(selectedFile.split(',')[1]);
      const array = [];
      for (var i = 0; i < binary.length; i++) {
        array.push(binary.charCodeAt(i))
      }
      const blobData = new Blob([new Uint8Array(array)], {type: 'image/jpeg'})
      console.log('Uploading to: ', presignedUrl.uploadURL)
      const result = await fetch(presignedUrl.uploadURL, {
        method: 'PUT',
        body: blobData
      })

      if (result.status === 200) {
        setUploadStatus('success');
      } else {
        setUploadStatus('failed');
      }
      
      setSelectedFile(undefined);
      console.log(result)
      setImages(prevImages => {
        if (Array.isArray(prevImages)) {
          return [...prevImages, result.url.split('?')[0]];
        }
        return prevImages;
      })
    }
	}; 
    

  useEffect(() => {
    getImages();
  }, [])

  return (
    <Router>
      <Switch>
        <Route path="/config">
          <Config speed={config.speed} configChangeHandler={(event) => configChangeHandler(event)} />
        </Route>
        <Route path="/upload">
          <Upload changeHandler={changeHandler} handleSubmission={handleSubmission} uploadStatus={uploadStatus}/>
        </Route>
        <Route path="/">
          <Landing config={config} images={images} />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
