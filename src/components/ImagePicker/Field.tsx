import React, { useEffect, useState } from "react";
import {
  Button,
  Flex,
  Text,
} from "@contentful/f36-components";
import { FieldAppSDK } from "@contentful/app-sdk";
import { useSDK } from "@contentful/react-apps-toolkit";
import { ImageIcon } from "@contentful/f36-icons";
import PreviewCard from "./PreviewCard";
import { PixabayImageData } from "../../configs/types";

const ImagePickerField = () => {
  const sdk = useSDK<FieldAppSDK>();
  const [selectedImages, setSelectedImages] = useState<PixabayImageData[]>([]);
  const { REACT_APP_PIXABAY_API_URL, REACT_APP_PIXABAY_API_KEY } = process.env;

  useEffect(() => {
    const initialValue = sdk.field.getValue()
    if(initialValue) {
      setSelectedImages(initialValue)
    }

    sdk.window.startAutoResizer();
  }, [sdk.window, sdk.field]);

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
      const updatedImages = [dialogResult.image, ...selectedImages]
      setSelectedImages(updatedImages);
      sdk.field.setValue(updatedImages)
    }
  };

  const handleRemoveImage = async (imageId: string) => {
    const updatedImages = selectedImages.filter((img) => img.imageId !== imageId);
    await sdk.field.setValue(updatedImages)
    setSelectedImages(updatedImages);
    
  };

  return (
    <>
      <Flex flexDirection="column" gap="spacingS">
        {selectedImages.length > 0 ? (
          selectedImages.map((image, index) => (
            <PreviewCard key={index} image={image} handleClose={handleRemoveImage} />
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
          style={{maxWidth: '150px'}}
        >
          Pick Image
        </Button>
      </Flex>
    </>
  );
};

export default ImagePickerField;
