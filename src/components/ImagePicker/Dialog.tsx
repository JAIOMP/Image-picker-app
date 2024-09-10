import React, { useEffect, useState } from "react";
import {
  AssetCard,
  Grid,
  Spinner,
  Paragraph,
  Pagination,
  Flex,
  Text
} from "@contentful/f36-components";
import { DialogAppSDK } from "@contentful/app-sdk";

interface Image {
  id: number;
  previewURL: string;
  tags: string;
}

interface ImagePickerDialogProps {
  sdk: DialogAppSDK;
}

interface InvocationParameters {
  apiUrl?: string;
}

const ImagePickerDialog: React.FC<ImagePickerDialogProps> = ({ sdk }) => {
  const { apiUrl } = sdk.parameters.invocation as InvocationParameters;
  const [images, setImages] = useState<Image[]>([]);
  const [page, setPage] = useState<number>(0);
  const [totalImages, setTotalImages] = useState<number>(0);
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchImages = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(`${apiUrl}&page=${page + 1}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        setImages(result.hits);
        setTotalImages(result.total);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, [apiUrl, page]);

  const handleImageSelect = (image: Image) => {
    setSelectedImage(image);
    sdk.close({ image });
  };

  if (isLoading) {
    return <Spinner size="large" />;
  }

  if (error) {
    return <Paragraph>Error: {error}</Paragraph>;
  }

  return (
    <Flex flexDirection="column" justifyContent="space-between" gap="spacingS" padding="spacingM">
      <Text fontSize="fontSizeL" lineHeight="lineHeightL">
        Select an image to embed below:
      </Text>

      <Grid columns="3fr 3fr 3fr" rowGap="spacingM" columnGap="spacingM">
        {images.map((image) => (
          <AssetCard
            key={image.id}
            type="image"
            src={image.previewURL}
            title={image.tags}
            onClick={() => handleImageSelect(image)}
            size="small"
            isSelected={selectedImage?.id === image.id}
            style={{ cursor: "pointer" }}
          />
        ))}
      </Grid>

      <Pagination
        activePage={page}
        onPageChange={setPage}
        itemsPerPage={20}
        totalItems={totalImages}
      />
    </Flex>
  );
};

export default ImagePickerDialog;
