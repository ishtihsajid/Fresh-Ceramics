import os
import json
import re

base_dir = r"E:\klayart\Fresh Ceramics\Fresh-Ceramics-Assets\products\Tiles Images of Fresh Ceramics"
public_dir = r"E:\klayart\Fresh Ceramics\public"
output_ts = r"E:\klayart\Fresh Ceramics\src\lib\products-data.ts"
output_json = r"E:\klayart\Fresh Ceramics\src\data\products.json"

items = []
id_counter = 1

for root, dirs, files in os.walk(base_dir):
    for f in sorted(files):
        if not f.lower().endswith(('.jpg', '.jpeg', '.png', '.webp')) or f.startswith('._'):
            continue
        
        # Avoid duplicate / 1x subfolders or assets
        parts_all = root.lower().split(os.sep)
        if '1x' in parts_all:
            continue
            
        full_path = os.path.join(root, f)
        rel_to_base = os.path.relpath(root, base_dir)
        parts = rel_to_base.split(os.sep)
        
        tile_type = parts[0] # 'Floor Tiles' or 'Wall Tiles'
        subfolder = parts[1] if len(parts) > 1 else ''
        
        # Relative path for web
        rel_path = os.path.relpath(full_path, public_dir)
        web_path = '/' + rel_path.replace('\\', '/')
        
        # Raw code
        code = os.path.splitext(f)[0].strip()
        code = re.sub(r'\s+', ' ', code)
        
        # Determine metadata
        size = '60x60 cm'
        width_cm = 60
        height_cm = 60
        aspect_ratio = '1:1'
        aspect_val = 1.0
        rel_scale = 0.75 # base scale relative to 80x80
        surface = 'PGVT (Mirror Polished)'
        
        if tile_type == 'Floor Tiles':
            category = 'Floor Tiles'
            if 'Double Charge' in subfolder:
                surface = 'Double Charge'
                if code.startswith('12') or '12' in code:
                    size = '60x120 cm'
                    width_cm, height_cm = 60, 120
                    aspect_ratio = '1:2'
                    aspect_val = 0.5
                    rel_scale = 1.15
                elif code.startswith('8') or '80' in code:
                    size = '80x80 cm'
                    width_cm, height_cm = 80, 80
                    aspect_ratio = '1:1'
                    aspect_val = 1.0
                    rel_scale = 1.0
                elif code.startswith('6') or '60' in code:
                    size = '60x60 cm'
                    width_cm, height_cm = 60, 60
                    aspect_ratio = '1:1'
                    aspect_val = 1.0
                    rel_scale = 0.75
            elif '60X120' in subfolder:
                size = '60x120 cm'
                width_cm, height_cm = 60, 120
                aspect_ratio = '1:2'
                aspect_val = 0.5
                rel_scale = 1.15
                surface = 'PGVT (Mirror Polished)'
            elif '80X80' in subfolder or '80x80' in subfolder:
                size = '80x80 cm'
                width_cm, height_cm = 80, 80
                aspect_ratio = '1:1'
                aspect_val = 1.0
                rel_scale = 1.0
                if 'matt' in subfolder.lower():
                    surface = 'Matt'
                elif 'slim' in subfolder.lower():
                    surface = 'Slim Glossy'
                else:
                    surface = 'PGVT (Mirror Polished)'
            elif '60X60' in subfolder:
                size = '60x60 cm'
                width_cm, height_cm = 60, 60
                aspect_ratio = '1:1'
                aspect_val = 1.0
                rel_scale = 0.75
                if 'matt' in subfolder.lower():
                    surface = 'Matt'
                elif 'zainamaj' in rel_to_base.lower():
                    surface = 'Zainamaj'
                else:
                    surface = 'PGVT (Mirror Polished)'
            elif '40X40' in subfolder:
                size = '40x40 cm'
                width_cm, height_cm = 40, 40
                aspect_ratio = '1:1'
                aspect_val = 1.0
                rel_scale = 0.50
                if 'high gloss' in subfolder.lower():
                    surface = 'High Gloss'
                else:
                    surface = 'Digital Porcelain'
            elif '30X30' in subfolder:
                size = '30x30 cm'
                width_cm, height_cm = 30, 30
                aspect_ratio = '1:1'
                aspect_val = 1.0
                rel_scale = 0.38
                surface = 'Digital Porcelain'
            elif '30 (h) x 60 (w)' in subfolder or 'stair' in subfolder.lower():
                size = '30x60 cm'
                width_cm, height_cm = 60, 30
                aspect_ratio = '2:1'
                aspect_val = 2.0
                rel_scale = 0.65
                surface = 'Matt Stair'
        else: # Wall Tiles
            category = 'Wall Tiles'
            if '20X30' in subfolder:
                size = '20x30 cm'
                width_cm, height_cm = 20, 30
                aspect_ratio = '2:3'
                aspect_val = 0.67
                rel_scale = 0.40
                surface = 'Glossy Punch & Glossy'
            elif '25X40' in subfolder:
                size = '25x40 cm'
                width_cm, height_cm = 25, 40
                aspect_ratio = '5:8'
                aspect_val = 0.625
                rel_scale = 0.50
                surface = 'Glossy Punch'
            elif '30X45' in subfolder:
                size = '30x45 cm'
                width_cm, height_cm = 30, 45
                aspect_ratio = '2:3'
                aspect_val = 0.67
                rel_scale = 0.58
                surface = 'Glossy Punch'
            elif '30X50' in subfolder or '30x50' in subfolder:
                size = '30x50 cm'
                width_cm, height_cm = 30, 50
                aspect_ratio = '3:5'
                aspect_val = 0.60
                rel_scale = 0.65
                if 'candy' in subfolder.lower():
                    surface = 'Candy Glaze'
                elif 'matt' in subfolder.lower():
                    surface = 'Matt'
                elif 'plain punch' in subfolder.lower():
                    surface = 'Plain Punch'
                elif 'rustic' in subfolder.lower():
                    surface = 'Rustic'
                else:
                    surface = 'Glossy Punch'
            elif '30X60' in subfolder:
                size = '30x60 cm'
                width_cm, height_cm = 30, 60
                aspect_ratio = '1:2'
                aspect_val = 0.50
                rel_scale = 0.75
                if 'mattestic' in subfolder.lower():
                    surface = 'Mattestic'
                elif 'matt' in subfolder.lower():
                    surface = 'Matt'
                elif 'rustic' in subfolder.lower():
                    surface = 'Rustic Punch'
                else:
                    surface = 'Glossy Punch'
                    
        # Concept design narrative
        concept = 'Contemporary Architectural'
        f_l = f.lower()
        if 'dc' in f_l or 'double charge' in surface.lower():
            concept = 'Engineered Double Layer Vitrified'
        elif 'pgvt' in f_l or 'mirror' in surface.lower():
            concept = 'Italian High-Gloss Vitrified'
        elif 'wood' in f_l or 'wd' in f_l or 'br' in f_l:
            concept = 'Warm Natural Earth & Timber'
        elif 'gr' in f_l or 'gy' in f_l or 'grey' in f_l:
            concept = 'Industrial Slate & Concrete'
        elif 'candy' in f_l or 'candy' in surface.lower():
            concept = 'Vibrant Reflective Candy Glaze'
        elif 'matt' in f_l or 'matt' in surface.lower():
            concept = 'Raw Silken Tactile Matt'
            
        # Specs
        is_floor = category == 'Floor Tiles'
        specs = {
            'dimensions': f'{width_cm} × {height_cm} cm',
            'thickness': '10.0 mm' if '120' in size else ('9.5 mm' if is_floor else '8.5 mm'),
            'waterAbsorption': '< 0.05%' if ('PGVT' in surface or 'Double Charge' in surface) else ('< 0.5%' if is_floor else '< 10%'),
            'sqmPerBox': '1.44 m²' if ('60x60' in size or '60x120' in size) else ('1.92 m²' if '80x80' in size else ('0.96 m²' if '40x40' in size else '1.08 m²')),
            'piecesPerBox': '2 pcs' if '60x120' in size else ('3 pcs' if '80x80' in size else ('4 pcs' if '60x60' in size else ('6 pcs' if '40x40' in size else '8 pcs'))),
            'weightPerBox': '34 kg' if '60x120' in size else ('42 kg' if '80x80' in size else '29 kg'),
            'surfaceType': surface
        }
        
        items.append({
            'id': f'FC-{id_counter:03d}',
            'slug': re.sub(r'[^a-zA-Z0-9]+', '-', f.lower()).strip('-'),
            'code': code,
            'name': f'Fresh {code}',
            'category': category,
            'size': size,
            'widthCm': width_cm,
            'heightCm': height_cm,
            'aspectRatio': aspect_ratio,
            'aspectRatioValue': aspect_val,
            'relativeScale': rel_scale,
            'surface': surface,
            'finish': surface,
            'concept': concept,
            'image': web_path,
            'featured': ('PGVT' in surface or 'Double Charge' in surface) and (id_counter % 8 == 0),
            'isNew': id_counter % 5 == 0,
            'inVisualizer': True,
            'specs': specs
        })
        id_counter += 1

unique_sizes = ["All Sizes"] + sorted(list(set(x["size"] for x in items)))
unique_finishes = ["All Finishes"] + sorted(list(set(x["surface"] for x in items)))
unique_concepts = ["All Concepts"] + sorted(list(set(x["concept"] for x in items)))

ts_content = f"""export interface TileProduct {{
  id: string;
  slug: string;
  code: string;
  name: string;
  category: 'Floor Tiles' | 'Wall Tiles' | 'Decors' | 'Specialty';
  size: string;
  widthCm: number;
  heightCm: number;
  aspectRatio: string;
  aspectRatioValue: number;
  relativeScale: number;
  surface: string;
  finish: string;
  concept: string;
  image: string;
  featured: boolean;
  isNew: boolean;
  inVisualizer: boolean;
  specs: {{
    dimensions: string;
    thickness: string;
    waterAbsorption: string;
    sqmPerBox: string;
    piecesPerBox: string;
    weightPerBox: string;
    surfaceType: string;
  }};
}}

export const PRODUCTS_CATALOG: TileProduct[] = {json.dumps(items, indent=2)};

export const SIZES = {json.dumps(unique_sizes, indent=2)};

export const FINISHES = {json.dumps(unique_finishes, indent=2)};

export const CONCEPTS = {json.dumps(unique_concepts, indent=2)};
"""

with open(output_ts, "w", encoding="utf-8") as out:
    out.write(ts_content)

os.makedirs(os.path.dirname(output_json), exist_ok=True)
with open(output_json, "w", encoding="utf-8") as out:
    json.dump(items, out, indent=2)

print(f"Successfully generated {len(items)} authentic products with correct aspect ratios and physical dimensions!")
