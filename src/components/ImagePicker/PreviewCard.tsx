import React, {  } from "react";
import {
  Card,
  Flex,
  IconButton,
  TextLink,
  Text,
  Subheading
} from "@contentful/f36-components";
import { CloseIcon, ExternalLinkIcon, ThumbUpIcon, DownloadIcon } from "@contentful/f36-icons";
import { PixabayImageData } from "../../configs/types";

interface PreviewCardProps {
  image: PixabayImageData
  handleClose: Function
}

const PreviewCard = (props: PreviewCardProps) => {
  const { image, handleClose } = props;

  return (
    <Card>
      <Flex gap="spacingM" alignItems="start">
        <img
          src={image.previewURL}
          alt={image.tags}
          style={{ maxWidth: "100px" }}
        />
        <div>
          <Subheading><Text style={{textTransform: 'capitalize'}}>{image.tags}</Text></Subheading>
          <Flex gap="spacingS" alignItems="center">
            <ThumbUpIcon variant="secondary" />{' '}<Text>{image.likes}</Text>
            <DownloadIcon variant="secondary" />{' '}<Text>{image.downloads}</Text>
          </Flex>    
        </div>
      </Flex>
      <Flex
        style={{ position: "absolute", top: "5px", right: "5px" }}
        alignItems="center"
      >
        <TextLink
          icon={<ExternalLinkIcon variant="muted"/>}
          href={image.pageURL}
          target="_blank"
          style={{ padding: "8px" }}
          alignIcon="end"
        />

        <IconButton
          aria-label="Remove image"
          icon={<CloseIcon />}
          onClick={() => handleClose(image.imageId)}
        />
      </Flex>
    </Card>
  );
};

export default PreviewCard;
