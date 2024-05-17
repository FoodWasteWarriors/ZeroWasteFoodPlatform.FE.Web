const roleAccesses = {
  Admin: ['/profile/:userId'],
  Business: ['/profile/:userId'],
  Customer: ['/shopping-list', '/profile/:userId'],
}

export default roleAccesses
