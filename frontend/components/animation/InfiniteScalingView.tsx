import { MotiView } from "moti";

interface InfiniteScalingViewProps {
  children: React.ReactNode;
  className?: string;
  scaleSize?: number;
  duration?: number;
  isAnimating?: boolean; // Controls animation
}

export default function InfiniteScalingView({
  children,
  className,
  scaleSize = 1.1,
  duration = 1000,
  isAnimating = true,
}: InfiniteScalingViewProps) {
  return (
    <MotiView
      from={{ scale: 1 }}
      animate={{ scale: isAnimating ? scaleSize : 1 }}
      transition={{
        type: "timing",
        duration: duration,
        loop: isAnimating,
        repeatReverse: isAnimating,
      }}
      className={className}
    >
      {children}
    </MotiView>
  );
}
