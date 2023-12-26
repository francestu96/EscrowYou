import { useColorMode, chakra, shouldForwardProp, Text, Image, Stack, Container, Box } from '@chakra-ui/react';
import { motion, isValidMotionProp } from 'framer-motion';

const Hero = () => {
  const { colorMode } = useColorMode();
  const textAnimation = { translateY: [100, 0], opacity: [0, 1] }
  const transition = { duration: "1", ease: "easeInOut" }

  const ChakraBox = chakra(motion.div, {
    shouldForwardProp: (prop) => isValidMotionProp(prop) || shouldForwardProp(prop),
  })
  return (
    <Container maxW="container.lg" p="10" minH="70vh">
      <Stack pt={["0", "0", "0", "50"]} fontFamily="Satoshi" gap="10" direction={["column", "column", "column", "row"]} justifyContent="center" textAlign="center">
        <ChakraBox zIndex="-10" animate={textAnimation} transition={{...transition, delay: "0.5"}} opacity="0">
          <Text fontSize={["6xl", "7xl", "8xl"]}>Send.</Text>
        </ChakraBox>
        <ChakraBox zIndex="-10" animate={textAnimation} transition={{...transition, delay: "1"}} opacity="0">
          <Text fontSize={["6xl", "7xl", "8xl"]}>Receive.</Text>
        </ChakraBox>
        <ChakraBox zIndex="-10"  fontFamily="Satoshi-Bold" animate={{opacity: [0, 1], filter: ["blur(12px)", "blur(0px)"] }} transition={{duration: "1.5", ease: "easeInOut", delay: "2"}} opacity="0">
          <Text fontSize={["6xl", "7xl", "8xl"]} color="main">Escrow.YOU</Text>
        </ChakraBox>
      </Stack>
      <ChakraBox zIndex="-10" animate={textAnimation} transition={transition} opacity="0" mb="10" mt={["5", "4", "2", "0"]}>
        <Text fontSize="2xl" color={colorMode == "dark" ? "gray.400" : "gray.700"} textAlign="center" fontFamily="Satoshi-Bold" mb="10">&quot;Securing Trust, Ensuring Transactions"&quot;</Text>
        <Text fontSize="xl" color={colorMode == "dark" ? "gray.400" : "gray.700"} fontWeight="400" textAlign="center">Experience seamless and secure transactions with our blockchain-based escrow service. Harnessing the power of decentralized technology, we safeguard your deals, ensuring trust and transparency in every transaction.</Text>
      </ChakraBox>
      {/* <Box display={["none", "none", "block", "block"]}>
        <Box px="10">
          <ChakraBox animate={{ translateX: [-300, 0], opacity: [0, 1] }} transition={{ duration: "0.5", ease: "easeIn", delay: "3.5" }} justifyContent="end" display="flex" opacity="0">
            <Image src={"/send.svg"} width={400} height={200} alt="item logo"/>
          </ChakraBox>
        </Box>
        <Box width="full" px="10">
          <ChakraBox animate={{ translateX: [300, 0], opacity: [0, 1] }} transition={{ duration: "0.5", ease: "easeIn", delay: "4.5" }} width="fit-content" opacity="0">
            <Image src={"/receive-" + colorMode + ".svg"} width={400} height={200} alt="item logo"/>
          </ChakraBox>
        </Box>
      </Box>

      <Box display={["block", "block", "none", "none"]}>
        <ChakraBox animate={{ width: ["0%", "100%"] }} transition={{ duration: "0.5", ease: "easeIn", delay: "3.5" }} width="0" justifyContent="end" display="flex" mb="-10" px="10">
          <Image src={"/send.svg"} width={400} height={200} alt="item logo"/>
        </ChakraBox>
        <ChakraBox animate={{ width: ["0%", "100%"] }} transition={{ duration: "0.5", ease: "easeIn", delay: "4.5" }} width="0" px="10">
          <Image src={"/receive-" + colorMode + ".svg"} width={400} height={200} alt="item logo"/>
        </ChakraBox>
      </Box> */}
    </Container>
  );
};

export default Hero;
