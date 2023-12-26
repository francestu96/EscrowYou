import { chakra, shouldForwardProp, VStack,Text, Heading, Center, Divider } from '@chakra-ui/react';
import { motion, isValidMotionProp, useInView } from 'framer-motion';
import { AiOutlineAreaChart } from 'react-icons/ai';
import { BsCurrencyDollar } from 'react-icons/bs';
import { PiShareNetworkBold } from 'react-icons/pi';
import { useRef } from 'react';

const Roadmap = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const animation = { opacity: [0, 1], filter: ["blur(12px)", "blur(0px)"] };

  const ChakraBox = chakra(motion.div, {
    shouldForwardProp: (prop) => isValidMotionProp(prop) || shouldForwardProp(prop),
  })
  return (
    <Center borderBottomWidth="thin" backgroundColor="gray.900" width="full" id="roadmap" p="10" textColor="gray.700" backgroundImage="/roadmap-bg.png" backgroundPosition="center" backgroundSize="cover" textAlign="center">
      <VStack width="inherit" color="white">
        <Heading fontFamily="Satoshi-Bold" mb="5">
          Roadmap <Text color="main" as="span">Escrow.YOU</Text>
        </Heading>
        <VStack _hover={{ boxShadow: "0px 0px 10px rgba(255,255,255,0.5);", cursor: "pointer"}} p="10" width={["85%", "80%", "75%", "70%"]} borderWidth="thin" borderColor="gray.700" borderRadius="2xl">
          <BsCurrencyDollar size={70}/>
          <Text fontSize={["sm", "md", "lg", "lg"]} fontWeight="600">
            Payments feature is coming
          </Text>
          <Text>Get ready to get your payments Certifed! We are thrilled to announce that an incredible new payment feature is on its way to our DAPP</Text>
        </VStack>
        <Center height='25px'>
          <Divider orientation='vertical' borderColor="gray.700"/>
        </Center>
        <VStack _hover={{ boxShadow: "0px 0px 10px rgba(255,255,255,0.5);", cursor: "pointer"}} p="10" width={["85%", "80%", "75%", "70%"]} borderWidth="thin" borderColor="gray.700" borderRadius="2xl">
          <PiShareNetworkBold size={70}/>
          <Text fontSize={["sm", "md", "lg", "lg"]} fontWeight="600">
            Ecosystem Expansion
          </Text>
          <Text>Ecosystem expansion is an ongoing process that requires continuous effort, community involvement, and adaptability. By following a well-planned roadmap and staying committed to the growth and development of your blockchain ecosystem, we can increase the utility and value of $CFD token over time</Text>
        </VStack>
        <Center height='25px'>
          <Divider orientation='vertical' borderColor="gray.700"/>
        </Center>
        <VStack _hover={{ boxShadow: "0px 0px 10px rgba(255,255,255,0.5);", cursor: "pointer"}} p="10" width={["85%", "80%", "75%", "70%"]} borderWidth="thin" borderColor="gray.700" borderRadius="2xl">
          <AiOutlineAreaChart size={70}/>
          <Text fontSize={["sm", "md", "lg", "lg"]} fontWeight="600">
            Companies Collaboration
          </Text>
          <Text>We will seek companies and professionals who can benefit from the use of our blockchain technology-based services, including lawyers and other related sectors</Text>
        </VStack>
      </VStack>
    </Center>
  );
};

export default Roadmap;