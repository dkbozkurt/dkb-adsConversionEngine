def merge_files(html_file_path, css_file_path, js_file_path, output_file_path):
    # Read contents of HTML, CSS, and JavaScript files
    with open(html_file_path, 'r') as html_file:
        html_content = html_file.read()
    
    with open(css_file_path, 'r') as css_file:
        css_content = css_file.read()
    
    with open(js_file_path, 'r') as js_file:
        js_content = js_file.read()
    
    # Combine HTML, CSS, and JavaScript contents
    merged_content = f"""<html>
<head>
    <style>
        {css_content}
    </style>
</head>
<body>
    {html_content}
    <script>
        {js_content}
    </script>
</body>
</html>"""

    # Write the merged content to the output file
    with open(output_file_path, 'w') as output_file:
        output_file.write(merged_content)

# Example usage:
html_file_path = './test.html'
css_file_path = './test.css'
js_file_path = './test.js'
output_file_path = 'merged.html'

merge_files(html_file_path, css_file_path, js_file_path, output_file_path)
print(f"Merged file saved to '{output_file_path}'")