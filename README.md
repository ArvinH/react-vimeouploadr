# react-vimeouploadr

[![Travis][travis-badge]][travis]
[![Codecov Status][codecov-badge]][codecov]<!-- [![Github Tag][githubtag-badge]][githubtag] -->
[![Dependency Status][dependency-badge]][dependency]
[![devDependency Status][devdependency-badge]][devdependency]
[![peerDependency Status][peerdependency-badge]][peerdependency]
[![prettier][prettier-badge]][prettier]
[![license][license-badge]][license]

React component for upload video to your vimeo account

## Demo

![demo](http://g.recordit.co/lG2JE1ZXiY.gif)

## Usage

### Steps

1.  Create vimeo app and get the access token (you may need to wait for couple days to get the upload permission)
    [vimeo app register](https://developer.vimeo.com/apps)

    [vimeo upload api doc](https://developer.vimeo.com/api/upload/videos)

2.  You have to prepare a server for requesting vimeo api, you can do this in client side (Well, technically, you can do it on client-side but it will expose your access token to the world and that's not we want to see). Here is the server side sample code:
    [Flask server sample code](https://gist.github.com/ArvinH/42ad574cd8caf6ccd55afa7e2ad9c43a)

3.  Mount component and reducer to your app (Check the `app.js` and `store.js` in `demo/src` foldr)

    ### component

    ```js
    import VimeoUploadr from 'react-vimeouploadr';
    // pass your server host for create video and get video link api (see the servier side code sample)
    <VimeoUploadr
      createVideoLink="http://localhost:5000/video/vimeo"
      getVideoLink="http://localhost:5000/video/vimeo"
    />;
    ```

    ### reducer

    ```js
    import { vimeoUpload } from 'react-vimeouploadr';
    // add reducer to your store
    export default createStore(
      combineReducers({
        vimeoUpload
      }),
      initialState,
      composedEnhancers
    );
    ```

    ### app

    ```js
    // get props to state in component
    const mapStateToProps = state => ({
      vimeoLink: state.vimeoUpload.vimeoLink,
      uploadStatus: state.vimeoUpload.uploadStatus
    });

    DemoApp = connect(mapStateToProps, null)(DemoApp);
    ```

## To-Do

* [x] Pass api host from config
* [x] Export final vimeo video link instead of render player directly
* [x] Doc for api on server side
* [ ] Doc for style configuration
* [ ] Fix test

[travis-badge]: https://img.shields.io/travis/ArvinH/react-vimeouploadr/master.svg?style=flat-square
[travis]: https://travis-ci.org/ArvinH/react-vimeouploadr
[codecov-badge]: https://img.shields.io/codecov/c/github/ArvinH/react-vimeouploadr.svg?style=flat-square
[codecov]: https://codecov.io/github/ArvinH/react-vimeouploadr?branch=master
[npm-badge]: https://img.shields.io/npm/v/react-vimeouploadr.svg?style=flat-square
[npm]: https://www.npmjs.com/package/react-vimeouploadr
[npm-downloads]: https://img.shields.io/npm/dt/react-vimeouploadr.svg?style=flat-square
[dependency-badge]: https://david-dm.org/ArvinH/react-vimeouploadr.svg?style=flat-square
[dependency]: https://david-dm.org/ArvinH/react-vimeouploadr
[devdependency-badge]: https://david-dm.org/ArvinH/react-vimeouploadr/dev-status.svg?style=flat-square
[devdependency]: https://david-dm.org/ArvinH/react-vimeouploadr#info=devDependencies
[peerdependency-badge]: https://david-dm.org/ArvinH/react-vimeouploadr/peer-status.svg?style=flat-square
[peerdependency]: https://david-dm.org/ArvinH/react-vimeouploadr#info=peerDependencies
[githubtag-badge]: https://img.shields.io/github/tag/ArvinH/react-vimeouploadr.svg?style=flat-square
[githubtag]: ./CHANGELOG.md
[license-badge]: https://img.shields.io/github/license/ArvinH/react-vimeouploadr.svg?style=flat-square
[license]: http://arvinh.mit-license.org/
[prettier-badge]: https://img.shields.io/badge/styled_with-prettier-ff69b4.svg?style=flat-square
[prettier]: https://github.com/prettier/prettier
