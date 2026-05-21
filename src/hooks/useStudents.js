import { useState, useEffect } from 'react';
import { fetchUsers, fetchUserById } from '../services/api';
import toast from 'react-hot-toast';

export const useStudents = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  // Load students function
  const loadStudents = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchUsers();
      setStudents(data);
      setFilteredStudents(data);
    } catch (err) {
      setError('Failed to load students. Please try again.');
      toast.error('Failed to load students');
    } finally {
      setLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    loadStudents();
  }, []);

  // Filter and sort students
  useEffect(() => {
    let result = [...students];

    // Filter by search term
    if (searchTerm) {
      result = result.filter(student =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by course
    if (selectedCourse !== 'all') {
      result = result.filter(student => student.course === selectedCourse);
    }

    // Sort
    if (sortBy === 'name') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'progress') {
      result.sort((a, b) => b.progress - a.progress);
    } else if (sortBy === 'course') {
      result.sort((a, b) => a.course.localeCompare(b.course));
    }

    setFilteredStudents(result);
  }, [students, searchTerm, selectedCourse, sortBy]);

  // Get unique courses for filter
  const courses = ['all', ...new Set(students.map(s => s.course))];

  return {
    students: filteredStudents,
    allStudents: students,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    selectedCourse,
    setSelectedCourse,
    sortBy,
    setSortBy,
    courses,
    refreshStudents: loadStudents,
  };
};

export const useStudentDetails = (id) => {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load student details function
  const loadStudent = async () => {
    if (!id) return;
    
    try {
      setLoading(true);
      setError(null);
      const data = await fetchUserById(id);
      setStudent(data);
    } catch (err) {
      setError('Failed to load student details. Please try again.');
      toast.error('Failed to load student details');
    } finally {
      setLoading(false);
    }
  };

  // Load student when id changes
  useEffect(() => {
    loadStudent();
  }, [id]);

  return { 
    student, 
    loading, 
    error, 
    refreshStudent: loadStudent 
  };
};