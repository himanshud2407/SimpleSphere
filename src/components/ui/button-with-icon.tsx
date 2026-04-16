import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

const ButtonWithIconDemo = ({ 
  className, 
  circleClassName, 
  text = "Enroll Now",
  to 
}: { 
  className?: string; 
  circleClassName?: string; 
  text?: string;
  to?: string;
}) => {
  // Default link based on text if 'to' is not provided
  const target = to || (text === "Enroll Now" ? "/contact" : "/courses");

  return (
    <Link to={target}>
      <Button className={`group/button relative text-sm font-medium rounded-full h-12 p-1 ps-6 pe-14 transition-all duration-500 ease-in-out md:hover:ps-14 md:hover:pe-6 w-fit overflow-hidden cursor-pointer ${className}`}>
        <span className="relative z-10 transition-all duration-500 ease-in-out">
          {text}
        </span>
        <div className={`absolute right-1 w-10 h-10 bg-white text-blue-600 rounded-full flex items-center justify-center transition-all duration-500 ease-in-out md:group-hover/button:right-[calc(100%-44px)] md:group-hover/button:rotate-45 shadow-sm ${circleClassName}`}>
          <ArrowUpRight size={16} />
        </div>
      </Button>
    </Link>
  );
};

export default ButtonWithIconDemo;
