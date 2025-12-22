import { LucideIcon } from "lucide-react";
import { motion } from "motion/react";

export default function TitleReusable({
  title,
  description,
  Icon,
  titleSize = "text-xl", // default size for title
  descriptionSize = "text-sm", // default size for description
  textColor = "text-primary/70",
}: {
  title: string;
  description: string;
  Icon?: React.ElementType;
  titleSize?: string; // Tailwind text size (e.g., "text-2xl")
  descriptionSize?: string;
  textColor?: string;
}) {
  return (
    <div>
      <div className="flex gap-3 items-center">
        <motion.span
          className={`bg-[linear-gradient(110deg,#404040,35%,#fff,50%,#404040,75%,#404040)] 
            bg-size-[200%_100%] bg-clip-text capitalize
            ${textColor} font-medium tracking-wide  flex items-center gap-1.5 ${titleSize}`}
          initial={{ backgroundPosition: "200% 0" }}
          animate={{ backgroundPosition: "-200% 0" }}
          transition={{
            repeat: Infinity,
            repeatType: "loop",
            duration: 7,
            ease: "linear",
          }}
        >
          {Icon && <Icon strokeWidth={2} className="h-5 w-6" />}
          {title}
        </motion.span>
        <div className="h-px flex-1 bg-linear-to-r from-border to-transparent" />
      </div>

      <p
        className={`${descriptionSize} text-gray-500 mt-1 lg:text-base text-sm`}
      >
        {description}
      </p>
    </div>
  );
}
