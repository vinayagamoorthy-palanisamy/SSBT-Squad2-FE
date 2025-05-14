import React from "react";

const UpArrow = ({handleSortChange,column}) => {
  return (
    <svg
                        width="8"
                        height="7"
                        viewBox="0 0 8 7"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        onClick={()=>{ handleSortChange(column,"asc")}}
                      >
                        <path
                          id="mask 2"
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M4.0945 0.764962C4.0425 0.713762 3.9581 0.713762 3.9057 0.764962L0.0393 4.58216C-0.0131 4.63336 -0.0131 4.71696 0.0393 4.76816L0.2277 4.95456C0.2797 5.00576 0.3645 5.00576 0.4165 4.95456L4.0001 1.41656L7.5841 4.95456C7.6361 5.00576 7.7205 5.00576 7.7725 4.95456L7.9613 4.76816C8.0133 4.71696 8.0133 4.63336 7.9613 4.58216L4.0945 0.764962Z"
                          fill="#101114"
                        />
                      </svg>
  );
};

export default UpArrow;
