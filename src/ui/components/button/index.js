import React from 'react';
import { View } from 'react-native';
import TextButton from './textButton/textButton';
import constants from '../../../theme/constants';
import globalstyles from '../../../theme/globalstyles';
import { useTranslation } from 'react-i18next';
import IconButton from './iconButton/IconButton';

/**
 * Add Button - Used for adding items/lists
 */
export const AddButton = ({ onPress, text, style, spacing, variant="tertiary" }) => (
  <TextButton
    text={text}
    onPress={onPress}
    variant={variant}
    size="large"
    style={[{ 
      position: constants.layout.position.absolute, 
      bottom: spacing || constants.spacing.xxlarge,
      alignSelf: constants.layout.align.center,
      width: constants.layout.size.relative.twoThirds,
    }, style]}
  />
);

/**
 * Modal Button - Used in forms and modals
 */
export const ModalButton = ({ onPress, text, style }) => (
  <TextButton
    text={text}
    onPress={onPress}
    style={style}
  />
);

/**  
 * Back arrow - Used for the header component
 */
export const BackButton = ({ onPress, enabled }) => {
    const buttonStyle = {
        width: constants.layout.size.absolute.verySmall,
        alignItems: constants.layout.align.left,
        marginTop: constants.spacing.smaller,
    }

    return enabled ?
        <IconButton 
            icon={"arrow-back"} 
            size={38} 
            onPress={onPress} 
            style={buttonStyle}
        /> :
        <View style={buttonStyle} />;
}

/**
 * Menu button - Used for the header component
 */
export const MenuButton = ({ onPress }) => (
    <IconButton 
        icon={"menu"} 
        size={38} 
        onPress={onPress} 
        style={{
            width: constants.layout.size.absolute.verySmall,
            alignItems: constants.layout.align.right,
            marginTop: constants.spacing.smaller,
        }}
    />
)

/**
 * Delete button - Used for deleting items/lists
 */
export const DeleteButton = ({ onPress, style }) => (
    <IconButton 
        icon={require(`../../../assets/images/delete.png`)} 
        size={35} 
        onPress={onPress} 
        useImage={true}
        style={style}
        iconStyle={{
            width: 35,
            height: 35,
            resizeMode: 'stretch',
            marginLeft: 7,
        }}
    />
)

export default TextButton;