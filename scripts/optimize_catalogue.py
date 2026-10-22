import os
import io
import pymupdf
from PIL import Image

input_path = r"Fresh-Ceramics-Assets\catalogue\FRESH CERAMICS 2026.pdf"
output_dir = r"public\catalogue"
output_path = os.path.join(output_dir, "FRESH-CERAMICS-2026.pdf")

os.makedirs(output_dir, exist_ok=True)

print(f"Opening {input_path}...")
doc = pymupdf.open(input_path)
total_pages = len(doc)
print(f"Total pages: {total_pages}")

processed_xrefs = set()

for page_idx in range(total_pages):
    page = doc[page_idx]
    image_list = page.get_images(full=True)
    for img in image_list:
        xref = img[0]
        if xref in processed_xrefs:
            continue
        processed_xrefs.add(xref)
        try:
            base = doc.extract_image(xref)
            if not base or "image" not in base:
                continue
            
            im = Image.open(io.BytesIO(base["image"]))
            if im.mode not in ("RGB", "L"):
                im = im.convert("RGB")
            
            # Target resolution: max dimension 1500px, quality 72
            # High crispness for reading specs, diagrams, and tile swatches
            max_dim = 1500
            if max(im.size) > max_dim:
                im.thumbnail((max_dim, max_dim), Image.Resampling.LANCZOS)
            
            buf = io.BytesIO()
            im.save(buf, format="JPEG", quality=72, optimize=True)
            page.replace_image(xref, stream=buf.getvalue())
        except Exception as e:
            print(f"Warning on page {page_idx + 1}, xref {xref}: {e}")

    if (page_idx + 1) % 10 == 0 or (page_idx + 1) == total_pages:
        print(f"Processed {page_idx + 1}/{total_pages} pages...", flush=True)

print(f"Saving optimized PDF to {output_path}...")
doc.save(output_path, garbage=4, deflate=True, clean=True)
doc.close()

original_sz = os.path.getsize(input_path) / (1024 * 1024)
new_sz = os.path.getsize(output_path) / (1024 * 1024)
print(f"PDF Optimization complete!")
print(f"Original size: {original_sz:.2f} MB")
print(f"Optimized size: {new_sz:.2f} MB")
