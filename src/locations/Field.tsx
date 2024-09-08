import React from 'react'
import { Button } from '@contentful/f36-components'
import { FieldAppSDK } from '@contentful/app-sdk'
import { useSDK } from '@contentful/react-apps-toolkit'

const Field = () => {
  const sdk = useSDK<FieldAppSDK>()

  const openDialogue = async () => {
    sdk.dialogs.openCurrentApp({
      title: 'Image Picker',
      width: 800,
      minHeight: '600px',
    })
  }
  return (
    <>
      <Button onClick={openDialogue}>Pick image</Button>
    </>
  )
}

export default Field
