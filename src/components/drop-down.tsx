import { Dropdown, DropdownItem } from "flowbite-react";

interface DropDownProps {
  type: string;
  options: any[];
}

export default function Drop_down({ type, options }: DropDownProps) {
  if (type === "Year") {
    return (
      <div>
        <div className="flex flex-col">
          <select className="text-white bg-sky-700 rounded-lg">
            {[...options].reverse().map((option, index) => {
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
  } else if (type === "Team") {
    return (
      <div>
        <div className="flex flex-col">
          <select className="text-white bg-sky-700 rounded-lg">
            {[...options].map((option, index) => {
              return (
                <option key={index} value={option.fullName}>
                  {option.fullName}
                </option>
              );
            })}
          </select>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <div className="flex flex-col">
          <select className="text-white bg-sky-700 rounded-lg">
            {[...options].map((option, index) => {
              return (
                <option key={index} value={option}>
                  {option}
                </option>
              );
            })}
          </select>
        </div>
      </div>
    );
  }
}
