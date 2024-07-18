import StyledText from "./StyledText";

type InfoBoxProps = {
  label: string;
  content: string;
};

export default function InfoBox({ label, content }: InfoBoxProps) {
  return (
    <StyledText style={{ flexDirection: "row", gap: 4 }} selectable={true}>
      <StyledText fontWeight="bold" size="big">
        {label}:
      </StyledText>
      <StyledText textTransform="capitalize"> {content}</StyledText>
    </StyledText>
  );
}
