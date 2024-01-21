import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Auth from './component/Auth';
import axios from "axios";
import HomePage from "./page/HomePage.js"
import MainPage from "./page/MainPage.js"
import RecommendPage from "./page/RecommendPage.js"
import ReviewPage from "./page/ReviewPage.js"
import TodaySentencePage from "./page/TodaySentencePage.js"
import BookInfoPage from "./page/BookInfoPage.js"
import AddBookPage from "./page/search/AddBookPage.js"
import SearchResultPage from "./page/search/SearchResultPage.js"
import MyReviewPage from "./page/mypage/MyReviewPage.js"
import BooketListPage from "./page/mypage/BooketListPage.js"
import CalendarPage from "./page/mypage/CalendarPage.js"
import CompletePage from "./page/mypage/CompletePage.js"
import MyPage from "./page/mypage/MyPage.js"
import StatisticsPage from "./page/mypage/StatisticsPage.js"
import WritingReviewPage from "./page/mypage/WritingReviewPage.js"
import LoginPage from "./page/auth/LoginPage.js"
import RegisterPage from "./page/auth/RegisterPage.js"
import RegisterEvaluatePage from "./page/auth/RegisterEvaluatePage.js"
import ForgotPasswordPage from "./page/auth/ForgotPasswordPage.js"
import ResetPasswordPage from './page/auth/ResetPasswordPage';
import EditProfilePage from './page/mypage/EditProfilePage.js'

const checkUser = async () => {
  const response = await axios.get(`http://localhost:3001/user/check`, {
    withCredentials: true,
  });
  console.log("checkuser data: ", response.data)
  return response.data;
};

function App() {
  const { data } = useQuery({
    queryKey: ['check'],
    queryFn: checkUser
  })

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />}/>
          <Route path="/main" element={<MainPage />}/>
          <Route path="/recommend" element={<Auth><RecommendPage /></Auth>}/>
          <Route path="/sentence" element={<Auth><TodaySentencePage /></Auth>}/>
          <Route path="/book/info" element={<Auth><BookInfoPage /></Auth>}/>
          <Route path="/book/review" element={<Auth><ReviewPage /></Auth>}/>
          <Route path="/search" element={<SearchResultPage />}/>
          <Route path="/search/add" element={<AddBookPage />}/>
          <Route path="/mypage" element={<Auth><MyPage /></Auth>}/>
          <Route path="/mypage/review" element={<Auth><MyReviewPage /></Auth>}/>
          <Route path="/mypage/list" element={<Auth><BooketListPage /></Auth>}/>
          <Route path="/mypage/calendar" element={<Auth><CalendarPage /></Auth>}/>
          <Route path="/mypage/complete" element={<Auth><CompletePage /></Auth>}/>
          <Route path="/mypage/statistics" element={<Auth><StatisticsPage /></Auth>}/>
          <Route path="/mypage/write" element={<Auth><WritingReviewPage /></Auth>}/>
          <Route path="/auth/login" element={<LoginPage />}/>
          <Route path="/auth/register" element={<RegisterPage />}/>
          <Route path="/auth/register/evaluate" element={<RegisterEvaluatePage />}/>
          <Route path="/auth/forget-password" element={<ForgotPasswordPage />}/>
          <Route path="/auth/reset-password" element={<ResetPasswordPage />}/>
          <Route path="/mypage/edit-profile" element={<EditProfilePage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;


//  <Route path="/mypage" element={<Auth><MyPage /></Auth>} />