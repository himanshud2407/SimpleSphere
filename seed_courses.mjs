
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://svclrnjsjpeebzijiepp.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN2Y2xybmpzanBlZWJ6aWppZXBwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYyMjAzMDAsImV4cCI6MjA5MTc5NjMwMH0.JZBbXkId0cr3nAHKHVSlBo6gmNIGAgpX0lHE9RZnKvY";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const demoCourses = [
  {
    title: "Mastering GenAI & Agentic Systems",
    category: "genai",
    price: "$299",
    inst: "Dr. Pavan Shimpi",
    img: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
    level: "Advanced",
    rating: "4.9",
    reviews: "850"
  },
  {
    title: "Full-Stack Web Engineering 2026",
    category: "software",
    price: "$199",
    inst: "Pankaj Wankhede",
    img: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800",
    level: "Intermediate",
    rating: "4.8",
    reviews: "1200"
  },
  {
    title: "Data Science & Predictive Analytics",
    category: "data",
    price: "Subscription",
    inst: "Dr. Pavan Shimpi",
    img: "https://images.unsplash.com/photo-1551288049-bbbda5366991?auto=format&fit=crop&q=80&w=800",
    level: "Beginner",
    rating: "4.7",
    reviews: "560"
  },
  {
    title: "Cyber Security & Ethical Hacking",
    category: "cyber",
    price: "$249",
    inst: "Pankaj Wankhede",
    img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800",
    level: "Intermediate",
    rating: "4.9",
    reviews: "320"
  },
  {
    title: "Cloud Architecture Masterclass",
    category: "cloud",
    price: "Free",
    inst: "Dr. Pavan Shimpi",
    img: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=800",
    level: "Intermediate",
    rating: "4.6",
    reviews: "210"
  },
  {
    title: "Digital Marketing Strategy",
    category: "marketing",
    price: "$99",
    inst: "Pankaj Wankhede",
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
    level: "Beginner",
    rating: "4.8",
    reviews: "1500"
  }
];

async function seed() {
  console.log("Seeding demo courses...");
  
  // Clear existing courses for a clean demo
  const { error: deleteError } = await supabase
    .from('courses')
    .delete()
    .neq('id', 0); // Delete all
    
  if (deleteError) {
    console.error("Error clearing courses:", deleteError);
  }

  const { data, error } = await supabase
    .from('courses')
    .insert(demoCourses);

  if (error) {
    console.error("Error seeding courses:", error);
  } else {
    console.log("Successfully seeded demo courses!");
  }
}

seed();
