// External imports
import React from "react";
import { TouchableOpacity, Image } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

// Internal imports
import styles from "./IconButton.styles";

// Theme imports
import colors from "../../../../theme/colors";
import constants from "../../../../theme/constants";

/**
 * IconButton - Reusable button for icons
 */
const IconButton = ({
    icon,
    onPress,
    size,
    color = colors.text,
    style,
    iconStyle = {},
    useImage = false,
}) => {
    return (
        <TouchableOpacity
            style={style}
            onPress={onPress}
            activeOpacity={1}
            onPressIn={(e) => e.currentTarget.setNativeProps({style: { transform: [{ scale: 0.9 }] },})}
            onPressOut={(e) => e.currentTarget.setNativeProps({style: { transform: [{ scale: 1 }] },})}
        >
            {
                !useImage ?
                <Icon name={icon} size={size} color={color} />  :
                <Image
                    style={iconStyle}
                    source={icon}
                />
            }
        </TouchableOpacity>
    );
};

export default IconButton;
