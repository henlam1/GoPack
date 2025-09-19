// TODO: Render progress dynamically
export default function Progress() {
  return (
    <progress
      className="progress progress-primary w-full"
      value="40"
      max="100"
    ></progress>
  );
}
