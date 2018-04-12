import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Dropzone from 'react-dropzone'

import {
  uploadVimeo,
} from '../reducers/vimeoUpload';

import 'loaders.css/loaders.min.css';

const VideoUploaderWrapper = styled.div`
  width: 100%;
  padding: 0.5em 2em;
  text-align: center;
  background-color: #3a3a3a;
  color: rgba(255, 255, 255, 0.75);
  box-sizing: border-box;
  position: relative;
`;

const VideoPreviewComponent = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const DropzoneStyle = {
  width: '200px',
  height: '200px',
  borderWidth: '2px',
  borderColor: 'rgb(102, 102, 102)',
  borderStyle: 'dashed',
  borderRadius: '5px',
  margin: '0 auto',
  position: 'relative'
};

const UplaodingMask = styled.div.attrs({
  className: 'loader-inner ball-pulse'
}) `
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding-top: 50%;
  background-color: rgba(0,0, 0, 0.6);;
`;

const UplaodFailedMessage = styled.div`
  font-color: red;
`;

const ProgressBarWrapper = styled.div`
  width: 200px;
  margin 10px auto;
`;

const ProgressBar = styled.div`
  width: ${props => {
    if (props.uploadStatus === 'success') {
      return 100;
    } else {
      return props.progress || 3
    }
  }}%;
  height: 15px;
  border-radius: 10px;
  background-color: green;
  transition: all 0.5s;
`;

class VideoUploader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accepted: [],
      rejected: []
    }
  }

  onDrop = (accepted, rejected) => {
    this.setState({
      accepted
    });
    const file = accepted.find(f => f)
    this.props.uploadVimeo({
      videoData: file,
      size: file.size
    });
  }

  render() {
    const {
      VideoUploaderWrapperStyle,
      CustomDropzoneStyle,
      vimeoLink = '#',
      uploading,
      uploadStatus,
      progress
    } = this.props;
    const uploadSuccess = uploadStatus === 'success';
    const uploadFailed = uploadStatus === 'failed';
    return (
      <VideoUploaderWrapper className="VideoUploaderWrapper" style={VideoUploaderWrapperStyle}>
        {uploadFailed && <UplaodFailedMessage>上傳失敗, 請換張圖試試！</UplaodFailedMessage>}
        <Dropzone
          style={{
            ...DropzoneStyle,
            ...CustomDropzoneStyle
          }}
          multiple={false}
          accept="video/mp4"
          onDrop={this.onDrop}
          disabled={uploading}
        >
          <p>Try dropping some files here, or click to select files to upload.</p>
          {uploading && <UplaodingMask><div /><div /><div /></UplaodingMask>}
        </Dropzone>
        {
          (uploading || uploadSuccess) &&
          <ProgressBarWrapper>
            <ProgressBar progress={progress} uploadStatus={uploadStatus} />
          </ProgressBarWrapper>
        }
        {
          uploadSuccess &&
          <video src={vimeoLink} />
        }
      </VideoUploaderWrapper>
    );
  }
}

const mapStateToProps = state => ({
  vimeoLink: state.vimeoUpload.vimeoLink,
  uploading: state.vimeoUpload.uploading,
  uploadStatus: state.vimeoUpload.uploadStatus,
  progress: state.vimeoUpload.progress
});

const mapDispatchToProps = dispatch => bindActionCreators({
  uploadVimeo
}, dispatch);

VideoUploader = connect(
  mapStateToProps,
  mapDispatchToProps
)(VideoUploader);

export default VideoUploader;