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

  // Fetch all students
  useEffect(() => {
    loadStudents();
  }, []);

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
    result.sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'progress') return b.progress - a.progress;
      if (sortBy === 'course') return a.course.localeCompare(b.course);
      return 0;
    });

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

  useEffect(() => {
    loadStudent();
  }, [id]);

  const loadStudent = async () => {
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

  return { student, loading, error, refreshStudent: loadStudent };
};