#ppl-systems : frontend

##project setup##
Our current forntend tech stack is as follows - Vite build tool, Typescript, React

Scaffolding this project:

bash npm create vite@latest frontend -- --template react-ts cd frontend npm install npm install -D tailwindcss npx tailwindcss init 

Configure your tailwind.config.js file

bash /** @type {import('tailwindcss').Config} */ export default { content: [ "./index.html", "./src/**/*.{js,ts,jsx,tsx}"], theme: { extend: {}, }, plugins: [], } 

Then configure your index.css file. Replace the entire file with this:

bash @tailwind base; @tailwind components: @tailwind utilities; 
