import { Fr } from '@aztec/foundation/fields';
import { schemas } from '@aztec/foundation/schemas';
import { BufferReader, FieldReader, serializeToBuffer, serializeToFields } from '@aztec/foundation/serialize';
import type { FieldsOf } from '@aztec/foundation/types';

import { inspect } from 'util';
import { z } from 'zod';

import type { GasDimensions } from './gas.js';

/** Gas prices for each dimension. */
export class GasFees {
  public readonly feePerDaGas: Fr;
  public readonly feePerL2Gas: Fr;

  constructor(feePerDaGas: Fr | number | bigint, feePerL2Gas: Fr | number | bigint) {
    this.feePerDaGas = new Fr(feePerDaGas);
    this.feePerL2Gas = new Fr(feePerL2Gas);
  }

  static get schema() {
    return z
      .object({
        feePerDaGas: schemas.Fr,
        feePerL2Gas: schemas.Fr,
      })
      .transform(GasFees.from);
  }

  clone(): GasFees {
    return new GasFees(this.feePerDaGas, this.feePerL2Gas);
  }

  equals(other: GasFees) {
    return this.feePerDaGas.equals(other.feePerDaGas) && this.feePerL2Gas.equals(other.feePerL2Gas);
  }

  get(dimension: GasDimensions) {
    switch (dimension) {
      case 'da':
        return this.feePerDaGas;
      case 'l2':
        return this.feePerL2Gas;
    }
  }

  mul(scalar: number | bigint) {
    if (scalar === 1 || scalar === 1n) {
      return this.clone();
    } else if (typeof scalar === 'bigint') {
      return new GasFees(new Fr(this.feePerDaGas.toBigInt() * scalar), new Fr(this.feePerL2Gas.toBigInt() * scalar));
    } else {
      return new GasFees(
        new Fr(this.feePerDaGas.toNumberUnsafe() * scalar),
        new Fr(this.feePerL2Gas.toNumberUnsafe() * scalar),
      );
    }
  }

  static from(fields: FieldsOf<GasFees>) {
    return new GasFees(fields.feePerDaGas, fields.feePerL2Gas);
  }

  static random() {
    return new GasFees(Fr.random(), Fr.random());
  }

  static empty() {
    return new GasFees(Fr.ZERO, Fr.ZERO);
  }

  isEmpty() {
    return this.feePerDaGas.isZero() && this.feePerL2Gas.isZero();
  }

  static fromBuffer(buffer: Buffer | BufferReader): GasFees {
    const reader = BufferReader.asReader(buffer);
    return new GasFees(reader.readObject(Fr), reader.readObject(Fr));
  }

  toBuffer() {
    return serializeToBuffer(this.feePerDaGas, this.feePerL2Gas);
  }

  static fromFields(fields: Fr[] | FieldReader) {
    const reader = FieldReader.asReader(fields);
    return new GasFees(reader.readField(), reader.readField());
  }

  toFields() {
    return serializeToFields(this.feePerDaGas, this.feePerL2Gas);
  }

  toInspect() {
    return {
      feePerDaGas: this.feePerDaGas.toNumberUnsafe(),
      feePerL2Gas: this.feePerL2Gas.toNumberUnsafe(),
    };
  }

  [inspect.custom]() {
    return `GasFees { feePerDaGas=${this.feePerDaGas.toBigInt()} feePerL2Gas=${this.feePerL2Gas.toBigInt()} }`;
  }
}
