"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const items = [];
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.get("/items", (req, res) => {
    res.status(200).send(items);
});
app.post("/items", (req, res) => {
    if (!req.body) {
        res.status(400).send("No body provided");
    }
    const item = req.body;
    if (!item.id) {
        item.id = Math.floor(Math.random() * 1000000);
    }
    items.push(item);
    res.status(200).send(items);
});
app.get("/items/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const item = items.find((item) => item.id === id);
    if (!item) {
        res.status(404).send("Item not found");
    }
    res.status(200).send(item);
});
app.put("/items/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const item = items.find((item) => item.id === id);
    if (!item) {
        res.status(404).send("Item not found");
    }
    const updatedItem = req.body;
    if (!updatedItem) {
        res.status(400).send("No body provided");
    }
    if (updatedItem.title && item) {
        item.title = updatedItem.title;
    }
    if (updatedItem.description && item) {
        item.description = updatedItem.description;
    }
    if (updatedItem.done && item) {
        item.done = updatedItem.done;
    }
    res.status(200).send(items);
});
app.delete("/items/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const itemIndex = items.findIndex((item) => item.id === id);
    if (itemIndex === -1) {
        res.status(404).send("Item not found");
    }
    items.splice(itemIndex, 1);
    res.status(200).send(items);
});
app.get('/', (req, res) => {
    res.status(200).send({ response: "Hello World!" });
});
app.listen(3000, () => {
    console.log("Express server started on port 3000");
});
