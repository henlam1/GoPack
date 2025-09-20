// TODO: Render progress dynamically
export default function Progress({ value }: { value: number }) {
  return (
    <progress
      className="progress progress-primary w-full"
      value={value}
      max="100"
    ></progress>
  );
}
