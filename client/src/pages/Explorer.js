import React, { useState, useEffect } from 'react'
import {
  Table,
  TableHeader,
  TableCell,
  TableBody,
  TableRow,
  TableContainer,
  Badge,
} from '@windmill/react-ui'

import ExternalLink from '../assets/img/external-link.svg'
import PageTitle from '../components/Typography/PageTitle'
import WavesConfig from '../config/waves'
import ApiUtils from '../utils/api'

function Explorer() {
  const [transactions, setTransactions] = useState([])
  useEffect(() => {
    const interval = setInterval(() => {
      ApiUtils.getTransactions(setTransactions)
    }, 1000)
    
    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <>
      <PageTitle>Explorer</PageTitle>
      <TableContainer className="mb-4">
        <Table>
          <TableHeader>
            <tr>
              <TableCell></TableCell>
              <TableCell>Timestamp</TableCell>
              <TableCell>Height</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Sender</TableCell>
              <TableCell>Receiver</TableCell>
              <TableCell>Amount</TableCell>
            </tr>
          </TableHeader>
          <TableBody className="text-sm">
            {transactions.map((transfer, index) => (
              <TableRow key={index}>
                <TableCell>
                  <span className="">{index+1}</span>
                </TableCell>
                <TableCell>
                  <span className="">{transfer.data && transfer.data.timestamp.replace(/T/i, ' ').replace(/.[0-9]*Z/i, '')}</span>
                  <a href={transfer.data && WavesConfig.EXPLORER_URL + '/tx/' + transfer.data.id} target="_blank" rel="noopener noreferrer">
                    <img
                      aria-hidden="true"
                      className="object-cover w-full h-full"
                      src={ExternalLink}
                      style={{width: 16, height: 16}}
                      alt="W"
                    />
                  </a>
                </TableCell>
                <TableCell>
                  <span className="">{transfer.data && transfer.data.height}</span>
                </TableCell>
                <TableCell>
                  <Badge type='success'>Transfer</Badge>
                </TableCell>
                <TableCell>
                  <span className="">{transfer.data && transfer.data.sender}</span>
                </TableCell>
                <TableCell>
                  <span className="">{transfer.data && transfer.data.recipient}</span>
                </TableCell>
                <TableCell>
                  <span className="">{transfer.data && transfer.data.amount}</span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default Explorer
