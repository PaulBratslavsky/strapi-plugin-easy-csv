import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { useIntl } from "react-intl";
import { Typography } from "@strapi/design-system/Typography";
import getTrad from "../../utils/getTrad";
import { rawFileToAsset } from "../../utils/rawFileToAsset";
import { AssetSource } from "../../utils/constants";
import { Box } from "@strapi/design-system/Box";
import { Flex } from "@strapi/design-system/Flex";
import { Button } from "@strapi/design-system/Button";
import PicturePlus from "@strapi/icons/PicturePlus";

const Wrapper = styled(Flex)`
  flex-direction: column;
`;

const IconWrapper = styled.div`
  font-size: ${60 / 16}rem;

  svg path {
    fill: ${({ theme }) => theme.colors.primary600};
  }
`;

const MediaBox = styled(Box)`
  border-style: dashed;
`;

const OpaqueBox = styled(Box)`
  opacity: 0;
  cursor: pointer;
`;

export default function FromComputerForm({ onAddAssets }) {
  const { formatMessage } = useIntl();
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef(null);

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDragEnter = (event) => {
    event.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => setDragOver(false);

  const handleClick = (e) => {
    e.preventDefault();
    inputRef.current.click();
    alert("handleClick");
  };

  const handleChange = () => {
    const file = inputRef.current.files[0];
    const asset = rawFileToAsset(file, AssetSource.Computer);
    console.log("handleChange", asset)
    onAddAssets(asset);
    
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e?.dataTransfer?.files) {
      const file = e?.dataTransfer?.files[0];
      const asset = rawFileToAsset(file, AssetSource.Computer);
      onAddAssets(asset);
    }
    setDragOver(false);
  };

  return (
    <form>
      <Box paddingLeft={8} paddingRight={8} paddingTop={6} paddingBottom={6}>
        <label>
          <MediaBox
            paddingTop={11}
            paddingBottom={11}
            hasRadius
            justifyContent="center"
            borderColor={dragOver ? "primary500" : "neutral300"}
            background={dragOver ? "primary100" : "neutral100"}
            position="relative"
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <Flex justifyContent="center">
              <Wrapper>
                <IconWrapper>
                  <PicturePlus aria-hidden />
                </IconWrapper>

                <Box paddingTop={3} paddingBottom={5}>
                  <Typography variant="delta" textColor="neutral600" as="span">
                    {formatMessage({
                      id: getTrad("input.label"),
                      defaultMessage: "Drag & Drop here or",
                    })}
                  </Typography>
                </Box>

                <OpaqueBox
                  as="input"
                  position="absolute"
                  left={0}
                  right={0}
                  bottom={0}
                  top={0}
                  width="100%"
                  type="file"
                  multiple
                  name="files"
                  tabIndex={-1}
                  ref={inputRef}
                  zIndex={1}
                  onChange={handleChange}
                />

                <Box position="relative">
                  <Button type="button" onClick={handleClick}>
                    {formatMessage({
                      id: getTrad("input.button.label"),
                      defaultMessage: "Browse files",
                    })}
                  </Button>
                </Box>
              </Wrapper>
            </Flex>
          </MediaBox>
        </label>
      </Box>
    </form>
  );
};

FromComputerForm.propTypes = {
  onAddAssets: PropTypes.func.isRequired,
  trackedLocation: PropTypes.string,
};
