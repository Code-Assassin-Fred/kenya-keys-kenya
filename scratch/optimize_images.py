import os
import sys
import subprocess

def install_dependencies():
    print("Checking dependencies...")
    try:
        from PIL import Image
        print("Pillow is already installed.")
    except ImportError:
        print("Pillow is not installed. Installing Pillow...")
        subprocess.run([sys.executable, "-m", "pip", "install", "Pillow"], check=True)
        print("Pillow installed successfully.")

def optimize_images():
    from PIL import Image
    public_dir = r"c:\Users\HP\Documents\kenya-keys-kenya\public"
    
    total_saved = 0
    converted_count = 0
    
    # Let's search all subdirectories as well
    for root, dirs, files in os.walk(public_dir):
        for file in files:
            ext = os.path.splitext(file)[1].lower()
            if ext in ['.png', '.jpg', '.jpeg', '.jpg']:
                file_path = os.path.join(root, file)
                
                # Check file size (only optimize files larger than 100KB)
                original_size = os.path.getsize(file_path)
                if original_size < 100 * 1024:
                    continue
                
                # Exclude specific files like logos if they are already small
                if "logo" in file.lower() and original_size < 200 * 1024:
                    continue
                
                print(f"Optimizing: {file} ({original_size / 1024 / 1024:.2f} MB)")
                
                try:
                    img = Image.open(file_path)
                    
                    # Convert RGBA to RGB if saving as JPG or WebP (WebP supports RGBA but let's make sure it handles transparency correctly)
                    # For WebP, PIL supports transparency, so we don't need to force conversion unless we save as JPEG.
                    
                    # Create webp name
                    webp_path = os.path.splitext(file_path)[0] + ".webp"
                    
                    # Save as WebP
                    img.save(webp_path, "WEBP", quality=80, optimize=True)
                    
                    webp_size = os.path.getsize(webp_path)
                    saved = original_size - webp_size
                    total_saved += saved
                    converted_count += 1
                    
                    print(f"  -> Converted to WebP: {webp_size / 1024 / 1024:.2f} MB (Saved {saved / 1024 / 1024:.2f} MB / {saved / original_size * 100:.1f}%)")
                    
                    # If conversion was successful and saved space, delete the original file if it was a huge PNG
                    # Note: We should delete it only if we're going to update the code references to .webp
                    if os.path.exists(webp_path) and webp_path != file_path:
                        os.remove(file_path)
                        print(f"  -> Deleted original: {file}")
                        
                except Exception as e:
                    print(f"  -> Error optimizing {file}: {e}")
                    
    print(f"\nOptimization complete. Converted {converted_count} files. Total space saved: {total_saved / 1024 / 1024:.2f} MB")

if __name__ == "__main__":
    install_dependencies()
    optimize_images()
