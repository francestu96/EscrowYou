import { chakra, shouldForwardProp, Text, Container, VStack } from '@chakra-ui/react';
import { motion, isValidMotionProp } from 'framer-motion';

const Hero = () => {
  const textAnimation = { translateY: [100, 0], opacity: [0, 1] }
  const transition = { duration: "1", ease: "easeInOut" }

  const ChakraBox = chakra(motion.div, {
    shouldForwardProp: (prop) => isValidMotionProp(prop) || shouldForwardProp(prop),
  })
  return (
    <Container maxWidth="unset" p="10" minH="85vh" display="flex" backgroundImage="background.jpg" backgroundSize="cover" justifyContent="center">
        <VStack width="50%" justifyContent="center">
            <ChakraBox backgroundColor="rgb(23,25,35,0.8)" borderWidth="thin" borderRadius="3xl" p="5" mb="5" fontFamily="Satoshi-Bold" animate={{opacity: [0, 1], filter: ["blur(12px)", "blur(0px)"] }} transition={{duration: "1.5", ease: "easeInOut", delay: "0.5"}} opacity="0">
                <Text fontSize={["6xl", "7xl", "8xl"]} background="linear-gradient(to right, white, cornflowerblue, #9f30cd);" fill="transparent" backgroundClip="text">Escrow.YOU</Text>
            </ChakraBox>
            <ChakraBox animate={textAnimation} transition={transition} opacity="0" mb="10" mt={["5", "4", "2", "0"]}>
                <Text fontSize="2xl" color="white" textAlign="center" fontFamily="Satoshi-Bold" mb="10">&quot;Securing Trust, Ensuring Transactions&quot;</Text>
                <Text fontSize="xl" color="white" fontWeight="400" textAlign="center">Experience seamless and secure transactions with our blockchain-based escrow service. Harnessing the power of decentralized technology, we safeguard your deals, ensuring trust and transparency in every transaction.</Text>
            </ChakraBox>
        </VStack>
    </Container>
  );
};

export default Hero;
