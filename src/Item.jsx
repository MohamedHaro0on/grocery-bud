import { useState } from "react";
import { FaEdit, FaTrash } from 'react-icons/fa';
const Item = ({ deleteItem, editItem, children, elementId }) => {
    const [editable, setEditable] = useState(false);
    const [value, setValue] = useState(children);

    const toggleEditable = () => {
        setEditable(prevState => !prevState);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        editItem(elementId, value);
        toggleEditable();
    }
    const handleChange = ({ target: { value } }) => {
        setValue(value);
    }


    let output = null;
    if (editable) {
        output = (
            <form onSubmit={(e) => handleSubmit(e)}>
                <input value={value} onChange={(e) => handleChange(e)} type = "string"/>
                <input type="submit" value="edit" onClick={handleSubmit} />
            </form>
        )
    }
    else {
        output = (
            <>
                <span>{children}</span>
                <span>
                    <button onClick={toggleEditable}><FaEdit /></button>
                    <button onClick={() => deleteItem(elementId)}><FaTrash /></button>
                </span>

            </>
        )
    }
    return (
        <li>
            {output}

        </li>
    )
}

export default Item;