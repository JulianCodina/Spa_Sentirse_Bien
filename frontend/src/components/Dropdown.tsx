import React, { useState, useEffect, useRef } from "react";
import "./Dropdown.css";

type Props = {
  label: string;
  options: string[];
  onChange?: (selectedOption: string) => void; // Esto está bien
};

export default function Dropdown({ label, options, onChange }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState(label);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  const handleOptionClick = (option: string) => {
    setSelectedLabel(option);
    setIsOpen(false);
    if (onChange) onChange(option);
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="dropdown" ref={dropdownRef}>
      <button onClick={toggleDropdown} className="SecondButton" type="button">
        {selectedLabel}
      </button>
      {isOpen && (
        <ul className="dropdown-menu">
          {options.map((option, index) => (
            <li
              key={index}
              className="dropdown-item"
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
