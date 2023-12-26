import { LinkBox, LinkOverlay, useColorMode } from '@chakra-ui/react';
import Image from 'next/image';

const Logo = () => {
  const { colorMode } = useColorMode();

  return (
    <LinkBox>
      <LinkOverlay href="/">
        <Image src={"/logo-" + colorMode + ".png"} height={60} width={60} alt="Escrow.YOU"/>
      </LinkOverlay>
    </LinkBox>
  );
};

export default Logo;
