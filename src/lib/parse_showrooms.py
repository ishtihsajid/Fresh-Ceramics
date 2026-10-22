import openpyxl
import json
import os

wb = openpyxl.load_workbook(r'E:\klayart\Fresh Ceramics\Fresh-Ceramics-Assets\data\Showroom Address .xlsx', data_only=True)
ws = wb['Sheet1']

showrooms = []
current_type = "Own Flagship Display Center"

for r in list(ws.iter_rows(values_only=True)):
    if not any(r):
        continue
    first_col = str(r[0] or "").strip()
    
    if "Exclusive Dealer Showrooms" in first_col:
        current_type = "Dealer Exclusive Showroom"
        continue
    if "Own Operated Display Centers" in first_col:
        current_type = "Own Flagship Display Center"
        continue
    if first_col == "SL" or first_col == "None":
        continue
        
    try:
        sl = float(first_col) if first_col.replace(".", "").isdigit() else None
    except:
        sl = None
        
    if sl is not None:
        division = str(r[1] or "").strip()
        area = str(r[2] or "").strip()
        name = str(r[3] or "").strip()
        address = str(r[4] or "").strip()
        map_link = str(r[5] or "").strip()
        
        if map_link in ["#N/A", "N/A", "None", ""]:
            map_link = f"https://www.google.com/maps/search/?api=1&query={name}+{area}+Bangladesh"
            
        showrooms.append({
            "id": f"SHW-{len(showrooms)+1:03d}",
            "sl": int(sl),
            "type": current_type,
            "division": division,
            "area": area,
            "name": name,
            "address": address if address and address != "None" else f"{area}, {division}",
            "mapLink": map_link,
            "hasVisualizer": current_type == "Own Flagship Display Center" or len(showrooms) % 3 == 0
        })

output_dir = r"E:\klayart\Fresh Ceramics\src\data"
os.makedirs(output_dir, exist_ok=True)

with open(os.path.join(output_dir, "showrooms.json"), "w", encoding="utf-8") as f:
    json.dump(showrooms, f, indent=2)

print(f"Extracted {len(showrooms)} showrooms successfully!")
