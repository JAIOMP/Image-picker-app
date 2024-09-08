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
      shouldCloseOnEscapePress: true,
      shouldCloseOnOverlayClick: true,
      minHeight: '600px',
      parameters: { apiUrl: `https://pixabay.com/api/?key=${process.env.PIXABAY_API_KEY}` },
    })
  }
  return (
    <>
      <Button onClick={openDialogue}>Pick image</Button>
    </>
  )
}

export default Field
