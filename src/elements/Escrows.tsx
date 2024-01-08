import { Box, HStack, Input, InputGroup, InputLeftElement, VStack, Image, Heading, useColorMode, Tooltip, Tab, TabList, TabPanel, TabPanels, Tabs, Textarea, useToast } from '@chakra-ui/react';
import { Web3Button, useAddress, useContract } from '@thirdweb-dev/react';
import ESCROW_ABI from '../utils/ESCROW_ABI.json'
import { FaRegAddressBook } from 'react-icons/fa';
import { BsCurrencyDollar } from 'react-icons/bs';
import { MdPercent } from "react-icons/md";
import { MdContactless } from 'react-icons/md';
import Filter from './Filter';
import { useEffect, useState } from 'react';
import { EscrowModel } from 'utils/EscrowModel'
import { getEscrowTxs } from 'utils/getEscrowTxs';
import EscrowList from './EscrowList';

const Escrows = () => {
  const toast = useToast();
  const address = useAddress();
  const { colorMode } = useColorMode();
  const [isLoading, setIsLoading] = useState(true);
  const [receivedMessages, setReceivedMessages] = useState<EscrowModel[]>();
  const [sentMessages, setSentMessages] = useState<EscrowModel[]>();
  const [certifyMessages, setCertifyMessages] = useState<EscrowModel[]>();
  const [filteredReceivedMessages, setFilteredReceivedMessages] = useState<EscrowModel[]>();
  const [filteredSentMessages, setFilteredSentMessages] = useState<EscrowModel[]>();
  const [filteredCertifyMessages, setFilteredCertifyMessages] = useState<EscrowModel[]>();
  const [inputAmount, setInputAmount] = useState<number>();
  const [feeAmount, setFeeAmount] = useState<number>(1);
  const [receiverAddress, setReceiverAddress] = useState<string>("");
  const [certifierAddress, setCertifierAddress] = useState<string>("");
  const [inputMessage, setInputMessage] = useState<string>("");
  const [receiverAddressError, setReceiverAddressError] = useState<boolean>();
  const [certifierAddressError, setCertifierAddressError] = useState<boolean>();
  const [messageError, setMessageError] = useState<boolean>();
  const { contract } = useContract(process.env.NEXT_PUBLIC_ESCROW_CONTRACT_ADDRESS, ESCROW_ABI);

  useEffect(() => {
    const init = async () => {
      try{
        const escrows = await getEscrowTxs(address!, contract);

        let received = escrows.filter((x: EscrowModel) => x.data && parseInt(x.topics[2]) == parseInt(address!));
        let sent = escrows.filter((x: EscrowModel) => x.data && parseInt(x.topics[1]) == parseInt(address!));
        let certify = escrows.filter((x: EscrowModel) => x.data && parseInt(x.topics[3]) == parseInt(address!));

        setReceivedMessages(received);
        setSentMessages(sent);
        setCertifyMessages(certify);
        setFilteredReceivedMessages(received);
        setFilteredSentMessages(sent);
        setFilteredCertifyMessages(certify);

        setIsLoading(false);
      }
      catch (err: any){
        setIsLoading(false);
        toast({description: err || "Error occured. Please reload the page", status: 'error', position: "top", isClosable: true, duration: 3000});
      }
    }

    if(address){
      init();
    }
  }, [address, toast]);

  const success = async () => {
    setIsLoading(true);
    setTimeout(async () => {
        try{
            const escrows = await getEscrowTxs(address!, contract);

            setFilteredSentMessages(escrows.filter((x: EscrowModel) => x.data && parseInt(x.topics[1]) == parseInt(address!)));
            toast({description: "Transaction success", status: 'success', position: "bottom-right", isClosable: true, duration: 3000});
            setInputAmount(0);
            setCertifierAddress("");
            setReceiverAddress("");
            setInputMessage("");
            setIsLoading(false);
        }
        catch (err: any){
            toast({description: err, status: 'error', position: "top", isClosable: true, duration: 3000});
            setIsLoading(false);
        }
    }, 3500);
  }

  
  const verifyInputs = () => {
    if(!receiverAddress){
      setReceiverAddressError(true);
      toast({description: "Missing address", status: 'error', position: "top", isClosable: true, duration: 3000})
      return false;
    }
    if(receiverAddress.toLowerCase() == address?.toLowerCase()){
      setReceiverAddressError(true);
      toast({description: "Cannot enter your own address!", status: 'error', position: "top", isClosable: true, duration: 3000})
      return false;
    }
    if(!certifierAddress){
      setCertifierAddressError(true);
      toast({description: "Missing address", status: 'error', position: "top", isClosable: true, duration: 3000})
      return false;
    }
    if(!inputMessage){
      setMessageError(true);
      toast({description: "Missing message", status: 'error', position: "top", isClosable: true, duration: 3000})
      return false;
    }
    if(!/^0x[a-fA-F0-9]{40}$/gm.test(receiverAddress)){
      setReceiverAddressError(true);
      toast({description: "Invalid recipient address", status: 'error', position: "top", isClosable: true, duration: 3000})
      return false;
    }
    if(!/^0x[a-fA-F0-9]{40}$/gm.test(certifierAddress)){
      setCertifierAddressError(true);
      toast({description: "Invalid recipient address", status: 'error', position: "top", isClosable: true, duration: 3000})
      return false;
    }

    return true;
  }

  return (
    <Box textAlign="center" marginBottom={6}>
      { address ? (  
          <VStack width="full">
            <VStack width="inherit" mb="10">
              <HStack width="inherit" justify="space-between">
                <HStack width="49.7%">
                    <InputGroup width="85%">
                        <InputLeftElement pointerEvents='none'>
                            <BsCurrencyDollar/>
                        </InputLeftElement>
                        <Input value={inputAmount} onChange={(e) => setInputAmount(parseFloat(e.target.value))} placeholder="ETH to send" type="number" backgroundColor={colorMode == "dark" ? "gray.800" : "white"}/>
                    </InputGroup>
                    <Tooltip label="Certifier fee" hasArrow>
                        <InputGroup width="15%">
                            <InputLeftElement pointerEvents='none'>
                                <MdPercent/>
                            </InputLeftElement>
                            <Input value={feeAmount} onChange={(e) => setFeeAmount(parseFloat(e.target.value))} placeholder="Fee" type="number" backgroundColor={colorMode == "dark" ? "gray.800" : "white"}/>
                        </InputGroup>
                    </Tooltip>
                </HStack>
                <Web3Button 
                  style={{width: "20%", maxHeight: "2.5rem", color: colorMode == "dark" ? "#171923" : "white", backgroundColor: colorMode == "dark" ? "white" : "#171923"}} 
                  contractAddress={process.env.NEXT_PUBLIC_ESCROW_CONTRACT_ADDRESS || ""}
                  contractAbi={ESCROW_ABI}
                  onError={(e) => {
                    if(e.message.includes("Certifier address not valid for this escrow")){
                      toast({description: "Certifier address not valid for this escrow", status: 'error', position: "top", isClosable: true, duration: 3000});
                    }
                    else if(!certifierAddressError && !receiverAddressError && !messageError){
                      console.log(e);
                      toast({description: "Transaction rejected, check your ETH balance", status: 'error', position: "bottom-right", isClosable: true, duration: 3000})}
                    }}
                  onSuccess={async () => !certifierAddressError && !receiverAddressError && !messageError ? success() : null}
                  action={async (contract) => {
                    if(verifyInputs()){
                        await contract.call("sendEscrow", [receiverAddress, certifierAddress, feeAmount, inputMessage], { value: BigInt(inputAmount! * 10**18)});
                    }
                  }}>
                  Pay
                  <MdContactless size="28" style={{marginLeft: "5%", color: colorMode == "dark" ? "#171923" : "white" }}/>
                </Web3Button>
              </HStack>
              <HStack w="full">
                <InputGroup>
                  <InputLeftElement pointerEvents='none'>
                    <FaRegAddressBook/>
                  </InputLeftElement>
                  <Input value={receiverAddress} onChange={(e) => {setReceiverAddressError(false); setReceiverAddress(e.target.value)}} placeholder="Receiver address" borderColor={receiverAddressError ? "red" : undefined} backgroundColor={colorMode == "dark" ? "gray.800" : "white"}/>
                </InputGroup>
                <InputGroup>
                  <InputLeftElement pointerEvents='none'>
                    <FaRegAddressBook/>
                  </InputLeftElement>
                  <Input value={certifierAddress} onChange={(e) => {setCertifierAddressError(false); setCertifierAddress(e.target.value)}} placeholder="Certifier address" borderColor={certifierAddressError ? "red" : undefined} backgroundColor={colorMode == "dark" ? "gray.800" : "white"}/>
                </InputGroup>
              </HStack>
              <Textarea value={inputMessage} onChange={(e) => {setMessageError(false); setInputMessage(e.target.value)}} placeholder="Payment conditions to be verfied..." borderColor={messageError ? "red" : undefined} backgroundColor={colorMode == "dark" ? "gray.800" : "white"}/>
            </VStack>

            <Filter received={receivedMessages || []} sent={sentMessages || []} certify={certifyMessages || []} setFilteredReceived={setFilteredReceivedMessages} setFilteredSent={setFilteredSentMessages} setFilteredCertify={setFilteredCertifyMessages}/>
            <Tabs width="inherit">
              <TabList>
                <Tab _selected={{color: "main", borderColor: "main"}}>Received</Tab>
                <Tab _selected={{color: "main", borderColor: "main"}}>Sent</Tab>
                <Tab _selected={{color: "main", borderColor: "main"}}>Verify</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  {
                    isLoading ? (
                      <Box animation="pulse 2s infinite">
                        {Array.from({ length: 12 }, (_, i) => (
                          <Box width="100%" height="200px" backgroundColor="gray.700" rounded="xl" mt="5" key={i}>
                          </Box>
                        ))}
                      </Box>
                    ) : (
                      <EscrowList escrows={filteredReceivedMessages || []} sent={false} web3button={false}/>
                    )
                  }
                </TabPanel>
                <TabPanel>
                  {
                    isLoading ? (
                      <Box animation="pulse 2s infinite">
                        {Array.from({ length: 12 }, (_, i) => (
                          <Box width="100%" height="200px" backgroundColor="gray.700" rounded="xl" mt="5" key={i}>
                          </Box>
                        ))}
                      </Box>
                    ) : (
                      <EscrowList escrows={filteredSentMessages || []} sent={true} web3button={false}/>
                    )
                  }
                </TabPanel>
                <TabPanel>
                  {
                    isLoading ? (
                      <Box animation="pulse 2s infinite">
                        {Array.from({ length: 12 }, (_, i) => (
                          <Box width="100%" height="200px" backgroundColor="gray.700" rounded="xl" mt="5" key={i}>
                          </Box>
                        ))}
                      </Box>
                    ) : (
                      <EscrowList escrows={filteredCertifyMessages || []} sent={false} web3button={true}/>
                    )
                  }
                </TabPanel>
              </TabPanels>
            </Tabs>
          </VStack>    
        ) : ( 
          <VStack gap="10" p="10">
            <Heading fontFamily="Satoshi-Bold">Connect your Wallet</Heading>
            <Image src={ "connect-" + colorMode + ".gif" } width="50px"/>
          </VStack>
        )
      }
    </Box>
  );
};

export default Escrows;
