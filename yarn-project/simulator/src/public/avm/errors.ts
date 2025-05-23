import type { Point } from '@aztec/foundation/fields';
import type { AztecAddress } from '@aztec/stdlib/aztec-address';
import type { FailingFunction, NoirCallStack } from '@aztec/stdlib/errors';

import { ExecutionError } from '../../common/errors.js';

/**
 * Avm-specific errors should derive from this
 */
export abstract class AvmExecutionError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AvmExecutionError';
  }
}

export class NoBytecodeForContractError extends AvmExecutionError {
  constructor(contractAddress: AztecAddress) {
    super(`No bytecode found at: ${contractAddress}`);
    this.name = 'NoBytecodeFoundInterpreterError';
  }
}

export class ArithmeticError extends AvmExecutionError {
  constructor(message: string) {
    super(message);
    this.name = 'ArithmeticError';
  }
}

/**
 * Error is thrown when the program counter goes to an invalid location.
 * There is no instruction at the provided pc
 */
export class InvalidProgramCounterError extends AvmExecutionError {
  constructor(pc: number, max: number) {
    super(`Invalid program counter ${pc}, max is ${max}`);
    this.name = 'InvalidProgramCounterError';
  }
}

/**
 * Error is thrown when the program counter points to a byte
 * of an invalid opcode.
 */
export class InvalidOpcodeError extends AvmExecutionError {
  constructor(str: string) {
    super(str);
    this.name = 'InvalidOpcodeError';
  }
}

/**
 * Error is thrown during parsing.
 */
export class AvmParsingError extends AvmExecutionError {
  constructor(str: string) {
    super(str);
    this.name = 'AvmParsingError';
  }
}

/**
 * Error is thrown when the tag has an invalid value.
 */
export class InvalidTagValueError extends AvmExecutionError {
  constructor(tagValue: number) {
    super(`Tag value ${tagValue} is invalid.`);
    this.name = 'InvalidTagValueError';
  }
}

/**
 * Error thrown during an instruction's execution (during its execute()).
 */
export class InstructionExecutionError extends AvmExecutionError {
  constructor(message: string) {
    super(message);
    this.name = 'InstructionExecutionError';
  }
}

/**
 * Error thrown on failed AVM memory tag check.
 */
export class TagCheckError extends AvmExecutionError {
  public static forOffset(offset: number, gotTag: string, expectedTag: string): TagCheckError {
    return new TagCheckError(`Tag mismatch at offset ${offset}, got ${gotTag}, expected ${expectedTag}`);
  }

  public static forTag(gotTag: string, expectedTag: string): TagCheckError {
    return new TagCheckError(`Tag mismatch, got ${gotTag}, expected ${expectedTag}`);
  }

  constructor(message: string) {
    super(message);
    this.name = 'TagCheckError';
  }
}

/**
 * Error is thrown when a relative memory address resolved to an offset which
 * is out of range, i.e, greater than maxUint32.
 */
export class RelativeAddressOutOfRangeError extends AvmExecutionError {
  constructor(baseAddr: number, relOffset: number) {
    super(`Address out of range. Base address ${baseAddr}, relative offset ${relOffset}`);
    this.name = 'RelativeAddressOutOfRangeError';
  }
}

/**
 * Error is thrown when a memory slice contains addresses which are
 * out of range, i.e, greater than maxUint32.
 */
export class MemorySliceOutOfRangeError extends AvmExecutionError {
  constructor(baseAddr: number, size: number) {
    super(`Memory slice is out of range. Base address ${baseAddr}, size ${size}`);
    this.name = 'MemorySliceOutOfRangeError';
  }
}

/** Error thrown when out of gas. */
export class OutOfGasError extends AvmExecutionError {
  constructor(dimensions: string[]) {
    super(`Not enough ${dimensions.map(d => d.toUpperCase()).join(', ')} gas left`);
    this.name = 'OutOfGasError';
  }
}

/**
 * Error is thrown when the supplied points length is not a multiple of 3. Specific for MSM opcode.
 */
export class MSMPointsLengthError extends AvmExecutionError {
  constructor(pointsReadLength: number) {
    super(`Points vector length should be a multiple of 3, was ${pointsReadLength}`);
    this.name = 'MSMPointsLengthError';
  }
}

/**
 * Error is thrown when one of the supplied points does not lie on the Grumpkin curve. Specific for MSM opcode.
 */
export class MSMPointNotOnCurveError extends AvmExecutionError {
  constructor(point: Point) {
    super(`Point ${point.toString()} is not on the curve.`);
    this.name = 'MSMPointNotOnCurveError';
  }
}

/**
 * Error is thrown when some inputs of ToRadixBE are not valid.
 */
export class InvalidToRadixInputsError extends AvmExecutionError {
  constructor(errorString: string) {
    super(errorString);
    this.name = 'InvalidToRadixInputsError';
  }
}

/**
 * Error is thrown when a static call attempts to alter some state
 */
export class StaticCallAlterationError extends InstructionExecutionError {
  constructor() {
    super('Static call cannot update the state, emit L2->L1 messages or generate logs');
    this.name = 'StaticCallAlterationError';
  }
}

/**
 * Meaningfully named alias for ExecutionError when used in the context of the AVM.
 * Maintains a recursive structure reflecting the AVM's external callstack/errorstack, where
 * options.cause is the error that caused this error (if this is not the root-cause itself).
 */
export class AvmRevertReason extends ExecutionError {
  constructor(message: string, failingFunction: FailingFunction, noirCallStack: NoirCallStack, options?: ErrorOptions) {
    super(message, failingFunction, noirCallStack, options);
  }
}
