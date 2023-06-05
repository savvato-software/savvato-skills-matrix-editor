#!/bin/bash

echo "Deleting the stuff in the S3 bucket before..."
aws s3 rm s3://savvato-skills-matrix-editor --recursive

echo "Copying to S3.... This might take a bit.."
aws s3 cp ./www s3://savvato-skills-matrix-editor --recursive --quiet


