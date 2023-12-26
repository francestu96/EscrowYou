import type { NextPage } from 'next';
import Dapp from 'templates/Dapp';
import Default from 'templates/Default';

const DappPage: NextPage = () => {
  return (
    <Default pageName="Escrow.YOU | DAPP">
      <Dapp/>
    </Default>
  );
};

export default DappPage;