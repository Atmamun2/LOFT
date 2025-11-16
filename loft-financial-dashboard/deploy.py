#!/usr/bin/env python3
import os
import shutil
import subprocess

def build_and_deploy():
    print("Building React application...")
    
    # Run npm build
    subprocess.run(["npm", "run", "build"], check=True)
    
    # Create deployment directory
    deploy_dir = "/home/yourusername/pythonanywhere/static/loft"
    if os.path.exists(deploy_dir):
        shutil.rmtree(deploy_dir)
    
    # Copy build files
    shutil.copytree("dist", deploy_dir)
    
    print(f"Deployed to {deploy_dir}")
    print("Update your Python Anywhere web app configuration to serve from this directory")

if __name__ == "__main__":
    build_and_deploy()
