import axios from 'axios'
import get from 'lodash/get';
// action types
export const POST_VIMEO_START = 'vimeo/POST_VIMEO_START';
export const POST_VIMEO_SUCCESS = 'vimeo/POST_VIMEO_SUCCESS';
export const POST_VIMEO_FAILED = 'vimeo/POST_VIMEO_FAILED';
export const POST_VIMEO_PROGRESS = 'vimeo/POST_VIMEO_PROGRESS';

// initial state
const initialState = {
  vimeoLink: undefined,
  uploading: false,
  uploadStatus: ''
};

// reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case POST_VIMEO_START:
      return {
        ...state,
        ...action.payload
      }

    case POST_VIMEO_SUCCESS:
      return {
        ...state,
        ...action.payload
      }

    case POST_VIMEO_FAILED:
      return {
        ...state,
        ...action.payload
      }
    
    case POST_VIMEO_PROGRESS:
      return {
        ...state,
        ...action.payload
      }

    default:
      return state
  }
};

// actions
export const uploadVimeo = (postBody) => {
  return async dispatch => {
    const success = async (videoUri, videoData, size, uploadLink, result) => {
      const apiResult = result.data;
      // check if upload success


      console.log('check upload status');
      const checkUploadResult = await axios.head(uploadLink, {
        headers: {
          'Tus-Resumable': '1.0.0'
        },
      });

      const uploadLength = get(checkUploadResult, ['headers', 'upload-length']);
      const uploadOffset = get(checkUploadResult, ['headers', 'upload-offset']);
      // To-Do
      console.log('check upload status result uploadLength', uploadLength);
      console.log('check upload status result uploadOffset', uploadOffset);
      if (uploadLength === uploadOffset) {
        // complete upload
        const getVideoExternalLInk = await axios.get(`http://localhost:5000/video/vimeo${videoUri}`);
        console.log('getVideoExternalLInk', getVideoExternalLInk.data.data);
        dispatch({
          type: POST_VIMEO_SUCCESS,
          payload: {
            vimeoLink: getVideoExternalLInk.data.data,
            uploading: false,
            uploadStatus: 'success'
          }
        })
        return apiResult;
      } else {
        // upload failed, resume upload?
        console.log('should resume upload');
        return patchVimeoFunc(videoUri, uploadLink, videoData, size, uploadOffset);
      }
    };

    const failed = () => {
      dispatch({
        type: POST_VIMEO_FAILED,
        payload: {
          uploading: false,
          uploadStatus: 'failed'
        }
      })
      return null;
    };

    const patchVimeoFunc = async (videoUri, uploadLink, videoData, size, uploadOffset) => {
      const result = await axios.patch(uploadLink, videoData,
        {
          headers: {
            'Tus-Resumable': '1.0.0',
            'Upload-Offset': uploadOffset || '0',
            'Content-Type': 'application/offset+octet-stream'
          },
          onUploadProgress: function (progressEvent) {
            const total = progressEvent.total || size;
            const loaded = progressEvent.loaded || 0;
            const progress = (loaded / total) * 100;
            dispatch({
              type: POST_VIMEO_PROGRESS,
              payload: {
                uploading: true,
                progress: progress >= 100 ? 90 : progress
              }
            })
          },
        }
      );
      return success(videoUri, videoData, size, uploadLink, result);
    };

    try {
      dispatch({
        type: POST_VIMEO_START,
        payload: {
          uploading: true
        }
      });
      const {
        videoData,
        size
      } = postBody;

      // get upload link
      const createVideoAPIResult = await axios.post('http://localhost:5000/video/vimeo', {
        "upload": {
          "approach": "tus",
          "size": size
        }
      });
      const createVideoResult = createVideoAPIResult.data;
      if (createVideoResult.status !== 'success') {
        return failed();
      }
      const uploadLink = createVideoResult.uploadLink;
      const videoUri = createVideoResult.videoUri;

      // start to upload
      return patchVimeoFunc(videoUri, uploadLink, videoData, size);
    } catch (err) {
      console.log(`post vimeo err: ${err}`);
      return failed();
    }
  };
};