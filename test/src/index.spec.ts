import { random } from 'faker';
import { expect } from 'chai';
import is from '@fiquu/is';

import nonce from '../../src';

describe('Nonce', function () {
  it('should generate a unique nonce for each response', function () {
    const nonces = [];

    for (let i = 0, l = 1000; i < l; ++i) {
      const _nonce = nonce();

      expect(nonces).to.not.include(_nonce);

      nonces.push(_nonce);
    }
  });

  it('should generate a unique nonce for each response with custom arguments of at least 128-bits', function () {
    const argsets = [];
    const nonces = [];

    // Test known combinations
    argsets.push(
      [], [16, false], [5, true], [8, false], [16, false], [67, true],
      [67, false], [200, true], [10000, true], [10000, false]
    );

    // Test random combinations
    argsets.push(...Array.from({ length: 6 }, () => {
      return [
        random.number({ min: -9999, max: 9999 }),
        random.boolean()
      ];
    }));

    for (let i = 0, l = 128; i < l; ++i) {
      for (const args of argsets) {
        const _nonce = nonce(...args);

        expect(_nonce).to.be.a('string');
        expect(is.base64(_nonce)).to.be.true;
        expect(nonces).to.not.include(_nonce);
        // 16 byte (128-bit) strings in base64 are 24 chars long
        // 64 byte (512-bit) strings in base64 are 88 chars long
        expect(_nonce.length).to.be.above(23).and.below(89);

        nonces.push(_nonce);
      }
    }
  });
});
