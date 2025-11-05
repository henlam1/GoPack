# GoPack! App
GoPack! is a MERN stack trip planning app that will help you create, organize, and categorize your packing lists for your next adventures!

## 🚀 Live Demo
[Try it here](https://gopack-client.onrender.com)

## 📺 Video Demo
(<video width="900" height="420" alt="VideoDemo" src="https://github.com/user-attachments/assets/eb8faf16-3a52-4e3b-b54d-47f43f10cb8d" />)

## ✨ Features
- AI generated suggestions (Tailored to each trip)
- React Query hooks with caching (40% fewer redundant API calls)
- Secure auth with httpOnly JWT tokens
- Automated CI/CD with GitHub Actions
- 100+ unit & E2E tests

## 🛠️ Tech Stack
React, Node.js, Express, MongoDB, React Query, Jest, Playwright, GitHub Actions

## 📸 Screenshots
<img width="900" height="420" alt="PublicHome" src="https://github.com/user-attachments/assets/ab78f88a-4bb4-4055-8166-26803f861478" />
<img width="900" height="420" alt="PrivateHome" src="https://github.com/user-attachments/assets/299e8c30-6a88-4a3c-9976-73f5ee682017" />
<img width="900" height="420" alt="DetailsPage" src="https://github.com/user-attachments/assets/b01fdaa5-7c7c-4188-9f6e-376e25526cd9" />

## 🏃 Getting Started
### Local Setup
```
git clone https://github.com/henlam1/GoPack.git
cd gopack/server
npm install
cd ../client
npm install
cd ..
npm install
npm run dev
```
### Database
- You'll need a mongodb instance
- Create a file named .env under server/  directory 
```
ATLAS_URI=<add the mongodb intance url here>
```
