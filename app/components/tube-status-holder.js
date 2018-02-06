import Component from '@ember/component';
import {
  task,
  timeout
} from 'ember-concurrency';
import moment from 'moment';
import {
  set,
  get
} from '@ember/object';

const DEBOUNCE_MS = 250;
const TEN_MINUTES = 600000;

export default Component.extend({
  classNames: "holder",

  time: null,

  tubeStatus: null,

  isOnline: true,

  tubeTimeout: task(function*() {
    while (true) {
      yield timeout(TEN_MINUTES);
      this.get('getTubeStatus').perform();
    }
  }).drop().cancelOn('deactivate').restartable(),

  getTubeStatus: task(function*() {
    yield timeout(DEBOUNCE_MS);
    try {
      const response = yield fetch('https://api.tfl.gov.uk/line/mode/tube/status');
      const status = yield response.json();
      this.set('tubeStatus', status);

      navigator.onLine ? this.set('time', moment().format('MMM Do, h:mma')) : this.set('time', `${this.get('time')} - OFFLINE`);
    } catch (err) {
      console.log(err);
      this.set('time', `${this.get('time')} - OFFLINE`)
    }
  }).drop().cancelOn('deactivate').restartable(),

  init() {
    this._super(...arguments);
    this.get('getTubeStatus').perform();
    this.get('tubeTimeout').perform();
  },
});
