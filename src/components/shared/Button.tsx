import {
  Button as ChakraButton,
  ButtonProps as ChakraButtonProps,
} from "@chakra-ui/react";

interface ButtonProps extends ChakraButtonProps {
  children: React.ReactNode;
}
function Button({ children, colorPalette = "blue", ...props }: ButtonProps) {
  return (
    <ChakraButton colorPalette={colorPalette} {...props}>
      {children}
    </ChakraButton>
  );
}

export default Button;
