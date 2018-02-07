import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describe('Integration | Component | tube line', function() {
  setupComponentTest('tube-line', {
    integration: true
  });

  it('renders', function() {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });
    // Template block usage:
    // this.render(hbs`
    //   {{#tube-line}}
    //     template content
    //   {{/tube-line}}
    // `);

    this.render(hbs`{{tube-line}}`);
  });
});
