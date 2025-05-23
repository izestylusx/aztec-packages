import { jsonStringify } from '@aztec/foundation/json-rpc';

import { L2Block } from './l2_block.js';

describe('L2Block', () => {
  it('can serialize an L2 block with logs to a buffer and back', async () => {
    const block = await L2Block.random(42);

    const buffer = block.toBuffer();
    const recovered = L2Block.fromBuffer(buffer);

    expect(recovered).toEqual(block);
  });

  it('convert to and from json', async () => {
    const block = await L2Block.random(42);
    const parsed = L2Block.schema.parse(JSON.parse(jsonStringify(block)));
    expect(parsed).toEqual(block);
  });
});
