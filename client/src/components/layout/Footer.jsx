import NavFooter from "../common/NavFooter.jsx";
import { Flex,  Spacer } from "@chakra-ui/react";
import SocialLinks from '../common/SocialLinks.jsx'

const Footer = () => {
  return (
    <Flex as="footer" bg='palette.darkgrey' color='palette.white' flexWrap='wrap' flexDirection='column' justifyContent='spacebetween' pb={4} position={'relative'} left={0} bottom={0} right={0}>
      <Flex flexDirection='inline' justifyContent='space-between' mb={2}>
       
        <SocialLinks />
        <Spacer />
        <NavFooter />
        <Spacer />
      </Flex>

      <Flex justifyContent='center'>
        <p>
          © 2024 Tweet Code. All rights reserved.
        </p>
      </Flex>
    </Flex>
  );
};

export default Footer;
