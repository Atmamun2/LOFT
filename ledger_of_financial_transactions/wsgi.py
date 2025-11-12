import os
import sys

# Add your project directory to the Python path
path = os.path.dirname(os.path.abspath(__file__))
if path not in sys.path:
    sys.path.append(path)

# Import the Flask app
from app import app as application  # Assuming your Flask app is in app.py
