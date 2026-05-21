import axios from 'axios';

const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// Real profile images for students (random but consistent)
const avatarImages = [
  'https://randomuser.me/api/portraits/women/1.jpg',
  'https://randomuser.me/api/portraits/men/1.jpg',
  'https://randomuser.me/api/portraits/women/2.jpg',
  'https://randomuser.me/api/portraits/men/2.jpg',
  'https://randomuser.me/api/portraits/women/3.jpg',
  'https://randomuser.me/api/portraits/men/3.jpg',
  'https://randomuser.me/api/portraits/women/4.jpg',
  'https://randomuser.me/api/portraits/men/4.jpg',
  'https://randomuser.me/api/portraits/women/5.jpg',
  'https://randomuser.me/api/portraits/men/5.jpg',
  'https://randomuser.me/api/portraits/women/6.jpg',
  'https://randomuser.me/api/portraits/men/6.jpg',
  'https://randomuser.me/api/portraits/women/7.jpg',
  'https://randomuser.me/api/portraits/men/7.jpg',
  'https://randomuser.me/api/portraits/women/8.jpg',
  'https://randomuser.me/api/portraits/men/8.jpg',
  'https://randomuser.me/api/portraits/women/9.jpg',
  'https://randomuser.me/api/portraits/men/9.jpg',
  'https://randomuser.me/api/portraits/women/10.jpg',
  'https://randomuser.me/api/portraits/men/10.jpg',
];

// Real profile images for details page (high quality)
const highQualityAvatars = [
  'https://randomuser.me/api/portraits/women/68.jpg',
  'https://randomuser.me/api/portraits/men/68.jpg',
  'https://randomuser.me/api/portraits/women/45.jpg',
  'https://randomuser.me/api/portraits/men/45.jpg',
  'https://randomuser.me/api/portraits/women/32.jpg',
  'https://randomuser.me/api/portraits/men/32.jpg',
  'https://randomuser.me/api/portraits/women/54.jpg',
  'https://randomuser.me/api/portraits/men/54.jpg',
  'https://randomuser.me/api/portraits/women/23.jpg',
  'https://randomuser.me/api/portraits/men/23.jpg',
];

// Fetch all users (students) with real images
export const fetchUsers = async () => {
  try {
    const response = await api.get('/users');
    // Enhance users with additional data for demo
    const enhancedUsers = response.data.map((user, index) => ({
      ...user,
      course: getCourseByIndex(index),
      progress: getRandomProgress(index),
      // Use real randomuser.me API images
      avatar: avatarImages[index % avatarImages.length],
      thumbnail: avatarImages[index % avatarImages.length],
      status: getRandomStatus(index),
      enrolledDate: getRandomDate(),
      completedAssignments: Math.floor(Math.random() * 20) + 5,
      totalAssignments: 25,
      quizScores: [
        Math.floor(Math.random() * 30) + 70,
        Math.floor(Math.random() * 30) + 70,
        Math.floor(Math.random() * 30) + 70,
      ],
      bio: getRandomBio(user.name),
      location: getRandomLocation(),
      phone: getRandomPhone(),
    }));
    return enhancedUsers;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

// Fetch single user by ID with high quality image
export const fetchUserById = async (id) => {
  try {
    const response = await api.get(`/users/${id}`);
    const user = response.data;
    const index = id % highQualityAvatars.length;
    // Add enhanced data
    const enhancedUser = {
      ...user,
      course: getCourseByIndex(id),
      progress: getRandomProgress(id),
      avatar: highQualityAvatars[index],
      thumbnail: avatarImages[id % avatarImages.length],
      status: getRandomStatus(id),
      enrolledDate: getRandomDate(),
      completedAssignments: Math.floor(Math.random() * 20) + 5,
      totalAssignments: 25,
      quizScores: [
        Math.floor(Math.random() * 30) + 70,
        Math.floor(Math.random() * 30) + 70,
        Math.floor(Math.random() * 30) + 70,
      ],
      recentActivity: getRecentActivity(),
      bio: getRandomBio(user.name),
      location: getRandomLocation(),
      phone: getRandomPhone(),
      website: user.website,
      company: user.company?.name || 'Student',
    };
    return enhancedUser;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
};

// Helper functions
const getCourseByIndex = (index) => {
  const courses = [
    'Full Stack Web Development',
    'React & Next.js Mastery',
    'UI/UX Design Fundamentals',
    'Data Science & AI',
    'Cloud Computing (AWS)',
    'Mobile App Development',
    'Cybersecurity Essentials',
    'Digital Marketing',
    'Python Programming',
    'JavaScript Advanced',
  ];
  return courses[index % courses.length];
};

const getRandomProgress = (seed) => {
  const progresses = [25, 45, 60, 75, 85, 92, 38, 52, 68, 80, 48, 72, 88, 55, 65, 78, 82, 70, 90, 95];
  return progresses[seed % progresses.length];
};

const getRandomStatus = (seed) => {
  const statuses = ['online', 'offline', 'studying', 'in-class'];
  return statuses[seed % statuses.length];
};

const getRandomDate = () => {
  const start = new Date(2023, 0, 1);
  const end = new Date(2024, 11, 31);
  const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
};

const getRecentActivity = () => {
  return [
    { id: 1, action: 'Completed JavaScript Module', date: '2 days ago', type: 'course' },
    { id: 2, action: 'Scored 92% on React Quiz', date: '5 days ago', type: 'quiz' },
    { id: 3, action: 'Submitted Final Project', date: '1 week ago', type: 'assignment' },
    { id: 4, action: 'Started AI Course', date: '2 weeks ago', type: 'course' },
  ];
};

const getRandomBio = (name) => {
  const bios = [
    `Passionate ${name.split(' ')[0]} is a dedicated student with a strong interest in web development and AI. Always eager to learn new technologies and apply them to real-world projects.`,
    `Enthusiastic learner with a background in computer science. ${name.split(' ')[0]} loves solving complex problems and building innovative solutions.`,
    `${name.split(' ')[0]} is a creative thinker who combines technical skills with design thinking to create amazing user experiences.`,
    `Aspiring full-stack developer with a growth mindset. ${name.split(' ')[0]} believes in continuous learning and collaboration.`,
  ];
  return bios[Math.floor(Math.random() * bios.length)];
};

const getRandomLocation = () => {
  const locations = [
    'San Francisco, CA',
    'New York, NY',
    'London, UK',
    'Toronto, Canada',
    'Sydney, Australia',
    'Berlin, Germany',
    'Paris, France',
    'Tokyo, Japan',
    'Singapore',
    'Dubai, UAE',
  ];
  return locations[Math.floor(Math.random() * locations.length)];
};

const getRandomPhone = () => {
  const phones = [
    '+1 (555) 123-4567',
    '+1 (555) 234-5678',
    '+1 (555) 345-6789',
    '+1 (555) 456-7890',
    '+1 (555) 567-8901',
  ];
  return phones[Math.floor(Math.random() * phones.length)];
};