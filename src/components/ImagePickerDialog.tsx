import { Button, AssetCard, Grid, Spinner, Paragraph } from "@contentful/f36-components"
import React from "react"
import { useEffect, useState } from "react"

const ImagePickerDialog = (props: any) => {
  const { apiUrl } = props.sdk.parameters.invocation
  const [data, setData] = useState<any[] | null>(null)
  const [selectedImage, setSelectedImage] = useState<any | null>(null);
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const result = await response.json()
        setData(result.hits)
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [apiUrl])

  if (loading) {
    return <Spinner />
  }

  if (error) {
    return <p>Error: {error}</p>
  }

  const handleImageSelect = (image: any) => {
    setSelectedImage(image)
    props.sdk.close()
  }

  return (
      <div style={{padding: '20px'}}>
        <Paragraph>Click on an image to select:</Paragraph>
        <Grid columns="1fr 1fr 1fr" rowGap="spacingM" columnGap="spacingM">
          {data!.map((image) => (
            <AssetCard
              key={image.id}
              type="image"
              src={image.previewURL}
              title={image.tags}
              onClick={() => handleImageSelect(image)}
              size="small"
              isSelected={selectedImage && selectedImage.id === image.id}
              style={{ cursor: 'pointer' }}
            >
            </AssetCard>
          ))}
        </Grid>
        {/* {selectedImage && (
          <div style={{ marginTop: '20px' }}>
            <Paragraph>Selected Image: {selectedImage.title}</Paragraph>
          </div>
        )} */}
        <Button onClick={() => props.sdk.close()}>Close</Button>
      </div>
    )
}

export default ImagePickerDialog
