import { useEffect, useRef, useState } from 'react'
import { DateRange } from 'react-date-range'
import { Input } from "@/components/ui/input"


import format from 'date-fns/format'
import { addDays } from 'date-fns'

import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import { es } from 'date-fns/locale'

const DateRangeComp = ({sendDataToParent, startDate, endDate}:any) => {

  // date state
  const today = new Date();
  const [range, setRange] = useState([
    {
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      key: 'selection'
    }
  ])
  // open close
  const [open, setOpen] = useState(false)

  // get the target element to toggle 
  const refOne = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // event listeners
    document.addEventListener("keydown", hideOnEscape, true)
    document.addEventListener("click", hideOnClickOutside, true)
  }, [])

  // hide dropdown on ESC press
  const hideOnEscape = (e:any) => {
    // console.log(e.key)
    if( e.key === "Escape" ) {
      setOpen(false)
    }
  }

  // Hide on outside click
  const hideOnClickOutside = (e:any) => {
    // console.log(refOne.current)
    // console.log(e.target)
    if( refOne.current && !refOne.current.contains(e.target) ) {
      setOpen(false)
    }
  }

  return (
    <div className="inline-block relative">
      <Input
        value={`${format(range[0].startDate, "MM/dd/yyyy")} to ${format(range[0].endDate, "MM/dd/yyyy")}`}
        readOnly
        className="input input-bordered w-full max-w-lg"
        onClick={ () => setOpen(open => !open) }
      />

      <div ref={refOne}>
        {open && 
          <DateRange
            onChange={(item:any) => {setRange([item.selection]); sendDataToParent([item.selection]) }}
            editableDateInputs={true}
            moveRangeOnFirstSelection={false}
            locale={es}
            minDate={today}
            ranges={range}
            months={1}
            direction="horizontal"
            className="absolute left-0  top-10	z-auto border border-gray-400	"
          />
        }
      </div>

    </div>
  )
}

export default DateRangeComp