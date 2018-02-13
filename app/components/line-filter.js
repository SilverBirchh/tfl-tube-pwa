import Component from '@ember/component';
import {
  inject as service
} from '@ember/service';
import {
  task,
  timeout
} from 'ember-concurrency';

export default Component.extend({
  classNames: "holder",

  filterLines: service(),

  lines: null,

  tubeStatus: null,

  getTubeStatus: task(function*() {
    if (JSON.parse(localStorage.getItem("lines"))) {
      this.set('filterLines.validLines', JSON.parse(localStorage.getItem("lines")))
      this.set('tubeStatus', this.get('filterLines.validLines'));
      return this.get('filterLines.validLines');
    }

    let status = yield fetch('https://api.tfl.gov.uk/line/mode/tube/status');
    status = yield status.json();

    status = status.map((line, index) => {
      const newLine = {}
      newLine.selected = true
      newLine.index = index;
      newLine.name = line.name;
      newLine.id = line.id
      return newLine;
    });

    this.set('tubeStatus', status);
    return status
  }).drop().cancelOn('deactivate').restartable(),

  didInsertElement() {;
    this.get('getTubeStatus').perform();
  },
  actions: {
    saveList(index) {
      const val = Ember.get(this.get('tubeStatus')[index], "selected")
      Ember.set(this.get('tubeStatus')[index], "selected", !val);

      localStorage.setItem("lines", JSON.stringify(this.get('tubeStatus')));
      this.set('filterLines.validLines', this.get('tubeStatus'))
    }

  }
});
