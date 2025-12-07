import requests
import json

# Configuration for your Node.js API
API_URL = "http://localhost:3000/categories"  # Make sure the port (3000) matches your Node server


def api_f(data_list):
    print(f"--- Starting upload of {len(data_list)} items ---")

    headers = {'Content-Type': 'application/json'}

    for item in data_list:
        # Mapping tuple indices to JSON keys based on row_to_json return order:
        # 0: powiat -> region
        # 1: wojewodztwo -> voivodeship
        # 2: category
        # 3: None -> subcategories
        # 4: found_place -> where_found
        # 5: date_found -> found_date
        # 6: date_of_issue -> register_date
        # 7: description
        # 8: None (unused)

        # We use (value or "") to convert None to empty string for Zod validation
        payload = {
            "region": item[0] or "",
            "voivodeship": item[1] or "",
            "category": item[2] or "Inne",
            "subcategories": item[3] or "",  # Crucial: Zod expects string, Python has None
            "where_found": item[4] or "Nieznane",
            "found_date": item[5] or "",
            "register_date": item[6] or "",
            "description": item[7] or "Brak opisu"
        }

        try:
            response = requests.post(API_URL, json=payload, headers=headers)

            if response.status_code == 201:
                print(f"✅ [SUCCESS] Uploaded: {payload['description'][:30]}...")
            else:
                print(f"❌ [ERROR {response.status_code}] Failed: {response.text}")
                print(f"   Payload was: {json.dumps(payload, ensure_ascii=False)}")

        except requests.exceptions.ConnectionError:
            print("🚨 [CONNECTION ERROR] Could not connect to Node.js. Is the server running?")
            break
        except Exception as e:
            print(f"⚠️ [EXCEPTION] {e}")


