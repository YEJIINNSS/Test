import React from 'react';

export interface CheckBoxProps {
  items: string[];
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  selectedItems: number[];
  onCheckboxChange: (index: number) => void;
}

const CheckBoxChoose: React.FC<CheckBoxProps> = ({
  items,
  onSubmit,
  selectedItems,
  onCheckboxChange
}) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center rounded-md w-3/5 h-14 bg-white opacity-90 mb-4">
        <span className="text-xl text-gray-500">
          Choose all the options which are correct.
        </span>
      </div>
      <form
        onSubmit={onSubmit}
        className="flex flex-col items-center justify-center gap-8 w-full"
      >
        <div className="flex flex-col gap-4 justify-center bg-[#D8E4D8] w-[60%] h-[50vh] px-8 opacity-90 shadow-lg rounded-lg -mt-14">
          {items.map((item, idx) => (
            <div key={idx} className="flex flex-row items-center gap-3">
              <span className="text-gray-600 text-lg">{item}</span>
              <label>
                <input
                  type="checkbox"
                  checked={selectedItems.includes(idx)}
                  onChange={() => onCheckboxChange(idx)}
                />
              </label>
            </div>
          ))}
        </div>
        <button
          type="submit"
          className="bg-[#5BC17F] px-7 py-2 rounded-full"
        >
          <span className="text-white">Done</span>
        </button>
      </form>
    </div>
  );
};

export default CheckBoxChoose;
