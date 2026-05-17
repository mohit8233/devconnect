# DevConnect Responsive Frontend

This frontend is connected with your Express server base route:

```env
VITE_API_URL=http://localhost:8080/api/v1
```

## Run

```bash
npm install
npm run dev
```

## Backend APIs used

- POST `/register`
- POST `/login`
- GET `/profile`
- PATCH `/updateProfile`
- GET `/post`
- GET `/myPost`
- POST `/create`
- PATCH `/like/:id`
- DELETE `/delete/:id`
- GET `/get/:postId`
- POST `/comment/:postId`

## Pages

- Home
- Login
- Register
- Explore projects
- Dashboard
- Edit profile
- Create post
- My posts
