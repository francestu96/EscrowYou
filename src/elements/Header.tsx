import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons';
import { Box, Flex, HStack, IconButton, useColorModeValue, useColorMode, VStack, useDisclosure, Slide, Text } from '@chakra-ui/react';
import React from 'react';
import { ConnectWallet  } from "@thirdweb-dev/react";
import { ISubNav } from './SubNav';
import ColorModeButton from './ColorModeButton';
import Logo from './Logo';
import NavItem from './NavItem';

const NAV_LINKS: ISubNav[] = [
  { label: "Home", href: "/" },
  { label: "Enter DAPP", href: "/dapp" },
  { label: "Litepaper", href_blank: "/Litepaper_v1.0.pdf" },
  {
    label: "About",
    href: "#",
    children: [
      {
        label: "Discover Escrow.YOU",
        subLabel: "What is Escrow.YOU",
        href: "/#about",
        logo: "/about.svg"
      },
      {
        label: "Tokenomics",
        subLabel: "Our token economics",
        href: "/#tokenomics",
        logo: "/tokenomics.svg"
      },
      {
        label: "Roadmap",
        subLabel: "Look at our future",
        href: "/#roadmap",
        logo: "/roadmap.svg"
      }
    ]
  },
  {
    label: "Community",
    href: "#",
    children: [
      {
        label: "Telegram",
        subLabel: "Follow us on Telegram",
        href_blank: "https://t.me/Certified_Portal",
        logo: "/telegram.png",
      },
      {
        label: "Twitter",
        subLabel: "Follow us on Twitter",
        href_blank: "https://twitter.com/certified__eth",
        logo: "/twitter.webp",
      }
    ]
  }
];

const Header = () => {
  const { isOpen, onToggle } = useDisclosure();
  const { colorMode } = useColorMode();

  return (
    <Box borderBottom="1px" borderBottomColor="chakra-border-color" py="5" px={["5", "10", "15", "20"]} bgColor={useColorModeValue('white', 'gray.900')}>
      <Flex align="center" justify="space-between" display={['none', 'none', 'flex','flex']}>
        <HStack gap="3">
          <Logo/>
          <Text fontSize="2xl" fontFamily="Satoshi-Bold">Escrow.YOU</Text>
        </HStack>
        <HStack gap={'15px'} position="absolute" left="50%" zIndex="10" transform="translate(-50%, 0%)">
          {NAV_LINKS.map((link) => (
            <NavItem key={`link-${link.label}`} {...link} />
          ))}
        </HStack>
        <HStack gap={'10px'}>
          <ConnectWallet theme={colorMode} switchToActiveChain={true}/>
          <ColorModeButton />
        </HStack>
      </Flex>
      <Flex align="center" justify="space-between" display={['flex', 'flex', 'none','none']}>
        <HStack gap="3">
          <Logo/>
          <Text fontSize="xl" fontFamily="Satoshi-Bold">Escrow.YOU</Text>
        </HStack>
        <IconButton aria-label="Open Menu" size="lg" mr={2} icon={<HamburgerIcon/>} onClick={onToggle}/>
      </Flex>    

      <Slide in={isOpen} transition={{"enter": {duration: 0.5}, "exit": {duration: 0.5}}} style={{ zIndex: 10 }}>
        <Flex w='100vw' bgColor={useColorModeValue('white', 'gray.800')} h="100vh" flexDir="column">
          <Flex justify="flex-end">
          <IconButton mt={2} mr={2} aria-label="Open Menu" size="lg" icon={<CloseIcon/>}onClick={onToggle}/>
        </Flex>
          <VStack gap={'15px'}>
            <HStack gap={'10px'}>
              <ConnectWallet theme={colorMode} switchToActiveChain={true}/>
              <ColorModeButton />
            </HStack>
            {NAV_LINKS.map((link) => (
              <NavItem key={`link-${link.label}`} {...link} />
            ))}
          </VStack>
        </Flex>   
      </Slide> 
    </Box>
  );
};

export default Header;
