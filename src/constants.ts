import {
  Code2,
  Megaphone,
  Cpu,
  ShieldCheck,
  GitBranch,
  BrainCircuit,
  GraduationCap,
  Users,
  UserCheck,
  Award,
  BookOpen,
  Calendar,
  Clock,
  Headphones,
} from "lucide-react";

export const CATEGORIES = [
  {
    id: 1,
    title: "Digital Marketing",
    description:
      "Master SEO, social media marketing, and data-driven advertising strategies to grow your brand.",
    icon: Megaphone,
    color: "bg-blue-50 text-blue-600",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 2,
    title: "Web Development",
    description:
      "Build modern, responsive websites using the latest frameworks and industry best practices.",
    icon: Code2,
    color: "bg-indigo-50 text-indigo-600",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 3,
    title: "IoT",
    description:
      "Explore the world of connected devices, sensors, and smart automation systems.",
    icon: Cpu,
    color: "bg-purple-50 text-purple-600",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 4,
    title: "Cyber Security",
    description:
      "Learn to protect networks, systems, and programs from digital attacks and data breaches.",
    icon: ShieldCheck,
    color: "bg-cyan-50 text-cyan-600",
    image:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 5,
    title: "DevOps",
    description:
      "Bridge the gap between development and operations with automated CI/CD pipelines.",
    icon: GitBranch,
    color: "bg-blue-50 text-blue-600",
    image:
      "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 6,
    title: "AI/ML",
    description:
      "Harness the power of artificial intelligence and machine learning to solve complex problems.",
    icon: BrainCircuit,
    color: "bg-indigo-50 text-indigo-600",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
  },
];

export const STATS = [
  { label: "Courses", value: "50+", icon: GraduationCap },
  { label: "Global Learners", value: "10k", icon: Users },
  { label: "Expert Mentors", value: "50+", icon: UserCheck },
  { label: "Certificates Issued", value: "8.5k", icon: Award },
];

export const COURSES = [
  {
    id: 1,
    title: "Web Dev",
    description: "Learn modern web dev, architecture, and deployment patterns.",
    price: "$350",
    badge: "Best Seller",
    image: "/Web-Development.png",
  },
  {
    id: 2,
    title: "Digital Marketing",
    description: "Comprehensive guide to SEO, SEM, and social media strategy.",
    price: "$300",
    badge: "Best Seller",
    image: "/Digital-Marketing.png",
  },
  {
    id: 3,
    title: "IoT",
    description: "Learn how to build and deploy connected devices.",
    price: "$500",
    badge: "Trending",
    image: "IoT-Training.png",
  },
  {
    id: 4,
    title: "Cyber Security",
    description: "Learn security fundamentals and advanced threat protection.",
    price: "$450",
    badge: "Best Seller",
    image: "/cyber-security.png",
  },
];

export const WHY_CHOOSE_US = [
  {
    title: "Online Classes",
    description: "Enjoy flexible learning with our online classes.",
    icon: BookOpen,
  },
  {
    title: "Easy Registration",
    description: "Simple and quick registration process.",
    icon: Calendar,
  },
  {
    title: "Expert Instructor",
    description: "Learn from industry experts and professionals.",
    icon: UserCheck,
  },
  {
    title: "24/7 Live Support",
    description: "Get help whenever you need it with our support.",
    icon: Headphones,
  },
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: "Benn yfrca",
    role: "Student",
    content: "The courses are amazing and the instructors are very helpful.",
    image: "https://i.pravatar.cc/150?u=benn",
  },
  {
    id: 2,
    name: "Alonsh Enchan",
    role: "Student",
    content: "I learned so much and earned my certificate in just a few weeks.",
    image: "https://i.pravatar.cc/150?u=alonsh",
  },
  {
    id: 3,
    name: "Jesu Edu",
    role: "Student",
    content: "Great community and support. Highly recommended!",
    image: "https://i.pravatar.cc/150?u=jesu",
  },
];

export const FAQS = [
  {
    question: "How are the courses structured?",
    answer:
      "Our courses are divided into modules with video lessons, quizzes, and projects.",
  },
  {
    question: "How many students are in a class?",
    answer: "We keep our classes small to ensure personalized attention.",
  },
  {
    question: "Are there any similar questions?",
    answer: "You can check our full FAQ page for more details.",
  },
  {
    question: "How to contact instructors?",
    answer:
      "You can reach out to instructors via the course dashboard or email.",
  },
  {
    question: "How to enroll in a course?",
    answer: "Simply click the Enroll Now button on any course page.",
  },
  {
    question: "What are the requirements?",
    answer: "Most courses require only a basic understanding of the subject.",
  },
  {
    question: "Do you provide placement or internship support?",
    answer:
      "Yes, we offer career guidance, resume building, mock interviews, and internship/job assistance for eligible students.",
  },
  {
    question: "Can I access the course after completion?",
    answer:
      "Yes, you will have lifetime (or long-term) access to course materials, including updates and recorded sessions.",
  },
  {
    question: "Do you offer certification upon completion?",
    answer:
      "Yes, upon successful completion of the course and assessments, you will receive a verifiable certificate.",
  },
];
