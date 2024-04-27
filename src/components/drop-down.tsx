import { Dropdown, DropdownItem } from "flowbite-react";

interface DropDownProps {
  type: string;
  options: any[];
}

export default function Drop_down({ type, options }: DropDownProps) {
  return (
    <div>
      <div className="flex flex-col">
        <label className="font-bold mb-1">{`Select ${type}:`}</label>
        <select className="text-white bg-sky-700 rounded-lg">
          {options.map((option, index) => {
            const optionString = String(option);
            const modifiedOption = `${optionString.slice(0, 4)} - ${optionString.slice(4)}`;
            return (
              <option key={index} value={option}>
                {modifiedOption}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
}
