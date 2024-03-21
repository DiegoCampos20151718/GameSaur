import React from 'react';
import { config } from '@gluestack-ui/config';
import { ButtonIcon, ButtonGroup, AddIcon, InfoIcon, ButtonSpinner, ArrowUpIcon, ThreeDotsIcon } from '@gluestack-ui/themed';
import { FormControlLabel, FormControlLabelText, FormControlHelper, FormControlHelperText, FormControlError, FormControlErrorIcon, Input, InputField, Radio, RadioGroup, RadioIcon, RadioIndicator, RadioLabel, Button, ButtonText, Checkbox, CheckboxGroup, CheckboxIndicator, CheckboxIcon, CheckboxLabel, Textarea, TextareaInput, Select, SelectTrigger, SelectInput, SelectIcon, SelectPortal, SelectBackdrop, SelectContent, SelectDragIndicatorWrapper, SelectDragIndicator, SelectItem, Slider, SliderTrack, SliderFilledTrack, SliderThumb, Switch, Modal, ModalBackdrop, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, HStack, Center, Icon, CircleIcon, CheckIcon, AlertCircleIcon } from '@gluestack-ui/themed';
import { Box, GluestackUIProvider, Text, Image, VStack, Heading, Link, Accordion, AccordionHeader, AccordionItem, AccordionContentText, AccordionContent, AccordionTrigger, AccordionTitleText, AccordionIcon, ChevronUpIcon, ChevronDownIcon, FormControl } from '@gluestack-ui/themed';
import { FormControlErrorText } from "@gluestack-ui/themed";

const Login = () => {
  return (
    // Ajuste aquí para hacer el Center más grande
    <Center style={{ marginTop: '20px', width: '100%', height: '100vh' }}> 
      <VStack>
        <FormControl size={"lg"} isDisabled={false} isRequired={true}>
          <FormControlLabel>
            <FormControlLabelText>Email</FormControlLabelText>
          </FormControlLabel>
          <Input isFocused={false} $focus-borderColor='$purple500'>
            <InputField type="text" defaultValue="ej@gmail.com" placeholder="email"/>
          </Input>

          <FormControlHelper>
            <FormControlHelperText>
            </FormControlHelperText>
          </FormControlHelper>

          <FormControlError>
            <FormControlErrorIcon as={AlertCircleIcon} />
            <FormControlErrorText>
              At least 6 characters are required.
            </FormControlErrorText>
          </FormControlError>
        </FormControl>

        <FormControl size={"md"} isDisabled={false} isRequired={true}>
          <FormControlLabel>
            <FormControlLabelText>Password</FormControlLabelText>
          </FormControlLabel>
          <Input>
            <InputField type="password" defaultValue="12345" placeholder="password"/>
          </Input>

          <FormControlHelper>
            <FormControlHelperText>
              Must be at least 6 characters.
            </FormControlHelperText>
          </FormControlHelper>

          <FormControlError>
            <FormControlErrorIcon as={AlertCircleIcon} />
            <FormControlErrorText>
              At least 6 characters are required.
            </FormControlErrorText>
          </FormControlError>
        </FormControl>

        <Button action={"primary"} variant={"solid"} size={"lg"} isDisabled={false} bg='$purple400'>
          <ButtonText>
            Button
          </ButtonText>
        </Button>
      </VStack>
    </Center>
  );
};

export default Login;
