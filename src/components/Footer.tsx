import {
  Stack,
  Divider,
  Spacer,
  Text,
  Link,
  useColorMode,
} from '@chakra-ui/react';

const Footer = () => {
  const { colorMode } = useColorMode();

  return (
    <Stack w='100%'>
      <Divider />
      <Stack
        px='5'
        direction={['column', 'column', 'row']}
        align='center'
        spacing={0}
      >
        <Text fontSize='sm'>
          &copy; 2022 Thodoris Batsikas. All Rights Reserved.
        </Text>
        <Spacer />
        <Text fontSize='sm'>
          Developed by{' '}
          <Link
            href='https://github.com/DevTotoro'
            target='_blank'
            color={colorMode === 'light' ? 'purple.500' : 'purple.200'}
          >
            DevTotoro
          </Link>
        </Text>
      </Stack>
    </Stack>
  );
};

export default Footer;
