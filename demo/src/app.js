import React, { Component } from 'react';
import { connect } from 'react-redux';
import { render } from 'react-dom';
import styled from 'styled-components';
import VimeoUploadr from '../../src';


const VideoComponent = styled.video`
  display: inline-block;
  width: 50%;
  max-height: 600px;
  box-sizing: border-box;
  vertical-align: middle;
`;

class DemoApp extends Component {
  render() {
    const {
      vimeoLink,
      uploadStatus
    } = this.props;
    const uploadSuccess = uploadStatus === 'success';
    return (
      <div>
        <VimeoUploadr />
        {uploadSuccess && <VideoComponent src={vimeoLink} controls />}
      </div>
    );
  }
};

const mapStateToProps = state => ({
  vimeoLink: state.vimeoUpload.vimeoLink,
  uploadStatus: state.vimeoUpload.uploadStatus,
});

DemoApp = connect(
  mapStateToProps,
  null
)(DemoApp);

export default DemoApp;