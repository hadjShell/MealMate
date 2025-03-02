## MealMate: AI-Powered Nutrition and Meal Planning App

MealMate is an innovative, AI-driven nutrition and meal planning application designed to help users make informed dietary choices, plan meals, and achieve their health goals. With features like personalized meal recommendations, smart shopping lists, and an interactive AI chat assistant, MealMate makes healthy eating easier and more accessible than ever.

### Features
	•	AI-Powered Meal Recommendations:
Get personalized meal suggestions based on your dietary preferences, health goals, and nutritional needs.
	•	Interactive AI Chat Assistant:
Engage with our AI chatbot for real-time nutrition advice, recipe ideas, and meal planning assistance.
	•	Smart Shopping List:
Automatically generate shopping lists based on your meal plans, with AI-optimized suggestions for budget-friendly and nutritious options.
	•	Nutrition Dashboard:
Visualize your nutritional intake with detailed charts and AI-generated insights to help you stay on track with your health goals.
	•	User Profile and Customization:
Set your dietary preferences, allergies, and health goals for a tailored experience.
	•	Recipe Database:
Access a wide variety of healthy recipes with detailed nutritional information and cooking instructions.

### Tech Stack
	•	Frontend: Next.js 13 with App Router, React, TypeScript
	•	UI Components: shadcn/ui, Tailwind CSS
	•	State Management: React Hooks (useState, useEffect)
	•	Animations: Framer Motion
	•	Icons: Lucide React

### Getting Started

#### Prerequisites
	•	Node.js (v14 or later)
	•	npm or yarn

#### Installation
	1.	Clone the Repository:

git clone <repository-url>
cd MealMate


	2.	Install Dependencies:

npm install


	3.	Set Up Environment Variables:
Create a .env file in the project root with the following content (replace with your actual API key and any other variables):

OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

	Important: Do not commit your .env file to version control to keep your credentials secure.

#### Running in Development

Start the development server with:

npm run dev

You should see output similar to:

   ▲ Next.js 15.2.0
   - Local:        http://localhost:3000
   - Network:      http://10.99.79.147:3000
   - Environments: .env
   - Experiments (use with caution):
     ✓ webpackBuildWorker
     ✓ parallelServerCompiles
     ✓ parallelServerBuildTraces

 ✓ Starting...
 ✓ Ready in 1198ms
 ○ Compiling / ...
 ✓ Compiled / in 1817ms (1974 modules)
 GET / 200 in 2258ms
 ✓ Compiled in 181ms (933 modules)
 ✓ Compiled in 345ms (1974 modules)
 GET / 200 in 64ms
 ✓ Compiled in 367ms (1974 modules)
 GET / 200 in 69ms

Then open your browser and navigate to http://localhost:3000 to view the application.

Building for Production

To create an optimized production build, run:

npm run build

After building, start the production server with:

npm start

Available Scripts
	•	npm run dev
Starts the Next.js development server with hot reloading.
	•	npm run build
Compiles the application for production.
	•	npm run start
Starts the production server after the build.

#### Experimental Features

MealMate currently leverages several experimental features in Next.js:
	•	webpackBuildWorker:
Offloads parts of the webpack build to worker threads.
	•	parallelServerCompiles:
Compiles server-side code in parallel to speed up builds.
	•	parallelServerBuildTraces:
Generates build traces in parallel to improve build performance.

These experimental features help improve development and build times, but use them with caution in a production environment.

Contributing

Contributions are welcome! Follow these steps to contribute:
	1.	Fork the Repository.
	2.	Create a New Branch:

git checkout -b feature/your-feature-name


	3.	Make Your Changes and Commit Them:

git commit -am 'Add new feature'


	4.	Push to Your Branch:

git push origin feature/your-feature-name


	5.	Open a Pull Request.

License

This project is licensed under the MIT License.