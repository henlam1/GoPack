interface IconButtonProps {
  svgIcon: React.ReactNode;
  text: string;
}

export default function IconButton({ svgIcon, text }: IconButtonProps) {
  return (
    <button className="btn">
      {svgIcon}
      {text}
    </button>
  );
}
