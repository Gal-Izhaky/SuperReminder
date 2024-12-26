// imports
import Realm from "realm";

//constants
const SCHEMA_VERSION = 1

// schemas definition
const ShoppingListSchema = {
    name: "ShoppingList",
    primaryKey: "key",
    properties: {
        name: "string",
        key: "string",
        updateTime: "int",
        items: {
            type: "list",
            objectType: "ListItem",
        },
    },
};

const ListItemSchema = {
    name: "ListItem",
    primaryKey: "key",
    properties: {
        amount: "int",
        key: "string",
    }
}

const ItemSchema = {
    name: "Item",
    primaryKey: "key",
    properties: {
        key: "string",
        name: { type: 'string', indexed: true },
        weighted: "int",
        measurementUnit: "string",
        prices: {
            type: "list",
            objectType: "Price",
        },
    },
};

const PriceSchema = {
    name: "Price",
    primaryKey: "id",
    properties: {
        id: "string", // used to prevent duplicate price objects
        brand: "string",
        price: "double",
    },
};

const SupermarketSchema = {
    name: "Supermarket",
    properties: {
        address: "string",
        brand: "string",
        city: "string",
        latitude: "double",
        longitude: "double",
    }
}

const MetadataSchema = {
    name: "Metadata",
    primaryKey: "id",
    properties: {
        id: "string",
        itemsCounter: "int",
        updateTime: "string",
        supermarketsCounter: "int",
    }
}

const allSchemas = [
    ShoppingListSchema, 
    ListItemSchema,
    ItemSchema, 
    PriceSchema,
    SupermarketSchema,
    MetadataSchema,
]

const realmConfig = {
    schema: allSchemas,
    schemaVersion: SCHEMA_VERSION,
    migration: (oldRealm, newRealm) => {} // I need to fill if new schema versions
};

// intialize and export realm instance
const realm = new Realm(realmConfig);
export { realm };
