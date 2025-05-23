#!/bin/sh
# Builds the wasm and copies it into it's location in dest.
# If you want to build the wasm with debug info for stack traces, use NO_STRIP=1.
set -e

cd $(dirname $0)/..

if [ -z "$SKIP_CPP_BUILD" ] && [ "${CI:-0}" -eq 0 ]; then
  parallel --line-buffered --tag 'denoise "../cpp/bootstrap.sh {}"' ::: build_wasm build_wasm_threads
fi

# Copy the wasm to its home in the bb.js dest folder.
# We only need the threads wasm, as node always uses threads.
# We need to take two copies for both esm and cjs builds. You can't use symlinks when publishing.
# This probably isn't a big deal however due to compression.
# When building the browser bundle, both wasms are inlined directly.
mkdir -p ./dest/node/barretenberg_wasm
mkdir -p ./dest/node-cjs/barretenberg_wasm
mkdir -p ./dest/browser/barretenberg_wasm

cp ../cpp/build-wasm-threads/bin/barretenberg.wasm.gz ./dest/node/barretenberg_wasm/barretenberg-threads.wasm.gz
cp ../cpp/build-wasm-threads/bin/barretenberg.wasm.gz ./dest/node-cjs/barretenberg_wasm/barretenberg-threads.wasm.gz
cp ../cpp/build-wasm-threads/bin/barretenberg.wasm.gz ./dest/browser/barretenberg_wasm/barretenberg-threads.wasm.gz
cp ../cpp/build-wasm/bin/barretenberg.wasm.gz ./dest/browser/barretenberg_wasm/barretenberg.wasm.gz
