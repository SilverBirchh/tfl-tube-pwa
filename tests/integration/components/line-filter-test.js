import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describe('Integration | Component | line filter', function() {
  setupComponentTest('line-filter', {
    integration: true
  });

  it('renders', function() {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });
    // Template block usage:
    // this.render(hbs`
    //   {{#line-filter}}
    //     template content
    //   {{/line-filter}}
    // `);

    this.render(hbs`{{line-filter}}`);
    expect(this.$()).to.have.length(1);
  });
});
