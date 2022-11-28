import { Outlet } from 'react-router-dom';
import { VStack, Spacer } from '@chakra-ui/react';

import Header from './Header';
import Footer from './Footer';

const RootLayout = () => {
  return (
    <VStack
      minH='100vh'
      w={['90%', '90%', '70%', '60%', '50%', '40%']}
      mx='auto'
      pb='3'
    >
      <Header />
      <Outlet />
      <Spacer />
      <Footer />
    </VStack>
  );
};

export default RootLayout;
