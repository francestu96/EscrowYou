import React, { useRef, useState } from 'react';
import { Container, Tab, TabList, TabPanel, TabPanels, Tabs, chakra, shouldForwardProp, Text, useColorModeValue } from '@chakra-ui/react';
import { motion, isValidMotionProp } from 'framer-motion';
import { FC } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { ArrowBackIcon } from '@chakra-ui/icons';
import Payments from 'elements/Escrows';
import NoticeboardEscrows from 'elements/NoticeboardEscrows';

const Dapp: FC = () => {
  const captchaRef = useRef<ReCAPTCHA>(null);
  const paymentsAnimation = { translateX: [400, 0], opacity: [0, 1] };

  const backgroundColor = useColorModeValue("gray.100", "gray.900");
  
  const ChakraBox = chakra(motion.div, {
    shouldForwardProp: (prop) => isValidMotionProp(prop) || shouldForwardProp(prop),
  });
  return (
    <Container maxW="container.xl" minH="65vh" p="5" alignContent="center" justifyContent="center" flexWrap="wrap">
        <ChakraBox animate={ paymentsAnimation } transition={{ duration: "1", ease: "easeOut" }}>
          <Tabs isFitted variant='enclosed'>
              <TabList>
                  <Tab fontSize={["sm", "md"]} _selected={{color: "main", borderColor: "inherit", borderBottomColor: backgroundColor, backgroundColor: backgroundColor}}>Your Payments</Tab>
                  <Tab fontSize={["sm", "md"]} _selected={{color: "main", borderColor: "inherit", borderBottomColor: backgroundColor, backgroundColor: backgroundColor}}>Noticeboard</Tab>
              </TabList>
              <TabPanels borderWidth="thin" backgroundColor={backgroundColor} minH="60vh" borderRadius="0 0 0.375rem 0.375rem">
                  <TabPanel>
                    <Payments/>
                  </TabPanel>
                  <TabPanel>
                    <NoticeboardEscrows/>
                  </TabPanel>
              </TabPanels>
          </Tabs>
        </ChakraBox>
      <ReCAPTCHA ref={captchaRef} size="invisible" sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}/>
    </Container>
  );
};

export default Dapp;
