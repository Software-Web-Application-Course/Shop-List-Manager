import {useState} from "react";
import "./App.css";

function Summary({totalItems, purchasedItems}){
    return(
        <div className="summary">
            <p>Total items: {totalItems} </p>
            <p>Purchased items: {purchasedItems} </p>
        </div>
    );
}

function ItemForm({onAddItem}){
    const [text, setText] = useState("");

    function handleSubmit(event){
        event.preventDefault();
        const cleaned = text.trim();

        if(cleaned === ""){
            alert("Please enter an item first");
            return;
        }
        onAddItem(cleaned);
        setText("");
    }

    return(
        <form onSubmit={handleSubmit}>
            <input type="text" value={text} onChange={(e) => setText(e.target.value)} placeholder="add shopping items"/>
            <button type="submit">Add</button>
        </form>
    );
}

function ShoppingItem({item, onToggleItem, onDeleteItem}){
    return(
        <li>
            {item.text}

            <button onClick={() => onToggleItem(item.id)}> {item.purchased ? "undo" : "purchased"} </button>
            <button onClick={() => onDeleteItem(item.id)}>Delete</button>
        </li>
    );
}

function ShoppingList({ items, onToggleItem, onDeleteItem }){
    if(items.length === 0){
        return <p>no item available</p>
    }

    return(
        <ul> {items.map((item) => (<ShoppingItem key ={item.id} item = {item} onToggleItem = {onToggleItem} onDeleteItem = {onDeleteItem} />))} </ul>
    );
}

export default function App(){
    const [items, setItems] = useState([]);

    function addItem(itemText){
        const newItem = {id: Date.now(), text: itemText, purchased: false};

        setItems([...items, newItem])
    }

    function toggleItem(id){
        setItems(items.map((item) => item.id === id ? {...item, purchased: !item.purchased,} : item));
    }

    function deleteItem(id){
        setItems(items.filter((item) => item.id !== id));
    }

    const purchasedItems = items.filter((item) => item.purchased).length;
    return(
        <main>
            <Summary totalItems={items.length} purchasedItems={purchasedItems} />
            <ItemForm onAddItem={addItem} />
            <ShoppingList items = {items} onToggleItem = {toggleItem} onDeleteItem = {deleteItem} />
            
        </main>
    );
}