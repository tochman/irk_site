#!/bin/bash
# Script to remove fallbacks from t() function calls

cd /Users/thomasochman/Projects/Skancia/rekonstruktion

# Function to process each file
process_file() {
    local file="$1"
    echo "Processing $file..."
    
    # Use perl for more sophisticated regex replacement
    perl -i -pe 's/t\(\s*(['\''"][^'\''",]*['\''"])\s*,\s*['\''"][^'\'']*['\''"]?\s*\)/t($1)/g' "$file"
}

# Find all JSX and JS files and process them
find src/ -name "*.jsx" -o -name "*.js" | while read file; do
    if grep -q "t(" "$file"; then
        process_file "$file"
    fi
done

echo "Done! Fallbacks removed from all t() calls."
