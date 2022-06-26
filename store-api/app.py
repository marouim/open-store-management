from flask import Flask, jsonify, request, Response
import json
import requests
from requests.auth import HTTPBasicAuth
import os
import yaml



# Need to inject from Secret
# AAP_BASE_URL = https://aap-ansible-automation-platform.apps.hiybv6c8.eastus.aroapp.io
# AAP_USERNAME = 
# AAP_PASSWORD
# AAP_INVENTORY_ID


API_BASE_URL = "/api/v2"
AAP_BASE_URL = os.environ["AAP_BASE_URL"]
AAP_USERNAME = os.environ["AAP_USERNAME"]
AAP_PASSWORD = os.environ["AAP_PASSWORD"]
AAP_INVENTORY_ID = os.environ["AAP_INVENTORY_ID"]

app = Flask(__name__)

@app.route("/")
def home():
  return jsonify({"store-api": "Open Store Management"})

# @app.route("/api/healtz", methods = ['POST'])
# def notif():
#     print(json.dumps(request.get_json(), indent=2))

#     return ('', 204)


@app.route("/api/launch-action/<action_id>", methods = ['POST'])
def launch_action(action_id):
    r = requests.post(
        url=AAP_BASE_URL + API_BASE_URL + "/job_templates/" + action_id + "/launch/", 
        auth=HTTPBasicAuth(AAP_USERNAME, AAP_PASSWORD)
    )
    
    return ('', r.status_code)


@app.route("/api/healthz", methods = ['GET'])
def healtz():
    print("Connection check to AAP: " + AAP_BASE_URL + API_BASE_URL)

    r = requests.get(
        url=AAP_BASE_URL + API_BASE_URL, 
        auth=HTTPBasicAuth(AAP_USERNAME, AAP_PASSWORD)
    )
    
    return ('', r.status_code)


@app.route("/api/logs", methods = ['GET'])
def get_logs():
    # get labels (used for actions)
    r = requests.get(
        url=AAP_BASE_URL + API_BASE_URL + "/labels", 
        auth=HTTPBasicAuth(AAP_USERNAME, AAP_PASSWORD)
    )

    labels = json.loads(r.content)["results"]
    action_label_id = 0

    for label in labels:
        if label["name"] == "store-action":
            action_label_id = label["id"]
            break
    
    r = requests.get(
        url=AAP_BASE_URL + API_BASE_URL + "/jobs?labels=" + str(action_label_id), 
        auth=HTTPBasicAuth(AAP_USERNAME, AAP_PASSWORD)
    )

    jobs = json.loads(r.content)["results"]
    logs = []

    for job in jobs:

        r = requests.get(
            url=AAP_BASE_URL + API_BASE_URL + "/jobs/" + str(job["id"]) + "/job_host_summaries", 
            auth=HTTPBasicAuth(AAP_USERNAME, AAP_PASSWORD)
        )

        affected_devices = []
        affected_devices_text = ""

        job_host_summaries = json.loads(r.content)["results"]

        for hs in job_host_summaries:
            affected_devices.append({
                "device": hs["summary_fields"]["host"]["name"],
                "status": hs["summary_fields"]["job"]["status"]
            })
            affected_devices_text += hs["summary_fields"]["host"]["name"] + ","

        logs.append({
            "id": job["id"],
            "name": job["name"],
            "created": job["created"],
            "affected_devices": affected_devices,
            "affected_devices_text": affected_devices_text
        })

    return (jsonify(logs), r.status_code)


@app.route("/api/storetree")
def storeTree():
    print("Get store tree")

    tree = []

    # get labels (used for actions)
    r = requests.get(
        url=AAP_BASE_URL + API_BASE_URL + "/labels", 
        auth=HTTPBasicAuth(AAP_USERNAME, AAP_PASSWORD)
    )

    labels = json.loads(r.content)["results"]

    r = requests.get(
        url=AAP_BASE_URL + API_BASE_URL + "/groups?inventory=" + AAP_INVENTORY_ID, 
        auth=HTTPBasicAuth(AAP_USERNAME, AAP_PASSWORD)
    )

    groups = json.loads(r.content)
    
    for group in groups["results"]:
        # Read group associated hosts
        r = requests.get(
            url=AAP_BASE_URL + API_BASE_URL + "/groups/" + str(group["id"]) + "/hosts", 
            auth=HTTPBasicAuth(AAP_USERNAME, AAP_PASSWORD)
        )

        hosts = json.loads(r.content)
        clean_hosts = []

        for host in hosts["results"]:
            # Search for action
            host_variables = yaml.safe_load(host["variables"])
            actions = []

            if "action_labels" in host_variables:
                action_labels = str.split(host_variables["action_labels"], ",")

                for action_label in action_labels:
                    # find label ID
                    for label in labels:
                        if label["name"] == action_label:
                            action_label_id = label["id"]
                            break

                    # Label ID found, read related job_templates
                    if action_label_id:
                        r = requests.get(
                            url=AAP_BASE_URL + API_BASE_URL + "/job_templates?labels=" + str(action_label_id), 
                            auth=HTTPBasicAuth(AAP_USERNAME, AAP_PASSWORD)
                        )

                        job_templates = json.loads(r.content)
                        
                        for job in job_templates["results"]:
                            actions.append({
                                "name": job["name"],
                                "id": job["id"]
                            })

            clean_hosts.append({
                "id": host["id"],
                "name": host["name"],
                "variables": host_variables,
                "actions": actions
            })

        tree.append({
            "name": group["name"],
            "id": group["id"],
            "variables": yaml.safe_load(group["variables"]),
            "hosts": clean_hosts
        })

    return(jsonify(tree))





app.run(debug=True, host="0.0.0.0", port=8080)