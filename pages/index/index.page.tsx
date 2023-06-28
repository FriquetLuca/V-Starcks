import React from 'react'
import { css } from '../../styled-system/css';
import { trpc } from '../../utils/trpc';
export function Page() {
  const userQuery = trpc.getRandomIdFromId.useQuery({ id: 'id_bilbo' });
  
  return (
    <div>
      <p>{userQuery.data?.id}</p>
      <div className={css({ fontSize: "2xl", fontWeight: 'bold' })}>Hello 🐼!</div>
    </div>
  )
}
