import { chakra, shouldForwardProp, VStack,Text, Image, Heading, Center, Stack, Button, Link } from '@chakra-ui/react';
import { motion, isValidMotionProp, useInView } from 'framer-motion';
import { useRef } from 'react';
import dynamic from "next/dynamic";

const ReactPlayer = dynamic(() => import("react-player/lazy"), { ssr: false });

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const textAnimation = { translateY: [100, 0], opacity: [0, 1] };
  const logoAnimation = { opacity: [0, 1], filter: ["blur(12px)", "blur(0px)"] };

  const ChakraBox = chakra(motion.div, {
    shouldForwardProp: (prop) => isValidMotionProp(prop) || shouldForwardProp(prop),
  });
  return (
    <Center backgroundColor="gray.900" width="full" id="about" p="10">
      <VStack maxW="container.xl">
        <Heading fontFamily="Satoshi-Bold" color="white">
          Something about <Text color="main" as="span">Escrow.YOU</Text>
        </Heading>
        <Stack ref={ref} direction={["column", "column", "column", "row"]} px={["0", "3", "7", "10"]} gap={["10", "10", "10", "0"]}>
          <VStack width={["100%", "100%", "100%", "50%"]} gap="5" alignItems="start">
            <ChakraBox animate={isInView ? textAnimation : 'none' } transition={{ duration: "1", ease: "easeInOut" }} opacity="0" p={["0", "3", "7", "10"]}>
              <Text fontSize="xl" color="gray.400">In a world where messages can be lost in the chaos, where authenticity is often questioned, <Text as="span" fontWeight="bold" color="white">Escrow.YOU</Text> provides a beacon of assurance. Our motto is simple yet powerful:</Text>
              <Text fontSize="xl" fontWeight="bold" color="white" mb="4">&quot;Empower Trust, Ensure Certainty&quot;</Text>
              <Text fontSize="xl" color="gray.400" mb="4">We bring you a groundbreaking solution - the ability to send messages and certify them with unbreakable security. Escrow.YOU Blockchain guarantees your messages remain secure, transparent, and immutable. Your words, your data, your trust, all protected by the immutable power of blockchain.</Text>
              <Text fontSize="xl" color="white" mb="8">Join us in shaping the future of secure communication and data certification. Together, we&apos;re rewriting the rules of trust.</Text>
                <Center>
                    <Link target="_blank" href="https://certifiedprotocol.s3.eu-central-1.amazonaws.com/certified_tutorial.mp4">
                        <Button backgroundColor="main">Watch DAPP tutorial</Button>
                    </Link>
                </Center>
            </ChakraBox>
          </VStack>
          <ChakraBox width={["100%", "100%", "100%", "50%"]} display="flex" justifyContent="center" alignContent="center" flexWrap="wrap" animate={isInView ? logoAnimation : 'none' } transition={{ duration: "2", ease: "easeInOut" }} opacity="0">
            <Image src={"/logo-dark.png"} boxSize={["2xs", "xs", "xs", "sm"]} alt="Escrow.YOU" objectFit="contain"/>
          </ChakraBox>
        </Stack>
          <ReactPlayer url="https://certifiedprotocol.s3.eu-central-1.amazonaws.com/escrow_you.mp4" width="100%" height="100%" controls/>
      </VStack>
    </Center>
  );
};

export default About;