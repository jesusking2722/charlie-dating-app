import { MotiView } from "moti";
import { View } from "react-native";

interface ScreenTransitionProps {
  animationKey: number; // Ensure this is passed for triggering animation updates
  children: React.ReactNode;
  direction: "enter" | "exit";
  className?: string;
}

const ScreenTransition = ({
  animationKey,
  children,
  direction,
  className,
}: ScreenTransitionProps) => {
  const enterTransition = {
    from: {
      opacity: 0.3,
      translateX: 1000,
    },
    to: {
      opacity: 1,
      translateX: 0,
    },
  };

  const exitTransition = {
    from: {
      opacity: 1,
      translateX: 0,
    },
    to: {
      opacity: 0,
      translateX: -1000,
    },
  };

  const transition = direction === "enter" ? enterTransition : exitTransition;

  return (
    <MotiView
      key={animationKey} // Re-render when animationKey changes
      from={transition.from}
      animate={transition.to}
      transition={{ type: "timing", duration: 2000 }}
      className={className}
      style={{ width: "100%" }}
    >
      <View>{children}</View>
    </MotiView>
  );
};

export default ScreenTransition;
