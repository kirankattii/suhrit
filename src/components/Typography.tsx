import { Text } from "react-native";

export function Heading({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Text
      className={`text-[36px] leading-[43px] font-bold text-suhrhit-text ${className}`}
    >
      {children}
    </Text>
  );
}

export function SubHeading({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Text
      className={`text-[22px] leading-[29px] font-semibold text-suhrhit-text ${className}`}
    >
      {children}
    </Text>
  );
}

export function BodyText({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Text
      className={`text-[16px] leading-[25px] text-suhrhit-muted ${className}`}
    >
      {children}
    </Text>
  );
}

export function Label({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Text className="mb-2 text-[14px] font-medium text-suhrhit-text">
      {children}
    </Text>
  );
}