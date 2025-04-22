// External imports
import Realm from "realm";

// Constants
const SCHEMA_VERSION = 1;

/**
 * Schema Definitions
 * Each schema represents a data model in the Realm database
 */

// Shopping List Schema - represents a collection of items to purchase
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

// List Item Schema - represents an item within a shopping list
const ListItemSchema = {
    name: "ListItem",
    properties: {
        amount: "int",
        key: { type: "string", indexed: true },
    }
};

// Item Schema - represents a product with its details
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

// Price Schema - represents price information for an item
const PriceSchema = {
    name: "Price",
    primaryKey: "id",
    properties: {
        id: "string",      // Prevents duplicate price objects
        brand: "string",
        price: "double",
    },
};

// Supermarket Schema - represents a supermarket location
const SupermarketSchema = {
    name: "Supermarket",
    properties: {
        address: "string",
        brand: "string",
        city: "string",
        latitude: "double",
        longitude: "double",
    }
};

// Metadata Schema - stores application-level metadata
const MetadataSchema = {
    name: "Metadata",
    primaryKey: "id",
    properties: {
        id: "string",
        itemsCounter: "int",
        updateTime: "string",
        supermarketsCounter: "int",
    }
};

// Collection of all schemas
const allSchemas = [
    ShoppingListSchema,
    ListItemSchema,
    ItemSchema,
    PriceSchema,
    SupermarketSchema,
    MetadataSchema,
];

/**
 * Realm Configuration
 * Defines database settings and migration strategy
 */
const realmConfig = {
    schema: allSchemas,
    schemaVersion: SCHEMA_VERSION,
    migration: (oldRealm, newRealm) => {
        // TODO: Implement migration logic for schema updates
    }
};

// Initialize and export Realm instance
const realm = new Realm(realmConfig);
export { realm };
