/**
 * Created by rui on 2017/7/5.
 */

import {sortBy} from 'lodash'

let arr = [{
    age: 23,
    name: 'abc',
}, {
    age: 3,
    name: 'sdfasdfwfwefasdfasabc',
}, {
    age: 2,
    name: 'abcweewew',
}, {
    age: 232,
    name: 'aasdbc',
}]

console.log(sortBy(arr, item => item.name))
