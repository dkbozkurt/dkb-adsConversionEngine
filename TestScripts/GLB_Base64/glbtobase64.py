import os
import base64

def glb_to_base64(file_path):
    try:
        with open(file_path, "rb") as file:
            glb_bytes = file.read()
            base64_encoded = base64.b64encode(glb_bytes).decode("utf-8")
            return base64_encoded
    except FileNotFoundError:
        print("File not found.")
        return None
    except Exception as e:
        print("An error occurred:", e)
        return None

def save_base64_to_txt(base64_string, file_path):
    try:
        with open(file_path, "w") as file:
            file.write(base64_string)
            print("Base64 encoded string saved to:", file_path)
    except Exception as e:
        print("An error occurred while saving to file:", e)

if __name__ == "__main__":
    file_path = input("Enter the path to the .glb file: ")
    base64_string = glb_to_base64(file_path)
    if base64_string:
        print("Base64 encoded string:")
        print(base64_string)
        file_name = os.path.splitext(os.path.basename(file_path))[0] + ".txt"
        save_path = os.path.join(os.path.dirname(__file__), file_name)
        save_base64_to_txt(base64_string, save_path)
