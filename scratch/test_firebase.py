import os
import re
import firebase_admin
from firebase_admin import credentials
from firebase_admin import storage

def load_env():
    env_vars = {}
    with open(".env.local", "r", encoding="utf-8") as f:
        for line in f:
            line = line.strip()
            if not line or line.startswith("#"):
                continue
            if "=" in line:
                key, val = line.split("=", 1)
                # Remove quotes if present
                if val.startswith('"') and val.endswith('"'):
                    val = val[1:-1]
                elif val.startswith("'") and val.endswith("'"):
                    val = val[1:-1]
                # Handle escaped newlines in private key
                if key == "FIREBASE_PRIVATE_KEY":
                    val = val.replace("\\n", "\n")
                env_vars[key] = val
    return env_vars

def main():
    env = load_env()
    print("Loaded env vars successfully.")
    print("Project ID:", env.get("FIREBASE_PROJECT_ID"))
    print("Client Email:", env.get("FIREBASE_CLIENT_EMAIL"))
    print("Storage Bucket:", env.get("NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET"))
    
    # Initialize Firebase Admin
    from google.cloud import storage as gcs
    client = gcs.Client.from_service_account_info({
        "type": "service_account",
        "project_id": env["FIREBASE_PROJECT_ID"],
        "private_key_id": "dummy",
        "private_key": env["FIREBASE_PRIVATE_KEY"],
        "client_email": env["FIREBASE_CLIENT_EMAIL"],
        "client_id": "dummy",
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_x509_cert_url": f"https://www.googleapis.com/robot/v1/metadata/x509/{env['FIREBASE_CLIENT_EMAIL']}"
    })
    print("Listing buckets...")
    try:
        for b in client.list_buckets():
            print("Bucket in list:", b.name)
    except Exception as e:
        print("List buckets failed:", e)

    for bucket_name in ["kenyakeysvideos", "kenya-keys-11a15", "kenya-keys-11a15.appspot.com", "kenya-keys-11a15.firebasestorage.app"]:
        try:
            bucket = client.get_bucket(bucket_name)
            print(f"Successfully accessed bucket {bucket_name}!")
            for b in bucket.list_blobs(max_results=5):
                print(f"  {bucket_name} blob: {b.name}")
        except Exception as e:
            print(f"Failed to access bucket {bucket_name}: {e}")

if __name__ == "__main__":
    main()
