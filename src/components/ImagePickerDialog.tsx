import { Button, AssetCard, Grid, Spinner, Paragraph, Pagination, Flex } from "@contentful/f36-components"
import React from "react"
import { useEffect, useState } from "react"

const ImagePickerDialog = (props: any) => {
  const { apiUrl } = props.sdk.parameters.invocation
  const [data, setData] = useState<any[] | null>(null)
  const [page, setPage] = useState<number>(0)
  const [totalImages, setTotalImages] = useState<number>(100)
  const [selectedImage, setSelectedImage] = useState<any | null>(null);
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}&page=${page + 1}`)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const result = await response.json()
        setData(result.hits)
        setTotalImages(result.total)
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [apiUrl, page])

  if (loading) {
    return <Spinner />
  }

  if (error) {
    return <p>Error: {error}</p>
  }

  const handleImageSelect = (image: any) => {
    setSelectedImage(image)
    props.sdk.close({ image })
  }

  return (
      <Flex flexDirection="column" justifyContent="space-between" gap="spacingS" padding="spacingM">
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

        <Pagination
          activePage={page}
          onPageChange={setPage}
          itemsPerPage={20}
          totalItems={totalImages}
        />
      </Flex>
    )
}

export default ImagePickerDialog
