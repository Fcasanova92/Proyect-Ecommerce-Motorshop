import {uiConfig} from '../config/general.js';
import { clamp } from './math.js';

export class Pagination {
    _index;
    constructor() {
        this.perPage = uiConfig.maxItemsInWrappers;
    }
    set data(arr){
        if(Array.isArray(arr) && arr.length >= 0) {
            this._data = arr;
            this._index = 0;
            this._offset = 0;
            this._pageCount = Math.ceil(this._data.length / this.perPage) - 1;
        }
    }
    get data(){
        return this._data;
    }
    setNext(value) {
        this._index = clamp(this._index + value , 0, this._pageCount);
        this._offset = this._index * this.perPage;
    }
    getCurrent() {
        return this._data.slice(this._offset,clamp(this._offset + this.perPage, 0, this._data.length));
    }
}