# Taskify Backend

Taskify is a Trello-inspired project management application built with **Express**, **TypeScript**, and **TypeORM**. It is designed to help teams organize tasks, collaborate efficiently, and track progress effectively.

# Installation Guide

```bash
# Clone the Repository
git clone https://github.com/bnhan2710/taskify-be.git

# Install Dependencies
yarn install

# Set Up Environment Variables
# Create a .env file in the root directory  for required variables

# Run Database Migrations
yarn typeorm migration:run

# Seed the Database sample data
yarn seed-rbac

# Start the Application
yarn start
