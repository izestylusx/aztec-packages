// === AUDIT STATUS ===
// internal:    { status: not started, auditors: [], date: YYYY-MM-DD }
// external_1:  { status: not started, auditors: [], date: YYYY-MM-DD }
// external_2:  { status: not started, auditors: [], date: YYYY-MM-DD }
// =====================

#pragma once
#include <cstddef>
#include <cstdint>

namespace bb::numeric {

constexpr inline uint64_t rotate64(const uint64_t value, const uint64_t rotation)
{
    return rotation != 0U ? (value >> rotation) + (value << (64 - rotation)) : value;
}

constexpr inline uint32_t rotate32(const uint32_t value, const uint32_t rotation)
{
    return rotation != 0U ? (value >> rotation) + (value << (32 - rotation)) : value;
}
} // namespace bb::numeric