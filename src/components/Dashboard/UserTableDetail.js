import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import EditIcon from '@material-ui/icons/Edit';

function UserTableRow(props) {
  const history = useHistory()

  function editUser(id) {
    history.push('/input', id)
  }

  const userData = props.userData.length ? props.userData.map(user => {
    return (
      <tr key={user._id}>
        <td>{user._id}</td>
        <td>{user.email}</td>
        <td>{user.gender}</td>
        <td>{user.createdAt}</td>
        <td>
          <Link
            to={{
              pathname: `/dashboard/${user._id}`,
              state: {
                user: { _id: user._id, gender: user.gender, email: user.email, updatedAt: user.updatedAt, createdAt: user.createdAt }
              }
            }}
          >View</Link>
          <EditIcon onClick={() => { editUser(user) }} />
        </td>
      </tr >
    )
  }) : ''
  return (
    <tbody>
      {userData}
    </tbody>
  )
}
export default UserTableRow