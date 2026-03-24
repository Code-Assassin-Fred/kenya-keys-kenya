import zipfile

# Paths to your ZIP files in Google Drive
zip_files = [
    '/content/drive/Shared drives/NEFER_CVPR23/event_frames.zip',
    '/content/drive/Shared drives/NEFER_CVPR23/event_raw.zip',
    '/content/drive/Shared drives/NEFER_CVPR23/rgb_frames.zip'
]

# Function to print full structure of a ZIP file
def print_zip_structure(zip_path):
    print(f"\nStructure of: {zip_path}\n" + "-"*60)
    with zipfile.ZipFile(zip_path, 'r') as zip_ref:
        all_files = zip_ref.namelist()
        for f in all_files:
            print(f)
    print("-"*60 + "\n")

# Iterate through all zip files and print their structures
for zip_path in zip_files:
    print_zip_structure(zip_path)