#!/bin/bash

IMG_DIR="imgs"
OUTPUT="js/data.js"

mkdir -p js

echo "const imageData = {" > "$OUTPUT"

first_folder=true

for dir in "$IMG_DIR"/*/; do
    folder=$(basename "$dir")

    if [ "$first_folder" = true ]; then
        first_folder=false
    else
        echo "," >> "$OUTPUT"
    fi

    echo -n "  \"$folder\": [" >> "$OUTPUT"

    first_img=true

    for img in "$dir"*; do
        file=$(basename "$img")

        case "$file" in
            *.jpg|*.jpeg|*.png|*.webp|*.gif)
                if [ "$first_img" = true ]; then
                    first_img=false
                else
                    echo -n "," >> "$OUTPUT"
                fi

                echo -n "\"$file\"" >> "$OUTPUT"
            ;;
        esac
    done

    echo -n "]" >> "$OUTPUT"
done

echo "" >> "$OUTPUT"
echo "};" >> "$OUTPUT"

echo "data.js updated."