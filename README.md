# Automated Homework Tracker
The Automated Homework Tracker is a web application designed to streamline the communication between tutors and parents regarding students' homework statuses. This application enables tutors to efficiently manage and update homework assignments, while providing parents with instant access to this information through the LINE app.

## Features
- Secure Tutor Access: Tutors can securely access and modify student information and homework statuses using a RESTful API designed with secure CRUD operations.
- Parental Engagement: Integrates with the LINE API, enabling parents to conveniently check their children's homework progress and plan pickups without the need for direct communication with tutors.

## Environment requirements
- [Node.js](https://nodejs.org/en)

## Installation
1. Clone the repository
```
git clone [https://github.com/weihsiang05/shorterURL.git](https://github.com/weihsiang05/Automated_Homework_Tracker)
```
2. Move to the homeworkTracker directory

```
cd homeworkTracker
```
3. Restore the dependencies

```
npm install
```
4. Launch the application

Frontend:
```
npm run start
```
backend:
```
npm run dev
```
In your browser, open http://localhost:3000 to see the website.

## Demo
1. Main Page
![Screenshot 2024-06-17 at 10 49 11 PM](https://github.com/weihsiang05/Automated_Homework_Tracker/assets/142484249/6b672857-72bc-4b04-a8ea-2587dd73e4f0)
2. Add a new Subject
![Screenshot 2024-06-17 at 10 50 04 PM](https://github.com/weihsiang05/Automated_Homework_Tracker/assets/142484249/24b8f8e6-321c-4cdf-9d07-480740af039e)
3. Add a new Student
![Screenshot 2024-06-17 at 10 49 55 PM](https://github.com/weihsiang05/Automated_Homework_Tracker/assets/142484249/af225ffd-d052-4c65-be1a-b151157c1b48)
4. Assign student parents![Screenshot 2024-06-17 at 10 51 14 PM](https://github.com/weihsiang05/Automated_Homework_Tracker/assets/142484249/81e42cc9-1854-4e63-8144-4692bba37bd6)
5. Edit student information
![Screenshot 2024-06-17 at 10 50 32 PM](https://github.com/weihsiang05/Automated_Homework_Tracker/assets/142484249/1b860a24-ab22-4e62-849f-9588cf04fc5d)
6. Generate student homework status on the LINE chat app
![IMG_0453](https://github.com/weihsiang05/Automated_Homework_Tracker/assets/142484249/126a88af-eed6-4a57-8f7a-e658da5d7ce0)

## Development Tools
- express: 4.18.2
- react: 18.2.0
- mui: 5.15.7
