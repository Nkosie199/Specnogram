#!/bin/bash

# Drop and recreate the database
psql -U postgres -c "DROP DATABASE specnogram;"
psql -U postgres -c "CREATE DATABASE specnogram;"
# Add tables
psql -U postgres -d specnogram -f ./schema.sql
# Add dummy data
psql -U postgres -d specnogram -f ./dummy_data.sql