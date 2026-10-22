import json
import math

def project(lng, lat):
    rad = math.pi / 180.0
    lam = (lng - 90.3563) * rad
    phi = lat * rad
    phi0 = 23.6850 * rad
    yMerc = math.log(math.tan(math.pi / 4.0 + phi / 2.0))
    yMerc0 = math.log(math.tan(math.pi / 4.0 + phi0 / 2.0))
    x = 380.0 + 6800.0 * lam
    y = 480.0 - 6800.0 * (yMerc - yMerc0)
    return round(x, 1), round(y, 1)

def point_line_distance(p, a, b):
    px, py = p
    ax, ay = a
    bx, by = b
    dx = bx - ax
    dy = by - ay
    if dx == 0 and dy == 0:
        return math.hypot(px - ax, py - ay)
    t = ((px - ax) * dx + (py - ay) * dy) / (dx * dx + dy * dy)
    t = max(0.0, min(1.0, t))
    closest_x = ax + t * dx
    closest_y = ay + t * dy
    return math.hypot(px - closest_x, py - closest_y)

def rdp(points, epsilon):
    if len(points) <= 2:
        return points
    dmax = 0.0
    index = 0
    for i in range(1, len(points) - 1):
        d = point_line_distance(points[i], points[0], points[-1])
        if d > dmax:
            index = i
            dmax = d
    if dmax > epsilon:
        rec1 = rdp(points[:index+1], epsilon)
        rec2 = rdp(points[index:], epsilon)
        return rec1[:-1] + rec2
    else:
        return [points[0], points[-1]]

with open(r'E:\klayart\Fresh-Ceramics-AG\src\data\bangladesh_divisions.json', 'r', encoding='utf-8') as f:
    geojson = json.load(f)

divisions_out = []
name_map = {'Chittagong': 'Chattogram'}

custom_labels = {
    'Dhaka': (380, 470),
    'Chattogram': (510, 620),
    'Sylhet': (520, 310),
    'Rajshahi': (180, 360),
    'Rangpur': (185, 175),
    'Khulna': (250, 630),
    'Barisal': (360, 680),
    'Mymensingh': (380, 305)
}

for feat in geojson['features']:
    orig_name = feat['properties']['ADM1_EN']
    name = name_map.get(orig_name, orig_name)
    geom_type = feat['geometry']['type']
    coords = feat['geometry']['coordinates']

    def extract_rings(geom):
        rings = []
        gtype = geom['type']
        coords = geom['coordinates']
        if gtype == 'Polygon':
            for r in coords:
                rings.append(r)
        elif gtype == 'MultiPolygon':
            for poly in coords:
                for r in poly:
                    rings.append(r)
        return rings

    path_parts = []
    all_projected_pts = []

    for ring in extract_rings(feat['geometry']):
        if len(ring) < 4:
            continue
        try:
            projected = [project(pt[0], pt[1]) for pt in ring if len(pt) >= 2]
        except Exception as e:
            continue
        if len(projected) < 3:
            continue
        simplified = rdp(projected, epsilon=1.2)
        if len(simplified) < 3:
            continue
        all_projected_pts.extend(simplified)
        cmd = 'M ' + ' L '.join(f'{x} {y}' for x, y in simplified) + ' Z'
        path_parts.append(cmd)

    full_path = ' '.join(path_parts)
    
    xs = [p[0] for p in all_projected_pts]
    ys = [p[1] for p in all_projected_pts]
    label_x = round(sum(xs) / len(xs), 1) if xs else 380
    label_y = round(sum(ys) / len(ys), 1) if ys else 480

    if name in custom_labels:
        lx, ly = custom_labels[name]
    else:
        lx, ly = label_x, label_y

    divisions_out.append({
        'id': name,
        'name': name,
        'path': full_path,
        'labelX': lx,
        'labelY': ly
    })

print(f'Generated {len(divisions_out)} divisions.')
for d in divisions_out:
    print(f"{d['name']}: path len={len(d['path'])}, label=({d['labelX']}, {d['labelY']})")

output_data = {
    'viewBox': '0 0 760 980',
    'divisions': divisions_out
}

with open(r'E:\klayart\Fresh Ceramics\src\data\bangladesh-svg-paths.json', 'w', encoding='utf-8') as f:
    json.dump(output_data, f, indent=2)

print('Successfully saved to bangladesh-svg-paths.json!')
