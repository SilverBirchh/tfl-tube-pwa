import Component from '@ember/component';
import {
  task,
  timeout
} from 'ember-concurrency';
import moment from 'moment';
import {
  inject as service
} from '@ember/service';
import fetch from 'ember-fetch/ajax';

const DEBOUNCE_MS = 250;
const TEN_MINUTES = 600000;

export default Component.extend({
  cookies: service(),

  filterLines: service(),

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


    let status = yield fetch('https://api.tfl.gov.uk/line/mode/tube/status');

    if (JSON.parse(localStorage.getItem("lines"))) {
      this.set('filterLines.validLines', JSON.parse(localStorage.getItem("lines")))
      status = status.filter((line, index) => {
        return this.get('filterLines.validLines')[index].selected;
      })
    }

    this.set('tubeStatus', status);

    if (navigator.onLine) {
      this.set('time', moment().format('MMM Do, h:mma'))
      this.get('cookies').write('time', moment().format('MMM Do, h:mma'));
    } else {
      const time = this.get('cookies').read('time')
      this.set('time', `${time} - OFFLINE`);
    }
  }).drop().cancelOn('deactivate').restartable(),

  updateIsOnline: function() {
    this.get('getTubeStatus').perform();
  },

  didInsertElement() {
    this.get('getTubeStatus').perform();
    this.get('tubeTimeout').perform();
    window.addEventListener('online', this.updateIsOnline.bind(this));
    window.addEventListener('offline', this.updateIsOnline.bind(this));
  },
});
