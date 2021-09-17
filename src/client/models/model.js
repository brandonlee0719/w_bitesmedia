import {extendObservable, action, toJS, computed} from 'mobx';
import API from '../adapters/API';
import {BASE_PATH} from '../constants/urls';
import fromJS from '../utils/from-js';
import localStorage from 'universal-localstorage';
import {observable} from "mobx/lib/mobx";

class Store {
    constructor() {
        extendObservable(this, {
            resource: '',
            name: '',
            id: '',
            load: action(this.loadItem.bind(this)),
            fetch: action(this.fetchItem.bind(this)),
            save: action(this.saveItem.bind(this))
        });
    }

    loadItem() {
        this.loadFromCache();

        return this.fetchItem()
            .then(action('loadStore-callback', (response) => {
                return this;
            }))
    }

    fetchItem(options = {}) {
        const api = new API();

        let path = '';
        if (this.id) {
            path = BASE_PATH + '/' + this.resource + '/' + this.id;
        } else {
            path = BASE_PATH + '/' + this.resource;
        }

        if (!this.loading) {
            return this.loading = api.makeRequest({
                method: "get",
                path,
                ...options
            })
                .then((response) => {
                    this.loading = false;
                    let data = response.data;
                    if (data) {
                        if (data.result) {
                            data = data.result;
                        } else if (data.results && data.results[0]) {
                            data = data.results[0];
                        } else if (data.results && !data.results.length) {
                            data = undefined;
                        }
                    }

                    if(data) {
                        this.fromJS(data);
                        this.saveToCache();
                    }
                })
                .catch((error) => {
                    this.loading = false;
                    throw error;
                });
        } else {
            return this.loading;
        }
    }
    //
    // fromJS(data) {
    //     return fromJS.call(this, (data && data.result) || data);
    // }

    saveItem(options = {}) {
        let api = new API();
        let path = "";
        let method = "post";

        if (options.path) {
            path = options.path;
        } else {
            path = BASE_PATH + '/' + this.resource;
            if (this.id) {
                path = BASE_PATH + '/' + this.resource + "/" + this.id;
                method = "put";
            }
        }

        return api.makeRequest({
            path,
            method,
            data: options.data || toJS(this),
            ...options
        })
            .then((response) => {
                if (response.data) {
                    this.fromJS(response.data.results ? response.data.results[0] : response.data);
                }
                this.saveToCache();
                return response;
            })
    }

    loadFromCache() {
        if (this.id) {
            return this.fromJS(JSON.parse(localStorage.getItem(this.id)));
        }
    }

    saveToCache() {
        if (this.id) {
            localStorage.setItem(this.id, JSON.stringify(toJS(this)));
        }
    }

    fromJS(data) {
        return fromJS.call(this, (data && data.result) || data);
    }
}

export default Store;