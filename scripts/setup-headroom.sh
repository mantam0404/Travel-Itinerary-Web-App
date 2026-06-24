#!/usr/bin/env bash
# Install Headroom (https://github.com/headroomlabs-ai/headroom) for Cursor
set -euo pipefail

echo "==> Installing Headroom..."

if command -v apt-get >/dev/null 2>&1; then
  if ! dpkg -s python3-dev >/dev/null 2>&1; then
    echo "    Installing python3-dev (required for some dependencies)..."
    sudo apt-get update -qq
    sudo apt-get install -y python3-dev
  fi
fi

pip install --user "headroom-ai[proxy,mcp]"

export PATH="${HOME}/.local/bin:${PATH}"

if ! command -v headroom >/dev/null 2>&1; then
  echo "ERROR: headroom not found. Add to your shell profile:"
  echo '  export PATH="${HOME}/.local/bin:${PATH}"'
  exit 1
fi

echo "==> Headroom $(headroom --version)"
echo "==> MCP config: .cursor/mcp.json (already in this repo)"
echo ""
echo "Next steps:"
echo "  1. Add to ~/.bashrc or ~/.zshrc:"
echo '       export PATH="${HOME}/.local/bin:${PATH}"'
echo "  2. Start Headroom + get Cursor API settings:"
echo "       cd $(pwd) && headroom wrap cursor"
echo "  3. In Cursor → Settings → Models:"
echo "       Override OpenAI Base URL → http://127.0.0.1:8787/p/<project>/v1"
echo "       (exact URL printed by 'headroom wrap cursor')"
echo "  4. Restart Cursor to load MCP server"
echo ""
echo "Optional: headroom perf   # view compression stats"
echo "Optional: headroom dashboard   # live savings (proxy must be running)"
