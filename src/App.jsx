import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { NotesProvider } from './contexts/NotesContext';
import { TasksProvider } from './contexts/TasksContext';
import { QuizProvider } from './contexts/QuizContext';
import { AchievementsProvider } from './contexts/AchievementsContext';
import { NotificationProvider } from './contexts/NotificationContext';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Loader from './components/Loader';
import PrivateRoute from './components/PrivateRoute';
import NotificationBell from './components/NotificationBell';

// Lazy loaded pages
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Features = lazy(() => import('./pages/Features'));
const Contact = lazy(() => import('./pages/Contact'));
const Login = lazy(() => import('./pages/Login'));
const Signup = lazy(() => import('./pages/Signup'));
const OTPVerification = lazy(() => import('./pages/OTPVerification'));
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const NotesSystem = lazy(() => import('./pages/NotesSystem'));
const QuizEngine = lazy(() => import('./pages/QuizEngine'));
const TasksPlanner = lazy(() => import('./pages/TasksPlanner'));
const ProgressAnalytics = lazy(() => import('./pages/ProgressAnalytics'));
const AIToolsHub = lazy(() => import('./pages/AIToolsHub'));
const CalendarSchedule = lazy(() => import('./pages/CalendarSchedule'));
const Notifications = lazy(() => import('./pages/Notifications'));
const Achievements = lazy(() => import('./pages/Achievements'));
const Profile = lazy(() => import('./pages/Profile'));
const Settings = lazy(() => import('./pages/Settings'));
const Students = lazy(() => import('./pages/Students'));
const StudentDetails = lazy(() => import('./pages/StudentDetails'));

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <NotesProvider>
          <TasksProvider>
            <QuizProvider>
              <AchievementsProvider>
                <NotificationProvider>
                  <Router>
                    <Toaster position="top-right" />
                    <Navbar />
                    <NotificationBell />

                    <Suspense fallback={<Loader />}>
                      <AnimatePresence mode="wait">
                        <Routes>

                          <Route path="/" element={
                            <motion.div {...pageVariants}>
                              <Home />
                            </motion.div>
                          } />

                          <Route path="/about" element={
                            <motion.div {...pageVariants}>
                              <About />
                            </motion.div>
                          } />

                          <Route path="/features" element={
                            <motion.div {...pageVariants}>
                              <Features />
                            </motion.div>
                          } />

                          <Route path="/contact" element={
                            <motion.div {...pageVariants}>
                              <Contact />
                            </motion.div>
                          } />

                          <Route path="/login" element={
                            <motion.div {...pageVariants}>
                              <Login />
                            </motion.div>
                          } />

                          <Route path="/signup" element={
                            <motion.div {...pageVariants}>
                              <Signup />
                            </motion.div>
                          } />

                          <Route path="/verify-otp" element={
                            <motion.div {...pageVariants}>
                              <OTPVerification />
                            </motion.div>
                          } />

                          <Route path="/forgot-password" element={
                            <motion.div {...pageVariants}>
                              <ForgotPassword />
                            </motion.div>
                          } />

                          <Route path="/dashboard/*" element={
                            <PrivateRoute>
                              <motion.div {...pageVariants}>
                                <Dashboard />
                              </motion.div>
                            </PrivateRoute>
                          } />

                          <Route path="/notes" element={
                            <PrivateRoute>
                              <motion.div {...pageVariants}>
                                <NotesSystem />
                              </motion.div>
                            </PrivateRoute>
                          } />

                          <Route path="/quiz" element={
                            <PrivateRoute>
                              <motion.div {...pageVariants}>
                                <QuizEngine />
                              </motion.div>
                            </PrivateRoute>
                          } />

                          <Route path="/tasks" element={
                            <PrivateRoute>
                              <motion.div {...pageVariants}>
                                <TasksPlanner />
                              </motion.div>
                            </PrivateRoute>
                          } />

                          <Route path="/progress" element={
                            <PrivateRoute>
                              <motion.div {...pageVariants}>
                                <ProgressAnalytics />
                              </motion.div>
                            </PrivateRoute>
                          } />

                          <Route path="/ai-tools" element={
                            <PrivateRoute>
                              <motion.div {...pageVariants}>
                                <AIToolsHub />
                              </motion.div>
                            </PrivateRoute>
                          } />

                          <Route path="/calendar" element={
                            <PrivateRoute>
                              <motion.div {...pageVariants}>
                                <CalendarSchedule />
                              </motion.div>
                            </PrivateRoute>
                          } />

                          <Route path="/notifications" element={
                            <PrivateRoute>
                              <motion.div {...pageVariants}>
                                <Notifications />
                              </motion.div>
                            </PrivateRoute>
                          } />

                          <Route path="/achievements" element={
                            <PrivateRoute>
                              <motion.div {...pageVariants}>
                                <Achievements />
                              </motion.div>
                            </PrivateRoute>
                          } />

                          <Route path="/profile" element={
                            <PrivateRoute>
                              <motion.div {...pageVariants}>
                                <Profile />
                              </motion.div>
                            </PrivateRoute>
                          } />

                          <Route path="/settings" element={
                            <PrivateRoute>
                              <motion.div {...pageVariants}>
                                <Settings />
                              </motion.div>
                            </PrivateRoute>
                          } />

                          <Route path="/students" element={
                            <PrivateRoute>
                              <motion.div {...pageVariants}>
                                <Students />
                              </motion.div>
                            </PrivateRoute>
                          } />

                          <Route path="/students/:id" element={
                            <PrivateRoute>
                              <motion.div {...pageVariants}>
                                <StudentDetails />
                              </motion.div>
                            </PrivateRoute>
                          } />

                        </Routes>
                      </AnimatePresence>
                    </Suspense>

                    <Footer />
                  </Router>
                </NotificationProvider>
              </AchievementsProvider>
            </QuizProvider>
          </TasksProvider>
        </NotesProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;