export type EscrowModel = {
    id: string | undefined,
    approved?: boolean,
    address: string,
    blockHash: string,
    blockNumber: string,
    data: string | undefined,
    gasPrice: string,
    gasUsed: string,
    timeStamp: string,
    topics: string[],
    amount: number | undefined,
    escrowCounter: number | undefined,
    transactionHash: string,
    transactionIndex: string,
    redeemTime: BigInt
};