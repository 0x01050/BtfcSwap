import React from 'react'
import { Card, CardBody } from '@windmill/react-ui'
import CountUp from 'react-countup'

function HomeCard({ title, value, decimals, extraTitle, extraValue, extraOption, extraDecimals }) {
  return (
    <Card>
      <CardBody className="flex w-full flex-col">
        <div className="border-b-2 mb-2 pb-5">
          <p className="mb-2 font-medium text-gray-600 dark:text-gray-400">{title}</p>
          {isFinite(String(value)) ?
            <CountUp end={value} separator=", " decimals={decimals} duration={0.5}
              className="text-3xl font-bold text-gray-700 dark:text-gray-200"/>
          :
            <p className="text-3xl font-bold text-gray-700 dark:text-gray-200">{value}</p>
          }
        </div>
        <div className="flex text-sm font-medium text-gray-600 dark:text-gray-400">
          <p>{extraTitle}</p>
          <div className="flex-1"/>
          {
            extraOption === 'CountUp' ?
              <>
                <CountUp end={extraValue} separator=", " decimals={extraDecimals} duration={0.5} />
                <p>&nbsp;BTFC</p>
              </>
            :
              <>
                <p>{extraValue}</p>
                <p>&nbsp;WAVES</p>
              </>
          }
        </div>
      </CardBody>
    </Card>
  )
}

export default HomeCard
