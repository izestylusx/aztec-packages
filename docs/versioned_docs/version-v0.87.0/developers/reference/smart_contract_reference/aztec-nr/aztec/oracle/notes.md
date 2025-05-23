## Standalone Functions

### notify_created_note

```rust
notify_created_note(storage_slot, note_type_id, packed_note, note_hash, counter, );
```

/ transaction. This note should only be added to the non-volatile database if found in an actual block.

#### Parameters
| Name | Type |
| --- | --- |
| storage_slot | Field |
| note_type_id | Field |
| packed_note | [Field; N] |
| note_hash | Field |
| counter | u32 |
|  |  |

### notify_nullified_note

```rust
notify_nullified_note(nullifier, note_hash, counter);
```

/ actual block.

#### Parameters
| Name | Type |
| --- | --- |
| nullifier | Field |
| note_hash | Field |
| counter | u32 |

### notify_created_nullifier

```rust
notify_created_nullifier(nullifier);
```

/ Notifies the simulator that a non-note nullifier has been created, so that it can be used for note nonces.

#### Parameters
| Name | Type |
| --- | --- |
| nullifier | Field |

### notify_created_note_oracle_wrapper

```rust
notify_created_note_oracle_wrapper(storage_slot, note_type_id, packed_note, note_hash, counter, );
```

#### Parameters
| Name | Type |
| --- | --- |
| storage_slot | Field |
| note_type_id | Field |
| packed_note | [Field; N] |
| note_hash | Field |
| counter | u32 |
|  |  |

### notify_created_note_oracle

```rust
notify_created_note_oracle(_storage_slot, _note_type_id, _packed_note, _note_hash, _counter, );
```

#### Parameters
| Name | Type |
| --- | --- |
| _storage_slot | Field |
| _note_type_id | Field |
| _packed_note | [Field; N] |
| _note_hash | Field |
| _counter | u32 |
|  |  |

### notify_nullified_note_oracle_wrapper

```rust
notify_nullified_note_oracle_wrapper(nullifier, note_hash, counter, );
```

#### Parameters
| Name | Type |
| --- | --- |
| nullifier | Field |
| note_hash | Field |
| counter | u32 |
|  |  |

### notify_nullified_note_oracle

```rust
notify_nullified_note_oracle(_nullifier, _note_hash, _counter);
```

#### Parameters
| Name | Type |
| --- | --- |
| _nullifier | Field |
| _note_hash | Field |
| _counter | u32 |

### notify_created_nullifier_oracle_wrapper

```rust
notify_created_nullifier_oracle_wrapper(nullifier);
```

#### Parameters
| Name | Type |
| --- | --- |
| nullifier | Field |

### notify_created_nullifier_oracle

```rust
notify_created_nullifier_oracle(_nullifier);
```

#### Parameters
| Name | Type |
| --- | --- |
| _nullifier | Field |

### get_notes_oracle

```rust
get_notes_oracle(_storage_slot, _num_selects, _select_by_indexes, _select_by_offsets, _select_by_lengths, _select_values, _select_comparators, _sort_by_indexes, _sort_by_offsets, _sort_by_lengths, _sort_order, _limit, _offset, _status, // This is always set to MAX_NOTES. We need to pass it to TS in order to correctly construct the BoundedVec
    _max_notes, // This is always set to NOTE_PCKD_LEN + RETRIEVED_NOTE_OVERHEAD. We need to pass it to TS in order to be able to
    // correctly construct the BoundedVec there.
    _packed_retrieved_note_length, );
```

#### Parameters
| Name | Type |
| --- | --- |
| _storage_slot | Field |
| _num_selects | u8 |
| _select_by_indexes | [u8; M] |
| _select_by_offsets | [u8; M] |
| _select_by_lengths | [u8; M] |
| _select_values | [Field; M] |
| _select_comparators | [u8; M] |
| _sort_by_indexes | [u8; M] |
| _sort_by_offsets | [u8; M] |
| _sort_by_lengths | [u8; M] |
| _sort_order | [u8; M] |
| _limit | u32 |
| _offset | u32 |
| _status | u8 |
| // This is always set to MAX_NOTES. We need to pass it to TS in order to correctly construct the BoundedVec
    _max_notes | u32 |
| // This is always set to NOTE_PCKD_LEN + RETRIEVED_NOTE_OVERHEAD. We need to pass it to TS in order to be able to
    // correctly construct the BoundedVec there.
    _packed_retrieved_note_length | u32 |
|  |  |

### get_notes

```rust
get_notes(storage_slot, num_selects, select_by_indexes, select_by_offsets, select_by_lengths, select_values, select_comparators, sort_by_indexes, sort_by_offsets, sort_by_lengths, sort_order, limit, offset, status, );
```

#### Parameters
| Name | Type |
| --- | --- |
| storage_slot | Field |
| num_selects | u8 |
| select_by_indexes | [u8; M] |
| select_by_offsets | [u8; M] |
| select_by_lengths | [u8; M] |
| select_values | [Field; M] |
| select_comparators | [u8; M] |
| sort_by_indexes | [u8; M] |
| sort_by_offsets | [u8; M] |
| sort_by_lengths | [u8; M] |
| sort_order | [u8; M] |
| limit | u32 |
| offset | u32 |
| status | u8 |
|  |  |

### check_nullifier_exists

```rust
check_nullifier_exists(inner_nullifier);
```

#### Parameters
| Name | Type |
| --- | --- |
| inner_nullifier | Field |

### check_nullifier_exists_oracle

```rust
check_nullifier_exists_oracle(_inner_nullifier);
```

#### Parameters
| Name | Type |
| --- | --- |
| _inner_nullifier | Field |

### get_app_tag_as_sender

```rust
get_app_tag_as_sender(sender, recipient);
```

#### Parameters
| Name | Type |
| --- | --- |
| sender | AztecAddress |
| recipient | AztecAddress |

### get_indexed_tagging_secret_as_sender_oracle

```rust
get_indexed_tagging_secret_as_sender_oracle(_sender, _recipient, );
```

#### Parameters
| Name | Type |
| --- | --- |
| _sender | AztecAddress |
| _recipient | AztecAddress |
|  |  |

### increment_app_tagging_secret_index_as_sender

```rust
increment_app_tagging_secret_index_as_sender(sender, recipient);
```

/ that are not found by the recipient.

#### Parameters
| Name | Type |
| --- | --- |
| sender | AztecAddress |
| recipient | AztecAddress |

### increment_app_tagging_secret_index_as_sender_wrapper

```rust
increment_app_tagging_secret_index_as_sender_wrapper(sender, recipient, );
```

#### Parameters
| Name | Type |
| --- | --- |
| sender | AztecAddress |
| recipient | AztecAddress |
|  |  |

### increment_app_tagging_secret_index_as_sender_oracle

```rust
increment_app_tagging_secret_index_as_sender_oracle(_sender, _recipient, );
```

#### Parameters
| Name | Type |
| --- | --- |
| _sender | AztecAddress |
| _recipient | AztecAddress |
|  |  |

