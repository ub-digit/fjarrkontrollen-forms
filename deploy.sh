#!/bin/bash
echo '# -------------------------------------------------------------- #'
echo '# Script for deploying Ember application securely to a server    #'
echo '# Call this script with one of:[production, test, demo] as arg.  #'
echo '# You must:                                                      #'
echo '# EITHER: enter password for app-user for the target server      #'
echo '#       : (three times!!)                                        #'
echo '#     OR: have had your public key concatenated to app-user''s   #'
echo '#       : authorized_keys file                                   #'
echo '# Setup: ensure this directory is in working ember order -       #'
echo '#      : that is: have you run "npm install" and "bower install" #'
echo '#      : Continue ?(Y/N)                                         #'
echo '# -------------------------------------------------------------- #'

read ANS
case "$ANS" in
  "Y" | "y"  )
    ;;
  *)
    exit
    ;;
esac
# -------------------------------------------------- #
set -e # Makes sure that script exits on any error
appname='fjarrkontrollen-forms'                # Name used in directories
app_domain_name='fjarrkontrollen-forms'        # Name used in dns
#remote_user='app-user'                        # User used for deploy to remote server
remote_user='rails'                            # User used for deploy to remote server
valid_environments="production test demo"      # Possible environments to choose from
top_domain='ub.gu.se'                          # Top domain name, ie 'my.domain.com'
local_app_location='.'                         # must be set for script to work
if [ ! -e "./THIS_IS_FJARRKONTROLLEN-FORMS" ]  # file  must exist in pwd
then 
    echo "you must run this script from fjarrkontrollen-forms working directory"
    exit
fi
version=$(date +"%Y%m%d%H%M%S")           # Format for versioning
environment=$1                            # Environment given by user
if [[ -z "$environment" ]]
then 
    echo "environment argument missing , pick one of: [$valid_environments]" && exit
fi
# -------------------------------------------------- #
# Check if environment is a valid
# -------------------------------------------------- #
case "$environment" in
  "production" | "test" | "demo"  )
  echo "starting deployment for environment $environment";
    ;;
  *)
    echo "$environment is not a valid environment value, pick one of: [$valid_environments]";
    exit
    ;;
esac
# -------------------------------------------------- #
# Sets the remote domain and location based on the following standards:
# Location: production: /apps/appName/, test: /apps/test/appName
# Domain name: production: appName.topDomain, test: appName-test.topDomain
# -------------------------------------------------- #
if [[ ! "$environment" = "production" ]]; then
  remote_app_location="/apps/$environment/$appname"
  app_domain_name="$app_domain_name-$environment.$top_domain"
  build_environment="production-${environment}"
else
  remote_app_location="/apps/$appname"
  app_domain_name="$app_domain_name.$top_domain"
  build_environment="production"
fi
# -------------------------------------------------- #
# Check if application directory exists
# -------------------------------------------------- #
if ! [ -d "$local_app_location" ]; then
  echo "$local_app_location is not a valid application directory - exiting"
  exit
fi
# -------------------------------------------------- #
# Delete dist folder if it exists
# -------------------------------------------------- #
if [ -d "$local_app_location/dist" ]; then
  echo "Found existing dist folder - deleting it"
  rm -r $local_app_location/dist
fi
# -------------------------------------------------- #
# Rebuild dist folder
# -------------------------------------------------- #
ember build --environment=${build_environment}

if [ -d "$local_app_location/dist" ]; then
  echo "Done building dist!"
else
  echo "Something went wrong with the build - exiting"
  exit
fi
# -------------------------------------------------- #
# Copy dist files to version on remote server
# -------------------------------------------------- #
ssh $remote_user@$app_domain_name mkdir -p "$remote_app_location/releases"
scp -rp "$local_app_location/dist/" "$remote_user@$app_domain_name:$remote_app_location/releases/$version/"
echo "Files successfully copied to $app_domain_name:$remote_app_location/releases/$version/"
# -------------------------------------------------- #
# Create symlink between newest version and current release
# -------------------------------------------------- #
ssh $remote_user@$app_domain_name "ln -sfnv $remote_app_location/releases/$version $remote_app_location/current"
echo "Created symlink successfully"


