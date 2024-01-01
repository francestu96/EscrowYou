import { Box, Card, CardBody, CardFooter, CardHeader, HStack, Link, Spinner, Stack, Text, Tooltip, VStack, useColorMode, useToast } from "@chakra-ui/react";
import ESCROW_ABI from '../utils/ESCROW_ABI.json'
import { EscrowModel } from "utils/EscrowModel"
import { AiOutlineCheckCircle } from "react-icons/ai"
import { PiProhibitInset } from "react-icons/pi"
import { Web3Button } from "@thirdweb-dev/react";
import { FaCheck } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { useState } from "react";

const EscrowList = ({ escrows, sent, web3button }: { escrows: EscrowModel[], sent: boolean, web3button: boolean }) => {
  const toast = useToast();
  const { colorMode } = useColorMode();
  const [refresh, setRefresh] = useState<boolean>(false);

  return (
    <>
    { !escrows.length && (
        <Text fontFamily="satoshi-bold" fontSize="lg" align="center">No Payments Found</Text >
      )
    }
    {
      escrows.map((message: EscrowModel) => (
        <Card mt="5" key={message.transactionHash} borderWidth="thin" borderColor={message.approved === true ? "main" : (message.approved === false ? "red.700" : "inherit")}>
          <CardHeader py="2">
            { sent ? (
                <Stack direction={["column", "column", "row", "row"]} justifyContent="space-between" align="start">
                  <HStack p="2" color="main" display={message.approved === true ? "flex" : "none"}>
                      <Text fontSize={["xs", "xs", "sm", "md"]} fontWeight="bold">APPROVED</Text>
                      <FaCheck/>
                  </HStack>
                  <HStack p="2" color="red.600" display={message.approved === false ? "flex" : "none"}>
                      <Text fontSize={["xs", "xs", "sm", "md"]} fontWeight="bold">DENIED</Text>
                      <ImCross/>
                  </HStack>
                  <HStack p="2" color="orange.300" display={message.approved === undefined ? "flex" : "none"}>
                      <Text fontSize={["xs", "xs", "sm", "md"]} fontWeight="bold">Waiting for certification</Text>
                      <Spinner speed="2s" ml="2"/>
                  </HStack>
                <VStack alignItems="end">
                    <HStack fontSize={["3xs", "2xs", "xs", "sm"]}>
                        <Text>To:</Text>
                        <Box backgroundColor={colorMode == "dark" ? "gray.800" : "gray.200"} rounded="lg" p="2">
                            <Text>{ "0x" + message.topics[2].substring(26) }</Text>
                        </Box>
                    </HStack>
                    <HStack fontSize={["3xs", "2xs", "xs", "sm"]}>
                        <Text>Cerftifier:</Text>
                        <Box backgroundColor={colorMode == "dark" ? "gray.800" : "gray.200"} rounded="lg" p="2">
                            <Text>{ "0x" + message.topics[3].substring(26) }</Text>
                        </Box>
                    </HStack>
                </VStack>
              </Stack>
              ) : (
                <Stack direction={["column", "column", "row", "row"]} justifyContent="space-between">
                  <HStack>
                    <HStack display={web3button && message.approved === undefined ? "flex" : "none"}>
                      <Web3Button 
                        contractAddress={process.env.NEXT_PUBLIC_ESCROW_CONTRACT_ADDRESS || ""}
                        contractAbi={ESCROW_ABI}
                        style={{padding: "0", minWidth: "unset", background: "transparent"}}
                        onError={(e) => {
                            if(e.message.includes("Certifier address not valid for this payment")){
                                toast({description: "Certifier address not valid for this payment", status: 'error', position: "top", isClosable: true, duration: 3000});
                            }
                            else{
                                toast({description: "Transaction rejected", status: 'error', position: "bottom-right", isClosable: true, duration: 3000});
                                console.log(e);
                            }
                        }}
                        onSuccess={() => {message.approved = true; setRefresh(!refresh)}}
                        action={async (contract) => await contract.call("approve", ["0x" + message.topics[1].substring(26), "0x" + message.topics[2].substring(26), message.escrowCounter, true])}
                      >
                        <Tooltip hasArrow label='Approve' bg='gray.300' color='black' placement="top">
                          <span>
                            <AiOutlineCheckCircle className="icons" style={{color: "#9f30cd"}}/>
                          </span>
                        </Tooltip>
                      </Web3Button>
                      <Web3Button
                        contractAddress={process.env.NEXT_PUBLIC_ESCROW_CONTRACT_ADDRESS || ""}
                        contractAbi={ESCROW_ABI}
                        style={{padding: "0", minWidth: "unset", background: "transparent"}}
                        onError={(e) => {
                            if(e.message.includes("Certifier address not valid for this payment")){
                                toast({description: "Certifier address not valid for this payment", status: 'error', position: "top", isClosable: true, duration: 3000});
                            }
                            else{
                                toast({description: "Transaction rejected", status: 'error', position: "bottom-right", isClosable: true, duration: 3000});
                                console.log(e);
                            }
                        }}
                        onSuccess={() => {message.approved = false; setRefresh(!refresh)}}
                        action={async (contract) => await contract.call("certify", ["0x" + message.topics[1].substring(26), "0x" + message.topics[2].substring(26), message.escrowCounter, false])}
                      >
                        <Tooltip hasArrow label='Deny' bg='gray.300' color='black' placement="top">
                          <span>
                            <PiProhibitInset className="icons" style={{color: "#C53030"}}/>
                          </span>
                        </Tooltip>
                      </Web3Button>                    
                    </HStack>
                    <HStack p="2" color="main" display={message.approved === true ? "flex" : "none"}>
                        <Text fontSize={["xs", "xs", "sm", "md"]} fontWeight="bold">APPROVED</Text>
                        <FaCheck/>
                    </HStack>
                    <HStack p="2" color="red.700" display={message.approved === false ? "flex" : "none"}>
                        <Text fontSize={["xs", "xs", "sm", "md"]} fontWeight="bold">DENIED</Text>
                        <ImCross/>
                    </HStack>
                    <HStack p="2" color="orange.300" display={message.approved === undefined && !web3button ? "flex" : "none"}>
                        <Text fontSize={["xs", "xs", "sm", "md"]} fontWeight="bold">Waiting for certification</Text>
                        <Spinner speed="2s" ml="2"/>
                    </HStack>
                  </HStack>
                  <VStack alignItems="end">
                    <HStack fontSize={["3xs", "2xs", "xs", "sm"]}>
                        <Text>From:</Text>
                        <Box backgroundColor={colorMode == "dark" ? "gray.800" : "gray.200"} rounded="lg" p="2">
                            <Text>{"0x" + message.topics[1].substring(26)}</Text>
                        </Box>
                    </HStack>
                    <HStack fontSize={["3xs", "2xs", "xs", "sm"]}>
                        <Text>Certifier:</Text>
                        <Box backgroundColor={colorMode == "dark" ? "gray.800" : "gray.200"} rounded="lg" p="2">
                            <Text>{"0x" + message.topics[3].substring(26)}</Text>
                        </Box>
                    </HStack>
                  </VStack>
                </Stack>
              )
            }
            
          </CardHeader>
          <CardBody backgroundColor={colorMode == "dark" ? "gray.800" : "gray.200"} rounded="lg" mx="5">
            {
                sent ? (
                    <HStack justifyContent="space-between">
                        <Tooltip hasArrow label='Amount with calculated fees' bg='gray.300' color='black' placement="top">
                            <Box w="10%" backgroundColor={colorMode == "dark" ? "gray.900" : "gray.100"} rounded="lg" p="2">
                                <Text fontSize={["sm", "sm", "md", "md"]} ><b>ETH:</b> { message.amount }</Text>
                            </Box>
                        </Tooltip>
                        <Text fontSize={["sm", "sm", "md", "md"]} whiteSpace="pre">{ message.data }</Text>
                    </HStack>
                ) : (
                    <HStack justifyContent="space-between">
                        <Text fontSize={["sm", "sm", "md", "md"]} whiteSpace="pre">{ message.data }</Text>
                        <Tooltip hasArrow label='Amount with calculated fees' bg='gray.300' color='black' placement="top">
                            <Box w="10%" backgroundColor={colorMode == "dark" ? "gray.900" : "gray.100"} rounded="lg" p="2">
                                <Text fontSize={["sm", "sm", "md", "md"]} ><b>ETH:</b> { message.amount }</Text>
                            </Box>
                        </Tooltip>
                    </HStack>
                )
            }
          </CardBody>
          <CardFooter color="gray.400" fontSize={["3xs", "2xs", "xs", "sm"]}>
            <HStack fontSize={["3xs", "2xs", "xs", "xs"]} py="2" width="100%" justifyContent={"space-between"}>
              <Link isExternal color="main" href={process.env.NEXT_PUBLIC_CHAIN_SCAN_URL + "/" + message.transactionHash}>
                <ExternalLinkIcon style={{color: colorMode == "dark" ? "white" : "black"}} mr="1"/>
                { message.transactionHash }
              </Link>
              <Text>
                { new Date(parseInt(message.timeStamp, 16) * 1000).toLocaleDateString(undefined, { hour: "2-digit", minute: "2-digit", hourCycle: "h24"}) }
              </Text>
            </HStack>
          </CardFooter>
        </Card>
      ))
    }
    </>
  );
};

export default EscrowList;
