import os
import json
from concurrent.futures import ProcessPoolExecutor, as_completed
from PIL import Image, ImageFile

Image.MAX_IMAGE_PIXELS = None
ImageFile.LOAD_TRUNCATED_IMAGES = True

FALLBACKS = {
    'FC-448': r"Fresh-Ceramics-Assets\products\Tiles Images of Fresh Ceramics\Wall Tiles\30X60 Glossy Punch\W 6001\W 6001-1\W 6001 set\W 6001 set\WD 6001-01.jpg",
    'FC-452': r"Fresh-Ceramics-Assets\products\Tiles Images of Fresh Ceramics\Wall Tiles\30X60 Glossy Punch\W 6002\W 6002 P set\W 6002 P set\W 6002 P DGY.jpg",
    'FC-454': r"Fresh-Ceramics-Assets\products\Tiles Images of Fresh Ceramics\Wall Tiles\30X60 Glossy Punch\W 6002\W 6002 P set\W 6002 P set\W 6002 P LGY.jpg",
    'FC-462': r"Fresh-Ceramics-Assets\products\Tiles Images of Fresh Ceramics\Wall Tiles\30X60 Glossy Punch\W 6003\W 6003 set\W 6003 set\W 6003 LBE.jpg",
    'FC-467': r"Fresh-Ceramics-Assets\products\Tiles Images of Fresh Ceramics\Wall Tiles\30X60 Glossy Punch\W 6007 P set\1x\1x\Asset 5-8.png",
}

def clean_rgb(im):
    if im.mode == "RGB":
        return im
    if im.mode == "RGBA":
        bg = Image.new("RGB", im.size, (255, 255, 255))
        bg.paste(im, mask=im.split()[3])
        return bg
    return im.convert("RGB")

def process_single_tile(item):
    p, tiles_dir = item
    pid = p["id"]
    cat = p.get("category", "")
    sz = p.get("size", "")
    slug = p.get("slug", pid.lower())

    if pid in FALLBACKS:
        src = FALLBACKS[pid]
    else:
        rel = p["image"].lstrip("/").replace("/", os.sep)
        p1 = os.path.join("public", rel)
        p2 = os.path.join(".", rel)
        p3 = os.path.join("Fresh-Ceramics-Assets", "products", rel.replace(f"assets{os.sep}products{os.sep}", ""))
        src = None
        for cand in [p1, p2, p3]:
            if os.path.exists(cand) and os.path.getsize(cand) > 0:
                src = cand
                break
    
    if not src or not os.path.exists(src) or os.path.getsize(src) == 0:
        return (pid, False, f"Missing source: {p.get('image')}", p)

    filename = f"{slug}-{pid.lower()}.webp"
    dest_path = os.path.join(tiles_dir, filename)

    try:
        with Image.open(src) as raw_im:
            im = clean_rgb(raw_im)
            w, h = im.size

            # 1. Orientation rules based on physical dimensions:
            # Wall Tiles: Size is Height x Width -> Physically horizontal (width > height)
            if cat == "Wall Tiles":
                if h > w:
                    im = im.transpose(Image.Transpose.ROTATE_270)
                
                # Update physical metadata
                if "30x60" in sz:
                    p["widthCm"] = 60
                    p["heightCm"] = 30
                    p["aspectRatio"] = "2/1"
                    p["aspectLabel"] = "2:1 Horizontal"
                elif "30x50" in sz:
                    p["widthCm"] = 50
                    p["heightCm"] = 30
                    p["aspectRatio"] = "5/3"
                    p["aspectLabel"] = "5:3 Horizontal"
                elif "30x45" in sz:
                    p["widthCm"] = 45
                    p["heightCm"] = 30
                    p["aspectRatio"] = "3/2"
                    p["aspectLabel"] = "3:2 Horizontal"
                elif "25x40" in sz:
                    p["widthCm"] = 40
                    p["heightCm"] = 25
                    p["aspectRatio"] = "8/5"
                    p["aspectLabel"] = "8:5 Horizontal"
                elif "20x30" in sz:
                    p["widthCm"] = 30
                    p["heightCm"] = 20
                    p["aspectRatio"] = "3/2"
                    p["aspectLabel"] = "3:2 Horizontal"
            
            # Floor Tiles: Size is Width x Height
            elif cat == "Floor Tiles":
                if "60x120" in sz:
                    # 60cm width x 120cm height -> vertical monolith (height > width)
                    if w > h:
                        im = im.transpose(Image.Transpose.ROTATE_270)
                    p["widthCm"] = 60
                    p["heightCm"] = 120
                    p["aspectRatio"] = "1/2"
                    p["aspectLabel"] = "1:2 Vertical Monolith"
                elif "30x60" in sz or "stair" in p.get("subCategory", "").lower() or "stair" in p.get("surface", "").lower():
                    # Stair tiles: 60 width x 30 height -> horizontal tread (width > height)
                    if h > w:
                        im = im.transpose(Image.Transpose.ROTATE_270)
                    p["widthCm"] = 60
                    p["heightCm"] = 30
                    p["aspectRatio"] = "2/1"
                    p["aspectLabel"] = "2:1 Stair Tread"
                else:
                    # Square floor tiles: 30x30, 40x40, 60x60, 80x80
                    p["aspectRatio"] = "1/1"
                    p["aspectLabel"] = "1:1 Square"

            # 2. Resizing with ZERO CROPPING and ZERO STRETCHING
            max_edge = 1200
            if max(im.size) > max_edge:
                im.thumbnail((max_edge, max_edge), Image.Resampling.LANCZOS)

            # 3. Output WebP (method=4 is high quality and 5x faster than method=6)
            im.save(dest_path, "WEBP", quality=84, method=4)

            # 4. Update image path
            p["image"] = f"/tiles/{filename}"
            return (pid, True, dest_path, p)

    except Exception as e:
        return (pid, False, str(e), p)

def main():
    json_path = os.path.join("src", "data", "products.json")
    tiles_dir = os.path.join("public", "tiles")
    os.makedirs(tiles_dir, exist_ok=True)

    with open(json_path, "r", encoding="utf-8") as f:
        products = json.load(f)

    print(f"Loaded {len(products)} products from {json_path}", flush=True)

    items = [(p, tiles_dir) for p in products]
    updated_products_dict = {}

    success_count = 0
    fail_count = 0

    print("Starting parallel conversion with 8 workers...", flush=True)
    with ProcessPoolExecutor(max_workers=8) as executor:
        futures = {executor.submit(process_single_tile, item): item[0]["id"] for item in items}
        total = len(futures)
        completed = 0
        for f in as_completed(futures):
            pid, ok, info, updated_p = f.result()
            completed += 1
            if ok:
                success_count += 1
                updated_products_dict[pid] = updated_p
            else:
                fail_count += 1
                print(f"FAILED {pid}: {info}", flush=True)
            
            if completed % 50 == 0 or completed == total:
                print(f"Completed {completed}/{total} tiles...", flush=True)

    print(f"\nTile processing finished!", flush=True)
    print(f"Success: {success_count}, Fail: {fail_count}", flush=True)

    # Reassemble products list in original order
    final_products = [updated_products_dict.get(p["id"], p) for p in products]

    with open(json_path, "w", encoding="utf-8") as f:
        json.dump(final_products, f, indent=2, ensure_ascii=False)

    print(f"Updated {json_path} with {len(final_products)} products!", flush=True)

if __name__ == "__main__":
    main()
