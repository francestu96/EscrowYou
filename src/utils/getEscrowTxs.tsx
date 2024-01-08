import ESCROW_ABI from './ESCROW_ABI.json'
import axios from 'axios';
import { EscrowModel } from './EscrowModel'

const decodeEscrowData = (encoded: string) => {
  const cleanData = encoded.substring(2);
  const offset = parseInt(cleanData.substring(128, 192), 16)*2;
  const length = parseInt(cleanData.substring(offset+1, offset+64), 16);
  return {
        escrowCounter: parseInt(cleanData.substring(0, 64), 16),
        amount: (parseInt(cleanData.substring(64, 128), 16)) / 10**18,
        data: Buffer.from(cleanData.substring(offset+64, offset+64 + length*2), 'hex').toString()
  }
}

const decodeCertifyData = (encoded: string) => {
    const cleanData = encoded.substring(2);
    return {
        data: String(parseInt(cleanData.substring(64, 128), 16) !== 0),
        escrowCounter: parseInt(cleanData.substring(0, 64), 16)
    }
  }

export const getEscrowTxs = async (address: string, contract: any): Promise<EscrowModel[]> => {
  const keccak256 = require('keccak256');
  const escrowSign = ESCROW_ABI.find(x => x.name == "Escrow");
  const approveSign = ESCROW_ABI.find(x => x.name == "Approve");

  const params = {
    module: "logs",
    action: "getLogs",
    fromBlock: process.env.NEXT_PUBLIC_ESCROW_CONTRACT_ORIGIN_BLOCK || 0,
    toBlock: "latest",
    address: process.env.NEXT_PUBLIC_ESCROW_CONTRACT_ADDRESS || "",
    topic1: "0x" + address?.substring(2).padStart(64, '0'),
    topic2: "0x" + address?.substring(2).padStart(64, '0'),
    topic3: "0x" + address?.substring(2).padStart(64, '0'),
    topic1_2_opr: "or",
    topic2_3_opr: "or",
    apikey: process.env.NEXT_PUBLIC_LOGS_API_KEY || ""
  }

  const eventsRes = await axios.post(process.env.NEXT_PUBLIC_LOGS_API_URL || "", undefined, { params });
  if(eventsRes.data.message == "NOTOK"){
    throw new Error("too many requests, retry in few minutes");
  }
  const escrowEvents = eventsRes.data.result.filter((x: EscrowModel) => x.topics[0] == "0x" + keccak256(escrowSign?.name + "(" + escrowSign?.inputs.map(x => x.type).join(",") + ")").toString("hex"));
  await Promise.all(escrowEvents.map(async (x: EscrowModel) => {
    const decodedData = decodeEscrowData(x.data!);
    x.escrowCounter = decodedData.escrowCounter;
    x.data = decodedData.data;
    x.amount = decodedData.amount;
    x.redeemTime = await contract.call("checkReleaseTime", ["0x" + x.topics[2].substring(26), x.escrowCounter], {from: address});
  }));

  const approveEvents = eventsRes.data.result.filter((x: EscrowModel) => x.topics[0] == "0x" + keccak256(approveSign?.name + "(" + approveSign?.inputs.map(x => x.type).join(",") + ")").toString("hex"));
  approveEvents.map((x: EscrowModel) => {
    const decodedData = decodeCertifyData(x.data!);
    x.data = decodedData.data;
    x.escrowCounter = decodedData.escrowCounter;
  });

  for(const certifyEvent of approveEvents){
    const certifiedPayments = escrowEvents.filter((x: EscrowModel) => x.topics[1] == certifyEvent.topics[1] && x.topics[2] == certifyEvent.topics[2]);
    certifiedPayments[certifyEvent.escrowCounter].escrow_you = certifyEvent.data == "true";
  }

  return escrowEvents.reverse();
}