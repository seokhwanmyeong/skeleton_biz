import { Icon, createIcon, Flex, Box } from "@chakra-ui/react";

const ImgBarLeft = (iconProps: any) => {
  return (
    <Icon
      width="23px"
      height="84px"
      viewBox="0 0 23 84"
      fill="none"
      {...iconProps}
    >
      <path
        d="M15.2071 83.7812C5.48446 72.1942 0.107182 57.5792 0.00158529 42.4538C-0.104011 27.3284 5.06869 12.6397 14.6286 0.918091L22.1843 7.08038C14.0584 17.0438 9.66159 29.5291 9.75135 42.3857C9.8411 55.2423 14.4118 67.6651 22.676 77.514L15.2071 83.7812Z"
        fill="currentColor"
      />
      <circle cx="5" cy="42" r="1.5" stroke="white" />
    </Icon>
  );
};

const ImgBarRight = (iconProps: any) => {
  return (
    <Icon
      width="23px"
      height="84px"
      viewBox="0 0 23 84"
      fill="none"
      {...iconProps}
    >
      <path
        d="M7.79289 83.7811C17.5155 72.1941 22.8928 57.579 22.9984 42.4537C23.104 27.3283 17.9313 12.6396 8.37139 0.917969L0.815678 7.08026C8.94161 17.0436 13.3384 29.529 13.2487 42.3856C13.1589 55.2422 8.5882 67.6649 0.323954 77.5139L7.79289 83.7811Z"
        fill="currentColor"
      />
      <circle cx="18" cy="41.9999" r="1.5" stroke="white" />
    </Icon>
  );
};

export { ImgBarLeft, ImgBarRight };
