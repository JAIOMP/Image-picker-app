import React, { useEffect, useState } from "react";
import { AssetCard, Button, Flex, IconButton } from "@contentful/f36-components";
import { FieldAppSDK } from "@contentful/app-sdk";
import { useSDK } from "@contentful/react-apps-toolkit";
import { CloseIcon } from "@contentful/f36-icons";

const Field = () => {
  const sdk = useSDK<FieldAppSDK>();
  const [fieldValue, setFieldValue] = useState<any | null>(null);
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
      setFieldValue(result.image);
    }
  };

  const handleDismissImage = () => {
    setFieldValue(null)
  }
  
  return (
    <>
      <Flex flexDirection="column" gap="spacingS">
      {fieldValue &&
        <AssetCard
          type="image"
          title={fieldValue.tags}
          src={fieldValue.previewURL}
          size="small"
          icon={
            <IconButton
              variant="secondary"
              aria-label="Select the date"
              icon={<CloseIcon />}
              onClick={handleDismissImage}
            />
          }
        />}
        <Button onClick={openDialogue}>Pick image</Button>
      </Flex>
    </>
  );
};

export default Field;
