import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />}/>
          <Route path="/main" element={<MainPage />}/>
          <Route path="/recommend" element={<RecommendPage />}/>
          <Route path="/sentence" element={<TodaySentencePage />}/>
          <Route path="/book/info" element={<BookInfoPage />}/>
          <Route path="/book/review" element={<ReviewPage />}/>
          <Route path="/search" element={<SearchResultPage />}/>
          <Route path="/search/add" element={<AddBookPage />}/>
          <Route path="/mypage" element={<MyPage />}/>
          <Route path="/mypage/review" element={<MyReviewPage />}/>
          <Route path="/mypage/list" element={<BooketListPage />}/>
          <Route path="/mypage/calendar" element={<CalendarPage />}/>
          <Route path="/mypage/complete" element={<CompletePage />}/>
          <Route path="/mypage/statistics" element={<StatisticsPage />}/>
          <Route path="/mypage/write" element={<WritingReviewPage />}/>
          <Route path="/auth/login" element={<LoginPage />}/>
          <Route path="/auth/register" element={<RegisterPage />}/>
          <Route path="/auth/register/evaluate" element={<RegisterEvaluatePage />}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
