import { MAX_FIELD_VALUE } from '@aztec/constants';
import { makeTuple } from '@aztec/foundation/array';
import { Fr } from '@aztec/foundation/fields';
import type { Tuple } from '@aztec/foundation/serialize';

import type { IsEmpty } from './interfaces.js';
import {
  countAccumulatedItems,
  getNonEmptyItems,
  isEmptyArray,
  mergeAccumulatedData,
  sortByCounter,
} from './order_and_comparison.js';

class TestItem {
  constructor(
    public value: number,
    public counter = 0,
    public position = Fr.ZERO,
  ) {}

  static empty() {
    return new TestItem(0);
  }

  isEmpty() {
    return !this.value && !this.counter && Fr.isZero(this.position);
  }
}

describe('utils', () => {
  const expectEmptyArrays = (arr: IsEmpty[]) => {
    arr.forEach(item => expect(item.isEmpty()).toBe(true));
  };

  describe('countAccumulatedItems', () => {
    it('counts the number of non-empty items', () => {
      const arr = makeTuple(20, TestItem.empty);
      const num = 6;
      for (let i = 0; i < num; ++i) {
        arr[i] = new TestItem(i + 1);
      }
      expect(countAccumulatedItems(arr)).toBe(num);
    });

    it('throws if arr contains non-continuous non-empty items', () => {
      const arr = makeTuple(20, TestItem.empty);
      arr[1] = new TestItem(123);
      expect(() => countAccumulatedItems(arr)).toThrow('Non-empty items must be placed continuously from index 0.');
    });
  });

  describe('mergeAccumulatedData', () => {
    const length = 5;
    let arr0: Tuple<TestItem, typeof length>;
    let arr1: Tuple<TestItem, typeof length>;

    beforeEach(() => {
      arr0 = makeTuple(length, TestItem.empty);
      arr1 = makeTuple(length, TestItem.empty);
    });

    it('propagates items from arr0', () => {
      arr0[0] = new TestItem(12);
      arr0[1] = new TestItem(34);
      const res = mergeAccumulatedData(arr0, arr1);
      expect(res.slice(0, 2)).toEqual([arr0[0], arr0[1]]);
      expectEmptyArrays(res.slice(2));
    });

    it('propagates items from arr1', () => {
      arr1[0] = new TestItem(1);
      arr1[1] = new TestItem(2);
      const res = mergeAccumulatedData(arr0, arr1);
      expect(res.slice(0, 2)).toEqual([arr1[0], arr1[1]]);
      expectEmptyArrays(res.slice(2));
    });

    it('merges items from both arrays', () => {
      arr0[0] = new TestItem(12);
      arr0[1] = new TestItem(34);
      arr1[0] = new TestItem(1);
      arr1[1] = new TestItem(2);
      const res = mergeAccumulatedData(arr0, arr1);
      expect(res.slice(0, 4)).toEqual([arr0[0], arr0[1], arr1[0], arr1[1]]);
      expectEmptyArrays(res.slice(4));
    });

    it('throws if arr0 contains non-continuous items', () => {
      arr0[0] = new TestItem(12);
      arr0[2] = new TestItem(34);
      expect(() => mergeAccumulatedData(arr0, arr1)).toThrow(
        'Non-empty items must be placed continuously from index 0.',
      );
    });

    it('throws if arr1 contains non-continuous items', () => {
      arr1[0] = new TestItem(12);
      arr1[2] = new TestItem(34);
      expect(() => mergeAccumulatedData(arr0, arr1)).toThrow(
        'Non-empty items must be placed continuously from index 0.',
      );
    });

    it('throws if total number of items exceeds limit', () => {
      for (let i = 0; i < length; ++i) {
        arr0[i] = new TestItem(i + 1);
      }
      expect(mergeAccumulatedData(arr0, arr1)).toBeDefined();

      arr1[0] = new TestItem(1234);
      expect(() => mergeAccumulatedData(arr0, arr1)).toThrow('Combined non-empty items exceeded the maximum allowed.');
    });
  });

  describe('sortByCounter', () => {
    it('sorts descending items in ascending order', () => {
      // Original array is in descending order.
      const arr: TestItem[] = [];
      for (let i = 0; i < 6; ++i) {
        arr[i] = new TestItem(i, 100 - i);
      }

      const sorted = sortByCounter(arr);

      for (let i = 1; i < arr.length; ++i) {
        expect(sorted[i].counter).toBeGreaterThan(sorted[i - 1].counter);
      }
      expect(sorted).toEqual(arr.slice().reverse());
    });

    it('sorts ascending items in ascending order', () => {
      const arr: TestItem[] = [];
      for (let i = 0; i < 6; ++i) {
        arr[i] = new TestItem(i, i + 1);
      }

      const sorted = sortByCounter(arr);

      for (let i = 1; i < arr.length; ++i) {
        expect(sorted[i].counter).toBeGreaterThan(sorted[i - 1].counter);
      }
      expect(sorted).toEqual(arr);
    });

    it('sorts random items in ascending order', () => {
      const arr: TestItem[] = [
        new TestItem(2, 13),
        new TestItem(3, 328),
        new TestItem(4, 4),
        new TestItem(5, 59),
        new TestItem(6, 1),
      ];

      const sorted = sortByCounter(arr);

      expect(sorted).toEqual([
        new TestItem(6, 1),
        new TestItem(4, 4),
        new TestItem(2, 13),
        new TestItem(5, 59),
        new TestItem(3, 328),
      ]);
    });

    it('sorts random items and keep empty items to the right', () => {
      const arr: TestItem[] = [
        new TestItem(2, 13),
        new TestItem(3, 328),
        new TestItem(4, 4),
        new TestItem(5, 59),
        new TestItem(6, 1),
        TestItem.empty(),
        TestItem.empty(),
      ];

      const sorted = sortByCounter(arr);

      expect(sorted).toEqual([
        new TestItem(6, 1),
        new TestItem(4, 4),
        new TestItem(2, 13),
        new TestItem(5, 59),
        new TestItem(3, 328),
        TestItem.empty(),
        TestItem.empty(),
      ]);
    });

    it('sorts random items and pads empty items to the right', () => {
      const arr: TestItem[] = [
        TestItem.empty(),
        new TestItem(2, 13),
        new TestItem(3, 328),
        new TestItem(4, 4),
        new TestItem(5, 59),
        TestItem.empty(),
        new TestItem(6, 1),
      ];

      const sorted = sortByCounter(arr);

      expect(sorted).toEqual([
        new TestItem(6, 1),
        new TestItem(4, 4),
        new TestItem(2, 13),
        new TestItem(5, 59),
        new TestItem(3, 328),
        TestItem.empty(),
        TestItem.empty(),
      ]);
    });
  });

  describe('isEmptyArray', () => {
    it('returns true if all items in an array are empty', () => {
      const arr = [TestItem.empty(), TestItem.empty(), TestItem.empty()];
      expect(isEmptyArray(arr)).toBe(true);
    });

    it('returns false if at least one item in an array is not empty', () => {
      {
        const arr = [new TestItem(0, 1), TestItem.empty(), TestItem.empty()];
        expect(isEmptyArray(arr)).toBe(false);
      }

      {
        const arr = [TestItem.empty(), TestItem.empty(), new TestItem(1, 0)];
        expect(isEmptyArray(arr)).toBe(false);
      }
    });
  });

  describe('getNonEmptyItems', () => {
    it('returns non empty items in an array', () => {
      const arr = [new TestItem(0, 1), TestItem.empty(), new TestItem(2, 0), TestItem.empty()];
      expect(getNonEmptyItems(arr)).toEqual([new TestItem(0, 1), new TestItem(2, 0)]);
    });

    it('returns empty array if all items are empty', () => {
      const arr = [TestItem.empty(), TestItem.empty(), TestItem.empty()];
      expect(getNonEmptyItems(arr)).toEqual([]);
    });
  });

  describe('Constants', () => {
    it('fr.max and const.max should be in sync', () => {
      expect(new Fr(MAX_FIELD_VALUE)).toEqual(Fr.MAX_FIELD_VALUE);
      expect(new Fr(MAX_FIELD_VALUE)).toEqual(Fr.ONE.negate());
    });
  });
});
