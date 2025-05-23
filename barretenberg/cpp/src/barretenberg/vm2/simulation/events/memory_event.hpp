#pragma once

#include <cstdint>

#include "barretenberg/vm2/common/memory_types.hpp"

namespace bb::avm2::simulation {

enum class MemoryMode {
    READ,
    WRITE,
};

struct MemoryEvent {
    MemoryMode mode;
    MemoryAddress addr;
    MemoryValue value;
    uint32_t space_id;
};

} // namespace bb::avm2::simulation
