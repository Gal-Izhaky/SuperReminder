// Layout
const layout = {
    // Alignment constants
    align: {
        center: "center",
        left: "left",
        right: "right",
        spaceBetween: "space-between",
        spaceAround: "space-around",
    },

    // Size constants
    size: {
        relative: {
            full: "100%",
            divider: "95%",
            almostFull: "90%",
            nearlyAlmostFull: "85%",
            mostlyFull: "80%",
            twoThirds: "67%",
            sixtyPercent: "60%",
            half: "50%",
            almostHalf: "45%",
            fourtyPercent: "40%",
            oneThird: "33%",
        },
        absolute: {
            dividerSmall: 2,
            divider: 4,
            tiny: 15,
            xxSmall: 20,
            xSmallMinus: 25,
            xSmall: 35,
            verySmall: 40,
            small: 50,
            smallPlus: 60,
            smallPlusPlus: 70,
            smallPlusPlusPlus: 80,
            mediumSmall: 90,
            medium: 100,
            mediumLarge: 125,
            large: 150,
            larger: 165,
            xlarge: 300,
            xxlarge: 350,
            lists: 592,
        },
    },

    // Border radius
    radius: {
        small: 5,
        medium: 10,
        large: 15,
        circle: 999,
    },

    // Border width
    border: {
        small: 1,
        medium: 2.5,
        large: 4,
    },

    // Position
    position: {
        absolute: "absolute",
        relative: "relative",
    },

    // Overflow
    overflow: {
        hidden: "hidden",
        scroll: "scroll",
        visible: "visible",
    },

    // Display
    display: {
        flex: "flex",
    },

    // Flex properties
    flex: {
        value: {
            none: 0,
            quarter: 0.25,
            half: 0.5,
            one: 1,
            two: 2,
        },
        direction: {
            row: "row",
            column: "column",
            rowReverse: "row-reverse",
            columnReverse: "column-reverse",
        },
        wrap: {
            wrap: "wrap",
            nowrap: "nowrap",
            reverse: "wrap-reverse",
        },
        grow: {
            none: 0,
            normal: 1,
            double: 2,
        },
        shrink: {
            none: 0,
            normal: 1,
            high: 2,
        },
        self: {
            auto: "auto",
            start: "flex-start",
            end: "flex-end",
            stretch: "stretch",
        },
    },

    zIndex: {
        normal: 1,
        high: 10,
        highest: 100,
    }
};

export default layout;
