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

def read_base64_from_file(file_path):
    with open(file_path, 'r') as f:
        base64_data = f.read()
    return base64_data

def main():
    # Prompt the user to enter the file path
    file_path = input("Enter the file path containing Base64 data: ")

    # Validate if the file exists
    if not os.path.exists(file_path):
        print("Error: File not found.")
        return

    # Read Base64 data from the specified file
    base64_data = read_base64_from_file(file_path)

    # Output .glb file
    output_file = "outputGLB.glb"

    # Convert Base64 to .glb
    base64_to_glb(base64_data, output_file)
    print("Conversion completed. GLB file saved as 'output2.glb'.")

if __name__ == "__main__":
    main()
