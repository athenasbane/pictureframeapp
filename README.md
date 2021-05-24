# Dog Frame!



[TOC]

## Description

This is for my Raspberry Pi screen it will show pictures of the dogs on the screen and rotate them over a set amount of time. I want there to be a site that you can upload new photos and configure the timing of images or remove images etc.

## Structure

- REST API
  - ~~Just serves a JSON object with an array of images.~~ [14/05/21 - 15:53]
  - GET - Get image urls as JSON. 
  - POST - Upload image to bucket
    - Validation
      - Size
      - Orientiation? 
      - File extension
      - Display Ratio?
- Upload Frontend
  - Upload screen
  - Configuration Screen
- ~~Frame Electron app~~  [14/05/21 - 15:53]

## Todos

- [ ] Build ~~Upload~~ Frontend
  - [x] Change the logo and app title 
  - [x] Upload image from front end to S3?
  - [x] Use react or vanilla?
    - React
  - [ ] ~~Breakpoints Layout~~ 
  - [x] Make mainpage 
  - [x] Make Color Variables
  - [x] Add Loading Spinner
    - [x] Add overlay that moves to `/config` and `/upload`
      - [ ] Add icons to the buttons on overlay
      - [ ] Make buttons larger for smaller screens 
      - [ ] Hookify the timeout function for future projects?
      - [ ] Add loading screen before images are loaded from backend
    - [x] Add image carosel 
  - [x] Make config page
    - [x] Home button makes it slightly bigger than view width that makes for an annoying "sliding" of the screen when using the slider. Maybe add a header container and add the title and button to there that is instead of position absolute. 
  - [x] Make upload page
    - [x] Sort out styling of this page. 
  - [ ] Tests - Please please add some testing. 
- [x] Build Rest API
  - [x] Look into this being all lambdas. 
  - [ ] Deal with truncation in the getObjectUrls
  - [x] convert keys to urls in the getObjectUrls
  - [x] Different image types for iPhone uploads etc.
- [ ] ~~Electron App~~  [14/05/21 - 15:53]
  - [ ] ~~Learn Electron for Rasperian~~ [14/05/21 - 15:53]
- [x] Build Image renderer site
- [x] UAT Test on PI
- [ ] Tidy the code! It's hurting my eyes. 

## Issues

- [x] issues with getObjectList lambda API returning a internal server error instead of correct array JSON.  
  - I didn't stringify the response!
- [x] CORS is open on APIs. 
- [ ] Code format is dirty 
- [x] images are not public by default making them blocked. 
- [x] Images not showing correctly on after upload without a refresh. 
- [x] Env variables not working. 
- [x] Lock down uploads to a JWT or someother way.
  - [ ] currently CORS will look at further lock downs.  
- [ ] Lock down image linking to the site if possible. 
- [x] Images not keeping aspect ratio
- [ ] All buttons too small for small touch screens.
- [x] Memory Leak from Async timer useEffect. 
  - Call the cleanup before redirect?
- [ ] No tests. 
- [x] No image/file validation
- [x] Sass module error

## Log

#### [23/05/21 - 09:04]

Changed the CSS on the landing page so it looks better on desktop. Looks loads better now. 

#### [23/05/21 - 08:47]

Added larger buttons for mobile. Not perfect but will do for now. 

#### [23/05/21 - 07:33]

Fixed the memory leak issue I didn't return a useEffect cleanup function on the landing page. That's fixed now. I also was having trouble with the input file on Iphone not being clickable. I added a z-index of 100 to it as a bit of a hailmary and it worked. Still not sure why but hey it works. 

#### [21/05/21 - 08:55]

Just had a blast of this this morning trying to tidy a load of bits up. I've added a loader spinner to the landing page if there are no images. I've also added some color constants in Sass. I think I need a border color variable but can do that later. I did some work on creating a grid system a few days ago that I forgot to log but I think I'm going to split that out into another project. I had an issue with Sass and react styles modules, turns out that node-Sass doesn't work with modules and variables so changed out for sass-loader and webpack seems happier.  

I'm very conscious of the lack of testing on this project so need to spend a bit of time on that at some point. I also want to add some sort of Auth I may do some sort of Auth Bearer Lambda to stick with the serverless theme of the project. 

#### [17/05/21 - 08:24]

Just having a look at the code and I really want to make a set of layout components with breakpoints included. I've had a look at a couple of articles and think I have some ideas about how to do this myself. 

I'm thinking of making them molicule components with a overarching breakpoint file:

```tsx
<Header breakpoints={breakpoints}>
  <Navbar breakpoints={breakpoints}>
  	
  </Navbar>
  
</Header>


<Section hiddenOn={breakpoints.mobile}>
	// Atoms
</Section
```

  

#### [17/05/21 - 21:58] 

A good 45 minute blast! Got a lot done from updating some of the Sass and the uploads page

#### [17/05/21 - 21:18]

Just going to do some pruning! Couple of small changes. 

#### [17/05/21 - 08:21]

I got it deployed last night. Looks like it's working there's a few issues from inital testing that I want to look at. Added to the Issues and todos.

#### [16/05/21 - 21:08] 

Calling it a weekend. Issues with env variables in Amplify. Will try again tomorrow. 

#### [16/05/21 - 20:25]

I spoke too soon! I really don't understand the way binary and files work when uploaded to S3. That means that when I checked I was getting corrupted files or just a huge array of numbers in the S3 bucket. I've fixed it now but man that was a pain in the backside to get it to work. 

A issue I've got now is that newly uploaded images aren't showing properly without a refresh of the app. I've added it to issues and now am going to investigate. 

#### [16/05/21 - 18:46]

It seems to be working! I've added the upload logic to the upload page. I think this is a mistake as it would be better to be able to push the success url to the images array to replace the need for a refresh to show the new image. 

I'll add some CSS work to the todos for the Upload page also as it looks like garbage at the moment. 

#### [16/05/21 - 14:59]

Added a slider, title and button to the configuration page along with the logic for the change. It seems to be working.  

#### [16/05/21 - 09:10]

Added buttons that use useHistory to direct to the pages `/uploads` and `/config` on the overlay. It's looking pretty nice. I'm tempted to continue fidling with the buttons i.e. add icons however I'm just going to add that to the todos and get on with the other pages.

I also want to make the timeout function used in the image changing and the overlay to a custom hook for future projects and to DRY out my code. 

#### [16/05/21 - 08:05]

I'm having fun building a button component. I think I'm going to go overkill on it, but that's part of the fun. I can also add this component to a planned component library that I'm thinking of building to enable faster weekend projects in the future. I'm tempted to open source it once done. 

#### [15/05/21 - 21:19]

Built something pretty cool. I was having issues with timer functions with react but copied a pattern I've used before in another project. The challenge I faced was that I want the images to change after a set amount of time. I've got that working. 

Here's the code: 

```tsx
const [ currentImage, setCurrentImage ] = useState(0);
    const timeoutRef = useRef<any>(null);

    const resetTimeout = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
    }

    useEffect(() => {
        resetTimeout();
        timeoutRef.current = setTimeout(
            () => setCurrentImage(
                    (prevState) => 
                        prevState === images.length - 1 ? 0 : prevState + 1
                    ),
            config.speed * 1000
        )
        return () => {
            resetTimeout();
        }
    }, [currentImage, images, config])

    const image = <img className={styles.root} src={images[currentImage]} alt="dog images" />
```

I used something similar on the overlay so that it disappears after 2.5 seconds. 

All that's left on the landing page is styling the buttons on the overlay when pressed I thinking of icon buttons for that. Then I need to make the config page and the upload page. 

I'm going to call it a day on the coding. Back tomorrow to box it all off. 

#### [15/05/21 - 17:36]

Time to build the react app for the viewer and uploader. 

#### [15/05/21 - 16:36]

Fixed the issues with lambda. I just didn't stringify the response! That's sorted I also added the s3 bucket url in env variables and concated it to the key. Let's now test this process end to end on postman:

1. requesting presignedURL:

   ```json
   {
       "uploadURL": "https://dogframeimagebucket.s3.eu-west-2.amazonaws.com/9049241.jpg?Content-Type=image%2Fjpeg&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIA3SVRA64BULFVJEIY%2F20210515%2Feu-west-2%2Fs3%2Faws4_request&X-Amz-Date=20210515T154015Z&X-Amz-Expires=300&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEID%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCWV1LXdlc3QtMiJIMEYCIQCO6QM1Fypgsfvmi4vHwZWUmpE%2F%2BCc447x2crvGRFOd0AIhALb8aagEME0s2gEWLPNa11QXrxIc%2BMw6ePEyfe0dPDLMKs4BCBkQABoMNzk2MDEzOTUwNzIzIgzny99CsEDjVavgU8wqqwFUxCcXL8DSLCg142jwAb36piBxnGF%2Ba5CSUO75D%2B14RrXhJ3eH8VISU6PizXoE3wLMWoeiweeHpSY0zdnis9nqa0R6N%2BsgMBDA5vsUZytdwSkAKDvie0GCgDFytjyNq1XuzMlcpFKWq8BG1Bt%2BH9zqq1oEq74E9Xs%2BCCcWiQmJ0idxDBU75nLbFYwlg2rbct8KRW%2Fbxdg7wwh%2Bv%2FPYnltIuYEc0F%2BYqaGPjKAw3tb%2FhAY63wHeW9dqzjK2Q7Cvfhoes9R67CxD5%2Fzzvnm%2Bxl4LEKlCaV%2FKDVdbAWuef3155Sy5FXXwFUalZd5i2yUiNaAyBPuxdDblWxytQ8ESNArtJD8Y0R4w3NHx8153uZacMoSOmCxSLi4k8uvbP8bYZFFZi5XbHHMVyjQ1dH1AJVHN5q8bciVL8aGLvvvyEGvD8o8bghnUTaTOQFrurZBe5akzyVQVBklLqEhy8JruxCjxryGpGNUKrHxN1E2ZOuX4ohCOj0e8P%2BbvvEE89skiWKQiFMnzIbTqaqEKrdwPNLb2Y7hI&X-Amz-Signature=a770f5551a0963eaf0743f428a75c5908f121c36767969bcdc728f47d80c99cd&X-Amz-SignedHeaders=host",
       "Key": "9049241.jpg"
   }
   ```

   SUCCESS

2. uploading image:

   SUCCESS 

3. getObjectURLs:

   ```json
   {
       "statusCode": 200,
       "body": [
           "https://dogframeimagebucket.s3.eu-west-2.amazonaws.com/9049241.jpg",
           "https://dogframeimagebucket.s3.eu-west-2.amazonaws.com/9218627.jpg"
       ]
   }
   ```

   SUCCESS

4. View images:

   FAIL - One of the images is access denied so need to make the images public on upload. 

   FIXED - added the following bucket policy after generating in policy generator:

   ```
   [
       {
           "AllowedHeaders": [
               "*"
           ],
           "AllowedMethods": [
               "GET",
               "POST",
               "HEAD",
               "PUT"
           ],
           "AllowedOrigins": [
               "*"
           ],
           "ExposeHeaders": []
       }
   ]
   ```

   

#### [15/05/21 - 15:45]

I've realised that in my getObjectUrls I haven't accounted for truncation. I could add something like:

```javascript
if (data.IsTruncated) {
  params.ContinuationToken = data.NextContinuationToken;
  keys.push({
    // keys logic
  });
}
```

However I may make a function that calls the function within the function:

```javascript
if (data.IsTruncated) {
  params.ContinuationToken = data.NextContinuationToken;
 	await functionCall();
}
```

I'll add it to the todos

#### [15/05/21 - 14:50]

So I set up the getPresignedUrl Lambda with the following code:

```javascript
'use strict'

const AWS = require('aws-sdk')
AWS.config.update({ region: process.env.AWS_REGION })
const s3 = new AWS.S3()

// Change this value to adjust the signed URL's expiration
const URL_EXPIRATION_SECONDS = 300

// Main Lambda entry point
exports.handler = async (event) => {
  return await getUploadURL(event)
}

const getUploadURL = async function(event) {
  const randomID = parseInt(Math.random() * 10000000)
  const Key = `${randomID}.jpg`

  // Get signed URL from S3
  const s3Params = {
    Bucket: process.env.UploadBucket,
    Key,
    Expires: URL_EXPIRATION_SECONDS,
    ContentType: 'image/jpeg',

    // This ACL makes the uploaded object publicly readable. You must also uncomment
    // the extra permission for the Lambda function in the SAM template.

    // ACL: 'public-read'
  }

  console.log('Params: ', s3Params)
  const uploadURL = await s3.getSignedUrlPromise('putObject', s3Params)

  return JSON.stringify({
    uploadURL: uploadURL,
    Key
  })
}
```

I had some issues with permissions but rewatched the YouTube video listed in Notes and fixed that. 

I then created a getObjectUrls Lambda with the following code (Without comments) :

```javascript
const AWS = require('aws-sdk')
AWS.config.update({ region: process.env.AWS_REGION })
const s3 = new AWS.S3()

exports.handler = async (event) => {
    const params = {Bucket: process.env.BucketName, MaxKeys: 50};
    try {
      	// learnt that you can promisify SDK stuff which makes this easier.
        const objects = await s3.listObjectsV2(params).promise();
        const keys = objects.Contents.map(content => content.Key);
        console.log(keys);
        return {
            statusCode: 200,
            body: keys,
        };
    } catch (e) {
        return {
            statusCode: 500,
            body: e,
        };
    }
};

```

My intension was to just pull the full public urls for each file but the AWS SDK doesn't let you do this apparently. So the plan is to pull all the keys then append the bucket public url with the key (filename). I think the best place for this is in this lambda. Maybe there's a AWS SDK function to get this URL incase it changes to keep all of this in one place. 

I've also set up a API Gateway http for each of these lambdas with CORs with an open access policy. (A note to change this later.)

I tested this in postman and the getPresignedUrl endpoint works great. However the getObjectsList endpoint returns:

```json
{
    "message": "Internal Server Error"
}
```

I've created a access policy that should let me list the bucket object contents and it is showing the correct response in CloudWatch. 

I'm going to take a break and take the dogs out and return with a beer and a fresh perspective. 

#### [15/05/21 - 12:56]

Ok let's test this full process in postman.

#### [14/05/21 - 20:48] 

A few beers later... I'm going to set up the lambdas wish me luck.

#### [14/05/21 - 16:11]

Can the REST api just be done with lambdas? List all the bucket object URLs as a JSON? Can we upload to a lambda to S3 and do all the validation in the lambda? I believe it will require the double request thing again from [14/05/21 - 15:53] but if it cuts out the backend I think this is worth it.   

#### [14/05/21 - 15:53] 

Started looking into using S3 to host the upload site and functionality. Looks to be a two part process:

- GET request to receive the Upload url and file key (name).
- POST request of blobdata to that URL.

If it has to make two requests and we are going to have to make a REST backend anyway it could be worth moving this to a Node.js backend. While thinking about this the electron part of the process seems pretty redundant too. If the application is just going to render the array of images then just using Kisok mode browser maybe a better option.  

## Notes

- AWS S3 upload a image from front end - https://aws.amazon.com/blogs/compute/uploading-to-amazon-s3-directly-from-a-web-or-mobile-application/
- Sample frontend link - https://github.com/aws-samples/amazon-s3-presigned-urls-aws-sam/blob/master/frontend/index.html
- Serverless file uploads - https://www.youtube.com/watch?v=mw_-0iCVpUc
- listObjects SO - https://stackoverflow.com/questions/42394429/aws-sdk-s3-best-way-to-list-all-keys-with-listobjectsv2
- How to make all objects in bucket public - https://stackoverflow.com/questions/19176926/how-to-make-all-objects-in-aws-s3-bucket-public-by-default
- HTML slider - https://www.w3schools.com/howto/howto_js_rangeslider.asp