import { MotiView } from "moti";
import { View } from "react-native";

interface ScreenTransitionProps {
  animationKey: number; // Ensure this is passed for triggering animation updates
  children: React.ReactNode;
  direction: "enter" | "exit";
  className?: string;
  pinked?: boolean;
}

const ScreenTransition = ({
  animationKey,
  children,
  direction,
  className,
  pinked,
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
      key={animationKey}
      from={transition.from}
      animate={transition.to}
      transition={{ type: "timing", duration: 2000 }}
      className={className}
      style={{ width: "100%", display: "flex", flex: 1 }}
    >
      <View
        className={`flex-1 px-8 py-4 ${pinked ? "bg-pink-200" : "bg-white"}`}
      >
        {children}
      </View>
    </MotiView>
  );
};

export default ScreenTransition;
