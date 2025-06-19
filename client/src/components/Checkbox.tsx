import { useState } from "react";

interface ICheckbox {
  checked: boolean;
}
export default function Checkbox({ checked }: ICheckbox) {
  const [isChecked, setIsChecked] = useState(checked);

  const handleChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <label>
      <input
        type="checkbox"
        checked={isChecked}
        onChange={handleChange}
        className="checkbox"
      />
    </label>
  );
}
