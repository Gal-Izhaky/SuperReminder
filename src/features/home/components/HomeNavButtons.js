import React from 'react';
import { View } from 'react-native';
import TextButton from '../../../ui/components/button';
import constants from '../../../theme/constants';

/**
 * Navigation Button - Basic button that receives all props
 */
export const NavigationButton = ({ text, onPress, style, variant = "tertiary", size = "medium" }) => (
  <TextButton
    text={text}
    onPress={onPress}
    variant={variant}
    size={size}
    style={[{
        width: constants.layout.size.relative.full,
        height: constants.layout.size.absolute.smallPlus,
        alignItems: constants.layout.align.center,
        justifyContent: constants.layout.align.center,
        borderRadius: constants.layout.radius.large,
        paddingVertical: constants.spacing.medium,
        marginBottom: constants.spacing.mediumLarge,
    }, style]}
  />
);

/**
 * Home Navigation Buttons
 * The parent component creates the hooks and passes down props
 */
export const HomeNavButtons = ({ navigation, t, style }) => {
  const buttons = [
    { destination: "shoppingLists", variant: "primary" },
    { destination: "smartReminders", variant: "secondary" },
    { destination: "barcodeScanner", variant: "tertiary" }
  ];
  
  return (
    <View style={[{
      width: constants.layout.size.relative.mostlyFull,
      marginTop: constants.spacing.large,
      alignItems: constants.layout.align.center,
    }, style]}>
      {buttons.map((button) => (
        <NavigationButton
          key={button.destination}
          text={t ? t(`screens.${button.destination}`) : button.destination}
          onPress={() => navigation.navigate(button.destination)}
          variant={button.variant}
        />
      ))}
    </View>
  );
};
