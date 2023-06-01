#!/usr/bin/env python

import json
import os
import re
import subprocess

# Load package.json file
with open('package.json') as file:
    data = json.load(file)

# Iterate over dependencies
for dependency, version in data.get('dependencies', {}).items():
    # Check if the dependency starts with "@savvato-software"
    if dependency.startswith('@savvato-software/'):
        # Check if the version refers to a local file
        if version.startswith('file:'):
            file_path = version[5:]
            short_version = re.search(r'\d+\.\d+\.\d+', file_path).group(0)
            if not os.path.exists(file_path):
                # If the local file does not exist, check if another .tgz file exists in that directory
                tgz_files = [file for file in os.listdir(os.path.dirname(file_path)) if file.endswith('.tgz')]
                if tgz_files:
                    # Assuming there is only one .tgz file
                    tgz_file = tgz_files[0]
                    version_match = re.search(r'\d+\.\d+\.\d+', tgz_file)
                    if version_match:
                        local_version = version_match.group(0)
                        if local_version != short_version:
                            tgz_path = os.path.join(os.path.dirname(file_path), tgz_file)
                            subprocess.call(['npm', 'install', tgz_path])
                            print(f"Installed LOCAL {dependency}@{local_version}")
                    else:
                        print(f"Skipping installation of {dependency}@{short_version} (version not found in filename)")
            else:
                print(f"{dependency}@{short_version} -- already got it")
        else:
            # Build path to the local dependency
            dependency_name = dependency.split('/')[-1]  # Extract the library name from the dependency
            dependency_directory = f"../{dependency_name}/dist/{dependency_name}"
            tgz_files = [file for file in os.listdir(dependency_directory) if file.endswith('.tgz')]

            if tgz_files:
                # Assuming there is only one .tgz file
                tgz_file = tgz_files[0]
                version_match = re.search(r'\d+\.\d+\.\d+', tgz_file)
                if version_match:
                    local_version = version_match.group(0)
                    if local_version != version:
                        tgz_path = os.path.join(dependency_directory, tgz_file)
                        subprocess.call(['npm', 'install', tgz_path])
                        print(f"Installed LOCAL {dependency}@{local_version}")
                else:
                    print(f"Skipping installation of {dependency}@{version} (version not found in filename)")
            else:
                print(f"Skipping installation of {dependency}@{version} (local file does not exist)")

