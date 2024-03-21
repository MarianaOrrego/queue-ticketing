# Queue Ticketing System
In this project, I present a fully developed Queue Ticketing System designed to meet the needs of an institution. This system enables users to seamlessly request shifts across various categories while providing administrators with the tools necessary to oversee and optimize resource allocation.

## Table of Contents

1. [Initial Setup](#initial-setup)
2. [Technologies Used](#technologies-used)
3. [Link](#link)
4. [Running the Project](#running-the-project)
5. [Project Structure](#project-structure)

## Initial Setup
To get started with this repository, follow these steps:

Clone the repository to your local machine:
```bash
git clone https://github.com/your-username/your-repo.git
```
Install the required dependencies using `yarn` or `npm`:
```bash
yarn install
yarn start
```
or 
```bash
npm install
npm start
```
This will start the development server and open the application in your default browser.

## Technologies Used
- Create React app template typescript
- CSS
- Node.js
- React

## Link
The project is deployed in the following link: [Queue Ticketing System]()

## Running the project
To run the project in your local environment, follow these steps:
1. Clone the repository to your local machine
2. Run `npm install` or `yarn` in the project directory to install the required dependencies
3. Run `npm run start` or `yarn start` to get the project started
4. Open the address shown in your console in your web browser to view the app

## Project Structure
The project is structured as follows:
- `public/`: Contains the public assets for the project
- `src/`: Contains the source code for the project
  - `classes`: Contains the classes used in the project
    - `agent.ts`: The class for the agents and their actions, such as call the next client, attend a client, and return the client
    - `client.ts`: The class for the clients and their actions, such as pick a category and get a ticket
    - `display.ts`: The class for the display and their actions, such as show the number of the ticket and the category that is being attended
    - `index.ts`: The export of the classes used in the project
    - `objectManager.ts`: The class for the object manager and their actions, such as update the data of the web in `localStorage` and obtain the data from the `localStorage`
  - `components/`: Contains the components used in the project
    - `AssistantActions.tsx`: Has the buttons for the assistants to call the next client, attend a client, and return the client
    - `QueueTicketing.tsx`: Has the buttons for the user to pick the category
    - `TicketInformation.tsx`: Has the information of the ticket and the category that is being attended
    - statistics folder: Has the statistics of the assistants and their attended categories
      - `AverageTable.tsx`: Calculates the average of the time that the assistants take to attend a client
      - `ClientTable.tsx`: Shows the clients that have been attended by the assistants and the time to attend them
      - `index.tsx`: The main component for the statistics
  - `functions`: Contains the functions used in the project
    - `index.ts`: Contains the export of the functions used in the project
    - `calculateAverageDuration.ts`: Calculates the average of the time that the assistants take to attend a client
    - `clearLocalStorage.ts`: Clears the local storage and reloads the page
  - `hooks`: Contains the hooks used in the project
    - `useAgentStatus.ts`: The hook for update the status of the agents
  - `interfaces`: Contains the interfaces used in the project
    - `index.ts`: The export of the interfaces used in the project
    - `assistant_action.ts`: The interface for the assistant actions
    - `queue_ticketing.ts`: The interface for the user actions
    - `statistic_information.ts`: The interface for the statistics
  - `pages/`: Contains the pages used in the project
    - `CheckingPage.tsx`: The main page for the project, user picks the category and the system returns a ticket
    - `ConsultantPage.tsx`: The page for assistants where to do the actions as call the next client, attend a client, and return the client
    - `ScreenPage.tsx`: The page for the screen where the client can see the number of the ticket and the category that is being attended
    - `StatisticsPage.tsx`: The page for the statistics of the assistants and their attended categories
  - `routes`: Contains the routes used in the project
    - `Navigation.tsx`: The component for the navigation of the project
    - `routes.ts`: The routes used in the project
  - `styles.css`: The styles for the project
- `App.tsx`: The main component for the project
- `index.tsx`: The entry point for the project
