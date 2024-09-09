import React, { useEffect, useState } from "react";
import {
  AssetCard,
  Button,
  Flex,
  IconButton,
} from "@contentful/f36-components";
import { FieldAppSDK } from "@contentful/app-sdk";
import { useSDK } from "@contentful/react-apps-toolkit";
import { CloseIcon } from "@contentful/f36-icons";

const Field = () => {
  const sdk = useSDK<FieldAppSDK>();
  const [fieldValues, setFieldValues] = useState<any[]>([]);
  const { REACT_APP_PIXABAY_API_URL, REACT_APP_PIXABAY_API_KEY } = process.env;

  useEffect(() => {
    sdk.window.startAutoResizer();
  }, []);

  const openDialogue = async () => {
    const result = await sdk.dialogs.openCurrentApp({
      title: "Image Picker",
      width: 800,
      shouldCloseOnEscapePress: true,
      shouldCloseOnOverlayClick: true,
      minHeight: "600px",
      parameters: {
        apiUrl: `${REACT_APP_PIXABAY_API_URL}?key=${REACT_APP_PIXABAY_API_KEY}`,
      },
    });

    if (result) {
      setFieldValues([result.image, ...fieldValues]);
    }
  };

  const handleDismissedImage = (imageId: number) => {
    const updatedFieldValues = fieldValues.filter(
      (image: any) => image.id !== imageId
    );
    setFieldValues(updatedFieldValues);
  };

  return (
    <>
      <Flex flexDirection="column" gap="spacingS">
        {!!fieldValues.length &&
          fieldValues.map((asset) => (
            <AssetCard
              type="image"
              title={asset.tags}
              src={asset.previewURL}
              size="small"
              icon={
                <IconButton
                  variant="secondary"
                  aria-label="Select the date"
                  icon={<CloseIcon />}
                  onClick={() => handleDismissedImage(asset.id)}
                />
              }
            />
          ))}
        <Button onClick={openDialogue}>Pick image</Button>
      </Flex>
    </>
  );
};

export default Field;
