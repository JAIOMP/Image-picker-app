import React, { useEffect, useState } from "react";
import {
  AssetCard,
  Button,
  Card,
  Flex,
  Grid,
  IconButton,
  Paragraph,
  Text,
  TextLink,
} from "@contentful/f36-components";
import { FieldAppSDK } from "@contentful/app-sdk";
import { useSDK } from "@contentful/react-apps-toolkit";
import { CloseIcon, ImageIcon } from "@contentful/f36-icons";
import PreviewCard from "./PreviewCard";

const ImagePickerField = () => {
  const sdk = useSDK<FieldAppSDK>();
  const [selectedImages, setSelectedImages] = useState<any[]>([]);
  const { REACT_APP_PIXABAY_API_URL, REACT_APP_PIXABAY_API_KEY } = process.env;

  useEffect(() => {
    sdk.window.startAutoResizer();
  }, [sdk.window]);

  const handleOpenDialog = async () => {
    const dialogResult = await sdk.dialogs.openCurrentApp({
      title: "Image Picker",
      width: 800,
      shouldCloseOnEscapePress: true,
      shouldCloseOnOverlayClick: true,
      minHeight: "600px",
      parameters: {
        apiUrl: `${REACT_APP_PIXABAY_API_URL}?key=${REACT_APP_PIXABAY_API_KEY}`,
      },
    });

    if (dialogResult) {
      setSelectedImages([dialogResult.image, ...selectedImages]);
    }
  };

  const handleRemoveImage = (imageId: number) => {
    const updatedImages = selectedImages.filter(
      (image: any) => image.id !== imageId
    );
    setSelectedImages(updatedImages);
  };

  return (
    <>
      <Flex flexDirection="column" gap="spacingS">
        {selectedImages.length > 0 ? (
          selectedImages.map((image) => (
            <PreviewCard image={image} handleClose={handleRemoveImage} />
          ))
        ) : (
          <Text fontSize="fontSizeL" lineHeight="lineHeightL">
            No images selected yet. Click 'Pick Image' to choose an image.
          </Text>
        )}

        <Button
          startIcon={<ImageIcon />}
          onClick={handleOpenDialog}
          variant="primary"
          size="medium"
        >
          Pick Image
        </Button>
      </Flex>
    </>
  );
};

export default ImagePickerField;
