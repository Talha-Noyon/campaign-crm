import React from 'react'

interface BellIconProps extends React.SVGProps<SVGSVGElement> {
  counter: string
}

export function BellIcon({counter = '', ...props}: BellIconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="48" height="48" {...props}>
      <path
        d="M18 16V14C18 10.69 15.31 8 12 8C8.69 8 6 10.69 6 14V16H4V18H20V16H18ZM12 2C9.79 2 8 3.79 8 6V14C8 16.21 9.79 18 12 18C14.21 18 16 16.21 16 14V6C16 3.79 14.21 2 12 2ZM12 19C10.89 19 10 19.89 10 21H14C14 19.89 13.11 19 12 19Z"
        fill="currentColor"
      />
      {/* Badge with Counter */}
      {counter.length > 0 && (
        <>
          <circle cx="17" cy="7" r="7" fill="red" />
          <text
            x="17"
            y="8"
            fontSize="7"
            fill="white"
            textAnchor="middle"
            fontWeight="bold"
            dy=".2em"
          >
            {counter}
          </text>
        </>
      )}
    </svg>
  )
}
