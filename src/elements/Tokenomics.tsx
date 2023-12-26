import { chakra, shouldForwardProp, VStack,Text, Image, Heading, Center, Stack, Box, AspectRatio, List, ListIcon, ListItem, useColorModeValue, Link, useColorMode } from '@chakra-ui/react';
import { motion, isValidMotionProp, useInView } from 'framer-motion';
import { useRef } from 'react';
import { MdCheckCircle } from 'react-icons/md';

const Tokenomics = () => {
  const ref = useRef(null);
  const { colorMode } = useColorMode();
  const color = useColorModeValue('gray.700', 'gray.400');
  const isInView = useInView(ref, { once: true });
  const textAnimation = { translateY: [100, 0], opacity: [0, 1] };
  const logoAnimation = { opacity: [0, 1], filter: ["blur(12px)", "blur(0px)"] };

  const ChakraBox = chakra(motion.div, {
    shouldForwardProp: (prop) => isValidMotionProp(prop) || shouldForwardProp(prop),
  });
  return (
    <Center  width="full" id="tokenomics" p="10">
      <VStack maxW="container.xl">
        <Heading fontFamily="Satoshi-Bold">
          <Text color="main" as="span">Escrow.YOU</Text> Tokenomics
        </Heading>
        <Stack ref={ref} direction={["column", "column", "column", "row"]} px={["0", "3", "7", "10"]} gap={["10", "10", "10", "0"]}>
          <ChakraBox width={["100%", "100%", "100%", "50%"]} display="flex" justifyContent="center" alignContent="center" flexWrap="wrap" animate={isInView ? logoAnimation : 'none' } transition={{ duration: "2", ease: "easeInOut" }} opacity="0">
            <Image src={"/tokenomics_img.svg"} boxSize={["xs", "sm", "md", "lg"]} alt="Escrow.YOU tokenomics" objectFit="contain"/>
          </ChakraBox>
          <VStack width={["100%", "100%", "100%", "50%"]} gap="5" alignItems="start">
            <ChakraBox animate={isInView ? textAnimation : 'none' } transition={{ duration: "1", ease: "easeInOut" }} opacity="0" p={["0", "3", "7", "10"]}>
              <Text fontSize="xl" fontWeight="bold" mb="4">$CFD will have tax aimed at fostering continuous development and effective marketing to ensure the project&apos;s growth and success. As the project matures, the tax rate will gradually decrease, reflecting the evolution and stability of the initiative.</Text>
              <Text fontSize="xl" mb="4" color={color}>The taxes will decrease according to the following schedule:</Text>
              <List spacing={3} mb="4" color={color} fontSize={"xl"}>
                <ListItem>
                  <ListIcon as={MdCheckCircle} color="main" />
                  5/5 tax during the launch day
                </ListItem>
                <ListItem>
                  <ListIcon as={MdCheckCircle} color="main" />
                  3/3 tax until the end of the first week
                </ListItem>
                <ListItem>
                  <ListIcon as={MdCheckCircle} color="main" />
                  1/1 tax until the end of the first month
                </ListItem>
                <ListItem>
                  <ListIcon as={MdCheckCircle} color="main" />
                  0/0 tax after the first month from launch
                </ListItem>
              </List>
              <Text fontSize={["xs", "md", "lg", "xl"]} textAlign={"center"}>CA: 0xb00808d6b4cee485ada79b0bc40ece1aee7bdbf8</Text>
              <Link pt="2" display="flex" justifyContent="center" href="https://www.dextools.io/app/en/ether/pair-explorer/0x624ca828f95941077302777f7880b3e0a0a17693" target="_blank">
                <Image src={"/DEXTools_" + colorMode + ".png"} height={10} width={40} alt="Escrow.YOU"/>
              </Link>
            </ChakraBox>
          </VStack>
        </Stack>
      </VStack>
    </Center>
  );
};

export default Tokenomics;