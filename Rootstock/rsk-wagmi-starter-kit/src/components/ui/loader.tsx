import { Oval } from "react-loader-spinner";

type Props = {
  color?: string;
  height?: number;
  width?: number;
  secondaryColor?: string;
  strokeWidth?: number;
};

export default function Loader(props: Props) {
  const {
    color = "#ffffff",
    height = 30,
    width = 30,
    secondaryColor = "#ffffff44",
    strokeWidth = 5,
  } = props;
  return (
    <div className="flex justify-center">
      <Oval
        color={color}
        height={height}
        width={width}
        secondaryColor={secondaryColor}
        strokeWidth={strokeWidth}
      />
    </div>
  );
}
