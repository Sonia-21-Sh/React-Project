import React, { Suspense } from 'react';
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

// Lazy load pages
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
import Features from './pages/Features';
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
                    <Toaster 
                      position="top-right"
                      toastOptions={{
                        duration: 4000,
                        style: {
                          background: '#363636',
                          color: '#fff',
                        },
                        success: {
                          duration: 3000,
                          iconTheme: {
                            primary: '#10b981',
                            secondary: '#fff',
                          },
                        },
                        error: {
                          duration: 4000,
                          iconTheme: {
                            primary: '#ef4444',
                            secondary: '#fff',
                          },
                        },
                      }}
                    />
                    <Navbar />
                    <NotificationBell />
                    <Suspense fallback={<Loader />}>
                      <AnimatePresence mode="wait">
                        <Routes>
                          <Route path="/" element={
                            <motion.div
                              variants={pageVariants}
                              initial="initial"
                              animate="animate"
                              exit="exit"
                              transition={{ duration: 0.5 }}
                            >
                              <Home />
                            </motion.div>
                          } />
                          <Route path="/about" element={
                            <motion.div
                              variants={pageVariants}
                              initial="initial"
                              animate="animate"
                              exit="exit"
                              transition={{ duration: 0.5 }}
                            >
                              <About />
                            </motion.div>
                          } />
                          <Route path="/features" element={
                            <motion.div
                              variants={pageVariants}
                              initial="initial"
                              animate="animate"
                              exit="exit"
                              transition={{ duration: 0.5 }}
                            >
                              <Features />
                            </motion.div>
                          } />
                          <Route path="/contact" element={
                            <motion.div
                              variants={pageVariants}
                              initial="initial"
                              animate="animate"
                              exit="exit"
                              transition={{ duration: 0.5 }}
                            >
                              <Contact />
                            </motion.div>
                          } />
                          <Route path="/login" element={
                            <motion.div
                              variants={pageVariants}
                              initial="initial"
                              animate="animate"
                              exit="exit"
                              transition={{ duration: 0.5 }}
                            >
                              <Login />
                            </motion.div>
                          } />
                          <Route path="/signup" element={
                            <motion.div
                              variants={pageVariants}
                              initial="initial"
                              animate="animate"
                              exit="exit"
                              transition={{ duration: 0.5 }}
                            >
                              <Signup />
                            </motion.div>
                          } />
                          <Route path="/verify-otp" element={
                            <motion.div
                              variants={pageVariants}
                              initial="initial"
                              animate="animate"
                              exit="exit"
                              transition={{ duration: 0.5 }}
                            >
                              <OTPVerification />
                            </motion.div>
                          } />
                          <Route path="/forgot-password" element={
                            <motion.div
                              variants={pageVariants}
                              initial="initial"
                              animate="animate"
                              exit="exit"
                              transition={{ duration: 0.5 }}
                            >
                              <ForgotPassword />
                            </motion.div>
                          } />
                          <Route path="/dashboard/*" element={
                            <PrivateRoute>
                              <motion.div
                                variants={pageVariants}
                                initial="initial"
                                animate="animate"
                                exit="exit"
                                transition={{ duration: 0.5 }}
                              >
                                <Dashboard />
                              </motion.div>
                            </PrivateRoute>
                          } />
                          <Route path="/notes" element={
                            <PrivateRoute>
                              <motion.div
                                variants={pageVariants}
                                initial="initial"
                                animate="animate"
                                exit="exit"
                                transition={{ duration: 0.5 }}
                              >
                                <NotesSystem />
                              </motion.div>
                            </PrivateRoute>
                          } />
                          <Route path="/quiz" element={
                            <PrivateRoute>
                              <motion.div
                                variants={pageVariants}
                                initial="initial"
                                animate="animate"
                                exit="exit"
                                transition={{ duration: 0.5 }}
                              >
                                <QuizEngine />
                              </motion.div>
                            </PrivateRoute>
                          } />
                          <Route path="/tasks" element={
                            <PrivateRoute>
                              <motion.div
                                variants={pageVariants}
                                initial="initial"
                                animate="animate"
                                exit="exit"
                                transition={{ duration: 0.5 }}
                              >
                                <TasksPlanner />
                              </motion.div>
                            </PrivateRoute>
                          } />
                          <Route path="/progress" element={
                            <PrivateRoute>
                              <motion.div
                                variants={pageVariants}
                                initial="initial"
                                animate="animate"
                                exit="exit"
                                transition={{ duration: 0.5 }}
                              >
                                <ProgressAnalytics />
                              </motion.div>
                            </PrivateRoute>
                          } />
                          <Route path="/ai-tools" element={
                            <PrivateRoute>
                              <motion.div
                                variants={pageVariants}
                                initial="initial"
                                animate="animate"
                                exit="exit"
                                transition={{ duration: 0.5 }}
                              >
                                <AIToolsHub />
                              </motion.div>
                            </PrivateRoute>
                          } />
                          <Route path="/calendar" element={
                            <PrivateRoute>
                              <motion.div
                                variants={pageVariants}
                                initial="initial"
                                animate="animate"
                                exit="exit"
                                transition={{ duration: 0.5 }}
                              >
                                <CalendarSchedule />
                              </motion.div>
                            </PrivateRoute>
                          } />
                          <Route path="/notifications" element={
                            <PrivateRoute>
                              <motion.div
                                variants={pageVariants}
                                initial="initial"
                                animate="animate"
                                exit="exit"
                                transition={{ duration: 0.5 }}
                              >
                                <Notifications />
                              </motion.div>
                            </PrivateRoute>
                          } />
                          <Route path="/achievements" element={
                            <PrivateRoute>
                              <motion.div
                                variants={pageVariants}
                                initial="initial"
                                animate="animate"
                                exit="exit"
                                transition={{ duration: 0.5 }}
                              >
                                <Achievements />
                              </motion.div>
                            </PrivateRoute>
                          } />
                          <Route path="/profile" element={
                            <PrivateRoute>
                              <motion.div
                                variants={pageVariants}
                                initial="initial"
                                animate="animate"
                                exit="exit"
                                transition={{ duration: 0.5 }}
                              >
                                <Profile />
                              </motion.div>
                            </PrivateRoute>
                          } />
                          <Route path="/settings" element={
                            <PrivateRoute>
                              <motion.div
                                variants={pageVariants}
                                initial="initial"
                                animate="animate"
                                exit="exit"
                                transition={{ duration: 0.5 }}
                              >
                                <Settings />
                              </motion.div>
                            </PrivateRoute>
                          } />
                          <Route path="/students" element={
                            <PrivateRoute>
                              <motion.div
                                variants={pageVariants}
                                initial="initial"
                                animate="animate"
                                exit="exit"
                                transition={{ duration: 0.5 }}
                              >
                                <Students />
                              </motion.div>
                            </PrivateRoute>
                          } />
                          <Route path="/students/:id" element={
                            <PrivateRoute>
                              <motion.div
                                variants={pageVariants}
                                initial="initial"
                                animate="animate"
                                exit="exit"
                                transition={{ duration: 0.5 }}
                              >
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