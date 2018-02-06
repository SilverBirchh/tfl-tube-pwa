import Component from '@ember/component';
import {
  computed
} from '@ember/object';

export default Component.extend({
  tagName: 'li',

  line: null,

  statusClass: computed('line', function() {
    let line = this.get('line');

    return line.lineStatuses[0].statusSeverityDescription
      .toLowerCase()
      .replace(" ", "-");
  })

});
