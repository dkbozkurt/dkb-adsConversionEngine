import base64
import os

def base64_to_glb(base64_data, output_file):
    # Decode the Base64 data
    decoded_data = base64.b64decode(base64_data)

    # Get the current directory
    current_dir = os.path.dirname(__file__)

    # Write the decoded data to a .glb file in the same directory as the script
    output_path = os.path.join(current_dir, output_file)
    with open(output_path, 'wb') as f:
        f.write(decoded_data)

# Example Base64 data
base64_data = ""

# Output .glb file
output_file = "output2.glb"

# Convert Base64 to .glb
base64_to_glb(base64_data, output_file)
