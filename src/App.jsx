// import React from 'react';
// import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// import LandingPage   from './pages/LandingPage';
// import LoginPage     from './pages/LoginPage';
// import SignUpPage    from './pages/SignUpPage';
// import FeedPage      from './pages/FeedPage';
// import ExplorePage   from './pages/ExplorePage';
// import RestaurantPage from './pages/RestaurantPage';
// import ProfilePage   from './pages/ProfilePage';
// import WishlistPage  from './pages/WishlistPage';
// import MessagesPage  from './pages/MessagesPage';
// import AddReviewPage from './pages/AddReviewPage';

// export default function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/"              element={<LandingPage />} />
//         <Route path="/login"         element={<LoginPage />} />
//         <Route path="/signup"        element={<SignUpPage />} />
//         <Route path="/feed"          element={<FeedPage />} />
//         <Route path="/explore"       element={<ExplorePage />} />
//         <Route path="/restaurant/:id" element={<RestaurantPage />} />
//         <Route path="/profile"       element={<ProfilePage />} />
//         <Route path="/wishlist"      element={<WishlistPage />} />
//         <Route path="/messages"      element={<MessagesPage />} />
//         <Route path="/add-review"    element={<AddReviewPage />} />
//         <Route path="*"              element={<Navigate to="/" replace />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import FeedPage from './pages/FeedPage';
import WishlistPage from './pages/WishlistPage';
import ProfilePage from './pages/ProfilePage';
import ExplorePage from './pages/ExplorePage';
import MessagesPage from './pages/MessagesPage';
import AddReviewPage from './pages/AddReviewPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"       element={<LandingPage />} />
        <Route path="/login"  element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/feed"   element={<FeedPage />} />
        <Route path="*"       element={<Navigate to="/" replace />} />
        <Route path="/wishlist" element={<WishlistPage/>} />
        <Route path="/profile" element={<ProfilePage/>} />
        <Route path="/explore" element={<ExplorePage />} /> 
        <Route path="/messages" element={<MessagesPage />} />
        <Route path="/add-review" element={<AddReviewPage />} />
      </Routes>
    </BrowserRouter>
  );
}