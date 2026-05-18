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
    cred = credentials.Certificate({
        "type": "service_account",
        "project_id": env["FIREBASE_PROJECT_ID"],
        "private_key_id": "dummy", # Firebase SDK allows dummy here as long as private_key is correct
        "private_key": env["FIREBASE_PRIVATE_KEY"],
        "client_email": env["FIREBASE_CLIENT_EMAIL"],
        "client_id": "dummy",
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_x509_cert_url": f"https://www.googleapis.com/robot/v1/metadata/x509/{env['FIREBASE_CLIENT_EMAIL']}"
    })
    
    firebase_admin.initialize_app(cred, {
        "storageBucket": env["NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET"]
    })
    print("Firebase Admin initialized successfully!")
    
    # Get bucket ref
    bucket = storage.bucket()
    print("Connected to bucket:", bucket.name)

if __name__ == "__main__":
    main()
