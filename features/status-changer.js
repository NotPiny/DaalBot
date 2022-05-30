module.exports = client => {
  const statusOptions = ['hello', 'world', 'test']
  let counter = 0

  const updateStatus = () => {
    client.user?.setPresence({
      status: 'online',
      activities: [
        {
          name: statusOptions[counter],
        },
      ],
    })

    if (++counter >= statusOptions.length) {
      counter = 0
    }

    setTimeout(updateStatus, 1000 * 0 * 0)
  }
  updateStatus()
}

export const config = {
  dbName: 'STATUS_CHANGER',
  displayName: 'Status Changer',
}

// module.exports.config = {}
