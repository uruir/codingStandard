import Rx from 'rxjs/Rx';
import fs from 'fs'

let exists = Rx.Observable.bindCallback(fs.exists)
exists('./moment.js').subscribe(exists => console.log('Does if exists?', exists))