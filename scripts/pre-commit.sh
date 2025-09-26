#!/bin/bash

# Check if Git LFS is installed
if ! command -v git-lfs &> /dev/null; then
  echo "Git LFS is not installed. Skipping large file check."
  exit 0
fi

# Check for files larger than 1MB (1048576 bytes) in staged files
git diff --cached --name-only --diff-filter=A | while read -r file; do
  if [ -f "$file" ]; then
    # Get file size (compatible with both macOS and Linux)
    size=$(stat -f%z "$file" 2>/dev/null || stat -c%s "$file" 2>/dev/null)

    if [ "$size" -gt 1048576 ]; then
      echo "Large file detected: $file ($(($size / 1024 / 1024))MB)"
      echo "Adding to Git LFS..."

      # Add file to Git LFS tracking
      git lfs track "$file"

      # Stage the .gitattributes file if it was created/modified
      git add .gitattributes

      # Remove the file from regular git staging and re-add it
      git restore --staged "$file"
      git add "$file"

      echo "i$file is now tracked by Git LFS"
    fi
  fi
done