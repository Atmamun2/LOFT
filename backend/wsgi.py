import os
import sys
from pathlib import Path

# Add the project directory to the Python path
project_root = Path(__file__).parent
sys.path.insert(0, str(project_root))

from dotenv import load_dotenv

dotenv_path = os.path.join(os.path.dirname(__file__), '.env')
if os.path.exists(dotenv_path):
    load_dotenv(dotenv_path)

from app import create_app

config_name = os.getenv('FLASK_CONFIG', 'development')
application = create_app(config_name)

if __name__ == "__main__":
    application.run(debug=True)
