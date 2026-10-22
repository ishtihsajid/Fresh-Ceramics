import json

COORDS_MAP = {
    "Barisal": (22.7010, 90.3535),
    "Bhandaria": (22.4897, 90.0631),
    "Bhola": (22.6859, 90.6481),
    "Faridpur": (23.6071, 89.8429),
    "Gopalgonj": (23.0051, 89.8266),
    "Madaripur": (23.1641, 90.1897),
    "Pirojpur": (22.5791, 89.9759),
    "Rajbari": (23.7574, 89.6445),
    "Shariyatpur": (23.2060, 90.3478),
    "Sherpur, Bogura": (24.6644, 89.4182),
    "B. Baria": (23.9571, 91.1119),
    "B.Baria": (23.9600, 91.1150),
    "Bancharampur, Cumilla": (23.7712, 90.8122),
    "Banskhali, Chattogram": (22.0382, 91.9547),
    "Chandpur": (23.2321, 90.6631),
    "Companygonj, Cumilla": (23.6189, 90.9632),
    "Cox's Bazar": (21.4272, 92.0058),
    "Cumilla": (23.4607, 91.1809),
    "Feni": (23.0159, 91.3976),
    "Kazir Dewri, Chattogram": (22.3421, 91.8214),
    "Khagrachori Bazar": (23.1193, 91.9847),
    "Laxmipur": (22.9425, 90.8412),
    "Lohagara": (22.0125, 92.0954),
    "Maijdi, Noakhali": (22.8696, 91.0991),
    "Ramgonj, Lakshmipur": (23.1044, 90.8711),
    "Banglamotor": (23.7460, 90.3930),
    "Diabari, Uttara": (23.8780, 90.3700),
    "Hatirpool, Banglamotor": (23.7465, 90.3920),
    "Jatrabari": (23.7050, 90.4350),
    "Keraniganj": (23.6820, 90.3340),
    "Kuril, Dhaka": (23.8180, 90.4220),
    "Munshiganj": (23.5422, 90.5305),
    "Narsingdhi": (23.9193, 90.7176),
    "Nawabganj": (23.6685, 90.1650),
    "Uttara, Dhaka": (23.8720, 90.3980),
    "Bagerhat": (22.6516, 89.7859),
    "Jessore": (23.1664, 89.2138),
    "Khulna": (22.8456, 89.5403),
    "Kushtia": (23.9013, 89.1205),
    "Magura": (23.4873, 89.4198),
    "Satkhira": (22.7185, 89.0705),
    "Dhamrai": (23.9214, 90.2159),
    "Gazipur": (23.9999, 90.4203),
    "Hemayetpur": (23.7915, 90.2740),
    "Jamalpur": (24.9375, 89.9378),
    "Kishoreganj": (24.4449, 90.7766),
    "Manikganj": (23.8644, 90.0047),
    "Mymensingh": (24.7471, 90.4203),
    "Netrokona": (24.8709, 90.7279),
    "Savar": (23.8583, 90.2667),
    "Sherpur": (25.0205, 90.0153),
    "Tangail": (24.2513, 89.9167),
    "Bhanga, Faridpur": (23.3858, 89.9835),
    "Bogura Sadar": (24.8465, 89.3770),
    "Chapainawabganj": (24.5965, 88.2775),
    "Ishwardi": (24.1294, 89.0658),
    "Naogaon": (24.7936, 88.9318),
    "Pabna": (24.0064, 89.2372),
    "Rajshahi": (24.3745, 88.6042),
    "Santahar, Bogura": (24.7865, 88.9702),
    "Sirajganj": (24.4534, 89.7008),
    "Sujanagar": (23.9189, 89.4312),
    "Dinajpur": (25.6217, 88.6355),
    "Nilphamari": (25.9318, 88.8560),
    "Rangpur": (25.7439, 89.2752),
    "Hobiganj": (24.3749, 91.4155),
    "Moulvibazar": (24.4829, 91.7774),
}

with open("E:/klayart/Fresh Ceramics/src/data/showrooms.json", "r", encoding="utf-8") as f:
    showrooms = json.load(f)

# Offset duplicate coordinates slightly so multiple showrooms in the same town don't overlap completely
seen_coords = {}
for shw in showrooms:
    area = shw.get("area", "").strip()
    base_coord = COORDS_MAP.get(area)
    if not base_coord:
        # Fallback to division centroid
        div = shw.get("division", "Dhaka")
        fallback_divs = {
            "Dhaka": (23.8103, 90.4125),
            "Chattogram": (22.3569, 91.7832),
            "Barisal": (22.7010, 90.3535),
            "Khulna": (22.8456, 89.5403),
            "Mymensingh": (24.7471, 90.4203),
            "Rajshahi": (24.3745, 88.6042),
            "Rangpur": (25.7439, 89.2752),
            "Sylhet": (24.8949, 91.8687),
        }
        base_coord = fallback_divs.get(div, (23.8103, 90.4125))
    
    key = f"{base_coord[0]:.4f},{base_coord[1]:.4f}"
    count = seen_coords.get(key, 0)
    seen_coords[key] = count + 1
    
    # Slight micro-jitter for multiple showrooms in same market
    jitter_lat = (count * 0.012) if count > 0 else 0
    jitter_lng = ((count % 2) * 0.015 - 0.007) if count > 0 else 0
    
    lat = round(base_coord[0] + jitter_lat, 4)
    lng = round(base_coord[1] + jitter_lng, 4)
    shw["lat"] = lat
    shw["lng"] = lng

with open("E:/klayart/Fresh Ceramics/src/data/showrooms.json", "w", encoding="utf-8") as f:
    json.dump(showrooms, f, indent=2)

print(f"Successfully enriched {len(showrooms)} showrooms with lat/lng coordinates!")
