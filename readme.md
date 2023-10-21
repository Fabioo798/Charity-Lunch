# Jornada de almuerzo gratis

## Description

Jornada de almuerzo ¡gratis! (Free Lunch Campaign) is a project aimed at organizing and facilitating a charity event where residents of the region can enjoy a free meal. The unique condition is that the dish served to each participant will be randomly selected. The project helps the restaurant manager efficiently request dishes from the kitchen based on the available ingredients and handle the entire process seamlessly.

This README provides an overview of the project, its features, and instructions for setting it up locally.

## Features

- **Dish Ordering**: The restaurant manager can request the kitchen to prepare a new dish.
- **Random Selection**: The kitchen selects a dish randomly from a list of 6 available recipes, considering only the ingredients that are currently available in the inventory.
- **Ingredient Management**: The kitchen requests the required ingredients from the food storage, either by checking availability or buying the missing ones from the farmers market.
- **Inventory Tracking**: The food storage keeps track of the available ingredients, the purchase history from the farmers market, and the quantity used for each ordered dish.

## Installation and Setup

1. Clone the repository:

   ```shell
   git clone <repository-url>
   ```

2. Navigate to the project directory:

   ```shell
   cd <project-directory>
   ```

3. Install dependencies:

   ```shell
   npm install
   ```

4. Start the microservices using Docker:

   - Build Docker images:

     ```shell
     docker-compose build
     ```

   - Start Docker containers:

     ```shell
     docker-compose up
     ```

5. Access the application:
   - Frontend UI: Open your browser and visit `http://localhost:3000`
   - Backend APIs:
     - Kitchen Service: `http://localhost:4000`
     - Food Storage Service: `http://localhost:5000`
     - Farmers Market Service: `http://localhost:6000`

## Usage

- Press the "Order Dish" button to request a new dish from the kitchen. The system supports handling massive dish requests.
- Monitor the orders in progress at the kitchen.
- View the available ingredients and their quantities in the food storage, as well as the purchase history from the farmers market.
- Track the order history made to the kitchen.
- View the recipes, ingredients, and quantities on the screen.

## Technologies Used

- Node.js
- Docker
- Frontend Framework (if applicable)
- Backend Framework (if applicable)
- Database (if applicable)
- Any other relevant technologies
