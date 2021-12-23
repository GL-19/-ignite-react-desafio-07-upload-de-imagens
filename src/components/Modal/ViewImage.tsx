import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  Image,
  Link,
  Flex,
} from '@chakra-ui/react';

interface ModalViewImageProps {
  isOpen: boolean;
  onClose: () => void;
  imgUrl: string;
}

export function ModalViewImage({
  isOpen,
  onClose,
  imgUrl,
}: ModalViewImageProps): JSX.Element {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay>
        <ModalContent
          bgColor="pGray.800"
          maxW="900px"
          maxH="630px"
          w="auto"
          h="auto"
        >
          <ModalBody p="0" w="auto" h="auto">
            <Flex flexDir="column" alignItems="center" w="auto" h="auto">
              <Image src={imgUrl} maxW="100%" maxH="600px" />
              <Link href={imgUrl} target="_blank" w="100%" textAlign="center">
                Abrir original
              </Link>
            </Flex>
          </ModalBody>
          {/*   <ModalFooter p="1rem">
          
          </ModalFooter> */}
        </ModalContent>
      </ModalOverlay>
    </Modal>
  );
}
