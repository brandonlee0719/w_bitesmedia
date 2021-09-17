import request from 'axios';
import {BASE_URL} from '../constants/urls';
import uuid from 'uuid/v4';
import handleError from '../utils/handle-error';
// import encryption from '../utils/encryption';
import cookie from 'react-cookies';


class API {
    headers() {
        return {
            "X-XSRF-TOKEN": cookie.load(window.apos.csrfCookieName)
        };
    }

    makeRequest(options = {}) {
        options.headers = Object.assign(options.headers || {}, this.headers());

        let url = options.url || BASE_URL;
        if (options.path) {
            url = url + options.path;
        }

        // have to unset this, because the url passed into makeRequest should be a
        // base url
        delete options.url;
        //
        // if (options.data) {
        //     options.data = this.encrypt(options.data);
        // }

        return request({
            method: options.method || 'get',
            url: url,
            ...options
        }).then(function (response) {
            return response;
        }).catch((error) => {
            handleError(error);
            throw error;
        });
    }

    /*
    encrypt(data) {
        const date = new Date().getTime();
        data.time = date;

        delete data.hash;
        data.hash = encryption.hash(JSON.stringify(data));

        const request_id = uuid();
        const key = encryption.hash(`${request_id}-->${date}`);

        const encryptedPayload = encryption.encryptObject(data, key);

        return {
            request_id,
            enc: encryptedPayload,
            time: date,
            key
        };
    }
    */
}

export default API;