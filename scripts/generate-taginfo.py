import requests
import os, sys, json
from datetime import datetime
import urllib.request

TAGINFO = {}

# Set up the basic parameters
TAGINFO["data_format"] = 1
TAGINFO["data_url"] = "https://raw.githubusercontent.com/OPENER-next/OpenStop-taginfo/main/taginfo.json"
TAGINFO["data_updated"] = datetime.strftime(datetime.now(), '%Y%m%dT%H%M%SZ')
TAGINFO["project"] = {
	"name": "ParkingStudio",
	"description": "Webapp to help with street parking tagging",
	"project_url": "",
	"doc_url": "",
	"icon_url": "",
	"contact_name": "",
	"contact_email": ""
}


TAGINFO["tags"] = []

TAGS = []

def AddToTags(key, value, object_types, description):
	global TAGS
	t = {}
	t["key"] = key
	if value != None:
		t["value"] = value
	t["object_types"] = object_types
	t["description"] = description
	TAGS.append(t)

# Add the tags that are embedded in the app and can not be inferred from the parking-tagging

AddToTags("parking:right", None, ["way"], "Parking space on the right side of the road")
AddToTags("parking:left", None, ["way"], "Parking space on the left side of the road")
AddToTags("parking:both", None, ["way"], "Parking space on both sides of the road")
AddToTags("parking:right:orientaton", None, ["way"], "Orientation of the parking space on the right side of the road")
AddToTags("parking:left:orientaton", None, ["way"], "Orientation of the parking space on the left side of the road")
AddToTags("parking:both:orientaton", None, ["way"], "Orientation of the parking space on both sides of the road")


# Generate the tags that are inferred from definition in the osm-parking-tagging repo
# Download the file from https://raw.githubusercontent.com/wielandb/osm-parking-tagging/main/export/json/parking.json

with urllib.request.urlopen("https://raw.githubusercontent.com/wielandb/osm-parking-tagging/main/export/json/parking.json") as url:
    data = json.loads(url.read().decode())

for item in data:
    # Proccess the area tags
    for key, value in item["area_tags"].items():
        if "OPENINGHOURS" in value or "TIME" in value or "AUSWEIS" in value:
            AddToTags(key, None, ["way"], "Added to represent parking traffic signs " + item["sign_osm_value"])
        else:
            AddToTags(key, value, ["way"], "Added to represent parking traffic signs " + item["sign_osm_value"])
        AddToTags("traffic_sign", item["sign_osm_value"], ["way"], "Optionally added to represent traffic signs at the parking space")

    for key, value in item["way_tags"].items():
        if "OPENINGHOURS" in value or "TIME" in value or "AUSWEIS" in value:
            AddToTags(key.replace("SEITE", "right"), None, ["way"], "Added to represent parking traffic signs " + item["sign_osm_value"])
            AddToTags(key.replace("SEITE", "left"), None, ["way"], "Added to represent parking traffic signs " + item["sign_osm_value"])
            AddToTags(key.replace("SEITE", "both"), None, ["way"], "Added to represent parking traffic signs " + item["sign_osm_value"])
        else:
            AddToTags(key.replace("SEITE", "right"), value, ["way"], "Added to represent parking traffic signs " + item["sign_osm_value"])
            AddToTags(key.replace("SEITE", "left"), value, ["way"], "Added to represent parking traffic signs " + item["sign_osm_value"])
            AddToTags(key.replace("SEITE", "both"), value, ["way"], "Added to represent parking traffic signs " + item["sign_osm_value"])
        AddToTags("parking:left:traffic_sign", item["sign_osm_value"], ["way"], "Optionally added to explicitly tag parking traffic signs")
        AddToTags("parking:right:traffic_sign", item["sign_osm_value"], ["way"], "Optionally added to explicitly tag parking traffic signs")
        AddToTags("parking:both:traffic_sign", item["sign_osm_value"], ["way"], "Optionally added to explicitly tag parking traffic signs")


# write the tags to the taginfo file
TAGINFO["tags"] = TAGS

# write the taginfo file
with open('taginfo.json', 'w') as outfile:
    json.dump(TAGINFO, outfile, indent=4)
