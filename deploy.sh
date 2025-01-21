#!/bin/bash
export VERCEL_PROJECT_ID="prj_KOBxWoD6MB9Hls2FON05E6paHhtv"
export VERCEL_ORG_ID="team_9zoxg78sbb25AS7Ay16WbOBQ"

# Ensure .vercel directory exists and is clean
rm -rf ~/.vercel
mkdir -p ~/.vercel

# Setup credentials
echo '{ "token": "'$VERCEL_TOKEN'" }' > ~/.vercel/credentials.json

# Link the project first
vercel link --yes --token=$VERCEL_TOKEN

# Deploy to production
vercel --prod --yes --token=$VERCEL_TOKEN