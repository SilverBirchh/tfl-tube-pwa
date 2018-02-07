import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describe('Integration | Component | tube status holder', function() {
  setupComponentTest('tube-status-holder', {
    integration: true
  });

  it('renders', function() {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });
    // Template block usage:
    // this.render(hbs`
    //   {{#tube-status-holder}}
    //     template content
    //   {{/tube-status-holder}}
    // `);

    this.render(hbs`{{tube-status-holder}}`);
  });
});
