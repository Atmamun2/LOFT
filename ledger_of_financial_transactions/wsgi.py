import os
from dotenv import load_dotenv

dotenv_path = os.path.join(os.path.dirname(__file__), '.env')
if os.path.exists(dotenv_path):
    load_dotenv(dotenv_path)

from app import create_app

config_name = os.getenv('FLASK_CONFIG') or 'default'
application = create_app(config_name)

if __name__ == "__main__":
    application.run()
